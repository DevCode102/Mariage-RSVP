"use client";

import { useState, useEffect, useCallback } from "react";
import { resolveMediaUrl } from "@/lib/media";

interface GalleryItem {
  src: string;
  alt: string;
  label: string;
}

interface GalleryProps {
  eyebrow: string;
  title: string;
  intro: string;
  items: GalleryItem[];
}

export function Gallery({ eyebrow, title, intro, items }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  const open = useCallback((index: number) => setSelectedIndex(index), []);
  const close = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % items.length : null,
    );
  }, [items.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + items.length) % items.length : null,
    );
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, close, goNext, goPrev]);

  return (
    <section id="gallery" className="bg-ember px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-200">
          {eyebrow}
        </p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-white sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-orange-100/85">{intro}</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {items.slice(0, 3).map((item, index) => (
            <figure key={`${item.src}-${index}`} className="group">
              <button
                type="button"
                onClick={() => open(index)}
                className="w-full cursor-pointer overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveMediaUrl(item.src)}
                  alt={item.alt}
                  className="aspect-3/4 w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </button>
              <figcaption className="mt-3 text-sm tracking-wide text-orange-100/80">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>

        {items.length > 3 && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => open(0)}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200/40 px-8 py-3 text-sm font-medium uppercase tracking-[0.15em] text-orange-200 transition hover:bg-orange-200/10 hover:text-white"
            >
              Voir plus de photos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveMediaUrl(selectedItem.src)}
            alt={selectedItem.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
          />

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
            {selectedItem.label}
          </div>
        </div>
      )}
    </section>
  );
}
