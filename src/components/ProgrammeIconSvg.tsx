import type { ProgrammeIcon } from "@/lib/site-content";

type Props = {
  icon: ProgrammeIcon;
  className?: string;
};

export const PROGRAMME_ICON_OPTIONS: {
  value: ProgrammeIcon;
  label: string;
}[] = [
  { value: "traditional", label: "Traditionnel" },
  { value: "rings", label: "Alliances" },
  { value: "church", label: "Église" },
  { value: "brunch", label: "Brunch" },
  { value: "party", label: "Soirée" },
];

const svgProps = {
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ProgrammeIconSvg({ icon, className = "h-8 w-8" }: Props) {
  if (icon === "rings") {
    return (
      <svg className={className} viewBox="0 0 48 48" {...svgProps}>
        <circle cx="18.5" cy="25" r="10" />
        <circle cx="29.5" cy="25" r="10" />
      </svg>
    );
  }

  if (icon === "church") {
    return (
      <svg className={className} viewBox="0 0 48 48" {...svgProps}>
        <path d="M24 6v8" />
        <path d="M20.5 10h7" />
        <path d="M10 42V22.5L24 12l14 10.5V42" />
        <path d="M20 42V30h8v12" />
        <path d="M10 22.5h28" />
      </svg>
    );
  }

  if (icon === "brunch") {
    return (
      <svg className={className} viewBox="0 0 48 48" {...svgProps}>
        <path d="M14 20h16a2 2 0 0 1 2 2v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8v-6a2 2 0 0 1 2-2z" />
        <path d="M32 22h3.5a4.5 4.5 0 0 1 0 9H32" />
        <path d="M16 40h12" />
        <path d="M18 12c0 2 1.5 3 1.5 5M24 11c0 2 1.5 3 1.5 5M30 12c0 2 1.5 3 1.5 5" />
      </svg>
    );
  }

  if (icon === "party") {
    return (
      <svg className={className} viewBox="0 0 48 48" {...svgProps}>
        <path d="M12 14h24L24 28 12 14z" />
        <path d="M24 28v10" />
        <path d="M17 40h14" />
        <circle cx="28" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 48 48" {...svgProps}>
      <path d="M8 38 L24 10 L40 38 Z" />
      <path d="M14 28h20" />
      <path d="M24 28v10" />
    </svg>
  );
}
