import { extractSoundCloudEmbed } from "@/lib/soundcloud";

type Props = {
  embedCode: string;
};

export function PlaylistSection({ embedCode }: Props) {
  const embed = extractSoundCloudEmbed(embedCode);
  if (!embed) return null;

  return (
    <section
      id="playlist"
      className="scroll-mt-20 bg-[#F7F5F3] px-4 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-4xl overflow-hidden rounded-sm bg-white shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
        <iframe
          title="Playlist SoundCloud"
          width="100%"
          height={embed.height}
          scrolling="no"
          frameBorder="no"
          allow="autoplay; encrypted-media"
          src={embed.src}
          className="block w-full"
        />
      </div>
    </section>
  );
}
