import { RsvpForm } from "@/components/RsvpForm";
import type { ProgrammeEvent, RsvpSelectOptionField } from "@/lib/site-content";

type Props = {
  title: string;
  notice: string;
  partner1: string;
  partner2: string;
  events: ProgrammeEvent[];
  collectEmail: boolean;
  collectPhone: boolean;
  pagneEnabled: boolean;
  pagneLabel: string;
  pagneOptions: string[];
  lodgingFields: RsvpSelectOptionField[];
  messageEnabled: boolean;
  wishesAssistantEnabled: boolean;
  yesLabel: string;
  noLabel: string;
};

export function RsvpSection({
  title,
  notice,
  partner1,
  partner2,
  events,
  collectEmail,
  collectPhone,
  pagneEnabled,
  pagneLabel,
  pagneOptions,
  lodgingFields,
  messageEnabled,
  wishesAssistantEnabled,
  yesLabel,
  noLabel,
}: Props) {
  return (
    <section
      id="rsvp"
      className="scroll-mt-20 bg-[#FFF7F4] px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-center text-4xl font-semibold italic text-ink sm:text-5xl">
          {title}
        </h2>

        <div className="mt-10 rounded-2xl bg-white px-5 py-8 shadow-[0_12px_40px_rgba(93,43,29,0.08)] sm:px-10 sm:py-12">
          <RsvpForm
            notice={notice}
            partner1={partner1}
            partner2={partner2}
            events={events}
            collectEmail={collectEmail}
            collectPhone={collectPhone}
            pagneEnabled={pagneEnabled}
            pagneLabel={pagneLabel}
            pagneOptions={pagneOptions}
            lodgingFields={lodgingFields}
            messageEnabled={messageEnabled}
            wishesAssistantEnabled={wishesAssistantEnabled}
            yesLabel={yesLabel}
            noLabel={noLabel}
            embedded
          />
        </div>
      </div>
    </section>
  );
}
