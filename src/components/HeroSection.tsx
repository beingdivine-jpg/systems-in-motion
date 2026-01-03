import { useState, useEffect } from "react";
import { ArrowDown, Download, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* Interactive cursor gradient */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 transition-all duration-1000 pointer-events-none blur-[100px]"
        style={{
          background: "radial-gradient(circle, hsl(280 70% 55% / 0.5) 0%, transparent 70%)",
          left: `${mousePosition.x - 25}%`,
          top: `${mousePosition.y - 25}%`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto stagger-children">
        {/* Status badge */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent-operations/30 bg-accent-operations/10 backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-operations opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-operations"></span>
            </span>
            <span className="text-sm font-medium text-accent-operations">Open to opportunities</span>
          </span>
        </div>

        {/* Name with gradient */}
        <div className="mb-6">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none">
            <span className="block text-foreground">DIVIN</span>
            <span className="block gradient-text">JOSEPH</span>
          </h1>
        </div>

        {/* THE quote they liked - original placement */}
        <div className="relative max-w-4xl mb-12">
          <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-accent-visual via-accent-enterprise to-accent-operations" />
          <blockquote className="pl-6 md:pl-8">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-foreground">
              I don't focus on mastering a single discipline.
            </p>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium leading-snug text-muted-foreground mt-2">
              I work across systems where{" "}
              <span className="text-accent-enterprise">strategy</span>,{" "}
              <span className="text-accent-operations">technology</span>, and{" "}
              <span className="text-accent-visual">creativity</span>{" "}
              reinforce each other to create{" "}
              <span className="relative inline-block text-foreground">
                impact
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-accent-visual via-accent-enterprise to-accent-operations rounded-full" />
              </span>.
            </p>
          </blockquote>
        </div>

        {/* Quick context */}
        <p className="text-lg text-muted-foreground max-w-2xl mb-10">
          Currently making value out of tech chaos at{" "}
          <span className="text-foreground font-medium">Ferrero Group</span> in Luxembourg.
          Previously coordinated the{" "}
          <span className="text-foreground font-medium">Paris 2024 Olympics</span> broadcast
          and co-founded{" "}
          <span className="text-foreground font-medium">Asia's #1 esports team</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Button
            size="lg"
            onClick={scrollToWork}
            className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 font-display font-medium px-8 py-6 text-base"
          >
            <span className="relative z-10 flex items-center">
              Explore My Work
              <ArrowDown className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
            </span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="font-display font-medium px-8 py-6 text-base border-accent-visual/30 bg-accent-visual/5 hover:bg-accent-visual/10 text-accent-visual hover:text-accent-visual"
          >
            <Camera className="mr-2 w-5 h-5" />
            View the Lens
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="font-display font-medium px-8 py-6 text-base text-muted-foreground hover:text-foreground"
          >
            <Download className="mr-2 w-5 h-5" />
            Download CV
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent-visual to-transparent" />
      </div>
    </section>
  );
}
