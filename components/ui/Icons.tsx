import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    ...props,
  };
}

export function ArrowRight({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowLeft({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </svg>
  );
}

export function Instagram({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SoundCloud({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M4 15v-4" />
      <path d="M7 17v-6" />
      <path d="M10 17V9" />
      <path d="M13 17V7" />
      <path d="M16 17V9a4 4 0 0 1 4 4 3 3 0 0 1-3 4h-1" />
    </svg>
  );
}

export function Play({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M8 5.5 18 12 8 18.5Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Close({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function Mail({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 6 8 6 8-6" />
    </svg>
  );
}

export function Phone({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M8.5 3.5 10 8l-2 1.7a12 12 0 0 0 5.8 5.8L15.5 13l4.5 1.5v4A2.5 2.5 0 0 1 17.2 21C9.4 20.2 3.8 14.6 3 6.8A2.5 2.5 0 0 1 5.5 4.3Z" />
    </svg>
  );
}

export function Pin({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function Copy({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base({ size, ...props })}>
      <rect x="8" y="8" width="12" height="12" rx="1.5" />
      <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8" />
    </svg>
  );
}
