export type HeroSlide = {
  src: string;
  alt: string;
};

export type ProgrammeScheduleItem = {
  time: string;
  label: string;
};

export type ProgrammeIcon = "rings" | "church" | "brunch" | "party" | "traditional";

export type ProgrammeEvent = {
  id: string;
  title: string;
  dateDay: string;
  dateMonthYear: string;
  icon: ProgrammeIcon;
  description: string;
  schedule: ProgrammeScheduleItem[];
  /** Afficher cet événement dans le formulaire RSVP */
  includeInRsvp: boolean;
  /** Libellé optionnel sur le formulaire (sinon titre + date) */
  rsvpLabel: string;
  /** @deprecated kept for merge of old content */
  place?: string;
  detail?: string;
};

export type RsvpSelectOptionField = {
  id: string;
  label: string;
  enabled: boolean;
  options: string[];
};

export type ThemeColor = {
  name: string;
  hex: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  label: string;
};

export type HighlightEvent = {
  title: string;
  dateLabel: string;
  targetDate: string;
};

export type HighlightPhoto = {
  src: string;
  alt: string;
};

export type SiteContentData = {
  partner1: string;
  partner2: string;
  initials: string;
  weddingDate: string;
  heroEyebrow: string;
  heroTagline: string;
  heroNameSize: "sm" | "md" | "lg" | "xl";
  heroSlides: HeroSlide[];
  highlightEventTop: HighlightEvent;
  highlightEventBottom: HighlightEvent;
  highlightPhotos: HighlightPhoto[];
  programmeEyebrow: string;
  programmeTitle: string;
  programmeIntro: string;
  events: ProgrammeEvent[];
  themeEyebrow: string;
  themeTitle: string;
  themeIntro: string;
  themeColors: ThemeColor[];
  styleAdvisorEnabled: boolean;
  styleAdvisorTitle: string;
  pagneTitle: string;
  pagneText: string;
  logementTitle: string;
  logementText: string;
  logementNote: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryIntro: string;
  galleryItems: GalleryItem[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaButton: string;
  footerLine: string;
  rsvpNotice: string;
  rsvpPageTitle: string;
  rsvpPageSubtitle: string;
  rsvpCollectEmail: boolean;
  rsvpCollectPhone: boolean;
  rsvpPagneEnabled: boolean;
  rsvpPagneLabel: string;
  rsvpPagneOptions: string[];
  rsvpLodgingFields: RsvpSelectOptionField[];
  rsvpMessageEnabled: boolean;
  rsvpWishesAssistantEnabled: boolean;
  rsvpYesLabel: string;
  rsvpNoLabel: string;
  giftsEnabled: boolean;
  giftsTitle: string;
  giftsIntro: string;
  giftsCagnotteText: string;
  giftsLinkLabel: string;
  giftsLinkUrl: string;
  giftsAddressEnabled: boolean;
  giftsAddressTitle: string;
  giftsAddressIntro: string;
  giftsAddressLine1: string;
  giftsAddressLine2: string;
  giftsAddressNote: string;
  playlistEnabled: boolean;
  playlistEmbedCode: string;
  bubbleEnabled: boolean;
  bubbleEmojis: string[];
};

export const defaultSiteContent: SiteContentData = {
  partner1: "Stevie",
  partner2: "Anderson",
  initials: "S & A",
  weddingDate: "2026-11-26T16:00:00",
  heroEyebrow: "Le début officiel de notre union",
  heroTagline:
    "Parce que les plus belles histoires s'écrivent avec ceux que l'on aime, nous avons l'immense bonheur de vous annoncer notre union.",
  heroNameSize: "lg",
  heroSlides: [
    { src: "/images/couple-1.svg", alt: "Stevie et Anderson" },
    { src: "/images/couple-2.svg", alt: "Un moment partagé" },
    { src: "/images/ouest-cameroun.svg", alt: "Ouest Cameroun" },
  ],
  highlightEventTop: {
    title: "Le oui civil",
    dateLabel: "26 Novembre 2026",
    targetDate: "2026-11-26T16:00:00",
  },
  highlightEventBottom: {
    title: "La célébration",
    dateLabel: "26 Novembre 2026",
    targetDate: "2026-11-26T19:00:00",
  },
  highlightPhotos: [
    { src: "/images/couple-1.svg", alt: "Stevie et Anderson" },
    { src: "/images/couple-2.svg", alt: "Un moment partagé" },
    { src: "/images/ouest-cameroun.svg", alt: "Ouest Cameroun" },
  ],
  programmeEyebrow: "Programme",
  programmeTitle: "Programme des Festivités",
  programmeIntro: "",
  events: [
    {
      id: "traditionnel-bangang",
      title: "Mariage traditionnel (Bangang)",
      dateDay: "—",
      dateMonthYear: "BANGANG",
      icon: "traditional",
      description:
        "Célébration traditionnelle au cœur de nos racines, en Ouest Cameroun.",
      schedule: [
        { time: "Jour J", label: "Cérémonie traditionnelle" },
      ],
      includeInRsvp: true,
      rsvpLabel: "Mariage traditionnel à Bangang",
    },
    {
      id: "civil-bafoussam",
      title: "L'Union Civile (Bafoussam)",
      dateDay: "26",
      dateMonthYear: "NOVEMBRE 2026",
      icon: "rings",
      description:
        "L'officialisation de notre amour se tiendra à Bafoussam.",
      schedule: [
        { time: "16h00", label: "Cérémonie civile" },
      ],
      includeInRsvp: true,
      rsvpLabel: "Mariage civil à Bafoussam (jeudi 26 novembre)",
    },
    {
      id: "soiree-bafoussam",
      title: "Soirée de réception (Bafoussam)",
      dateDay: "26",
      dateMonthYear: "NOVEMBRE 2026",
      icon: "party",
      description:
        "Le même jour, pour danser et célébrer ensemble.",
      schedule: [
        { time: "19h00", label: "Soirée & festivités" },
      ],
      includeInRsvp: true,
      rsvpLabel: "Soirée de réception à Bafoussam (jeudi 26 novembre)",
    },
  ],
  themeEyebrow: "Thème",
  themeTitle: "Thème du mariage",
  themeIntro: "",
  themeColors: [
    { name: "Terracotta", hex: "#CB6B53" },
    { name: "Rouge Brique", hex: "#9E4244" },
    { name: "Orange Brûlé", hex: "#CC5500" },
    { name: "Marron Terre", hex: "#5D2B1D" },
  ],
  styleAdvisorEnabled: false,
  styleAdvisorTitle: "Conseiller de Style AI",
  pagneTitle: "Le Pagne du Mariage",
  pagneText:
    "Nous avons le plaisir de vous informer que le pagne officiel de notre mariage est disponible. Vous pouvez confirmer votre commande via le formulaire de participation.",
  logementTitle: "Logement & Résidences",
  logementText:
    "Pour faciliter votre séjour et partager des moments ensemble, merci de nous indiquer vos besoins via le formulaire de participation.",
  logementNote: "À Bafoussam, des options d'hébergement sont disponibles à proximité.",
  galleryEyebrow: "Souvenirs",
  galleryTitle: "Photos & racines",
  galleryIntro:
    "Quelques images de nous, et un hommage à la culture de l'Ouest Cameroun — à remplacer bientôt par vos véritables clichés.",
  galleryItems: [
    {
      src: "/images/couple-1.svg",
      alt: "Stevie et Anderson — portrait",
      label: "Stevie & Anderson",
    },
    {
      src: "/images/couple-2.svg",
      alt: "Stevie et Anderson — moment partagé",
      label: "Notre histoire",
    },
    {
      src: "/images/ouest-cameroun.svg",
      alt: "Culture de l'Ouest Cameroun",
      label: "Ouest Cameroun",
    },
  ],
  ctaEyebrow: "Participation",
  ctaTitle: "Serez-vous des nôtres ?",
  ctaText:
    "Votre présence est notre plus beau présent. Dites-nous si vous serez là pour célébrer ce jour avec nous.",
  ctaButton: "Remplir le formulaire",
  footerLine: "26 novembre 2026 · Bafoussam",
  rsvpNotice:
    "Ce formulaire est dédié aux amis du marié et de la mariée. Merci de confirmer votre présence ci-dessous.",
  rsvpPageTitle: "Serez-vous des nôtres ?",
  rsvpPageSubtitle: "Stevie & Anderson — 26 novembre 2026 à Bafoussam",
  rsvpCollectEmail: true,
  rsvpCollectPhone: true,
  rsvpPagneEnabled: true,
  rsvpPagneLabel: "Pagne du mariage",
  rsvpPagneOptions: [
    "Pas besoin de commander",
    "Oui, 1 pièce",
    "Oui, 2 pièces",
    "Oui, 3 pièces ou plus",
  ],
  rsvpLodgingFields: [
    {
      id: "logement-bafoussam",
      label: "Logement à Bafoussam",
      enabled: true,
      options: [
        "Pas besoin de commander",
        "Oui, 1 nuit",
        "Oui, 2 nuits",
        "Oui, 3 nuits ou plus",
      ],
    },
  ],
  rsvpMessageEnabled: true,
  rsvpWishesAssistantEnabled: false,
  rsvpYesLabel: "Avec joie, je serai là",
  rsvpNoLabel: "À mon regret, non",
  giftsEnabled: true,
  giftsTitle: "Votre présence, notre plus beau présent",
  giftsIntro:
    "Si vous souhaitez nous témoigner une attention particulière, une urne sera mise à votre disposition le jour J pour y déposer vos enveloppes.",
  giftsCagnotteText:
    "Pour les personnes absentes, une cagnotte en ligne est également accessible via ce lien, sur lequel vous pourrez aussi nous envoyer vos vœux en vidéo :",
  giftsLinkLabel: "OnParticipe — Mariage Stevie & Anderson",
  giftsLinkUrl: "",
  giftsAddressEnabled: true,
  giftsAddressTitle: "Adresse pour les cadeaux :",
  giftsAddressIntro:
    "Pour des raisons logistiques, merci de faire livrer les cadeaux physiques à notre adresse :",
  giftsAddressLine1: "Bafoussam",
  giftsAddressLine2: "Ouest Cameroun",
  giftsAddressNote: "Chez Stevie ou Anderson",
  playlistEnabled: false,
  playlistEmbedCode: "",
  bubbleEnabled: true,
  bubbleEmojis: ["❤️", "🧡", "💕"],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const ICONS: ProgrammeIcon[] = [
  "rings",
  "church",
  "brunch",
  "party",
  "traditional",
];

function slugifyId(value: string, index: number) {
  const slug = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return slug || `event-${index + 1}`;
}

function normalizeSelectField(
  raw: unknown,
  fallback: RsvpSelectOptionField,
): RsvpSelectOptionField {
  if (!isRecord(raw)) return fallback;
  const options = Array.isArray(raw.options)
    ? (raw.options as unknown[]).map((o) => String(o).trim()).filter(Boolean)
    : fallback.options;
  return {
    id: String(raw.id ?? fallback.id),
    label: String(raw.label ?? fallback.label),
    enabled: typeof raw.enabled === "boolean" ? raw.enabled : fallback.enabled,
    options: options.length > 0 ? options : fallback.options,
  };
}

function normalizeProgrammeEvent(raw: unknown, index: number): ProgrammeEvent {
  const fallback = defaultSiteContent.events[index] ?? defaultSiteContent.events[0];
  if (!isRecord(raw)) return fallback;

  const isLegacy =
    raw.dateDay == null &&
    raw.schedule == null &&
    (raw.place != null || raw.detail != null);

  // Old saved content → use curated defaults (keeps custom title if present)
  if (isLegacy) {
    const title = String(raw.title ?? fallback.title);
    return {
      ...fallback,
      title,
      id: String(raw.id ?? fallback.id ?? slugifyId(title, index)),
      includeInRsvp:
        typeof raw.includeInRsvp === "boolean" ? raw.includeInRsvp : true,
      rsvpLabel: String(raw.rsvpLabel ?? fallback.rsvpLabel ?? ""),
    };
  }

  const icon =
    typeof raw.icon === "string" && ICONS.includes(raw.icon as ProgrammeIcon)
      ? (raw.icon as ProgrammeIcon)
      : fallback.icon;

  const schedule = Array.isArray(raw.schedule)
    ? (raw.schedule as ProgrammeScheduleItem[]).filter(
        (row) => row && (row.time || row.label),
      )
    : fallback.schedule;

  const description = String(raw.description ?? fallback.description);
  const title = String(raw.title ?? fallback.title);

  // Avoid showing the same sentence twice (description + schedule)
  const cleanSchedule = schedule.filter((row) => {
    const label = String(row.label ?? "").trim();
    if (!label) return Boolean(row.time);
    return label !== description.trim();
  });

  return {
    id: String(raw.id ?? fallback.id ?? slugifyId(title, index)),
    title,
    dateDay: String(raw.dateDay ?? fallback.dateDay),
    dateMonthYear: String(raw.dateMonthYear ?? fallback.dateMonthYear),
    icon,
    description,
    schedule: cleanSchedule.length > 0 ? cleanSchedule : fallback.schedule,
    includeInRsvp:
      typeof raw.includeInRsvp === "boolean"
        ? raw.includeInRsvp
        : fallback.includeInRsvp ?? true,
    rsvpLabel: String(raw.rsvpLabel ?? fallback.rsvpLabel ?? ""),
  };
}

export function rsvpEventLabel(event: ProgrammeEvent) {
  if (event.rsvpLabel?.trim()) return event.rsvpLabel.trim();
  const datePart = [event.dateDay, event.dateMonthYear]
    .map((p) => p.trim())
    .filter((p) => p && p !== "—")
    .join(" ");
  return datePart ? `${event.title} (${datePart})` : event.title;
}

export function mergeSiteContent(raw: unknown): SiteContentData {
  if (!isRecord(raw)) return defaultSiteContent;

  return {
    ...defaultSiteContent,
    ...raw,
    bubbleEnabled:
      typeof raw.bubbleEnabled === "boolean"
        ? raw.bubbleEnabled
        : defaultSiteContent.bubbleEnabled,
    styleAdvisorEnabled:
      typeof raw.styleAdvisorEnabled === "boolean"
        ? raw.styleAdvisorEnabled
        : defaultSiteContent.styleAdvisorEnabled,
    rsvpCollectEmail:
      typeof raw.rsvpCollectEmail === "boolean"
        ? raw.rsvpCollectEmail
        : defaultSiteContent.rsvpCollectEmail,
    rsvpCollectPhone:
      typeof raw.rsvpCollectPhone === "boolean"
        ? raw.rsvpCollectPhone
        : defaultSiteContent.rsvpCollectPhone,
    rsvpPagneEnabled:
      typeof raw.rsvpPagneEnabled === "boolean"
        ? raw.rsvpPagneEnabled
        : defaultSiteContent.rsvpPagneEnabled,
    rsvpMessageEnabled:
      typeof raw.rsvpMessageEnabled === "boolean"
        ? raw.rsvpMessageEnabled
        : defaultSiteContent.rsvpMessageEnabled,
    rsvpWishesAssistantEnabled:
      typeof raw.rsvpWishesAssistantEnabled === "boolean"
        ? raw.rsvpWishesAssistantEnabled
        : defaultSiteContent.rsvpWishesAssistantEnabled,
    giftsEnabled:
      typeof raw.giftsEnabled === "boolean"
        ? raw.giftsEnabled
        : defaultSiteContent.giftsEnabled,
    giftsAddressEnabled:
      typeof raw.giftsAddressEnabled === "boolean"
        ? raw.giftsAddressEnabled
        : defaultSiteContent.giftsAddressEnabled,
    playlistEnabled:
      typeof raw.playlistEnabled === "boolean"
        ? raw.playlistEnabled
        : defaultSiteContent.playlistEnabled,
    heroNameSize:
      raw.heroNameSize === "sm" ||
      raw.heroNameSize === "md" ||
      raw.heroNameSize === "lg" ||
      raw.heroNameSize === "xl"
        ? raw.heroNameSize
        : defaultSiteContent.heroNameSize,
    bubbleEmojis: Array.isArray(raw.bubbleEmojis)
      ? (raw.bubbleEmojis as string[]).filter((e) => String(e).trim().length > 0)
      : typeof raw.bubbleEmojis === "string"
        ? String(raw.bubbleEmojis)
            .split(/[,\s]+/)
            .map((e) => e.trim())
            .filter(Boolean)
        : defaultSiteContent.bubbleEmojis,
    heroSlides: Array.isArray(raw.heroSlides)
      ? (raw.heroSlides as HeroSlide[])
      : defaultSiteContent.heroSlides,
    highlightEventTop: isRecord(raw.highlightEventTop)
      ? {
          ...defaultSiteContent.highlightEventTop,
          ...(raw.highlightEventTop as HighlightEvent),
        }
      : defaultSiteContent.highlightEventTop,
    highlightEventBottom: isRecord(raw.highlightEventBottom)
      ? {
          ...defaultSiteContent.highlightEventBottom,
          ...(raw.highlightEventBottom as HighlightEvent),
        }
      : defaultSiteContent.highlightEventBottom,
    highlightPhotos: Array.isArray(raw.highlightPhotos)
      ? (raw.highlightPhotos as HighlightPhoto[])
      : defaultSiteContent.highlightPhotos,
    events: Array.isArray(raw.events)
      ? (raw.events as unknown[]).map(normalizeProgrammeEvent)
      : defaultSiteContent.events,
    themeColors: Array.isArray(raw.themeColors)
      ? (raw.themeColors as ThemeColor[])
      : defaultSiteContent.themeColors,
    galleryItems: Array.isArray(raw.galleryItems)
      ? (raw.galleryItems as GalleryItem[])
      : defaultSiteContent.galleryItems,
    rsvpPagneOptions: Array.isArray(raw.rsvpPagneOptions)
      ? (raw.rsvpPagneOptions as unknown[])
          .map((o) => String(o).trim())
          .filter(Boolean)
      : defaultSiteContent.rsvpPagneOptions,
    rsvpLodgingFields: Array.isArray(raw.rsvpLodgingFields)
      ? (raw.rsvpLodgingFields as unknown[]).map((field, index) =>
          normalizeSelectField(
            field,
            defaultSiteContent.rsvpLodgingFields[index] ?? {
              id: `logement-${index + 1}`,
              label: "Logement",
              enabled: true,
              options: ["Pas besoin de commander"],
            },
          ),
        )
      : defaultSiteContent.rsvpLodgingFields,
  };
}
