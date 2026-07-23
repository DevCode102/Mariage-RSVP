"use client";

import { useRef, useState } from "react";
import { resolveMediaUrl } from "@/lib/media";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUploadField({ value, onChange, label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFileChange(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Upload impossible.");
      }
      onChange(payload.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload impossible.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="block text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
        {label}
      </span>

      <div className="mt-1.5 flex flex-col gap-3 sm:flex-row sm:items-start">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolveMediaUrl(value)}
            alt=""
            className="h-20 w-28 shrink-0 object-cover border border-stone-200 bg-stone-100"
          />
        ) : (
          <div className="flex h-20 w-28 shrink-0 items-center justify-center border border-dashed border-stone-300 text-[10px] uppercase tracking-wider text-stone-400">
            Aperçu
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://… ou chemin local"
            className="w-full border border-stone-200 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-orange-bright"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="border border-orange-bright/40 bg-orange-50 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-orange-deep transition hover:bg-orange-100 disabled:opacity-60"
            >
              {uploading ? "Upload…" : "Uploader (Blob)"}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              className="hidden"
              onChange={(e) => onFileChange(e.target.files?.[0])}
            />
            {error && (
              <p className="text-xs text-red-700" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
