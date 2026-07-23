"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const password = new FormData(form).get("password");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Connexion impossible.");
      }

      router.push("/admin/rsvp");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-orange-bright/25 bg-white/80 px-6 py-8 backdrop-blur-sm sm:px-10"
    >
      <label className="block text-left">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
          Mot de passe
        </span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full border-0 border-b border-stone-300 bg-transparent px-0 py-2 text-ink outline-none transition focus:border-orange-bright"
        />
      </label>

      {error && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full bg-orange-bright px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-orange-deep disabled:opacity-60"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
