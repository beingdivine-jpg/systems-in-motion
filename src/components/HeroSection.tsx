import { ArrowDown, Download, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToWork = () => {
    document.getElementById("how-i-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 lg:px-12 pt-32 pb-8">
      {/* Main content - pushed up slightly for better balance */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
        <div className="stagger-children">
          {/* Overline */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2">
              <span className="w-8 h-px bg-foreground/30" />
              <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Portfolio 2025
              </span>
            </span>
          </div>

          {/* Name - larger, more impactful */}
          <div className="mb-12 md:mb-16">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight leading-[0.85]">
              <span className="block">Divin</span>
              <span className="block italic text-muted-foreground/70">Joseph</span>
            </h1>
          </div>

          {/* Quote - more prominent with better spacing */}
          <div className="relative max-w-3xl mb-12 md:mb-16">
            <div className="absolute -left-4 md:-left-6 top-2 bottom-2 w-[2px] bg-gradient-to-b from-foreground/40 via-foreground/20 to-transparent" />
            <blockquote className="pl-6 md:pl-8">
              <p className="font-serif text-xl md:text-2xl lg:text-3xl font-normal leading-[1.4] text-foreground/90">
                I don't focus on mastering a single discipline.
              </p>
              <p className="font-serif text-xl md:text-2xl lg:text-3xl font-normal leading-[1.4] text-muted-foreground mt-3">
                I work across systems where{" "}
                <span className="text-accent-enterprise font-medium">strategy</span>,{" "}
                <span className="text-accent-operations font-medium">technology</span>, and{" "}
                <span className="text-accent-visual font-medium">creativity</span>{" "}
                reinforce each other to create{" "}
                <em className="text-foreground not-italic font-medium">impact</em>.
              </p>
            </blockquote>
          </div>

          {/* Domain tags - cleaner presentation */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 md:mb-12">
            {["Enterprise IT", "Global Events", "Innovation", "Visual Storytelling"].map((domain, i) => (
              <span key={domain} className="flex items-center gap-2">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-muted-foreground/30 hidden sm:block" />}
                <span className="font-sans text-sm text-muted-foreground">{domain}</span>
              </span>
            ))}
          </div>

          {/* CTAs - clearer hierarchy */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="default"
              size="lg"
              onClick={scrollToWork}
              className="group font-sans text-sm font-medium px-7 py-6 bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
            >
              Explore My Work
              <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </Button>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="lg"
                className="font-sans text-sm font-medium px-5 py-6 text-muted-foreground hover:text-foreground"
              >
                <Camera className="mr-2 w-4 h-4" />
                Visual Work
              </Button>
              <span className="w-px h-4 bg-border hidden sm:block" />
              <Button
                variant="ghost"
                size="lg"
                className="font-sans text-sm font-medium px-5 py-6 text-muted-foreground hover:text-foreground"
              >
                <Download className="mr-2 w-4 h-4" />
                CV
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - properly positioned at bottom */}
      <div className="flex justify-center pt-8">
        <button 
          onClick={scrollToWork}
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-current to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </section>
  );
}
