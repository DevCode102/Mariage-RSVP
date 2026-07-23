"use client";

import { useEffect, useState } from "react";
import type { HeroSlide, SiteContentData } from "@/lib/site-content";
import { resolveMediaUrl } from "@/lib/media";

const nameSizeClasses: Record<
  SiteContentData["heroNameSize"],
  { name: string; amp: string }
> = {
  sm: {
    name: "text-4xl leading-[0.95] sm:text-5xl md:text-6xl",
    amp: "text-3xl sm:text-4xl md:text-5xl",
  },
  md: {
    name: "text-[2.75rem] leading-[0.95] sm:text-6xl md:text-7xl",
    amp: "text-[2rem] sm:text-4xl md:text-5xl",
  },
  lg: {
    name: "text-[3.4rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl",
    amp: "text-[2.4rem] sm:text-5xl md:text-6xl",
  },
  xl: {
    name: "text-5xl leading-[0.95] sm:text-7xl md:text-8xl lg:text-9xl",
    amp: "text-4xl sm:text-6xl md:text-7xl",
  },
};

type Props = {
  partner1: string;
  partner2: string;
  eyebrow: string;
  tagline: string;
  nameSize: SiteContentData["heroNameSize"];
  slides: HeroSlide[];
};

export function HeroBanner({
  partner1,
  partner2,
  eyebrow,
  tagline,
  nameSize,
  slides,
}: Props) {
  const [index, setIndex] = useState(0);
  const safeSlides = slides.length > 0 ? slides : [{ src: "/images/couple-1.svg", alt: "" }];
  const sizes = nameSizeClasses[nameSize] ?? nameSizeClasses.lg;

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % safeSlides.length);
    }, 5500);
    return () => clearInterval(id);
  }, [safeSlides.length]);

  return (
    <section
      id="accueil"
      className="relative flex min-h-[calc(100svh-4.25rem)] items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0" aria-hidden>
        {safeSlides.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveMediaUrl(slide.src)}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center sm:px-8">
        <p className="animate-fade-up text-[0.68rem] font-medium uppercase tracking-[0.42em] text-white/95 sm:text-xs">
          {eyebrow}
        </p>

        <h1 className="animate-fade-up-delay !mt-8 text-white">
          <span
            className={`font-display block font-medium tracking-[-0.02em] ${sizes.name}`}
          >
            {partner1}
          </span>
          <span className="mt-1 flex items-baseline justify-center gap-2 sm:mt-2 sm:gap-3 md:gap-4">
            <span
              className={`font-script leading-none text-[#E8B4A0] ${sizes.amp}`}
              aria-hidden
            >
              &amp;
            </span>
            <span
              className={`font-display font-medium tracking-[-0.02em] ${sizes.name}`}
            >
              {partner2}
            </span>
          </span>
          <span className="sr-only">
            {partner1} et {partner2}
          </span>
        </h1>

        <p className="animate-fade-up-delay-2 mx-auto mt-7 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
          {tagline}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {safeSlides.map((slide, i) => (
          <button
            key={`${slide.src}-dot-${i}`}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-7 bg-white" : "w-1.5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
