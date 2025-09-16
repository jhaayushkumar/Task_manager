import { useRef } from "react";

export const GlowingEffect = ({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 80,
  inactiveZone = 0.05,
  className = "",
}) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percX = x / rect.width;
    const percY = y / rect.height;
    const distX = Math.abs(percX - 0.5) * 2;
    const distY = Math.abs(percY - 0.5) * 2;
    const proximityFactor = Math.max(0, 1 - Math.max(distX, distY) / (proximity / 100));

    const opacity = Math.max(inactiveZone, Math.min(1, proximityFactor));
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
    el.style.setProperty("--glow-opacity", glow ? opacity : 0);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow-opacity", 0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`pointer-events-none absolute inset-0 rounded-2xl [--glow-opacity:0] ${className}`}
      style={{
        background:
          `radial-gradient(${spread}px circle at var(--glow-x, -100px) var(--glow-y, -100px), rgba(236,72,153,var(--glow-opacity)), transparent 60%),` +
          `radial-gradient(${spread}px circle at var(--glow-x, -100px) var(--glow-y, -100px), rgba(56,189,248,calc(var(--glow-opacity)*0.6)), transparent 60%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};


