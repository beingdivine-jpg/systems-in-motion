import { ChevronDown, Maximize2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import { ScrollReveal } from "./ScrollReveal";
import { ventures, competitions } from "@/data/innovation";
import { Competition } from "@/types";
import { SectionHeader } from "./SectionHeader";

export function InnovationSection() {
  return (
    <section id="innovation" className="py-32 lg:py-48 px-6 lg:px-12 bg-secondary/30 relative min-h-screen snap-start flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up" delay={100}>
          <SectionHeader number="02" title="Innovation & Ventures">
            <h2 className="editorial-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tighter">
              Building <span className="italic text-muted-foreground/60">future-state</span> products
              and competing in <span className="border-b-2 border-accent-warm/20 pb-1">global innovation arenas.</span>
            </h2>
          </SectionHeader>
        </ScrollReveal>

        <div className="space-y-32">
          {ventures.map((venture, idx) => {
            const Icon = venture.icon;
            return (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 200}>
                <article className="grid lg:grid-cols-12 gap-8 items-start relative group">
                  {/* Backdrop highlight */}
                  <div className="absolute -inset-8 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10" />

                  <div className="lg:col-span-4 lg:sticky lg:top-32">
                    <div className="mb-6">
                      <div className="inline-flex p-3 bg-white/5 border border-white/10 rounded-2xl shadow-sm mb-6 backdrop-blur-md">
                        <Icon className="w-6 h-6 text-accent-warm" />
                      </div>
                      <h3 className="editorial-serif text-3xl md:text-4xl mb-3 leading-tight">{venture.title}</h3>
                      <p className="technical-mono text-accent-warm text-sm tracking-wide">{venture.role} <span className="text-muted-foreground/40 mx-2">//</span> {venture.period}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-8 lg:pl-12 border-l border-border/40">
                    <p className="body-sans text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                      {venture.description}
                    </p>

                    {venture.story && (
                      <Collapsible className="mb-10 group/story">
                        <CollapsibleTrigger className="flex items-center gap-2 text-sm technical-mono text-accent-warm hover:text-accent-warm/80 transition-colors mb-4">
                          <span>Read Full Story</span>
                          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]/story:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-6 animate-collapsible-down overflow-hidden data-[state=closed]:animate-collapsible-up">
                          {venture.story.map((para, pIdx) => (
                            <p key={pIdx} className="body-sans text-lg text-muted-foreground/80 leading-relaxed">
                              {para}
                            </p>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {venture.highlights.map((h) => (
                        <div key={h} className="group/pill flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:border-accent-warm/40 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-warm/30 group-hover/pill:bg-accent-warm transition-colors" />
                          <span className="technical-mono text-[10px]">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Technical Competition Grid */}
        <div className="mt-48 pt-32 border-t border-border/40">
          <div className="flex items-center gap-8 mb-16">
            <span className="technical-mono text-xs tracking-widest uppercase opacity-60">Acknowledgements</span>
            <div className="flex-1 h-px bg-border/20" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {competitions.map((comp, idx) => (
              <ScrollReveal key={idx} animation="scale-up" delay={idx * 150}>
                {comp.link ? (
                  <a href={comp.link} target="_blank" rel="noopener noreferrer" className="block">
                    <InnovationCompetitionContent comp={comp} idx={idx} />
                  </a>
                ) : (
                  <InnovationCompetitionContent comp={comp} idx={idx} />
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InnovationCompetitionContent({ comp, idx }: { comp: Competition, idx: number }) {
  return (
    <div className="flex items-start gap-8 group cursor-pointer">
      <div className="flex-shrink-0 technical-mono text-muted-foreground/20 text-4xl">
        0{idx + 1}
      </div>
      <div className="w-full">
        {/* Multi-image (Slide) Support - Modal Gallery */}
        {comp.slides ? (
          <Dialog>
            <DialogTrigger asChild>
              <div className="mb-6 overflow-hidden rounded-xl bg-secondary/50 relative group/gallery cursor-pointer h-64">
                <img
                  src={comp.slides[0]}
                  alt={`${comp.title} cover`}
                  className="w-full h-full object-cover object-center group-hover/gallery:scale-105 transition-transform duration-700"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <Maximize2 className="w-8 h-8 text-white/80" />
                  <span className="technical-mono text-white text-xs border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                    View Gallery_
                  </span>
                </div>
                {/* Corner Indicator */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md">
                  <span className="text-[10px] text-white technical-mono">
                    +{comp.slides.length} Images
                  </span>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-black/90 border-white/10 p-0 overflow-hidden">
              <DialogTitle className="sr-only">{comp.title} Gallery</DialogTitle>
              <div className="relative w-full aspect-video flex items-center bg-black/50">
                <Carousel className="w-full">
                  <CarouselContent>
                    {comp.slides.map((slide, sIdx) => (
                      <CarouselItem key={sIdx}>
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <img
                            src={slide}
                            alt={`${comp.title} slide ${sIdx + 1}`}
                            className="max-h-[80vh] w-auto object-contain rounded-sm"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 bg-black/50 border-white/20 hover:bg-white/20 text-white" />
                  <CarouselNext className="right-4 bg-black/50 border-white/20 hover:bg-white/20 text-white" />
                </Carousel>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          // Single Image
          comp.image && (
            <div className="mb-6 overflow-hidden rounded-xl bg-secondary/50 relative">
              <img
                src={comp.image}
                alt={comp.title}
                className={`w-full h-64 object-cover ${comp.imageClass || "object-center"} group-hover:scale-105 transition-transform duration-700`}
              />
              {comp.link && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="technical-mono text-white text-xs bg-black/50 px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                    View Project_
                  </span>
                </div>
              )}
            </div>
          )
        )}

        <div>
          <span className="technical-mono text-accent-warm mb-2 block">{comp.result}</span>
          <h4 className="editorial-serif text-2xl group-hover:italic group-hover:translate-x-2 transition-all duration-500">
            {comp.title}
          </h4>
          <p className="technical-mono text-[10px] opacity-40 mt-3">
            {comp.location} — {comp.year}
          </p>
        </div>
      </div>
    </div>
  );
}
