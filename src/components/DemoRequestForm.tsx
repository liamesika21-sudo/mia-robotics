"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import type { Dict } from "@/content";
import { AREA_KEYS, validateContact, type ContactInput, type Errors } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";
import { Arrow } from "./ui";

type Status = "idle" | "sending" | "success" | "error";

export default function DemoRequestForm({ t, locale }: { t: Dict["contact"]["form"]; locale: Locale }) {
  const params = useSearchParams();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [datasheet, setDatasheet] = useState(false);
  const startedAt = useRef<number>(0);
  const summary = useRef<HTMLDivElement>(null);
  const success = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    if (params?.get("request") === "datasheet") setDatasheet(true);
  }, [params]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const data: ContactInput = {
      name: String(fd.get("name") || ""),
      organization: String(fd.get("organization") || ""),
      email: String(fd.get("email") || ""),
      area: String(fd.get("area") || ""),
      phone: String(fd.get("phone") || ""),
      message: String(fd.get("message") || ""),
      datasheet,
    };
    const errs = validateContact(data);
    setErrors(errs);
    setServerMsg("");
    if (Object.keys(errs).length) {
      setStatus("error");
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          locale,
          website: String(fd.get("website") || ""), // honeypot
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: Errors };
      if (res.ok && json.ok) {
        setStatus("success");
        requestAnimationFrame(() => success.current?.focus());
        return;
      }
      if (json.fields) setErrors(json.fields);
      setServerMsg(
        res.status === 429 ? t.errors.rate : json.error === "not_configured" ? t.errors.notConfigured : json.fields ? t.errors.summary : t.errors.server
      );
      setStatus("error");
      requestAnimationFrame(() => summary.current?.focus());
    } catch {
      setServerMsg(t.errors.server);
      setStatus("error");
      requestAnimationFrame(() => summary.current?.focus());
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" ref={success} tabIndex={-1} role="status">
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="m12 20.5 5.5 5.5L28.5 15" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <p>{t.success}</p>
      </div>
    );
  }

  const err = (k: keyof ContactInput) => (errors[k] ? t.errors[errors[k]!] : "");
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby="form-privacy">
      <div ref={summary} tabIndex={-1} className="form__summary" role="alert" aria-live="assertive">
        {status === "error" && (serverMsg || (hasErrors ? t.errors.summary : ""))}
      </div>

      <div className="form__grid">
        <Field id="name" label={t.name} error={err("name")} required>
          <input id="name" name="name" autoComplete="name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        </Field>
        <Field id="organization" label={t.org} error={err("organization")} required>
          <input id="organization" name="organization" autoComplete="organization" required maxLength={160} aria-invalid={!!errors.organization} aria-describedby={errors.organization ? "organization-err" : undefined} />
        </Field>
        <Field id="email" label={t.email} error={err("email")} required>
          <input id="email" name="email" type="email" autoComplete="email" dir="ltr" required maxLength={200} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
        </Field>
        <Field id="phone" label={t.phone} hint={t.optional} error={err("phone")}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" dir="ltr" maxLength={40} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
        </Field>
        <Field id="area" label={t.area} error={err("area")} required wide>
          <select id="area" name="area" required defaultValue="" aria-invalid={!!errors.area} aria-describedby={errors.area ? "area-err" : undefined}>
            <option value="" disabled>
              {t.areaPlaceholder}
            </option>
            {AREA_KEYS.map((k, i) => (
              <option key={k} value={k}>
                {t.areas[i]}
              </option>
            ))}
          </select>
        </Field>
        <Field id="message" label={t.message} hint={t.optional} error={err("message")} wide>
          <textarea id="message" name="message" rows={5} maxLength={4000} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="check">
        <input type="checkbox" name="datasheet" checked={datasheet} onChange={(e) => setDatasheet(e.target.checked)} />
        <span className="check__box" aria-hidden="true" />
        <span>{t.datasheet}</span>
      </label>

      <div className="form__foot">
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"} aria-busy={status === "sending"}>
          <span>{status === "sending" ? t.sending : t.submit}</span>
          <Arrow />
        </button>
        <p id="form-privacy" className="form__privacy">{t.privacy}</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  wide,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`field${wide ? " field--wide" : ""}${error ? " has-error" : ""}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {required ? <span className="field__req" aria-hidden="true"> *</span> : hint ? <span className="field__hint"> — {hint}</span> : null}
      </label>
      {children}
      {error && (
        <p className="field__err" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
