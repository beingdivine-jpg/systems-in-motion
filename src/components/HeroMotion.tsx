import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const orbit = "M320 320C205 260 176 164 256 135C362 96 487 207 447 279C421 326 372 344 320 320";
const colours = ["var(--accent-enterprise)", "var(--accent-operations)", "var(--accent-warm)"];

export function HeroMotion() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const running = visible && tabVisible && !paused && !reducedMotion;

  useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.01),
      { threshold: 0.01 },
    );
    observer.observe(hero);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const element = ref.current;
    const hero = element?.closest("section");
    if (!element || !hero) return;
    const reset = () => {
      element.style.setProperty("--motion-x", "0px");
      element.style.setProperty("--motion-y", "0px");
      element.style.setProperty("--motion-turn", "0deg");
    };
    if (!running || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      reset();
      return;
    }
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        element.style.setProperty("--motion-x", `${x * 16}px`);
        element.style.setProperty("--motion-y", `${y * 12}px`);
        element.style.setProperty("--motion-turn", `${x * 8}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      reset();
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      reset();
    };
  }, [running]);

  return (
    <div ref={ref} className="hero-motion" data-running={running}>
      <div className="hero-motion-parallax" aria-hidden="true">
        <svg viewBox="80 80 480 480" fill="none" className="hero-motion-art" focusable="false">
          <g className="hero-motion-sculpture">
            {colours.map((colour, index) => (
              <g key={colour} transform={`rotate(${index * 120} 320 320)`}
                style={{ "--orbit-colour": colour, "--orbit-delay": `${index * -6}s`, "--orbit-rest": index / 3 } as CSSProperties}>
                <path d={orbit} className="hero-motion-path" />
                <path d={orbit} pathLength="1" className="hero-motion-trail" />
                <path d={orbit} pathLength="1" className="hero-motion-point" />
              </g>
            ))}
          </g>
          <circle cx="320" cy="320" r="10" className="hero-motion-centre-ring" />
          <circle cx="320" cy="320" r="3" className="hero-motion-centre" />
        </svg>
      </div>
      {!reducedMotion && (
        <button type="button" onClick={() => setPaused(value => !value)}
          className="hero-motion-toggle" aria-label={paused ? "Play ambient motion" : "Pause ambient motion"}
          title={paused ? "Play ambient motion" : "Pause ambient motion"}>
          {paused ? <Play aria-hidden="true" size={12} /> : <Pause aria-hidden="true" size={12} />}
        </button>
      )}
    </div>
  );
}
