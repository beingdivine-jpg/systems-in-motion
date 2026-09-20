import { Magnetic } from "@/components/Magnetic";
import { heroContent } from "@/data/hero";

export function HeroSection() {
  return (
    <section className="portfolio-hero relative min-h-screen snap-start flex flex-col justify-center px-4 md:px-6 lg:px-12 overflow-hidden bg-background">
      {/* Cinematic Background Elements */}
      <div className="absolute top-1/4 -right-20 w-[60vw] h-[60vw] bg-accent-enterprise/5 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute -bottom-20 -left-20 w-[40vw] h-[40vw] bg-accent-visual/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

      {/* Ghost Typographic Element - Subtle Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <div aria-hidden="true" className="editorial-serif text-[25vw] leading-none tracking-tighter opacity-[0.03] blur-sm">
          Systems
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        <div className="stagger-children">
          {/* Offset Header Layout - Refined for Maximum Editorial Impact */}
          <div className="hero-introduction grid lg:grid-cols-[1.4fr_1fr] gap-x-16 gap-y-12 items-end mb-24 md:mb-32">
            <div className="relative group cursor-default">

              <h1 className="editorial-serif text-[clamp(5rem,16vw,14rem)] leading-[0.75] tracking-tighter -ml-[0.05em] text-foreground select-none font-light">
                <span className="block transform transition-transform duration-700 ease-premium hover:skew-x-2 origin-left">{heroContent.name.first}</span>
                <span className="block italic ml-[0.5ch] text-muted-foreground/50 transform transition-all duration-700 ease-premium hover:text-foreground hover:-translate-x-4">
                  {heroContent.name.last}
                </span>
              </h1>
            </div>

            <div className="lg:pb-10 lg:pl-8 flex flex-col justify-end h-full">
              <div className="relative pl-8 py-2 border-l border-border/40">
                <p className="body-sans text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                  {heroContent.introduction.map((part, i) => (
                    <span key={i} className={part.highlight ? "text-foreground font-medium" : ""}>
                      {part.text}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Call to Actions & Domain Pill-grid */}
          {/* Bottom Interaction Area - Clean Editorial Layout */}
          <div className="hero-actions flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12 mt-12 md:mt-24">
            <div className="shrink-0 flex flex-wrap gap-6 items-center">
              <Magnetic strength={0.4}>
                <a
                  href="#innovation"
                  className="group relative flex items-center gap-4 px-8 py-4 bg-background/5 border border-white/10 backdrop-blur-sm rounded-full overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-background/10 hover:pr-10"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="technical-mono text-xs whitespace-nowrap tracking-[0.2em] text-foreground/80 group-hover:text-foreground transition-colors">
                    EXPLORE // WORK
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine" />
                </a>
              </Magnetic>
            </div>

            <div className="flex flex-wrap gap-4 justify-end">
              {heroContent.expertise.map((item, i) => (
                <div key={i} className="group/item relative flex items-center gap-3 px-6 py-3 bg-background/5 border border-white/10 backdrop-blur-sm rounded-full transition-all duration-300 hover:border-white/20 hover:bg-background/10 cursor-default">
                  <span className="w-1 h-1 rounded-full bg-foreground/40 group-hover/item:bg-foreground/80 transition-colors" />
                  <span className="technical-mono text-xs tracking-[0.1em] text-foreground/60 group-hover/item:text-foreground transition-colors uppercase">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
