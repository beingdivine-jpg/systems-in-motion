import { GraduationCap } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { education } from "@/data/how-i-work";
import { SectionHeader } from "./SectionHeader";

export function HowIWorkSection() {
  return (
    <section id="how-i-work" className="py-32 lg:py-48 px-6 lg:px-12 bg-background relative overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      {/* Decorative Background Element */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-accent-enterprise/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal animation="fade-up">
          <SectionHeader number="01" title="Philosophy">
            <h2 className="editorial-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-foreground">
              Moving between <span className="italic text-muted-foreground/40">structured</span> systems and <span className="text-accent-operations">ambiguous</span> spaces.
            </h2>
          </SectionHeader>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start mb-48">
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="space-y-6">
                  <span className="technical-mono text-[10px] uppercase tracking-widest text-accent-enterprise/60 block">The Approach</span>
                  <p className="body-sans text-xl leading-relaxed text-muted-foreground">
                    I translate between <span className="text-foreground font-medium">technology</span> and <span className="text-foreground font-medium">execution</span>. My role is to find the narrative thread in high-pressure operations.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="space-y-6">
                  <span className="technical-mono text-[10px] uppercase tracking-widest text-accent-enterprise/60 block">The Goal</span>
                  <p className="body-sans text-xl leading-relaxed text-muted-foreground">
                    I thrive where clarity is still forming — shaping fragmented inputs into <span className="italic text-foreground">precise strategy</span> and actionable outcomes.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Aligned Global Lens Content */}
          <div className="lg:col-span-5 lg:pt-0">
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="space-y-6 pt-2">
                <span className="technical-mono text-[10px] uppercase tracking-widest text-accent-enterprise/60 block">Global Lens</span>
                <p className="body-sans text-lg text-muted-foreground leading-relaxed">
                  Spanning Group IT strategic management at Ferrero headquarters in Luxembourg, Olympic venue broadcast operations in Paris, strong esports contributions across Asia, and deep engagement with innovation and startup ecosystems, I view systems not as fixed structures but as <span className="text-foreground font-medium">fluid entities in constant motion</span>.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Education Refinement */}
        <div className="pt-32 border-t border-border/40">
          <ScrollReveal animation="fade-up">
            <div className="flex items-center gap-8 mb-24">
              <span className="technical-mono text-xs tracking-[0.4em] uppercase opacity-40">Academics // Records</span>
              <div className="flex-1 h-px bg-border/20" />
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-px bg-border/20 border-x border-border/20">
            {education.map((edu, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 150} className="bg-background p-12 lg:p-16 hover:bg-secondary/20 transition-all duration-700 group card-hover-elevation border-b border-border/10 lg:border-b-0">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <span className="technical-mono text-accent-enterprise text-sm">
                      /{edu.year}
                    </span>
                    {/* Core Dot with Pulse for Active Item */}
                    <div className={`w-6 h-6 rounded-full border-2 border-background shadow-xl scale-75 group-hover:scale-100 transition-transform duration-500 z-20 relative ${idx === 0 ? "animate-pulse-soft shadow-[0_0_20px_rgba(var(--accent-enterprise),0.3)] bg-accent-enterprise" : "bg-muted"}`} />
                    <div className="w-8 h-8 rounded-full border border-border/40 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="editorial-serif text-2xl lg:text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-500">
                      {edu.school}
                    </h4>
                    <p className="technical-mono text-[11px] uppercase tracking-wider text-muted-foreground leading-relaxed">
                      {edu.degree}
                      {edu.note && <span className="block mt-2 text-accent-warm/70 italic">[{edu.note}]</span>}
                    </p>
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
