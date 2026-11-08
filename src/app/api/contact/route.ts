import { NextResponse, type NextRequest } from "next/server";
import { AREA_LABEL_EN, validateContact, type AreaKey, type ContactInput } from "@/lib/contact";

/**
 * Demo / datasheet request endpoint.
 * - Server-side validation (same schema as the client)
 * - Honeypot + minimum fill time
 * - Per-IP rate limit (in-memory; swap for a shared store such as Upstash/Vercel KV on multi-instance hosting)
 * - Delivers ONLY to the verified recipient (CONTACT_TO_EMAIL) via Resend. No email is sent to the visitor.
 * - Any delivery failure returns an error — the client never shows a false success.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "");

export async function POST(req: NextRequest) {
  // Same-origin only.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  if (!(req.headers.get("content-type") || "").includes("application/json")) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 415 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > 20_000) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Spam traps: filled honeypot or submitted faster than a person could.
  if (clean(body.website, 200) || Number(body.elapsed) < 2500) {
    return NextResponse.json({ ok: false, error: "rejected" }, { status: 400 });
  }

  const input: ContactInput = {
    name: clean(body.name, 120),
    organization: clean(body.organization, 160),
    email: clean(body.email, 200),
    area: clean(body.area, 40),
    phone: clean(body.phone, 40),
    message: clean(body.message, 4000),
    datasheet: body.datasheet === true,
  };
  const fields = validateContact(input);
  if (Object.keys(fields).length) return NextResponse.json({ ok: false, error: "invalid", fields }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("[contact] Delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL).");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const area = AREA_LABEL_EN[input.area as AreaKey];
  const locale = body.locale === "he" ? "HE" : "EN";
  const subject = `${input.datasheet ? "Demo + datasheet request" : "Demo request"} — ${input.organization} (${area})`;
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Organization", input.organization],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["Area of use", area],
    ["Datasheet requested", input.datasheet ? "YES — review and send manually" : "No"],
    ["Site language", locale],
    ["Message", input.message || "—"],
  ];
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#667;vertical-align:top"><b>${esc(k)}</b></td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
        reply_to: input.email,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Delivery exception", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}
