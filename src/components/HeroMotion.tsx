import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const desktopQuery = "(min-width: 1024px)";
const subscribeToDesktop = (onChange: () => void) => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const isDesktop = () => window.matchMedia(desktopQuery).matches;
const serverDesktop = () => false;

export function HeroMotion() {
  const transparencyId = `portrait-ink-${useId().replace(/:/g, "")}`;
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const desktop = useSyncExternalStore(subscribeToDesktop, isDesktop, serverDesktop);
  // Safari supports native HEVC alpha in QuickTime; Chromium skips this format.
  // Avoid Safari's accelerated-video path bypassing SVG colour filters.
  const [nativeAlpha] = useState(() =>
    document.createElement("video").canPlayType('video/quicktime; codecs="hvc1"') !== "",
  );
  const poster = desktop
    ? "/media/portrait/divin-portrait-alpha-poster.png?v=5"
    : "/media/portrait/divin-portrait-small-alpha-poster.png?v=5";
  const opaquePortrait = desktop
    ? "/media/portrait/divin-portrait.mp4?v=4"
    : "/media/portrait/divin-portrait-small.mp4?v=3";
  const alphaPortrait = desktop
    ? "/media/portrait/divin-portrait-alpha.mov?v=5"
    : "/media/portrait/divin-portrait-small-alpha.mov?v=5";
  const portrait = nativeAlpha ? alphaPortrait : opaquePortrait;
  const [visible, setVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [videoReady, setVideoReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const running = visible && tabVisible && !reducedMotion && !failed;

  useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.01;
        setVisible(inView);
        if (inView) setHasEntered(true);
      },
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
    const video = videoRef.current;
    if (!video || !hasEntered) return;
    let cancelled = false;
    if (running) {
      void video.play().catch((error: DOMException) => {
        // Keep the transparent still if autoplay is unavailable.
        if (!cancelled && error.name !== "AbortError") setFailed(true);
      });
    } else {
      video.pause();
    }
    return () => {
      cancelled = true;
      video.pause();
    };
  }, [running, hasEntered, portrait]);

  return (
    <div ref={ref} className="hero-motion" data-running={running}>
      {!nativeAlpha && <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <defs>
          <filter id={transparencyId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            {/* Recover ink coverage from the white-matted recording. Values at
                or above 250/255 become fully transparent, including codec haze. */}
            <feColorMatrix type="matrix" values="
              0 0 0 0 0.055
              0 0 0 0 0.065
              0 0 0 0 0.080
              -0.23167 -0.77938 -0.07868 1.06838 0
            " />
          </filter>
        </defs>
      </svg>}
      <div className="hero-portrait-media" role="img" aria-label="Ink-dot portrait of Divin Joseph"
        data-ready={videoReady && !failed && !reducedMotion}>
        <img src={poster} alt="" width="1080" height="1200" loading="eager" decoding="async"
          className="hero-portrait-poster" />
        {!reducedMotion && !failed && (
          <video ref={videoRef} src={hasEntered ? portrait : undefined} poster={poster}
            className="hero-portrait-video" data-ready={videoReady} width="1080" height="1200"
            style={nativeAlpha ? undefined : { filter: `url(#${transparencyId})` }}
            loop muted playsInline preload="none" disablePictureInPicture tabIndex={-1} aria-hidden="true"
            onLoadStart={() => setVideoReady(false)}
            onPlaying={() => setVideoReady(true)} onError={() => setFailed(true)} />
        )}
      </div>
    </div>
  );
}
