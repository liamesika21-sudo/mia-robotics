import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { listLeads, storageConfigured, type Lead } from "@/lib/leads";
import { AREA_LABEL_EN, type AreaKey } from "@/lib/contact";

/**
 * CSV export of stored leads, protected by HTTP Basic auth.
 *   /api/leads/export            → only people who ticked "Keep me updated" (the mailing list)
 *   /api/leads/export?all=1      → every request, with the consent column
 * Username: anything. Password: LEADS_EXPORT_PASSWORD. Without that variable the route does not exist.
 */

export const dynamic = "force-dynamic";

function authorized(req: NextRequest, password: string) {
  const h = req.headers.get("authorization") || "";
  if (!h.startsWith("Basic ")) return false;
  const decoded = Buffer.from(h.slice(6), "base64").toString("utf8");
  const given = Buffer.from(decoded.slice(decoded.indexOf(":") + 1));
  const want = Buffer.from(password);
  return given.length === want.length && timingSafeEqual(given, want);
}

// Quote every cell and neutralise spreadsheet formulas (CSV injection).
const cell = (v: unknown) => {
  let s = v === null || v === undefined ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(req: NextRequest) {
  const password = process.env.LEADS_EXPORT_PASSWORD;
  if (!password) return new NextResponse("Not found", { status: 404 });
  if (!authorized(req, password)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="MIA leads", charset="UTF-8"' },
    });
  }
  if (!storageConfigured()) return NextResponse.json({ ok: false, error: "storage_not_configured" }, { status: 503 });

  const all = req.nextUrl.searchParams.get("all") === "1";
  let leads: Lead[];
  try {
    leads = await listLeads();
  } catch (err) {
    console.error("[leads] export failed", err);
    return NextResponse.json({ ok: false, error: "storage_error" }, { status: 502 });
  }
  const rows = all ? leads : leads.filter((l) => l.updatesConsent);

  const header = all
    ? ["Received (UTC)", "Name", "Organization", "Email", "Phone", "Area of use", "Datasheet", "News updates consent", "Consent date (UTC)", "Language", "Message"]
    : ["Name", "Organization", "Email", "Phone", "Consent date (UTC)"];
  const lines = rows.map((l) =>
    (all
      ? [
          l.receivedAt,
          l.name,
          l.organization,
          l.email,
          l.phone,
          AREA_LABEL_EN[l.area as AreaKey] || l.area,
          l.datasheet ? "Yes" : "No",
          l.updatesConsent ? "Yes" : "No",
          l.updatesConsentAt || "",
          l.locale.toUpperCase(),
          l.message,
        ]
      : [l.name, l.organization, l.email, l.phone, l.updatesConsentAt || ""]
    )
      .map(cell)
      .join(",")
  );
  // BOM so Excel opens Hebrew names correctly.
  const csv = "﻿" + [header.map(cell).join(","), ...lines].join("\r\n");
  const day = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="mia-${all ? "all-requests" : "updates-list"}-${day}.csv"`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
