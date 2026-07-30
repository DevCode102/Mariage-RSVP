import { EventsShowcase } from "@/components/EventsShowcase";
import { Gallery } from "@/components/Gallery";
import { GiftsSection } from "@/components/GiftsSection";
import { HeroBanner } from "@/components/HeroBanner";
import { PlaylistSection } from "@/components/PlaylistSection";
import { ProgrammeSection } from "@/components/ProgrammeSection";
import { OurStorySection } from "@/components/OurStorySection";
import { RsvpSection } from "@/components/RsvpSection";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeSection } from "@/components/ThemeSection";
import { getSiteContent } from "@/lib/site-content-db";
import { extractSoundCloudEmbed } from "@/lib/soundcloud";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader initials={content.initials} galleryEnabled={content.galleryEnabled} />
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

      <OurStorySection
        eyebrow={content.storyEyebrow}
        title={content.storyTitle}
        intro={content.storyIntro}
        timeline={content.storyTimeline}
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
        <Gallery
          eyebrow={content.galleryEyebrow}
          title={content.galleryTitle}
          intro={content.galleryIntro}
          items={content.galleryItems}
        />
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
