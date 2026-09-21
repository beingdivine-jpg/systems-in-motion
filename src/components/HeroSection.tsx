import { heroContent } from "@/data/hero";
import { HeroMotion } from "./HeroMotion";

export function HeroSection() {
  return (
    <section className="portfolio-hero relative min-h-[100svh] snap-start flex flex-col justify-center pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-clip bg-background">
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/4 -right-20 w-[60vw] h-[60vw] bg-accent-enterprise/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute -bottom-20 -left-20 w-[40vw] h-[40vw] bg-accent-visual/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

      {/* Ghost Typographic Element - Subtle Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <div aria-hidden="true" className="editorial-serif text-[25vw] leading-none tracking-tighter opacity-[0.03] blur-sm">
          Systems
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12">
        <div className="stagger-children">
          <div className="hero-introduction grid sm:grid-cols-[1.25fr_1fr] gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="hero-identity flex flex-col gap-8 md:gap-10 lg:gap-12">
              <h1 className="editorial-serif text-[clamp(5rem,16vw,14rem)] leading-[0.75] tracking-tighter -ml-[0.05em] text-foreground select-none font-light cursor-default">
                <span className="block transform transition-transform duration-700 ease-premium hover:skew-x-2 origin-left">{heroContent.name.first}</span>
                <span className="block italic ml-[0.5ch] text-muted-foreground/50 transform transition-all duration-700 ease-premium hover:text-foreground hover:-translate-x-4">
                  {heroContent.name.last}
                </span>
              </h1>
              <p className="body-sans text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                {heroContent.introduction.map((part, i) => (
                  <span key={i} className={part.highlight ? "text-foreground font-medium" : ""}>
                    {part.text}
                  </span>
                ))}
              </p>
            </div>
            <HeroMotion />
          </div>
        </div>
      </div>
    </section>
  );
}
