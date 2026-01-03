import { useState } from "react";
import { ArrowDown, Download, Camera, Building2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mode = "enterprise" | "operations" | "visual";

const modes = {
  enterprise: {
    icon: Building2,
    label: "Enterprise Systems",
    color: "text-accent-enterprise",
    bg: "bg-accent-enterprise/10",
    border: "border-accent-enterprise/30",
  },
  operations: {
    icon: Zap,
    label: "High-Pressure Operations",
    color: "text-accent-operations",
    bg: "bg-accent-operations/10",
    border: "border-accent-operations/30",
  },
  visual: {
    icon: Camera,
    label: "Visual Work",
    color: "text-accent-visual",
    bg: "bg-accent-visual/10",
    border: "border-accent-visual/30",
  },
};

export function HeroSection() {
  const [activeMode, setActiveMode] = useState<Mode>("enterprise");

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToVisual = () => {
    document.getElementById("visual")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 overflow-hidden">
      {/* Background gradient based on active mode */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activeMode === "enterprise" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, hsl(217 91% 60% / 0.08) 0%, transparent 50%)",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activeMode === "operations" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, hsl(84 75% 44% / 0.08) 0%, transparent 50%)",
        }}
      />
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activeMode === "visual" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, hsl(0 0% 75% / 0.06) 0%, transparent 50%)",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Name tag */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-sm font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent-operations animate-pulse" />
            Divin Joseph — Luxembourg / France
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-8 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          I don't focus on mastering a single discipline.{" "}
          <span className="text-muted-foreground">
            I work across systems where strategy, technology, and creativity
            reinforce each other to create{" "}
          </span>
          <span className="relative">
            impact
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent-enterprise via-accent-operations to-accent-visual rounded-full" />
          </span>
          <span className="text-muted-foreground">.</span>
        </h1>

        {/* Mode selector */}
        <div
          className="flex flex-wrap gap-3 mb-12 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          {(Object.entries(modes) as [Mode, typeof modes.enterprise][]).map(
            ([key, mode]) => {
              const Icon = mode.icon;
              const isActive = activeMode === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveMode(key)}
                  className={`group flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-300 ${
                    isActive
                      ? `${mode.bg} ${mode.border} ${mode.color}`
                      : "border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  <span className="text-sm font-medium">{mode.label}</span>
                </button>
              );
            }
          )}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            size="lg"
            onClick={scrollToWork}
            className="group bg-foreground text-background hover:bg-foreground/90 font-display font-medium px-6"
          >
            Explore My Work
            <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToVisual}
            className="font-display font-medium px-6 border-muted-foreground/30 hover:bg-muted/30"
          >
            <Camera className="mr-2 w-4 h-4" />
            View the Lens
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="font-display font-medium px-6 text-muted-foreground hover:text-foreground"
          >
            <Download className="mr-2 w-4 h-4" />
            Download CV
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
