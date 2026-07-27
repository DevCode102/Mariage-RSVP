import { EventsShowcase } from "@/components/EventsShowcase";
import { GiftsSection } from "@/components/GiftsSection";
import { HeroBanner } from "@/components/HeroBanner";
import { PlaylistSection } from "@/components/PlaylistSection";
import { ProgrammeSection } from "@/components/ProgrammeSection";
import { RsvpSection } from "@/components/RsvpSection";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeSection } from "@/components/ThemeSection";
import { resolveMediaUrl } from "@/lib/media";
import { getSiteContent } from "@/lib/site-content-db";
import { extractSoundCloudEmbed } from "@/lib/soundcloud";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader initials={content.initials} />
      <HeroBanner
        partner1={content.partner1}
        partner2={content.partner2}
        eyebrow={content.heroEyebrow}
        tagline={content.heroTagline}
        nameSize={content.heroNameSize}
        imageFit={content.heroImageFit}
        slides={content.heroSlides}
        earlyCtaEnabled={content.earlyCtaEnabled}
        earlyCtaText={content.earlyCtaText}
        earlyCtaButton={content.earlyCtaButton}
      />

      <EventsShowcase
        eventTop={content.highlightEventTop}
        eventBottom={content.highlightEventBottom}
        photos={content.highlightPhotos}
      />

      <ProgrammeSection
        title={content.programmeTitle}
        events={content.events}
      />

      <ThemeSection
        title={content.themeTitle}
        colors={content.themeColors}
        styleAdvisorEnabled={content.styleAdvisorEnabled}
        styleAdvisorTitle={content.styleAdvisorTitle}
        partner1={content.partner1}
        partner2={content.partner2}
        pagneCardEnabled={content.pagneCardEnabled}
        pagneTitle={content.pagneTitle}
        pagneText={content.pagneText}
        logementCardEnabled={content.logementCardEnabled}
        logementTitle={content.logementTitle}
        logementText={content.logementText}
        logementNote={content.logementNote}
      />

      {content.galleryEnabled ? (
        <section className="bg-ember px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-orange-200">
              {content.galleryEyebrow}
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold text-white sm:text-5xl">
              {content.galleryTitle}
            </h2>
            <p className="mt-4 max-w-xl text-orange-100/85">
              {content.galleryIntro}
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {content.galleryItems.map((item, index) => (
                <figure key={`${item.src}-${index}`} className="group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveMediaUrl(item.src)}
                    alt={item.alt}
                    className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                  <figcaption className="mt-3 text-sm tracking-wide text-orange-100/80">
                    {item.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <RsvpSection
        title={content.rsvpPageTitle}
        notice={content.rsvpNotice}
        partner1={content.partner1}
        partner2={content.partner2}
        events={content.events}
        collectEmail={content.rsvpCollectEmail}
        collectPhone={content.rsvpCollectPhone}
        pagneEnabled={content.rsvpPagneEnabled}
        pagneLabel={content.rsvpPagneLabel}
        pagneOptions={content.rsvpPagneOptions}
        lodgingFields={content.rsvpLodgingFields}
        messageEnabled={content.rsvpMessageEnabled}
        wishesAssistantEnabled={content.rsvpWishesAssistantEnabled}
        yesLabel={content.rsvpYesLabel}
        noLabel={content.rsvpNoLabel}
      />

      {content.giftsEnabled ? (
        <GiftsSection
          title={content.giftsTitle}
          intro={content.giftsIntro}
          cagnotteText={content.giftsCagnotteText}
          linkLabel={content.giftsLinkLabel}
          linkUrl={content.giftsLinkUrl}
          addressEnabled={content.giftsAddressEnabled}
          addressTitle={content.giftsAddressTitle}
          addressIntro={content.giftsAddressIntro}
          addressLine1={content.giftsAddressLine1}
          addressLine2={content.giftsAddressLine2}
          addressNote={content.giftsAddressNote}
        />
      ) : null}

      {content.playlistEnabled &&
      extractSoundCloudEmbed(content.playlistEmbedCode) ? (
        <PlaylistSection embedCode={content.playlistEmbedCode} />
      ) : null}

      <footer className="bg-ink px-6 py-10 text-center sm:px-10">
        <p className="font-display text-2xl text-orange-glow">
          {content.partner1} &amp; {content.partner2}
        </p>
        <p className="mt-2 text-sm text-stone-400">{content.footerLine}</p>
      </footer>
    </main>
  );
}
