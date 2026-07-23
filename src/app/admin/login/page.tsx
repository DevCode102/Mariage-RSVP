import Link from "next/link";
import { AdminLoginForm } from "@/components/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="section-texture flex min-h-[100svh] items-center px-6 py-12 sm:px-10">
      <div className="mx-auto w-full max-w-md">
        <Link
          href="/"
          className="text-sm font-medium uppercase tracking-[0.18em] text-orange-deep"
        >
          ← Accueil
        </Link>
        <h1 className="font-display mt-8 text-4xl font-semibold text-ink">
          Espace admin
        </h1>
        <p className="mt-3 text-stone-600">
          Accès réservé : RSVP et contenu du site.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
