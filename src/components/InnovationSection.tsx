import { ChevronDown, ExternalLink, Maximize2 } from "lucide-react";
import type { ReactNode } from "react";
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
import { ventures, competitions, recentProjects, recentResults, communityContributions } from "@/data/innovation";
import type { Competition, ProjectLink, Venture } from "@/types";
import { SectionHeader } from "./SectionHeader";

export function InnovationSection() {
  return (
    <section id="innovation" className="py-32 lg:py-48 px-6 lg:px-12 bg-secondary/30 relative min-h-screen snap-start flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up" delay={100}>
          <SectionHeader number="03" title="Innovation & Ventures">
            <h2 className="editorial-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tighter">
              Building <span className="italic text-muted-foreground/80">future-state</span> products
              and competing in <span className="border-b-2 border-accent-warm/20 pb-1">global innovation arenas.</span>
            </h2>
            <p className="body-sans text-lg text-muted-foreground leading-relaxed mt-8">
              <span className="text-foreground font-medium">20+ hackathons across Europe.</span> A selection of the projects and results along the way.
            </p>
          </SectionHeader>
        </ScrollReveal>

        <nav aria-label="Innovation directory" className="flex flex-wrap gap-x-8 gap-y-2 mb-12 lg:mb-20 border-b border-border/60 pb-6">
          {[
            ["Recent work", "recent-work"],
            ["Community", "community"],
            ["Earlier work", "earlier-work"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} className="technical-mono text-xs text-accent-warm min-h-11 inline-flex items-center border-b border-transparent hover:border-accent-warm focus-visible:border-accent-warm transition-colors">
              {label}
            </a>
          ))}
        </nav>

        <div id="recent-work">
          <InnovationProjectList items={recentProjects} />
        </div>

        <InnovationSubsection title="Recent Results & Participation">
          <InnovationCompetitionGrid items={recentResults} />
        </InnovationSubsection>

        <InnovationSubsection id="community" title="Community Contributions">
          <InnovationProjectList items={communityContributions} compact />
        </InnovationSubsection>

        <InnovationSubsection id="earlier-work" title="Earlier Projects & Initiatives">
          <InnovationProjectList items={ventures} />
        </InnovationSubsection>

        <InnovationSubsection title="Earlier Competitions">
          <InnovationCompetitionGrid items={competitions} />
        </InnovationSubsection>
      </div>
    </section>
  );
}

function InnovationSubsection({ id, title, children }: { id?: string; title: string; children: ReactNode }) {
  return (
    <div id={id} className="mt-20 pt-12 md:mt-28 md:pt-16 lg:mt-36 lg:pt-20 border-t border-border/40">
      <div className="flex items-center gap-8 mb-10 lg:mb-16">
        <h3 className="technical-mono text-xs tracking-widest text-muted-foreground">{title}</h3>
        <div className="flex-1 h-px bg-border/20" />
      </div>
      {children}
    </div>
  );
}

