import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoPlayAttempted = useRef(false);
  const manualPlayRequested = useRef(false);
  const visible = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (!entry.isIntersecting) video.pause();
      if (entry.isIntersecting && !reducedMotion && !autoPlayAttempted.current) {
        autoPlayAttempted.current = true;
        setLoaded(true);
      }
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loaded) return;
    if (manualPlayRequested.current || (!reducedMotion && visible.current)) {
      manualPlayRequested.current = false;
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [loaded, reducedMotion]);

  const play = () => {
    if (loaded) {
      void videoRef.current?.play().catch(() => setPlaying(false));
    } else {
      manualPlayRequested.current = true;
      setLoaded(true);
    }
  };

  return (
    <figure className="relative">
      <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-border/40 shadow-2xl bg-secondary">
        <video ref={videoRef} src={loaded ? "/showreel.mp4" : undefined}
          poster="/images/showreel-poster.jpg" preload="none"
          className="w-full h-full object-cover" muted loop playsInline controls={loaded}
          aria-label="Cinematic Travel Narrative showreel"
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
        {!playing && (
          <button type="button" onClick={play} aria-label="Play Cinematic Travel Narrative"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-white/60 bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors">
            <Play aria-hidden="true" className="w-6 h-6 ml-1" />
          </button>
        )}
      </div>
      <figcaption className="mt-5 px-1 lg:mt-0 lg:absolute lg:bottom-14 lg:left-10 lg:right-10 lg:pointer-events-none text-foreground lg:text-white lg:drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
        <span className="technical-mono text-[11px] text-muted-foreground lg:text-white mb-2 block">Featured Piece</span>
        <h3 className="editorial-serif text-2xl lg:text-3xl">Cinematic Travel Narrative</h3>
      </figcaption>
    </figure>
  );
}
