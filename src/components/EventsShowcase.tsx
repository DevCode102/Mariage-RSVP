import { DetailedCountdown } from "@/components/DetailedCountdown";
import { resolveMediaUrl } from "@/lib/media";
import type { HighlightPhoto, HighlightEvent } from "@/lib/site-content";

type Props = {
  eventTop: HighlightEvent;
  eventBottom: HighlightEvent;
  photos: HighlightPhoto[];
};

function EventBlock({ event }: { event: HighlightEvent }) {
  return (
    <div className="mx-auto max-w-xl px-4 text-center">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-stone-500">
        {event.title}
      </p>
      <p className="font-script mt-3 text-3xl text-copper sm:text-4xl md:text-[2.75rem]">
        {event.dateLabel}
      </p>
      <div className="mt-6">
        <DetailedCountdown targetDate={event.targetDate} />
      </div>
    </div>
  );
}

export function EventsShowcase({ eventTop, eventBottom, photos }: Props) {
  const safePhotos =
    photos.length > 0
      ? photos.slice(0, 3)
      : [
          { src: "/images/couple-1.svg", alt: "Photo 1" },
          { src: "/images/couple-2.svg", alt: "Photo 2" },
          { src: "/images/ouest-cameroun.svg", alt: "Photo 3" },
        ];

  while (safePhotos.length < 3) {
    safePhotos.push(safePhotos[safePhotos.length - 1]);
  }

  return (
    <section id="moments" className="bg-[#FCFAF8] px-4 py-16 sm:px-8 sm:py-24">
      <EventBlock event={eventTop} />

      <div className="mx-auto mt-14 flex max-w-5xl flex-col items-center gap-4 sm:mt-16 sm:flex-row sm:items-end sm:justify-center sm:gap-5">
        {safePhotos.map((photo, index) => {
          const isCenter = index === 1;
          return (
            <figure
              key={`${photo.src}-${index}`}
              className={`overflow-hidden ${
                isCenter
                  ? "w-full max-w-sm sm:w-[38%] sm:max-w-none sm:pb-0"
                  : "w-full max-w-xs sm:w-[28%] sm:max-w-none sm:pb-6"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resolveMediaUrl(photo.src)}
                alt={photo.alt}
                className={`w-full object-cover ${
                  isCenter ? "aspect-[3/4.15]" : "aspect-[3/4]"
                }`}
              />
            </figure>
          );
        })}
      </div>

      <div className="mt-14 sm:mt-16">
        <EventBlock event={eventBottom} />
      </div>
    </section>
  );
}
