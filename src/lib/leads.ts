/**
 * Lead storage: every demo / datasheet request is kept with its news-updates consent and timestamp.
 *
 * Backend: Upstash Redis over its REST API (no SDK). On Vercel, add the "Upstash for Redis"
 * integration from the Marketplace; it sets KV_REST_API_URL and KV_REST_API_TOKEN automatically.
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are accepted too.
 *
 * Server-only. Never import this file from a client component.
 */

export type Lead = {
  id: string;
  receivedAt: string; // ISO 8601, UTC
  name: string;
  organization: string;
  email: string;
  phone: string;
  area: string;
  datasheet: boolean;
  message: string;
  locale: "en" | "he";
  /** Ticked "Keep me updated on MIA Robotics news". */
  updatesConsent: boolean;
  /** When consent was given (ISO 8601, UTC). Null when the box was not ticked. */
  updatesConsentAt: string | null;
  /** The exact notice the visitor saw under the form, kept as proof of what they agreed to. */
  noticeShown: string;
};

const KEY = "mia:leads";

function config() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function storageConfigured() {
  return config() !== null;
}

async function command<T>(args: string[]): Promise<T> {
  const c = config();
  if (!c) throw new Error("Lead storage is not configured");
  const res = await fetch(c.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${c.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw new Error(`Lead storage error ${res.status}`);
  const json = (await res.json()) as { result?: T; error?: string };
  if (json.error) throw new Error(json.error);
  return json.result as T;
}

export async function saveLead(lead: Lead) {
  await command<number>(["RPUSH", KEY, JSON.stringify(lead)]);
}

export async function listLeads(): Promise<Lead[]> {
  const rows = await command<string[]>(["LRANGE", KEY, "0", "-1"]);
  return rows.flatMap((r) => {
    try {
      return [JSON.parse(r) as Lead];
    } catch {
      return [];
    }
  });
}
