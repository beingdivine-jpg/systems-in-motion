import { useEffect, useRef } from "react";
import type { CuriosityScene } from "./hero/curiosity-scene";

/** Lazy-load the decorative 3D scene separately from the page and portrait. */
export function HeroCuriosity({ running }: { running: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<CuriosityScene | null>(null);
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
    sceneRef.current?.setRunning(running);
  }, [running]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    void import("./hero/curiosity-scene").then(({ createCuriosityScene }) => {
      if (cancelled) return;
      const scene = createCuriosityScene(canvas);
      sceneRef.current = scene;
      scene.setRunning(runningRef.current);
    }).catch(() => {
      // The portrait remains intact if WebGL is unavailable or the chunk fails.
      if (!cancelled) canvas.dataset.ready = "false";
    });
    return () => {
      cancelled = true;
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-curiosity" aria-hidden="true" data-ready="false" />;
}
