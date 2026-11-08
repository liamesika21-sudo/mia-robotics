/** Shared contact-form schema — used by the client form and re-checked on the server. */

export const AREA_KEYS = [
  "defense",
  "homeland",
  "infrastructure",
  "agriculture",
  "construction",
  "logistics",
  "sar",
  "other",
] as const;
export type AreaKey = (typeof AREA_KEYS)[number];

export const AREA_LABEL_EN: Record<AreaKey, string> = {
  defense: "Defense",
  homeland: "Homeland security & policing",
  infrastructure: "Critical infrastructure & energy",
  agriculture: "Agriculture",
  construction: "Construction",
  logistics: "Logistics",
  sar: "Search & rescue",
  other: "Other",
};

export type ContactInput = {
  name: string;
  organization: string;
  email: string;
  area: string;
  phone?: string;
  message?: string;
  datasheet?: boolean;
};

export type FieldError = "required" | "email" | "phone" | "tooLong";
export type Errors = Partial<Record<keyof ContactInput, FieldError>>;

const LIMITS = { name: 120, organization: 160, email: 200, phone: 40, message: 4000 };
const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE = /^[+()\-.\s\d]{6,40}$/;

export function validateContact(v: ContactInput): Errors {
  const e: Errors = {};
  const s = (x: unknown) => (typeof x === "string" ? x.trim() : "");
  if (!s(v.name)) e.name = "required";
  else if (s(v.name).length > LIMITS.name) e.name = "tooLong";
  if (!s(v.organization)) e.organization = "required";
  else if (s(v.organization).length > LIMITS.organization) e.organization = "tooLong";
  if (!s(v.email)) e.email = "required";
  else if (s(v.email).length > LIMITS.email || !EMAIL.test(s(v.email))) e.email = "email";
  if (!s(v.area)) e.area = "required";
  else if (!(AREA_KEYS as readonly string[]).includes(s(v.area))) e.area = "required";
  if (s(v.phone) && !PHONE.test(s(v.phone))) e.phone = "phone";
  if (s(v.message).length > LIMITS.message) e.message = "tooLong";
  return e;
}
