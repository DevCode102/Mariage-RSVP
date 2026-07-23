"use client";

import { useState } from "react";
import type { ThemeColor } from "@/lib/site-content";

type Props = {
  title: string;
  themeColors: ThemeColor[];
  partner1: string;
  partner2: string;
};

const genders = ["Femme", "Homme"] as const;
const styles = ["Chic & Moderne", "Traditionnel & Glamour"] as const;

export function StyleAdvisor({
  title,
  themeColors,
  partner1,
  partner2,
}: Props) {
  const [gender, setGender] = useState<(typeof genders)[number]>("Femme");
  const [style, setStyle] = useState<(typeof styles)[number]>("Traditionnel & Glamour");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getAdvice() {
    setLoading(true);
    setError("");
    setAdvice("");

    try {
      const response = await fetch("/api/style-advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender,
          style,
          partner1,
          partner2,
          colors: themeColors,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Impossible d'obtenir des conseils.");
      }
      setAdvice(payload.advice);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-14 max-w-2xl rounded-xl bg-white px-6 py-8 shadow-[0_8px_30px_rgba(93,43,29,0.08)] sm:px-8">
      <h3 className="font-display text-center text-2xl italic text-[#CB6B53] sm:text-[1.75rem]">
        <span aria-hidden>✨ </span>
        {title}
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="block text-left">
          <span className="sr-only">Genre</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as (typeof genders)[number])}
            className="w-full border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#CB6B53]"
          >
            {genders.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-left">
          <span className="sr-only">Style</span>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as (typeof styles)[number])}
            className="w-full border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none focus:border-[#CB6B53]"
          >
            {styles.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={getAdvice}
        disabled={loading}
        className="mt-4 inline-flex items-center justify-center rounded-md bg-[#CB6B53] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#b85c46] disabled:opacity-60"
      >
        {loading ? "Génération…" : "✨ Obtenir des conseils"}
      </button>

      {error ? (
        <p className="mt-5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      {advice ? (
        <p className="mt-6 text-sm leading-relaxed text-stone-500 italic whitespace-pre-line">
          {advice}
        </p>
      ) : null}
    </div>
  );
}
