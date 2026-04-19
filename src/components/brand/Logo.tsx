import logoSrc from "@/assets/logo.png";

interface LogoProps {
  size?: number;
  variant?: "light" | "dark"; // light = on light bg (no black), dark = on dark bg (as-is)
  className?: string;
}

/**
 * Logo: on light backgrounds, render with mix-blend-multiply so the white
 * background of the PNG visually disappears against blush/white surfaces.
 * On dark backgrounds, render as-is.
 */
export function Logo({ size = 40, variant = "light", className = "" }: LogoProps) {
  const blend = variant === "light" ? "mix-blend-multiply" : "";
  return (
    <img
      src={logoSrc}
      alt="Crust N Crumb logo"
      width={size}
      height={size}
      className={`inline-block object-contain ${blend} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
