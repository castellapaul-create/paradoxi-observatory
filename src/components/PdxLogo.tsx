import paradoxiLogo from "@/assets/paradoxi-logo.png";

export function PdxMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="3" />
      <path
        d="M24 12c7 4 9 11 6 18-4-3-7-5-9-9-1.5-3-1-6 3-9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PdxLogo({ className }: { className?: string }) {
  return (
    <img
      src={paradoxiLogo}
      alt="PARADOXI Observatory"
      className={`h-9 w-auto ${className ?? ""}`}
    />
  );
}
