/**
 * Normalize stored image refs so private Blob files go through /api/media.
 */
export function resolveMediaUrl(src: string): string {
  if (!src) return src;
  if (src.startsWith("/api/media") || src.startsWith("/images/")) return src;
  if (src.startsWith("data:")) return src;

  try {
    if (src.includes("blob.vercel-storage.com")) {
      const url = new URL(src);
      const pathname = decodeURIComponent(url.pathname.replace(/^\//, ""));
      return `/api/media?pathname=${encodeURIComponent(pathname)}`;
    }
  } catch {
    // keep original
  }

  return src;
}
