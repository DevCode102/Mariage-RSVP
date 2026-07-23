import { ProgrammeIconSvg } from "@/components/ProgrammeIconSvg";
import type { ProgrammeEvent } from "@/lib/site-content";

type Props = {
  title: string;
  events: ProgrammeEvent[];
};

export function ProgrammeSection({ title, events }: Props) {
  return (
    <section
      id="programme"
      className="scroll-mt-20 bg-white px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-[42rem]">
        <div className="text-center">
          <h2 className="font-display text-[1.85rem] font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-px w-14 bg-[#C4785A]" />
        </div>

        <ul className="mt-16 space-y-14 sm:mt-20 sm:space-y-16">
          {events.map((event, index) => (
            <li
              key={`${event.title}-${index}`}
              className="grid grid-cols-1 gap-5 sm:grid-cols-[8.75rem_minmax(0,1fr)] sm:gap-0"
            >
              {/* Left: date + icon */}
              <div className="flex items-start gap-4 sm:block sm:border-r sm:border-stone-200 sm:pr-8">
                <div className="min-w-[5.5rem] text-center sm:w-full">
                  <p className="font-display text-[2.75rem] leading-none font-light text-[#E8C4B4] sm:text-[3.25rem]">
                    {event.dateDay}
                  </p>
                  <p className="mt-2 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-[#C4785A]">
                    {event.dateMonthYear}
                  </p>
                  <div className="mt-4 flex justify-center text-[#C4785A]">
                    <ProgrammeIconSvg icon={event.icon} className="h-8 w-8" />
                  </div>
                </div>
              </div>

              {/* Right: details */}
              <div className="sm:pl-10">
                <h3 className="font-display text-[1.35rem] leading-snug font-semibold text-ink sm:text-[1.65rem]">
                  {event.title}
                </h3>

                {event.description ? (
                  <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-stone-400 italic">
                    {event.description}
                  </p>
                ) : null}

                {event.schedule?.length > 0 ? (
                  <ul className="mt-5 space-y-2.5">
                    {event.schedule.map((item, i) => (
                      <li
                        key={`${item.time}-${item.label}-${i}`}
                        className="text-[0.92rem] leading-relaxed text-stone-600"
                      >
                        {item.time ? (
                          <span className="font-semibold text-[#C4785A]">
                            {item.time}
                            {item.label ? " : " : ""}
                          </span>
                        ) : null}
                        {item.label ? <span>{item.label}</span> : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
