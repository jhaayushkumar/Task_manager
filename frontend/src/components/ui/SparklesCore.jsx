import { useEffect, useRef } from "react";

export const SparklesCore = ({
  id = "sparkles",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  particleColor = "#FFFFFF",
  className = "w-full h-full",
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const createParticles = () => {
      const area = width * height;
      const count = Math.max(20, Math.floor((area / 12000) * (particleDensity / 100)));
      particlesRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * (maxSize - minSize) + minSize,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.6 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(particleColor, p.alpha);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      createParticles();
    };

    canvas.style.background = background;
    createParticles();
    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [background, maxSize, minSize, particleColor, particleDensity]);

  return <canvas id={id} ref={canvasRef} className={className} />;
};

function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#','');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


