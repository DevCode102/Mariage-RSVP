"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

type Bubble = {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

type Props = {
  enabled: boolean;
  emojis: string[];
};

function buildBubbles(emojis: string[]): Bubble[] {
  const pool = emojis.length > 0 ? emojis : ["❤️"];
  return Array.from({ length: 8 }, (_, id) => ({
    id,
    emoji: pool[id % pool.length],
    left: 8 + ((id * 41) % 84),
    size: 16 + (id % 3) * 3,
    duration: 14 + (id % 5) * 2.2,
    delay: -((id * 2.8) % 16),
    drift: -28 + ((id * 19) % 56),
    opacity: 0.28 + (id % 3) * 0.08,
  }));
}

export function EmojiBubbles({ enabled, emojis }: Props) {
  const pathname = usePathname();
  const reactId = useId().replace(/:/g, "");
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const emojiKey = (emojis ?? []).join("|");
  const bubbles = useMemo(() => {
    const list = emojiKey
      ? emojiKey
          .split("|")
          .map((e) => e.trim())
          .filter(Boolean)
      : [];
    return buildBubbles(list.length > 0 ? list : ["❤️"]);
  }, [emojiKey]);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  if (!enabled || pathname.startsWith("/admin") || !portalTarget) {
    return null;
  }

  const scope = `emoji-bubbles-${reactId}`;

  return createPortal(
    <>
      <style>{`
        .${scope} {
          position: fixed !important;
          inset: 0 !important;
          z-index: 9990 !important;
          overflow: hidden !important;
          pointer-events: none !important;
        }
        .${scope} .bubble-motion {
          position: absolute;
          bottom: -2.5rem;
          line-height: 1;
          user-select: none;
          will-change: transform;
          animation-name: ${scope}-rise;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes ${scope}-rise {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(var(--drift), calc(-100vh - 4rem), 0);
          }
        }
      `}</style>
      <div className={scope} aria-hidden="true" data-emoji-bubbles="true">
        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="bubble-motion"
            style={{
              left: `${bubble.left}%`,
              fontSize: `${bubble.size}px`,
              opacity: bubble.opacity,
              animationDuration: `${bubble.duration}s`,
              animationDelay: `${bubble.delay}s`,
              ["--drift" as string]: `${bubble.drift}px`,
            }}
          >
            {bubble.emoji}
          </span>
        ))}
      </div>
    </>,
    portalTarget,
  );
}
