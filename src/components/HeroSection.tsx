import { useState, useEffect } from "react";
import { ArrowDown, Download, Camera, Building2, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mode = "enterprise" | "startups" | "visual";

const modes = {
  enterprise: {
    icon: Building2,
    label: "Enterprise Systems",
    description: "IT Asset Management & Technology Integration",
    color: "text-accent-enterprise",
    bg: "bg-accent-enterprise/10",
    border: "border-accent-enterprise/30",
  },
  startups: {
    icon: Rocket,
    label: "Startups & Innovation",
    description: "Building ideas that don't wait",
    color: "text-accent-operations",
    bg: "bg-accent-operations/10",
    border: "border-accent-operations/30",
  },
  visual: {
    icon: Camera,
    label: "Visual Storytelling",
    description: "Photography, Videography & Content",
    color: "text-accent-visual",
    bg: "bg-accent-visual/10",
    border: "border-accent-visual/30",
  },
};

export function HeroSection() {
  const [activeMode, setActiveMode] = useState<Mode>("enterprise");
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
    document.getElementById("enterprise")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVisual = () => {
    document.getElementById("visual")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 overflow-hidden">
      {/* Dynamic gradient orbs following cursor */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 transition-all duration-1000 pointer-events-none"
        style={{
          background:
            activeMode === "enterprise"
              ? "radial-gradient(circle, hsl(217 91% 60% / 0.4) 0%, transparent 70%)"
              : activeMode === "startups"
              ? "radial-gradient(circle, hsl(84 75% 44% / 0.4) 0%, transparent 70%)"
              : "radial-gradient(circle, hsl(0 0% 85% / 0.3) 0%, transparent 70%)",
          left: `${mousePosition.x - 30}%`,
          top: `${mousePosition.y - 30}%`,
        }}
      />

      {/* Secondary subtle orb */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20 transition-all duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          right: `${100 - mousePosition.x}%`,
          bottom: `${100 - mousePosition.y}%`,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Top badge */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-mono text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent-operations" />
            Making value out of tech chaos
          </span>
        </div>

        {/* Name - Large and Bold */}
        <h1
          className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="block text-foreground">DIVIN</span>
          <span className="block bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
            JOSEPH
          </span>
        </h1>

        {/* Philosophy quote with accent bar */}
        <div
          className="relative mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-accent-enterprise via-accent-operations to-accent-visual rounded-full" />
          <blockquote className="pl-6 text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            Days are for mastering{" "}
            <span className="text-accent-enterprise font-medium">
              IT systems at Ferrero
            </span>
            . Afterwork, I switch to{" "}
            <span className="text-accent-operations font-medium">
              creative builder
            </span>{" "}
            — experimenting, prototyping, and chasing ideas that don't wait for
            permission.
          </blockquote>
        </div>

        {/* Mode selector cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          {(Object.entries(modes) as [Mode, typeof modes.enterprise][]).map(
            ([key, mode]) => {
              const Icon = mode.icon;
              const isActive = activeMode === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveMode(key)}
                  className={`group relative p-6 rounded-2xl border transition-all duration-500 text-left overflow-hidden ${
                    isActive
                      ? `${mode.border} ${mode.bg}`
                      : "border-border/20 bg-transparent hover:border-border/40 hover:bg-card/20"
                  }`}
                >
                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-all duration-300 ${
                        isActive
                          ? `${mode.bg} ${mode.color}`
                          : "bg-muted/50 text-muted-foreground group-hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3
                      className={`font-display font-semibold mb-1 transition-colors ${
                        isActive ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {mode.label}
                    </h3>
                    <p className="text-sm text-muted-foreground/70">
                      {mode.description}
                    </p>
                  </div>

                  {/* Active bottom accent */}
                  {isActive && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                        key === "enterprise"
                          ? "bg-accent-enterprise"
                          : key === "startups"
                          ? "bg-accent-operations"
                          : "bg-accent-visual"
                      }`}
                    />
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <Button
            size="lg"
            onClick={scrollToWork}
            className="group bg-foreground text-background hover:bg-foreground/90 font-display font-medium px-8 py-6 text-base"
          >
            Explore My Journey
            <ArrowDown className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToVisual}
            className="font-display font-medium px-8 py-6 text-base border-border/30 hover:bg-card/50"
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

        {/* Quick stats */}
        <div
          className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border/10 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Ferrero
            </div>
            <div className="text-sm text-muted-foreground">
              Group IT, Luxembourg
            </div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl font-display font-bold text-accent-enterprise">
              Paris 2024
            </div>
            <div className="text-sm text-muted-foreground">Olympics Liaison</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl font-display font-bold text-accent-operations">
              Asia #1
            </div>
            <div className="text-sm text-muted-foreground">XentriX Esports</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl font-display font-bold text-muted-foreground">
              35,000+
            </div>
            <div className="text-sm text-muted-foreground">
              Festival Attendees
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-0 animate-fade-in"
        style={{ animationDelay: "0.8s" }}
      >
        <span className="text-xs font-mono uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
