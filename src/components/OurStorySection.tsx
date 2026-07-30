import type { StoryTimelineEntry } from "@/lib/site-content";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  timeline: StoryTimelineEntry[];
};

export function OurStorySection({ eyebrow, title, intro, timeline }: Props) {
  return (
    <section id="histoire" className="section-texture scroll-mt-20 px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-3xl rounded-4xl border border-white/70 bg-white/75 px-6 py-10 shadow-[0_14px_40px_rgba(93,43,29,0.08)] backdrop-blur-sm sm:px-10 sm:py-12">
          <p className="text-center text-[0.68rem] font-medium uppercase tracking-[0.42em] text-[#CB6B53]">
            {eyebrow}
          </p>

          <h2 className="font-display mt-4 text-center text-3xl font-semibold tracking-[-0.02em] text-[#5D2B1D] sm:text-4xl">
            {title}
          </h2>

          {intro ? (
            <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-7 text-stone-500 sm:text-base">
              {intro}
            </p>
          ) : null}

          <div className="mx-auto mt-10 max-w-2xl space-y-6">
            {timeline.map((item, index) => (
              <article key={`${item.dateLabel}-${index}`} className="relative pl-8 sm:pl-10">
                <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-[3px] border-white bg-[#CB6B53] shadow-sm" aria-hidden />
                {index < timeline.length - 1 ? (
                  <span className="absolute left-[0.44rem] top-5 bottom-[-1.5rem] w-px bg-[#CB6B53]/25" aria-hidden />
                ) : null}
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#9E4244]">
                  {item.dateLabel}
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold text-[#5D2B1D] sm:text-[1.35rem]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-600 sm:text-[1rem]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}