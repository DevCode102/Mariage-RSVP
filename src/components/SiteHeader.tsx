"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#histoire", label: "Notre Histoire" },
  { href: "#programme", label: "Programme" },
  { href: "#theme", label: "Thème" },
  { href: "#gallery", label: "Galerie" },
  { href: "#rsvp", label: "Participation", accent: true },
];

type Props = {
  initials: string;
  galleryEnabled?: boolean;
};

export function SiteHeader({ initials, galleryEnabled }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  let linksCopy = [...links];

  if (!galleryEnabled) {
    linksCopy = linksCopy.filter((link) => link.href !== "#gallery");
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white transition-shadow ${
        scrolled ? "border-stone-200/80 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="#accueil"
          className="font-display shrink-0 text-[1.35rem] tracking-[0.12em] text-copper sm:text-xl"
        >
          {initials}
        </Link>

        <nav
          className="hidden items-center gap-6 lg:gap-8 md:flex"
          aria-label="Principal"
        >
          {linksCopy.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[0.7rem] font-medium uppercase tracking-[0.22em] transition hover:text-copper ${
                link.accent ? "text-copper" : "text-stone-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-stone-700"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-stone-100 bg-white px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-xs font-medium uppercase tracking-[0.22em] ${
                    link.accent ? "text-copper" : "text-stone-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
