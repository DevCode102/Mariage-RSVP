/**
 * Extrait une URL iframe SoundCloud depuis un code embed collé
 * (iframe HTML ou URL w.soundcloud.com / api.soundcloud.com).
 */
export function extractSoundCloudEmbed(embedCode: string): {
  src: string;
  height: number;
} | null {
  const trimmed = embedCode.trim();
  if (!trimmed) return null;

  let src = trimmed;
  let height = 300;

  const srcMatch = trimmed.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
  if (srcMatch) {
    src = srcMatch[1];
  }

  const heightMatch = trimmed.match(/\bheight\s*=\s*["']?(\d+)/i);
  if (heightMatch) {
    height = Math.min(Math.max(Number(heightMatch[1]) || 300, 166), 900);
  }

  try {
    const url = new URL(src);
    const host = url.hostname.toLowerCase();
    const allowed =
      host === "w.soundcloud.com" ||
      host === "soundcloud.com" ||
      host === "api.soundcloud.com" ||
      host.endsWith(".soundcloud.com");
    if (!allowed || url.protocol !== "https:") return null;

    // Player classique (liste + contrôles), autoplay, sans overlay "Explore more"
    url.searchParams.set("auto_play", "true");
    url.searchParams.set("hide_related", "true");
    url.searchParams.set("show_teaser", "false");
    url.searchParams.set("visual", "false");
    url.searchParams.set("show_comments", "true");
    url.searchParams.set("show_user", "true");
    url.searchParams.set("show_reposts", "false");
    if (!url.searchParams.get("color")) {
      url.searchParams.set("color", "#ff5500");
    }

    // Liste de pistes plus lisible que le mode visual
    if (height < 350) height = 400;

    return { src: url.toString(), height };
  } catch {
    return null;
  }
}
