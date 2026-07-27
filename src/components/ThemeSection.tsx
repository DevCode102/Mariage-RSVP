import { StyleAdvisor } from "@/components/StyleAdvisor";
import type { ThemeColor } from "@/lib/site-content";

type Props = {
  title: string;
  colors: ThemeColor[];
  styleAdvisorEnabled: boolean;
  styleAdvisorTitle: string;
  partner1: string;
  partner2: string;
  pagneCardEnabled: boolean;
  pagneTitle: string;
  pagneText: string;
  logementCardEnabled: boolean;
  logementTitle: string;
  logementText: string;
  logementNote: string;
};

function ScissorsIcon() {
  return (
    <svg className="mx-auto h-8 w-8 text-[#CB6B53]" viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="34" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18.5 17.5 L40 38 M18.5 30.5 L40 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BedIcon() {
  return (
    <svg className="mx-auto h-8 w-8 text-[#CB6B53]" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path d="M8 28 V18 a4 4 0 0 1 4-4 h8 a6 6 0 0 1 6 6 v8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 28 h32 v6 H8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 34 v4 M40 28 v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#CB6B53]" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 10v6M12 7.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ThemeSection({
  title,
  colors,
  styleAdvisorEnabled,
  styleAdvisorTitle,
  partner1,
  partner2,
  pagneCardEnabled,
  pagneTitle,
  pagneText,
  logementCardEnabled,
  logementTitle,
  logementText,
  logementNote,
}: Props) {
  const showCards = pagneCardEnabled || logementCardEnabled;
  const bothCards = pagneCardEnabled && logementCardEnabled;

  return (
    <section
      id="theme"
      className="scroll-mt-20 bg-[#FFF7F4] px-6 py-20 sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-center text-3xl italic text-[#5D2B1D] sm:text-4xl md:text-[2.6rem]">
          {title}
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
          {colors.map((color) => (
            <div key={`${color.name}-${color.hex}`} className="text-center">
              <div
                className="mx-auto h-[4.5rem] w-[4.5rem] rounded-full shadow-sm ring-1 ring-black/5 sm:h-20 sm:w-20"
                style={{ backgroundColor: color.hex }}
              />
              <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-stone-400">
                {color.name}
              </p>
              <p className="mt-1 text-[0.7rem] tracking-wide text-stone-400">
                {color.hex}
              </p>
            </div>
          ))}
        </div>

        {styleAdvisorEnabled ? (
          <StyleAdvisor
            title={styleAdvisorTitle}
            themeColors={colors}
            partner1={partner1}
            partner2={partner2}
          />
        ) : null}

        {showCards ? (
          <div
            className={`mt-10 grid gap-5 ${bothCards ? "sm:grid-cols-2" : "mx-auto max-w-xl"}`}
          >
            {pagneCardEnabled ? (
              <article className="bg-white px-6 py-8 text-center shadow-[0_8px_28px_rgba(93,43,29,0.07)]">
                <ScissorsIcon />
                <h3 className="font-display mt-4 text-xl italic text-[#CB6B53]">
                  {pagneTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {pagneText}
                </p>
              </article>
            ) : null}

            {logementCardEnabled ? (
              <article className="bg-white px-6 py-8 text-center shadow-[0_8px_28px_rgba(93,43,29,0.07)]">
                <BedIcon />
                <h3 className="font-display mt-4 text-xl italic text-[#CB6B53]">
                  {logementTitle}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  {logementText}
                </p>
                {logementNote ? (
                  <p className="mt-4 flex items-start justify-center gap-2 text-left text-xs leading-relaxed text-stone-400 italic">
                    <InfoIcon />
                    <span>{logementNote}</span>
                  </p>
                ) : null}
              </article>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
