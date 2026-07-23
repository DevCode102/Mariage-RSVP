"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  rsvpEventLabel,
  type ProgrammeEvent,
  type RsvpSelectOptionField,
} from "@/lib/site-content";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
  notice: string;
  partner1: string;
  partner2: string;
  events: ProgrammeEvent[];
  collectEmail: boolean;
  collectPhone: boolean;
  pagneEnabled: boolean;
  pagneLabel: string;
  pagneOptions: string[];
  lodgingFields: RsvpSelectOptionField[];
  messageEnabled: boolean;
  wishesAssistantEnabled: boolean;
  yesLabel: string;
  noLabel: string;
  /** Sur la page d'accueil : pas de notice, succès sans lien retour */
  embedded?: boolean;
};

const inputClass =
  "mt-2 w-full appearance-none border-0 border-b border-stone-300 bg-transparent px-0 py-2.5 text-ink outline-none transition placeholder:text-stone-300 focus:border-[#CB6B53]";
const mutedLabelClass =
  "text-xs font-medium uppercase tracking-[0.18em] text-stone-400";
const accentLabelClass =
  "text-xs font-medium uppercase tracking-[0.18em] text-[#CB6B53]";

export function RsvpForm({
  notice,
  partner1,
  partner2,
  events,
  collectEmail,
  collectPhone,
  pagneEnabled,
  pagneLabel,
  pagneOptions,
  lodgingFields,
  messageEnabled,
  wishesAssistantEnabled,
  yesLabel,
  noLabel,
  embedded = false,
}: Props) {
  const rsvpEvents = useMemo(
    () => events.filter((event) => event.includeInRsvp !== false),
    [events],
  );
  const activeLodging = useMemo(
    () => lodgingFields.filter((field) => field.enabled),
    [lodgingFields],
  );

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [wishLoading, setWishLoading] = useState(false);
  const [wishError, setWishError] = useState("");

  async function generateWish() {
    setWishLoading(true);
    setWishError("");
    try {
      const response = await fetch("/api/wishes-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partner1, partner2 }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Impossible de générer un message.");
      }
      setMessage(String(payload.message ?? ""));
    } catch (err) {
      setWishError(
        err instanceof Error ? err.message : "Une erreur est survenue.",
      );
    } finally {
      setWishLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const eventAnswers: Record<string, boolean> = {};
    for (const item of rsvpEvents) {
      const value = String(data.get(`event-${item.id}`) ?? "");
      if (value !== "yes" && value !== "no") {
        setStatus("error");
        setError(`Merci d'indiquer votre présence pour : ${rsvpEventLabel(item)}`);
        return;
      }
      eventAnswers[item.id] = value === "yes";
    }

    const lodging: Record<string, string> = {};
    for (const field of activeLodging) {
      lodging[field.id] = String(data.get(`lodging-${field.id}`) ?? "");
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          email: collectEmail ? data.get("email") : "",
          phone: collectPhone ? data.get("phone") : "",
          eventAnswers,
          pagne: pagneEnabled ? data.get("pagne") : "",
          lodging,
          message: messageEnabled ? message : "",
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Une erreur est survenue.");
      }

      setStatus("success");
      form.reset();
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return (
      <div className="px-2 py-10 text-center sm:px-4">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#CB6B53]">
          Merci infiniment
        </p>
        <h3 className="font-display mt-3 text-3xl font-semibold italic text-ink">
          Votre réponse a bien été transmise
        </h3>
        <p className="mt-3 text-stone-600">À bientôt pour célébrer ensemble.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      {!embedded && notice ? (
        <p className="mb-10 text-center text-sm leading-relaxed text-stone-500 italic">
          {notice}
        </p>
      ) : null}

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block text-left">
          <span className={mutedLabelClass}>Nom(s) &amp; Prénom(s) *</span>
          <input
            name="fullName"
            required
            autoComplete="name"
            className={inputClass}
          />
        </label>

        {collectEmail ? (
          <label className="block text-left">
            <span className={mutedLabelClass}>Email *</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </label>
        ) : null}

        {collectPhone ? (
          <label className="block text-left sm:col-span-2">
            <span className={mutedLabelClass}>Téléphone *</span>
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={inputClass}
            />
          </label>
        ) : null}
      </div>

      {rsvpEvents.length > 0 ? (
        <div className="mt-12 space-y-10">
          {rsvpEvents.map((item) => (
            <fieldset key={item.id} className="text-left">
              <legend className={accentLabelClass}>{rsvpEventLabel(item)}</legend>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-10">
                <label className="inline-flex cursor-pointer items-center gap-2.5 text-stone-600">
                  <input
                    type="radio"
                    name={`event-${item.id}`}
                    value="yes"
                    required
                    className="accent-[#CB6B53]"
                  />
                  <span>{yesLabel}</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2.5 text-stone-600">
                  <input
                    type="radio"
                    name={`event-${item.id}`}
                    value="no"
                    className="accent-[#CB6B53]"
                  />
                  <span>{noLabel}</span>
                </label>
              </div>
            </fieldset>
          ))}
        </div>
      ) : null}

      {(pagneEnabled || activeLodging.length > 0) && (
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {pagneEnabled ? (
            <label className="block text-left">
              <span className={mutedLabelClass}>{pagneLabel}</span>
              <select
                name="pagne"
                className={inputClass}
                defaultValue={pagneOptions[0]}
              >
                {pagneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {activeLodging.map((field) => (
            <label key={field.id} className="block text-left">
              <span className={mutedLabelClass}>{field.label}</span>
              <select
                name={`lodging-${field.id}`}
                className={inputClass}
                defaultValue={field.options[0]}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}

      {messageEnabled ? (
        <div className="mt-12 text-left">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <span className={mutedLabelClass}>
              Un petit mot pour les mariés (optionnel)
            </span>
            {wishesAssistantEnabled ? (
              <button
                type="button"
                onClick={generateWish}
                disabled={wishLoading}
                className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#CB6B53] transition hover:text-[#9E4244] disabled:opacity-60"
              >
                {wishLoading ? "Génération…" : "✨ Assistant de vœux"}
              </button>
            ) : null}
          </div>
          <input
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
            placeholder=""
          />
          {wishError ? (
            <p className="mt-2 text-sm text-red-700" role="alert">
              {wishError}
            </p>
          ) : null}
        </div>
      ) : null}

      {status === "error" && (
        <p className="mt-6 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="mt-12 text-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#CB6B53] px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#b85c46] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Envoi…" : "Envoyer ma réponse"}
        </button>
      </div>
    </form>
  );
}
