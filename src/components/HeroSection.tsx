import { ArrowDown, Download, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToWork = () => {
    document.getElementById("how-i-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12">
      <div className="max-w-4xl mx-auto stagger-children">
        {/* Name - editorial style */}
        <div className="mb-16">
          <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase mb-4">
            Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.9]">
            Divin
            <br />
            <span className="italic text-muted-foreground">Joseph</span>
          </h1>
        </div>

        {/* THE quote - preserved exactly as requested */}
        <div className="relative max-w-3xl mb-16">
          <div className="absolute -left-4 md:-left-8 top-0 bottom-0 w-px bg-foreground/20" />
          <blockquote className="pl-6 md:pl-10">
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed text-foreground">
              I don't focus on mastering a single discipline.
            </p>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed text-muted-foreground mt-4">
              I work across systems where{" "}
              <span className="text-accent-enterprise">strategy</span>,{" "}
              <span className="text-accent-operations">technology</span>, and{" "}
              <span className="text-accent-visual">creativity</span>{" "}
              reinforce each other to create{" "}
              <span className="text-foreground italic">impact</span>.
            </p>
          </blockquote>
        </div>

        {/* Subtitle */}
        <p className="font-sans text-base md:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed">
          Enterprise IT · Global Events · Innovation · Visual Storytelling
        </p>

        {/* CTAs - minimal */}
        <div className="flex flex-wrap gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToWork}
            className="group font-sans text-sm font-medium px-6 py-5 border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Explore My Work
            <ArrowDown className="ml-2 w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="font-sans text-sm font-medium px-6 py-5 text-muted-foreground hover:text-foreground"
          >
            <Camera className="mr-2 w-4 h-4" />
            View the Lens
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="font-sans text-sm font-medium px-6 py-5 text-muted-foreground hover:text-foreground"
          >
            <Download className="mr-2 w-4 h-4" />
            Download CV
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/30 to-transparent" />
      </div>
    </section>
  );
}
