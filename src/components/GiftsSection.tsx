type Props = {
  title: string;
  intro: string;
  cagnotteText: string;
  linkLabel: string;
  linkUrl: string;
  addressEnabled: boolean;
  addressTitle: string;
  addressIntro: string;
  addressLine1: string;
  addressLine2: string;
  addressNote: string;
};

function GiftIcon() {
  return (
    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#CB6B53] text-white">
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 10h16v10H4V10z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M3 10h18V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 6v14M8.5 6c0-1.5 1-2.5 2.5-2.5S12 5 12 6c0-1 1-2.5 2.5-2.5S17 4.5 17 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function GiftsSection({
  title,
  intro,
  cagnotteText,
  linkLabel,
  linkUrl,
  addressEnabled,
  addressTitle,
  addressIntro,
  addressLine1,
  addressLine2,
  addressNote,
}: Props) {
  const hasLink = Boolean(linkUrl.trim() && linkLabel.trim());

  return (
    <section
      id="cadeaux"
      className="scroll-mt-20 bg-[#FFF7F4] px-6 py-20 sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <GiftIcon />

        <h2 className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-stone-700 sm:text-[0.95rem] sm:tracking-[0.28em]">
          {title}
        </h2>

        {intro ? (
          <p className="mt-8 text-sm leading-relaxed text-stone-600 sm:text-[0.95rem]">
            {intro}
          </p>
        ) : null}

        {cagnotteText ? (
          <p className="mt-6 text-sm leading-relaxed text-stone-600 sm:text-[0.95rem]">
            {cagnotteText}
          </p>
        ) : null}

        {hasLink ? (
          <p className="mt-5">
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#CB6B53] underline-offset-4 transition hover:underline"
            >
              {linkLabel}
            </a>
          </p>
        ) : null}

        {addressEnabled ? (
          <div className="mt-10 bg-white px-6 py-8 text-center shadow-[0_8px_28px_rgba(93,43,29,0.06)] sm:px-10">
            {addressTitle ? (
              <p className="text-sm italic text-stone-600">{addressTitle}</p>
            ) : null}
            {addressIntro ? (
              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                {addressIntro}
              </p>
            ) : null}
            {(addressLine1 || addressLine2) && (
              <p className="mt-5 text-sm font-semibold leading-relaxed text-ink">
                {addressLine1 ? <span className="block">{addressLine1}</span> : null}
                {addressLine2 ? <span className="block">{addressLine2}</span> : null}
              </p>
            )}
            {addressNote ? (
              <p className="mt-4 text-xs text-stone-400">{addressNote}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