function InnovationProjectList({ items, compact = false }: { items: Venture[], compact?: boolean }) {
  return (
    <div className={compact ? "space-y-12 lg:space-y-16" : "space-y-20 lg:space-y-32"}>
      {items.map((venture, idx) => {
        const Icon = venture.icon;
        return (
          <ScrollReveal key={venture.title} animation="fade-up" delay={idx * 200}>
            <article className={`grid lg:grid-cols-12 ${compact ? "gap-4 lg:gap-8" : "gap-6 lg:gap-8"} items-start relative group`}>
              {/* Backdrop highlight */}
              <div className="absolute -inset-4 lg:-inset-8 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10" />

              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <div className={compact ? "mb-2" : "mb-6"}>
                  {!compact && <div className="inline-flex p-3 bg-white/5 border border-white/10 rounded-2xl shadow-sm mb-6 backdrop-blur-md">
                    <Icon aria-hidden="true" className="w-6 h-6 text-accent-warm" />
                  </div>}
                  <h3 className="editorial-serif text-3xl md:text-4xl mb-3 leading-tight">{venture.title}</h3>
                  <p className="technical-mono text-accent-warm text-xs tracking-wide">
                    {venture.role}
                    {venture.period && (
                      <>
                        <span className="text-muted-foreground mx-2">//</span>
                        {venture.period}
                      </>
                    )}
                  </p>
                </div>
                <InnovationLinks links={venture.links} />
              </div>

              <div className="lg:col-span-8 lg:pl-12 lg:border-l border-border/40">
                <p className="body-sans text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                  {venture.description}
                </p>

                {venture.contribution && (
                  <div className="mb-6">
                    <p className="technical-mono text-[11px] text-accent-warm mb-2">My contribution</p>
                    <p className="body-sans text-lg text-muted-foreground">{venture.contribution}</p>
                  </div>
                )}
                {venture.outcome && (
                  <div className="border-l-2 border-accent-operations/50 pl-5 mb-6">
                    <p className="technical-mono text-[11px] text-accent-operations mb-1">Team result</p>
                    <p className="editorial-serif text-2xl md:text-3xl text-accent-operations">{venture.outcome}</p>
                  </div>
                )}
                {venture.note && <p className="body-sans text-base text-muted-foreground mb-6">{venture.note}</p>}

                {venture.story && (
                  <Collapsible className="mb-10 group/story">
                    <CollapsibleTrigger className="flex items-center gap-2 min-h-11 text-xs technical-mono text-accent-warm hover:text-accent-warm/80 transition-colors mb-4">
                      <span>Read Full Story</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]/story:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-6 animate-collapsible-down overflow-hidden data-[state=closed]:animate-collapsible-up">
                      {venture.story.map((para, pIdx) => (
                        <p key={pIdx} className="body-sans text-lg text-muted-foreground leading-relaxed">
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
                      <span className="technical-mono text-[11px] text-muted-foreground">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

function InnovationLinks({ links }: { links?: ProjectLink[] }) {
  if (!links?.length) return null;

  return (
    <div className="flex flex-wrap gap-6 mt-6">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-h-11 gap-2 technical-mono text-xs text-accent-warm border-b border-accent-warm/40 py-2 hover:border-accent-warm transition-colors"
        >
          {link.label}
          <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function InnovationCompetitionGrid({ items }: { items: Competition[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      {items.map((comp, idx) => (
        <ScrollReveal key={comp.title} animation="scale-up" delay={idx * 150}>
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
  );
}

function InnovationCompetitionContent({ comp, idx }: { comp: Competition, idx: number }) {
  return (
    <div className={`flex items-start gap-4 lg:gap-8 group ${comp.link || comp.slides ? "cursor-pointer" : ""}`}>
      <div aria-hidden="true" className="flex-shrink-0 technical-mono text-muted-foreground/40 text-xl lg:text-3xl leading-none pt-1">
        0{idx + 1}
      </div>
      <div className="w-full">
        {/* Multi-image (Slide) Support - Modal Gallery */}
        {comp.slides ? (
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={`Open ${comp.title} gallery`}
                className="block w-full text-left mb-6 overflow-hidden rounded-xl bg-secondary/50 relative group/gallery cursor-pointer h-64 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-warm"
              >
                <img
                  src={comp.slides[0]}
                  alt={`${comp.title} cover`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover/gallery:scale-105 transition-transform duration-700"
                />
                {/* Hover Overlay */}
                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <Maximize2 className="w-8 h-8 text-white/80" />
                  <span className="technical-mono text-white text-xs border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                    View Gallery_
                  </span>
                </span>
                {/* Corner Indicator */}
                <span className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md">
                  <span className="text-[11px] text-white technical-mono">
                    {comp.slides.length} Images
                  </span>
                </span>
              </button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined} className="max-w-4xl bg-black/90 border-white/10 p-0 overflow-hidden">
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
                loading="lazy"
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
          <p className="technical-mono text-[11px] text-muted-foreground mt-3">
            {comp.location} — {comp.year}
          </p>
          {comp.description && (
            <p className="body-sans text-base text-muted-foreground leading-relaxed mt-6">
              {comp.description}
            </p>
          )}
          <InnovationLinks links={comp.links} />
        </div>
      </div>
    </div>
  );
}
