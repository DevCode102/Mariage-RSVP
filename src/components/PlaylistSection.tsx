"use client";

import { useEffect, useRef } from "react";
import { extractSoundCloudEmbed } from "@/lib/soundcloud";

type Props = {
  embedCode: string;
  /** Scroll automatique vers la playlist au chargement */
  autoScroll?: boolean;
};

export function PlaylistSection({ embedCode, autoScroll = true }: Props) {
  const embed = extractSoundCloudEmbed(embedCode);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!autoScroll || !embed) return;

    const scroll = () => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Attendre le layout (images / sections au-dessus)
    const t1 = window.setTimeout(scroll, 350);
    const t2 = window.setTimeout(scroll, 900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [autoScroll, embed]);

  if (!embed) return null;

  return (
    <section
      ref={sectionRef}
      id="playlist"
      className="scroll-mt-20 bg-[#F7F5F3] px-4 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-sm bg-white shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
        <iframe
          title="Playlist SoundCloud"
          width="100%"
          height={embed.height}
          scrolling="no"
          frameBorder="no"
          allow="autoplay; encrypted-media"
          src={embed.src}
          className="block w-full"
        />
      </div>
    </section>
  );
}
