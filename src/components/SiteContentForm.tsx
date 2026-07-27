"use client";

import { FormEvent, useState } from "react";
import { ImageUploadField } from "@/components/ImageUploadField";
import {
  PROGRAMME_ICON_OPTIONS,
  ProgrammeIconSvg,
} from "@/components/ProgrammeIconSvg";
import type {
  GalleryItem,
  HighlightEvent,
  HighlightPhoto,
  HeroSlide,
  ProgrammeEvent,
  ProgrammeIcon,
  ProgrammeScheduleItem,
  RsvpSelectOptionField,
  SiteContentData,
  ThemeColor,
} from "@/lib/site-content";

type Props = {
  initial: SiteContentData;
};

const fieldClass =
  "mt-1.5 w-full border border-stone-200 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-orange-bright";
const labelClass = "block text-xs font-medium uppercase tracking-[0.14em] text-stone-500";
const sectionClass = "border border-stone-200/80 bg-white/70 p-5 sm:p-6";

export function SiteContentForm({ initial }: Props) {
  const [data, setData] = useState<SiteContentData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  function update<K extends keyof SiteContentData>(key: K, value: SiteContentData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setStatus("idle");
  }

  function updateEvent(
    index: number,
    key: keyof Omit<ProgrammeEvent, "schedule" | "place" | "detail">,
    value: string | boolean,
  ) {
    const events = data.events.map((event, i) =>
      i === index ? { ...event, [key]: value } : event,
    );
    update("events", events);
  }

  function updateEventSchedule(
    eventIndex: number,
    scheduleIndex: number,
    key: keyof ProgrammeScheduleItem,
    value: string,
  ) {
    const events = data.events.map((event, i) => {
      if (i !== eventIndex) return event;
      const schedule = (event.schedule ?? []).map((row, j) =>
        j === scheduleIndex ? { ...row, [key]: value } : row,
      );
      return { ...event, schedule };
    });
    update("events", events);
  }

  function updateSlide(index: number, key: keyof HeroSlide, value: string) {
    const heroSlides = data.heroSlides.map((slide, i) =>
      i === index ? { ...slide, [key]: value } : slide,
    );
    update("heroSlides", heroSlides);
  }

  function updateHighlightEvent(
    which: "highlightEventTop" | "highlightEventBottom",
    key: keyof HighlightEvent,
    value: string,
  ) {
    update(which, { ...data[which], [key]: value });
  }

  function updateHighlightPhoto(
    index: number,
    key: keyof HighlightPhoto,
    value: string,
  ) {
    const highlightPhotos = data.highlightPhotos.map((photo, i) =>
      i === index ? { ...photo, [key]: value } : photo,
    );
    update("highlightPhotos", highlightPhotos);
  }

  function updateColor(index: number, key: keyof ThemeColor, value: string) {
    const themeColors = data.themeColors.map((color, i) =>
      i === index ? { ...color, [key]: value } : color,
    );
    update("themeColors", themeColors);
  }

  function updateGallery(index: number, key: keyof GalleryItem, value: string) {
    const galleryItems = data.galleryItems.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    update("galleryItems", galleryItems);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setError("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Erreur lors de la sauvegarde.");
      }
      setData(payload.data);
      setStatus("saved");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erreur lors de la sauvegarde.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 pb-24">
      <section className={sectionClass}>
        <h2 className="font-display text-2xl font-semibold text-ink">Couple & date</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className={labelClass}>
            Prénom 1
            <input
              className={fieldClass}
              value={data.partner1}
              onChange={(e) => update("partner1", e.target.value)}
              required
            />
          </label>
          <label className={labelClass}>
            Prénom 2
            <input
              className={fieldClass}
              value={data.partner2}
              onChange={(e) => update("partner2", e.target.value)}
              required
            />
          </label>
          <label className={labelClass}>
            Initiales (header)
            <input
              className={fieldClass}
              value={data.initials}
              onChange={(e) => update("initials", e.target.value)}
              required
            />
          </label>
          <label className={`${labelClass} sm:col-span-3`}>
            Date / heure du compte à rebours
            <input
              type="datetime-local"
              className={fieldClass}
              value={toDatetimeLocal(data.weddingDate)}
              onChange={(e) =>
                update("weddingDate", fromDatetimeLocal(e.target.value))
              }
              required
            />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display text-2xl font-semibold text-ink">
          Animation bulles emoji
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Petites bulles flottantes sur tout le site public (désactivées dans
          l&apos;admin).
        </p>
        <div className="mt-5 grid gap-4">
          <label className="flex items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={data.bubbleEnabled}
              onChange={(e) => update("bubbleEnabled", e.target.checked)}
              className="accent-orange-bright size-4"
            />
            Activer l&apos;animation
          </label>
          <label className={labelClass}>
            Emojis (séparés par des virgules)
            <input
              className={fieldClass}
              value={data.bubbleEmojis.join(", ")}
              onChange={(e) =>
                update(
                  "bubbleEmojis",
                  e.target.value
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                )
              }
              placeholder="❤️, 🧡, 💕"
            />
          </label>
          <p className="text-xs text-stone-500">
            Aperçu :{" "}
            {(data.bubbleEmojis.length > 0 ? data.bubbleEmojis : ["❤️"]).join(
              " ",
            )}
          </p>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display text-2xl font-semibold text-ink">Hero / Bannière</h2>
        <div className="mt-5 grid gap-4">
          <label className={labelClass}>
            Sur-titre
            <input
              className={fieldClass}
              value={data.heroEyebrow}
              onChange={(e) => update("heroEyebrow", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Texte d&apos;annonce
            <textarea
              rows={3}
              className={fieldClass}
              value={data.heroTagline}
              onChange={(e) => update("heroTagline", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Taille des noms
            <select
              className={fieldClass}
              value={data.heroNameSize}
              onChange={(e) =>
                update(
                  "heroNameSize",
                  e.target.value as SiteContentData["heroNameSize"],
                )
              }
            >
              <option value="sm">Petite</option>
              <option value="md">Moyenne</option>
              <option value="lg">Grande</option>
              <option value="xl">Très grande</option>
            </select>
          </label>
          <label className={labelClass}>
            Affichage des images
            <select
              className={fieldClass}
              value={data.heroImageFit}
              onChange={(e) =>
                update(
                  "heroImageFit",
                  e.target.value as SiteContentData["heroImageFit"],
                )
              }
            >
              <option value="contain">Toute l&apos;image (sans crop)</option>
              <option value="cover">Plein écran (priorité visages en haut)</option>
            </select>
          </label>
        </div>

        <div className="mt-8 space-y-4 border-t border-stone-100 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">
                Bouton sous les noms
              </h3>
              <p className="mt-1 text-sm text-stone-500">
                CTA dans le carrousel, lien direct vers le formulaire (#rsvp).
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={data.earlyCtaEnabled}
              onClick={() => update("earlyCtaEnabled", !data.earlyCtaEnabled)}
              className={`inline-flex items-center gap-3 rounded-full border px-3 py-2 text-sm font-medium transition ${
                data.earlyCtaEnabled
                  ? "border-[#CB6B53]/40 bg-[#CB6B53]/10 text-[#9E4244]"
                  : "border-stone-200 bg-stone-50 text-stone-500"
              }`}
            >
              <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  data.earlyCtaEnabled ? "bg-[#CB6B53]" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    data.earlyCtaEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </span>
              {data.earlyCtaEnabled ? "Activé" : "Masqué"}
            </button>
          </div>
          {data.earlyCtaEnabled ? (
            <>
              <label className={labelClass}>
                Texte d&apos;invitation
                <textarea
                  rows={2}
                  className={fieldClass}
                  value={data.earlyCtaText}
                  onChange={(e) => update("earlyCtaText", e.target.value)}
                />
              </label>
              <label className={labelClass}>
                Libellé du bouton
                <input
                  className={fieldClass}
                  value={data.earlyCtaButton}
                  onChange={(e) => update("earlyCtaButton", e.target.value)}
                />
              </label>
            </>
          ) : null}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className={labelClass}>Slides du carrousel</p>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.14em] text-orange-deep"
              onClick={() =>
                update("heroSlides", [
                  ...data.heroSlides,
                  { src: "/images/couple-1.svg", alt: "Nouvelle image" },
                ])
              }
            >
              + Ajouter
            </button>
          </div>
          {data.heroSlides.map((slide, index) => (
            <div key={index} className="space-y-3 border border-stone-100 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-ink">Slide {index + 1}</p>
                <button
                  type="button"
                  className="text-xs text-stone-500 hover:text-red-700"
                  onClick={() =>
                    update(
                      "heroSlides",
                      data.heroSlides.filter((_, i) => i !== index),
                    )
                  }
                  disabled={data.heroSlides.length <= 1}
                >
                  Retirer
                </button>
              </div>
              <ImageUploadField
                label="Image"
                value={slide.src}
                onChange={(url) => updateSlide(index, "src", url)}
              />
              <label className={labelClass}>
                Texte alt
                <input
                  className={fieldClass}
                  value={slide.alt}
                  onChange={(e) => updateSlide(index, "alt", e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display text-2xl font-semibold text-ink">
          Moments (après le banner)
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Deux dates avec compte à rebours et trois photos au centre.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {(
            [
              ["highlightEventTop", "Événement du haut"],
              ["highlightEventBottom", "Événement du bas"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-3 border border-stone-100 p-3">
              <p className="text-sm font-medium text-ink">{label}</p>
              <label className={labelClass}>
                Titre
                <input
                  className={fieldClass}
                  value={data[key].title}
                  onChange={(e) =>
                    updateHighlightEvent(key, "title", e.target.value)
                  }
                />
              </label>
              <label className={labelClass}>
                Date affichée
                <input
                  className={fieldClass}
                  value={data[key].dateLabel}
                  onChange={(e) =>
                    updateHighlightEvent(key, "dateLabel", e.target.value)
                  }
                />
              </label>
              <label className={labelClass}>
                Date compte à rebours
                <input
                  type="datetime-local"
                  className={fieldClass}
                  value={toDatetimeLocal(data[key].targetDate)}
                  onChange={(e) =>
                    updateHighlightEvent(
                      key,
                      "targetDate",
                      fromDatetimeLocal(e.target.value),
                    )
                  }
                />
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className={labelClass}>Photos (3)</p>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.14em] text-orange-deep"
              onClick={() =>
                update("highlightPhotos", [
                  ...data.highlightPhotos,
                  { src: "/images/couple-1.svg", alt: "Photo" },
                ])
              }
            >
              + Ajouter
            </button>
          </div>
          {data.highlightPhotos.map((photo, index) => (
            <div key={index} className="space-y-3 border border-stone-100 p-3">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-ink">Photo {index + 1}</p>
                <button
                  type="button"
                  className="text-xs text-stone-500 hover:text-red-700"
                  onClick={() =>
                    update(
                      "highlightPhotos",
                      data.highlightPhotos.filter((_, i) => i !== index),
                    )
                  }
                  disabled={data.highlightPhotos.length <= 1}
                >
                  Retirer
                </button>
              </div>
              <ImageUploadField
                label="Image"
                value={photo.src}
                onChange={(url) => updateHighlightPhoto(index, "src", url)}
              />
              <label className={labelClass}>
                Texte alt
                <input
                  className={fieldClass}
                  value={photo.alt}
                  onChange={(e) =>
                    updateHighlightPhoto(index, "alt", e.target.value)
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display text-2xl font-semibold text-ink">Programme</h2>
        <div className="mt-5 grid gap-4">
          <label className={labelClass}>
            Titre de section
            <input
              className={fieldClass}
              value={data.programmeTitle}
              onChange={(e) => update("programmeTitle", e.target.value)}
            />
          </label>
        </div>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className={labelClass}>Événements</p>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.14em] text-orange-deep"
              onClick={() =>
                update("events", [
                  ...data.events,
                  {
                    id: `event-${Date.now()}`,
                    title: "Nouvel événement",
                    dateDay: "01",
                    dateMonthYear: "MOIS 2026",
                    icon: "rings" as ProgrammeIcon,
                    description: "",
                    schedule: [{ time: "10h00", label: "Détail" }],
                    includeInRsvp: true,
                    rsvpLabel: "",
                  },
                ])
              }
            >
              + Ajouter
            </button>
          </div>
          {data.events.map((item, index) => (
            <div key={index} className="space-y-3 border border-stone-100 p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink">Événement {index + 1}</p>
                <button
                  type="button"
                  className="text-xs text-stone-500 hover:text-red-700"
                  onClick={() =>
                    update(
                      "events",
                      data.events.filter((_, i) => i !== index),
                    )
                  }
                  disabled={data.events.length <= 1}
                >
                  Retirer
                </button>
              </div>
              <label className={labelClass}>
                Titre
                <input
                  className={fieldClass}
                  value={item.title}
                  onChange={(e) => updateEvent(index, "title", e.target.value)}
                />
              </label>
              <label className="flex items-center gap-3 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={item.includeInRsvp !== false}
                  onChange={(e) =>
                    updateEvent(index, "includeInRsvp", e.target.checked)
                  }
                  className="accent-orange-bright size-4"
                />
                Inclure dans le formulaire RSVP
              </label>
              {item.includeInRsvp !== false ? (
                <label className={labelClass}>
                  Libellé RSVP (optionnel)
                  <input
                    className={fieldClass}
                    value={item.rsvpLabel ?? ""}
                    placeholder="Ex. Mariage civil à Bafoussam (26 novembre)"
                    onChange={(e) =>
                      updateEvent(index, "rsvpLabel", e.target.value)
                    }
                  />
                </label>
              ) : null}
              <div className="grid gap-3 sm:grid-cols-3">
                <label className={labelClass}>
                  Jour
                  <input
                    className={fieldClass}
                    value={item.dateDay}
                    onChange={(e) => updateEvent(index, "dateDay", e.target.value)}
                  />
                </label>
                <label className={`${labelClass} sm:col-span-2`}>
                  Mois / année
                  <input
                    className={fieldClass}
                    value={item.dateMonthYear}
                    onChange={(e) =>
                      updateEvent(index, "dateMonthYear", e.target.value)
                    }
                  />
                </label>
              </div>
              <div>
                <p className={labelClass}>Icône SVG</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PROGRAMME_ICON_OPTIONS.map((option) => {
                    const selected = item.icon === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        title={option.label}
                        aria-label={option.label}
                        aria-pressed={selected}
                        onClick={() => updateEvent(index, "icon", option.value)}
                        className={`flex min-w-[4.5rem] flex-col items-center gap-1.5 border px-2.5 py-2 transition ${
                          selected
                            ? "border-orange-bright bg-orange-50 text-copper"
                            : "border-stone-200 bg-white text-stone-500 hover:border-copper/40 hover:text-copper"
                        }`}
                      >
                        <ProgrammeIconSvg
                          icon={option.value}
                          className="h-7 w-7"
                        />
                        <span className="text-[0.6rem] uppercase tracking-[0.12em]">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <label className={labelClass}>
                Description
                <textarea
                  rows={2}
                  className={fieldClass}
                  value={item.description}
                  onChange={(e) =>
                    updateEvent(index, "description", e.target.value)
                  }
                />
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className={labelClass}>Horaires</p>
                  <button
                    type="button"
                    className="text-xs uppercase tracking-[0.14em] text-orange-deep"
                    onClick={() => {
                      const events = data.events.map((event, i) =>
                        i === index
                          ? {
                              ...event,
                              schedule: [
                                ...(event.schedule ?? []),
                                { time: "10h00", label: "" },
                              ],
                            }
                          : event,
                      );
                      update("events", events);
                    }}
                  >
                    + Horaire
                  </button>
                </div>
                {(item.schedule ?? []).map((row, scheduleIndex) => (
                  <div
                    key={scheduleIndex}
                    className="grid gap-2 sm:grid-cols-[7rem_1fr_auto]"
                  >
                    <input
                      className={fieldClass}
                      placeholder="16h00"
                      value={row.time}
                      onChange={(e) =>
                        updateEventSchedule(
                          index,
                          scheduleIndex,
                          "time",
                          e.target.value,
                        )
                      }
                    />
                    <input
                      className={fieldClass}
                      placeholder="Cérémonie"
                      value={row.label}
                      onChange={(e) =>
                        updateEventSchedule(
                          index,
                          scheduleIndex,
                          "label",
                          e.target.value,
                        )
                      }
                    />
                    <button
                      type="button"
                      className="text-xs text-stone-500 hover:text-red-700"
                      onClick={() => {
                        const events = data.events.map((event, i) =>
                          i === index
                            ? {
                                ...event,
                                schedule: (event.schedule ?? []).filter(
                                  (_, j) => j !== scheduleIndex,
                                ),
                              }
                            : event,
                        );
                        update("events", events);
                      }}
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display text-2xl font-semibold text-ink">Thème</h2>
        <div className="mt-5 grid gap-4">
          <label className={labelClass}>
            Titre
            <input
              className={fieldClass}
              value={data.themeTitle}
              onChange={(e) => update("themeTitle", e.target.value)}
            />
          </label>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className={labelClass}>Couleurs</p>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.14em] text-orange-deep"
              onClick={() =>
                update("themeColors", [
                  ...data.themeColors,
                  { name: "Nouvelle couleur", hex: "#CB6B53" },
                ])
              }
            >
              + Ajouter
            </button>
          </div>
          {data.themeColors.map((color, index) => (
            <div
              key={index}
              className="grid gap-3 sm:grid-cols-[1fr_minmax(0,11rem)_auto]"
            >
              <label className={labelClass}>
                Nom
                <input
                  className={fieldClass}
                  value={color.name}
                  onChange={(e) => updateColor(index, "name", e.target.value)}
                />
              </label>
              <label className={labelClass}>
                Hex
                <div className="mt-1.5 flex items-center gap-2">
                  <input
                    type="color"
                    value={toColorInputValue(color.hex)}
                    onChange={(e) => updateColor(index, "hex", e.target.value)}
                    className="h-10 w-12 shrink-0 cursor-pointer border border-stone-200 bg-white p-1"
                    aria-label={`Couleur ${color.name || index + 1}`}
                  />
                  <input
                    className="w-full border border-stone-200 bg-white px-3 py-2 font-mono text-sm text-ink uppercase outline-none transition focus:border-orange-bright"
                    value={color.hex}
                    onChange={(e) => updateColor(index, "hex", e.target.value)}
                    placeholder="#CB6B53"
                  />
                </div>
              </label>
              <button
                type="button"
                className="self-end text-xs text-stone-500 hover:text-red-700"
                onClick={() =>
                  update(
                    "themeColors",
                    data.themeColors.filter((_, i) => i !== index),
                  )
                }
              >
                Retirer
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 border-t border-stone-100 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">
                Conseiller de Style AI
              </h3>
              <p className="mt-1 text-sm text-stone-500">
                Affiche ou masque le bloc Gemini sur la page Thème.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={data.styleAdvisorEnabled}
              onClick={() =>
                update("styleAdvisorEnabled", !data.styleAdvisorEnabled)
              }
              className={`inline-flex items-center gap-3 rounded-full border px-3 py-2 text-sm font-medium transition ${
                data.styleAdvisorEnabled
                  ? "border-[#CB6B53]/40 bg-[#CB6B53]/10 text-[#9E4244]"
                  : "border-stone-200 bg-stone-50 text-stone-500"
              }`}
            >
              <span
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  data.styleAdvisorEnabled ? "bg-[#CB6B53]" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                    data.styleAdvisorEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </span>
              {data.styleAdvisorEnabled ? "Activé" : "Désactivé"}
            </button>
          </div>
          {data.styleAdvisorEnabled ? (
            <label className={labelClass}>
              Titre du conseiller
              <input
                className={fieldClass}
                value={data.styleAdvisorTitle}
                onChange={(e) => update("styleAdvisorTitle", e.target.value)}
              />
            </label>
          ) : null}
        </div>

        <div className="mt-8 grid gap-4 border-t border-stone-100 pt-6 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-xl font-semibold text-ink">
                Carte Pagne
              </h3>
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={data.pagneCardEnabled}
                  onChange={(e) =>
                    update("pagneCardEnabled", e.target.checked)
                  }
                  className="accent-orange-bright size-4"
                />
                Afficher
              </label>
            </div>
            {data.pagneCardEnabled ? (
              <>
                <label className={labelClass}>
                  Titre
                  <input
                    className={fieldClass}
                    value={data.pagneTitle}
                    onChange={(e) => update("pagneTitle", e.target.value)}
                  />
                </label>
                <label className={labelClass}>
                  Texte
                  <textarea
                    rows={4}
                    className={fieldClass}
                    value={data.pagneText}
                    onChange={(e) => update("pagneText", e.target.value)}
                  />
                </label>
              </>
            ) : (
              <p className="text-sm text-stone-500">
                Masquée sur le site. Tu peux la réactiver ou remplacer le texte
                (dress code, infos pratiques, etc.).
              </p>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-display text-xl font-semibold text-ink">
                Carte Logement
              </h3>
              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={data.logementCardEnabled}
                  onChange={(e) =>
                    update("logementCardEnabled", e.target.checked)
                  }
                  className="accent-orange-bright size-4"
                />
                Afficher
              </label>
            </div>
            {data.logementCardEnabled ? (
              <>
                <label className={labelClass}>
                  Titre
                  <input
                    className={fieldClass}
                    value={data.logementTitle}
                    onChange={(e) => update("logementTitle", e.target.value)}
                  />
                </label>
                <label className={labelClass}>
                  Texte
                  <textarea
                    rows={3}
                    className={fieldClass}
                    value={data.logementText}
                    onChange={(e) => update("logementText", e.target.value)}
                  />
                </label>
                <label className={labelClass}>
                  Note info
                  <textarea
                    rows={2}
                    className={fieldClass}
                    value={data.logementNote}
                    onChange={(e) => update("logementNote", e.target.value)}
                  />
                </label>
              </>
            ) : (
              <p className="text-sm text-stone-500">
                Masquée sur le site.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Galerie (Souvenirs)
          </h2>
          <button
            type="button"
            role="switch"
            aria-checked={data.galleryEnabled}
            onClick={() => update("galleryEnabled", !data.galleryEnabled)}
            className={`inline-flex items-center gap-3 rounded-full border px-3 py-2 text-sm font-medium transition ${
              data.galleryEnabled
                ? "border-[#CB6B53]/40 bg-[#CB6B53]/10 text-[#9E4244]"
                : "border-stone-200 bg-stone-50 text-stone-500"
            }`}
          >
            <span
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                data.galleryEnabled ? "bg-[#CB6B53]" : "bg-stone-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  data.galleryEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </span>
            {data.galleryEnabled ? "Section activée" : "Section masquée"}
          </button>
        </div>
        {data.galleryEnabled ? (
          <>
        <div className="mt-5 grid gap-4">
          <label className={labelClass}>
            Sur-titre
            <input
              className={fieldClass}
              value={data.galleryEyebrow}
              onChange={(e) => update("galleryEyebrow", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Titre
            <input
              className={fieldClass}
              value={data.galleryTitle}
              onChange={(e) => update("galleryTitle", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Introduction
            <textarea
              rows={2}
              className={fieldClass}
              value={data.galleryIntro}
              onChange={(e) => update("galleryIntro", e.target.value)}
            />
          </label>
        </div>
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <p className={labelClass}>Photos</p>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.14em] text-orange-deep"
              onClick={() =>
                update("galleryItems", [
                  ...data.galleryItems,
                  {
                    src: "/images/couple-1.svg",
                    alt: "Photo",
                    label: "Légende",
                  },
                ])
              }
            >
              + Ajouter
            </button>
          </div>
          {data.galleryItems.map((item, index) => (
            <div key={index} className="space-y-3 border border-stone-100 p-3">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-ink">Photo {index + 1}</p>
                <button
                  type="button"
                  className="text-xs text-stone-500 hover:text-red-700"
                  onClick={() =>
                    update(
                      "galleryItems",
                      data.galleryItems.filter((_, i) => i !== index),
                    )
                  }
                >
                  Retirer
                </button>
              </div>
              <ImageUploadField
                label="Image"
                value={item.src}
                onChange={(url) => updateGallery(index, "src", url)}
              />
              <label className={labelClass}>
                Alt
                <input
                  className={fieldClass}
                  value={item.alt}
                  onChange={(e) => updateGallery(index, "alt", e.target.value)}
                />
              </label>
              <label className={labelClass}>
                Légende
                <input
                  className={fieldClass}
                  value={item.label}
                  onChange={(e) => updateGallery(index, "label", e.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
          </>
        ) : null}
      </section>

      <section className={sectionClass}>
        <h2 className="font-display text-2xl font-semibold text-ink">
          CTA Participation & footer
        </h2>
        <div className="mt-5 grid gap-4">
          <label className={labelClass}>
            Sur-titre CTA
            <input
              className={fieldClass}
              value={data.ctaEyebrow}
              onChange={(e) => update("ctaEyebrow", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Titre CTA
            <input
              className={fieldClass}
              value={data.ctaTitle}
              onChange={(e) => update("ctaTitle", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Texte CTA
            <textarea
              rows={2}
              className={fieldClass}
              value={data.ctaText}
              onChange={(e) => update("ctaText", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Libellé bouton
            <input
              className={fieldClass}
              value={data.ctaButton}
              onChange={(e) => update("ctaButton", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Ligne footer
            <input
              className={fieldClass}
              value={data.footerLine}
              onChange={(e) => update("footerLine", e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-display text-2xl font-semibold text-ink">Page RSVP</h2>
        <div className="mt-5 grid gap-4">
          <label className={labelClass}>
            Titre page
            <input
              className={fieldClass}
              value={data.rsvpPageTitle}
              onChange={(e) => update("rsvpPageTitle", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Sous-titre
            <input
              className={fieldClass}
              value={data.rsvpPageSubtitle}
              onChange={(e) => update("rsvpPageSubtitle", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Mention amis
            <textarea
              rows={3}
              className={fieldClass}
              value={data.rsvpNotice}
              onChange={(e) => update("rsvpNotice", e.target.value)}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={data.rsvpCollectEmail}
                onChange={(e) => update("rsvpCollectEmail", e.target.checked)}
                className="accent-orange-bright size-4"
              />
              Demander l&apos;e-mail
            </label>
            <label className="flex items-center gap-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={data.rsvpCollectPhone}
                onChange={(e) => update("rsvpCollectPhone", e.target.checked)}
                className="accent-orange-bright size-4"
              />
              Demander le téléphone
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className={labelClass}>
              Réponse « oui »
              <input
                className={fieldClass}
                value={data.rsvpYesLabel}
                onChange={(e) => update("rsvpYesLabel", e.target.value)}
              />
            </label>
            <label className={labelClass}>
              Réponse « non »
              <input
                className={fieldClass}
                value={data.rsvpNoLabel}
                onChange={(e) => update("rsvpNoLabel", e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="mt-8 space-y-4 border-t border-stone-100 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-display text-xl font-semibold text-ink">
              Pagne
            </h3>
            <label className="flex items-center gap-3 text-sm text-ink">
              <input
                type="checkbox"
                checked={data.rsvpPagneEnabled}
                onChange={(e) => update("rsvpPagneEnabled", e.target.checked)}
                className="accent-orange-bright size-4"
              />
              Afficher sur le formulaire
            </label>
          </div>
          {data.rsvpPagneEnabled ? (
            <>
              <label className={labelClass}>
                Libellé
                <input
                  className={fieldClass}
                  value={data.rsvpPagneLabel}
                  onChange={(e) => update("rsvpPagneLabel", e.target.value)}
                />
              </label>
              <label className={labelClass}>
                Options (une par ligne)
                <textarea
                  rows={4}
                  className={fieldClass}
                  value={data.rsvpPagneOptions.join("\n")}
                  onChange={(e) =>
                    update(
                      "rsvpPagneOptions",
                      e.target.value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </label>
            </>
          ) : null}
        </div>

        <div className="mt-8 space-y-4 border-t border-stone-100 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-ink">
              Logements
            </h3>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.14em] text-orange-deep"
              onClick={() =>
                update("rsvpLodgingFields", [
                  ...data.rsvpLodgingFields,
                  {
                    id: `logement-${Date.now()}`,
                    label: "Nouveau logement",
                    enabled: true,
                    options: ["Pas besoin de commander", "Oui, 1 nuit"],
                  } satisfies RsvpSelectOptionField,
                ])
              }
            >
              + Ajouter
            </button>
          </div>
          {data.rsvpLodgingFields.map((field, index) => (
            <div key={field.id} className="space-y-3 border border-stone-100 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-3 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={field.enabled}
                    onChange={(e) => {
                      const next = data.rsvpLodgingFields.map((row, i) =>
                        i === index ? { ...row, enabled: e.target.checked } : row,
                      );
                      update("rsvpLodgingFields", next);
                    }}
                    className="accent-orange-bright size-4"
                  />
                  Actif
                </label>
                <button
                  type="button"
                  className="text-xs text-stone-500 hover:text-red-700"
                  onClick={() =>
                    update(
                      "rsvpLodgingFields",
                      data.rsvpLodgingFields.filter((_, i) => i !== index),
                    )
                  }
                >
                  Retirer
                </button>
              </div>
              <label className={labelClass}>
                Libellé
                <input
                  className={fieldClass}
                  value={field.label}
                  onChange={(e) => {
                    const next = data.rsvpLodgingFields.map((row, i) =>
                      i === index ? { ...row, label: e.target.value } : row,
                    );
                    update("rsvpLodgingFields", next);
                  }}
                />
              </label>
              <label className={labelClass}>
                Options (une par ligne)
                <textarea
                  rows={3}
                  className={fieldClass}
                  value={field.options.join("\n")}
                  onChange={(e) => {
                    const options = e.target.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean);
                    const next = data.rsvpLodgingFields.map((row, i) =>
                      i === index ? { ...row, options } : row,
                    );
                    update("rsvpLodgingFields", next);
                  }}
                />
              </label>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 border-t border-stone-100 pt-6">
          <h3 className="font-display text-xl font-semibold text-ink">
            Message &amp; assistant de vœux
          </h3>
          <label className="flex items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={data.rsvpMessageEnabled}
              onChange={(e) => update("rsvpMessageEnabled", e.target.checked)}
              className="accent-orange-bright size-4"
            />
            Afficher le champ message
          </label>
          <label className="flex items-center gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={data.rsvpWishesAssistantEnabled}
              onChange={(e) =>
                update("rsvpWishesAssistantEnabled", e.target.checked)
              }
              className="accent-orange-bright size-4"
              disabled={!data.rsvpMessageEnabled}
            />
            Activer l&apos;assistant de vœux (Gemini)
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Cadeaux &amp; cagnotte
          </h2>
          <button
            type="button"
            role="switch"
            aria-checked={data.giftsEnabled}
            onClick={() => update("giftsEnabled", !data.giftsEnabled)}
            className={`inline-flex items-center gap-3 rounded-full border px-3 py-2 text-sm font-medium transition ${
              data.giftsEnabled
                ? "border-[#CB6B53]/40 bg-[#CB6B53]/10 text-[#9E4244]"
                : "border-stone-200 bg-stone-50 text-stone-500"
            }`}
          >
            <span
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                data.giftsEnabled ? "bg-[#CB6B53]" : "bg-stone-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  data.giftsEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </span>
            {data.giftsEnabled ? "Section activée" : "Section masquée"}
          </button>
        </div>

        {data.giftsEnabled ? (
          <div className="mt-5 grid gap-4">
            <label className={labelClass}>
              Titre
              <input
                className={fieldClass}
                value={data.giftsTitle}
                onChange={(e) => update("giftsTitle", e.target.value)}
              />
            </label>
            <label className={labelClass}>
              Texte urne / présence
              <textarea
                rows={3}
                className={fieldClass}
                value={data.giftsIntro}
                onChange={(e) => update("giftsIntro", e.target.value)}
              />
            </label>
            <label className={labelClass}>
              Texte cagnotte
              <textarea
                rows={3}
                className={fieldClass}
                value={data.giftsCagnotteText}
                onChange={(e) => update("giftsCagnotteText", e.target.value)}
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Libellé du lien
                <input
                  className={fieldClass}
                  value={data.giftsLinkLabel}
                  onChange={(e) => update("giftsLinkLabel", e.target.value)}
                  placeholder="OnParticipe — Mariage Stevie & Anderson"
                />
              </label>
              <label className={labelClass}>
                URL cagnotte
                <input
                  className={fieldClass}
                  type="url"
                  value={data.giftsLinkUrl}
                  onChange={(e) => update("giftsLinkUrl", e.target.value)}
                  placeholder="https://..."
                />
              </label>
            </div>

            <div className="mt-4 space-y-4 border-t border-stone-100 pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-display text-xl font-semibold text-ink">
                  Carte adresse
                </h3>
                <label className="flex items-center gap-3 text-sm text-ink">
                  <input
                    type="checkbox"
                    checked={data.giftsAddressEnabled}
                    onChange={(e) =>
                      update("giftsAddressEnabled", e.target.checked)
                    }
                    className="accent-orange-bright size-4"
                  />
                  Afficher la carte adresse
                </label>
              </div>
              {data.giftsAddressEnabled ? (
                <>
                  <label className={labelClass}>
                    Titre carte
                    <input
                      className={fieldClass}
                      value={data.giftsAddressTitle}
                      onChange={(e) =>
                        update("giftsAddressTitle", e.target.value)
                      }
                    />
                  </label>
                  <label className={labelClass}>
                    Texte intro
                    <textarea
                      rows={2}
                      className={fieldClass}
                      value={data.giftsAddressIntro}
                      onChange={(e) =>
                        update("giftsAddressIntro", e.target.value)
                      }
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className={labelClass}>
                      Ligne adresse 1
                      <input
                        className={fieldClass}
                        value={data.giftsAddressLine1}
                        onChange={(e) =>
                          update("giftsAddressLine1", e.target.value)
                        }
                      />
                    </label>
                    <label className={labelClass}>
                      Ligne adresse 2
                      <input
                        className={fieldClass}
                        value={data.giftsAddressLine2}
                        onChange={(e) =>
                          update("giftsAddressLine2", e.target.value)
                        }
                      />
                    </label>
                  </div>
                  <label className={labelClass}>
                    Note (ex. chez…)
                    <input
                      className={fieldClass}
                      value={data.giftsAddressNote}
                      onChange={(e) =>
                        update("giftsAddressNote", e.target.value)
                      }
                    />
                  </label>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>

      <section className={sectionClass}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Playlist SoundCloud
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Collez le code iframe fourni par SoundCloud (Partager → Embed).
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={data.playlistEnabled}
            onClick={() => update("playlistEnabled", !data.playlistEnabled)}
            className={`inline-flex items-center gap-3 rounded-full border px-3 py-2 text-sm font-medium transition ${
              data.playlistEnabled
                ? "border-[#CB6B53]/40 bg-[#CB6B53]/10 text-[#9E4244]"
                : "border-stone-200 bg-stone-50 text-stone-500"
            }`}
          >
            <span
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                data.playlistEnabled ? "bg-[#CB6B53]" : "bg-stone-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  data.playlistEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </span>
            {data.playlistEnabled ? "Activée" : "Masquée"}
          </button>
        </div>
        {data.playlistEnabled ? (
          <label className={`${labelClass} mt-5 block`}>
            Code widget (iframe)
            <textarea
              rows={6}
              className={`${fieldClass} font-mono text-xs`}
              value={data.playlistEmbedCode}
              onChange={(e) => update("playlistEmbedCode", e.target.value)}
              placeholder='<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=..."></iframe>'
            />
          </label>
        ) : null}
      </section>

      <div className="fixed bottom-0 left-0 right-0 border-t border-stone-200 bg-white/95 px-6 py-4 backdrop-blur sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-600" role="status">
            {status === "saved" && "Contenu enregistré."}
            {status === "error" && error}
            {status === "idle" && "Modifiez puis enregistrez."}
            {status === "saving" && "Enregistrement…"}
          </p>
          <button
            type="submit"
            disabled={status === "saving"}
            className="bg-orange-bright px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-orange-deep disabled:opacity-60"
          >
            {status === "saving" ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </form>
  );
}

function toColorInputValue(hex: string) {
  const value = hex.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    const [, r, g, b] = value;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return "#c4785a";
}

function toDatetimeLocal(isoLike: string) {
  const date = new Date(isoLike);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function fromDatetimeLocal(value: string) {
  if (!value) return defaultIso();
  return value.length === 16 ? `${value}:00` : value;
}

function defaultIso() {
  return "2026-11-26T16:00:00";
}
