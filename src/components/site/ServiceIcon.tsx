const ACCENT = "oklch(40% 0.1 160)";

export function ServiceIcon({ index, size = 20 }: { index: number; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
  };

  switch (index) {
    case 0:
      return (
        <svg {...props}>
          <path d="M4 20V10M12 20V4M20 20V14" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg {...props}>
          <path d="M4 12h13M13 6l6 6-6 6" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 2:
      return (
        <svg {...props}>
          <path
            d="M4 8h13m0 0-4-4m4 4-4 4M20 16H7m0 0 4 4m-4-4 4-4"
            stroke={ACCENT}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 3:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3.2" stroke={ACCENT} strokeWidth="2" />
          <path
            d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
            stroke={ACCENT}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 4:
      return (
        <svg {...props}>
          <path d="M4 6h16v10H9l-4 4v-4H4V6Z" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 11h8M8 8h5" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 5:
      return (
        <svg {...props}>
          <path d="M6 4h9l4 4v12H6V4Z" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}
