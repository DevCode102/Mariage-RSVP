"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  months: number;
  days: number;
  hours: number;
  minutes: number;
};

function getTimeLeft(now: Date, weddingDate: Date): TimeLeft {
  const totalMs = weddingDate.getTime() - now.getTime();

  if (totalMs <= 0) {
    return { months: 0, days: 0, hours: 0, minutes: 0 };
  }

  let cursor = new Date(now);
  let months = 0;

  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);
    if (next > weddingDate) break;
    cursor = next;
    months += 1;
  }

  const remainingMs = weddingDate.getTime() - cursor.getTime();
  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);

  return { months, days, hours, minutes };
}

const labels: Record<keyof TimeLeft, string> = {
  months: "Mois",
  days: "Jours",
  hours: "Heures",
  minutes: "Minutes",
};

type Props = {
  weddingDate: string;
};

export function Countdown({ weddingDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const target = new Date(weddingDate);
    const tick = () => setTimeLeft(getTimeLeft(new Date(), target));
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, [weddingDate]);

  if (!timeLeft) {
    return (
      <div className="grid grid-cols-4 gap-3 sm:gap-5" aria-hidden>
        {(["Mois", "Jours", "Heures", "Minutes"] as const).map((label) => (
          <div key={label} className="text-center">
            <div className="font-display text-3xl font-semibold text-white sm:text-5xl">
              --
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">
              {label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5" role="timer" aria-live="polite">
      {(Object.keys(labels) as (keyof TimeLeft)[]).map((key, index) => (
        <div
          key={key}
          className="animate-count-in text-center"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="font-display text-3xl font-semibold tabular-nums text-white sm:text-5xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">
            {labels[key]}
          </div>
        </div>
      ))}
    </div>
  );
}
