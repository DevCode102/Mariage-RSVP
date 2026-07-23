"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/LogoutButton";

const nav = [
  { href: "/admin/rsvp", label: "RSVP List" },
  { href: "/admin/content", label: "Site Content" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500 transition hover:text-orange-deep"
          >
            ← Site
          </Link>
          <nav className="flex gap-1" aria-label="Admin">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition ${
                    active
                      ? "border-b-2 border-orange-bright text-orange-deep"
                      : "text-stone-600 hover:text-orange-deep"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}
