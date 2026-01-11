import { ScrollReveal } from "./ScrollReveal";
import { timeline } from "@/data/timeline";

const typeColors: Record<string, string> = {
  work: "bg-accent-enterprise/20",
  education: "bg-muted",
  achievement: "bg-accent-warm/20",
  startup: "bg-accent-operations/20",
};

export function TimelineSection() {
  return (
    <section id="timeline" className="py-32 lg:py-64 px-6 lg:px-12 bg-secondary/10 relative overflow-hidden">
      {/* Background Text Shadow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif italic text-foreground/[0.02] whitespace-nowrap pointer-events-none select-none">
        Journey Continuum
      </div>

      <div className="max-w-5xl mx-auto relative z-10">


        <div className="relative">
          {/* Refined Architectural Center line */}
          <div className="absolute left-[11px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent" />

          {/* Center line pulse/dash effect */}
          <div className="absolute left-[11px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-dash-pattern opacity-20 pointer-events-none" />

          <div className="space-y-32">
            {timeline.map((item, idx) => (
              <ScrollReveal key={idx} animation={idx % 2 === 0 ? "fade-right" : "fade-left"} delay={idx * 100} threshold={0.2}>
                <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-24 items-center group">
                  {/* Left Content (on desktop, alternating) */}
                  <div className={`hidden md:block text-right ${idx % 2 !== 0 ? "md:order-3 md:text-left" : ""}`}>
                    {idx % 2 === 0 ? (
                      <div className="space-y-4">
                        <span className="technical-mono text-4xl lg:text-5xl opacity-5 group-hover:opacity-20 transition-opacity duration-1000">
                          {item.year}
                        </span>
                        <div className={`inline-block px-3 py-1 rounded-full text-[9px] technical-mono uppercase tracking-widest ${typeColors[item.type]} border border-border/20`}>
                          {item.type}
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-sm ml-auto">
                        <h3 className="editorial-serif text-3xl lg:text-4xl leading-tight group-hover:italic transition-all duration-700">
                          {item.title}
                        </h3>
                        <p className="body-sans text-muted-foreground mt-4 leading-relaxed opacity-60 group-hover:opacity-100 italic">
                          {item.subtitle}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Marker */}
                  <div className="relative z-10 flex justify-center md:order-2">
                    <div className="relative">
                      {/* Architectural Rings */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-border/10 rounded-full group-hover:scale-150 transition-transform duration-1000" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-border/20 rounded-full group-hover:scale-125 transition-transform duration-700" />

                      {/* Core Dot with Pulse for Active Item */}
                      <div className={`w-6 h-6 rounded-full border-2 border-background shadow-xl scale-75 group-hover:scale-100 transition-transform duration-500 z-20 relative ${typeColors[item.type] || "bg-muted"} ${idx === 0 ? "animate-pulse-soft" : ""}`} />
                    </div>
                  </div>

                  {/* Right Content (on desktop, alternating) */}
                  <div className={`pl-12 md:pl-0 ${idx % 2 !== 0 ? "md:order-1 md:text-right" : "md:order-3"}`}>
                    <div className="md:hidden flex items-center gap-4 mb-4">
                      <span className="technical-mono text-sm opacity-40">{item.year}</span>
                      <div className={`px-2 py-0.5 rounded-full text-[8px] technical-mono uppercase tracking-tighter ${typeColors[item.type]} border border-border/10`}>
                        {item.type}
                      </div>
                    </div>

                    {idx % 2 === 0 ? (
                      <div className="max-w-sm">
                        <h3 className="editorial-serif text-3xl lg:text-4xl leading-tight group-hover:italic transition-all duration-700">
                          {item.title}
                        </h3>
                        <p className="body-sans text-muted-foreground mt-4 leading-relaxed opacity-60 group-hover:opacity-100 italic">
                          {item.subtitle}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <span className="technical-mono text-4xl lg:text-5xl opacity-5 group-hover:opacity-20 transition-opacity duration-1000">
                          {item.year}
                        </span>
                        <div className={`inline-block px-3 py-1 rounded-full text-[9px] technical-mono uppercase tracking-widest ${typeColors[item.type]} border border-border/20`}>
                          {item.type}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
