import Link from "next/link";
export function LogoMark({
  className = "",
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.4" />
      <ellipse
        cx="24"
        cy="24"
        rx="10"
        ry="22"
        transform="rotate(35 24 24)"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M24 12L27.5 20.5L36 24L27.5 27.5L24 36L20.5 27.5L12 24L20.5 20.5L24 12Z"
        fill="currentColor"
      />
      <circle
        cx="35.5"
        cy="8"
        r="3.2"
        fill="currentColor"
        stroke="var(--background, #f8f5ee)"
        strokeWidth="2"
      />
    </svg>
  );
}
export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Asteria home">
      <LogoMark />
      <span>
        asteria<span className="brand-dot">.</span>
      </span>
    </Link>
  );
}
