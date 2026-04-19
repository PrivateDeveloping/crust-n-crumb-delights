import { CONFIG } from "@/lib/config";

export function BrandWordmark({ className = "", size = "text-2xl" }: { className?: string; size?: string }) {
  return (
    <span className={`font-script text-primary ${size} leading-none ${className}`} style={{ letterSpacing: "0.01em" }}>
      {CONFIG.BRAND}
    </span>
  );
}
