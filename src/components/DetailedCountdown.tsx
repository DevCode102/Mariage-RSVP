"use client";

import { useEffect, useState } from "react";

type Parts = {
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const UNITS: { key: keyof Parts; label: string }[] = [
  { key: "months", label: "Mois" },
  { key: "weeks", label: "Sem" },
  { key: "days", label: "Jrs" },
  { key: "hours", label: "H" },
  { key: "minutes", label: "M" },
  { key: "seconds", label: "S" },
];

function getParts(now: Date, target: Date): Parts {
  const totalMs = target.getTime() - now.getTime();
  if (totalMs <= 0) {
    return { months: 0, weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let cursor = new Date(now);
  let months = 0;
  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next > target) break;
    cursor = next;
    months += 1;
  }

  let remaining = target.getTime() - cursor.getTime();
  const weeks = Math.floor(remaining / (1000 * 60 * 60 * 24 * 7));
  remaining -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  remaining -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  remaining -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(remaining / (1000 * 60));
  remaining -= minutes * 1000 * 60;
  const seconds = Math.floor(remaining / 1000);

  return { months, weeks, days, hours, minutes, seconds };
}

type Props = {
  targetDate: string;
  variant?: "light" | "dark";
};

export function DetailedCountdown({ targetDate, variant = "light" }: Props) {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = new Date(targetDate);
    const tick = () => setParts(getParts(new Date(), target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const numberClass =
    variant === "dark"
      ? "text-white"
      : "text-stone-800";
  const labelClass =
    variant === "dark"
      ? "text-white/55"
      : "text-stone-400";

  return (
    <div
      className="mx-auto grid max-w-md grid-cols-6 gap-1 sm:gap-3"
      role="timer"
      aria-live="polite"
    >
      {UNITS.map(({ key, label }) => (
        <div key={key} className="text-center">
          <div
            className={`font-sans text-xl font-light tabular-nums sm:text-2xl md:text-[1.65rem] ${numberClass}`}
          >
            {parts ? parts[key] : "–"}
          </div>
          <div
            className={`mt-1 text-[0.55rem] font-medium uppercase tracking-[0.14em] sm:text-[0.62rem] ${labelClass}`}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
