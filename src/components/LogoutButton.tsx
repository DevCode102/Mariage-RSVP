"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={loading}
      className="text-sm font-medium uppercase tracking-[0.15em] text-orange-deep transition hover:text-ember disabled:opacity-60"
    >
      {loading ? "…" : "Déconnexion"}
    </button>
  );
}
