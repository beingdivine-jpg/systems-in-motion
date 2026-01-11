import { ExternalLink } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { projects } from "@/data/visual";
import { Project } from "@/types";
import { SectionHeader } from "./SectionHeader";

export function VisualSection() {
  return (
    <section id="visual" className="py-32 lg:py-48 px-6 lg:px-12 bg-background relative overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        {/* --- PART 1: THE FOUNDATION (Structural Narrative) --- */}

        {/* Header & Philosophy */}
        <ScrollReveal animation="fade-up" delay={100}>
          <SectionHeader number="04" title="Structural Narrative">
            <h2 className="editorial-serif text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter mb-8">
              Structural Narrative & <br />
              <span className="text-muted-foreground/60">Aesthetic Framework</span>
            </h2>

            <div className="pl-6 border-l-2 border-accent-visual/30">
              <p className="body-sans text-lg lg:text-xl text-muted-foreground leading-relaxed">
                While the foundational research and data analysis for these projects were the result of collaborative group efforts,
                the <strong className="text-foreground font-medium">structural narrative, aesthetic direction, and final visual execution</strong> presented here are solely my own work.
                I translated raw data into compelling, immersive stories through rigorous information architecture and creative direction.
              </p>
            </div>
          </SectionHeader>
        </ScrollReveal>

        {/* 4-Tile Slider (Carousel) */}
        <div className="mb-32 lg:mb-48 cursor-grab active:cursor-grabbing">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {projects.map((project, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-2/5">
                  <ScrollReveal animation="fade-left" delay={index * 100} className="h-full">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group relative aspect-[3/4] md:aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-border/40 bg-secondary/10 hover:border-accent-visual/50 transition-colors duration-500"
                      >
                        <VisualTileContent project={project} index={index} />
                      </a>
                    ) : (
                      <div
                        className="group relative aspect-[3/4] md:aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-border/40 bg-secondary/10 hover:border-accent-visual/50 transition-colors duration-500"
                      >
                        <VisualTileContent project={project} index={index} />
                      </div>
                    )}
                  </ScrollReveal>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom Navigation Controls (Bottom Right) */}
            <div className="hidden lg:flex gap-4 justify-end mt-8 pr-12">
              <CarouselPrevious className="static translate-y-0 translate-x-0 bg-transparent border-border hover:bg-secondary hover:text-foreground h-12 w-12" />
              <CarouselNext className="static translate-y-0 translate-x-0 bg-transparent border-border hover:bg-secondary hover:text-foreground h-12 w-12" />
            </div>
          </Carousel>
        </div>

        {/* --- PART 2: THE RESULT (Cinematic Vision) --- */}

        {/* Header Link */}
        <ScrollReveal animation="fade-up" delay={200}>
          <SectionHeader number="05" title="Cinematic Vision">
            <h2 className="editorial-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tighter">
              Capturing <span className="italic text-muted-foreground/60">narratives</span> through
              cinematic <span className="border-b-2 border-accent-visual/20 pb-1">vision.</span>
            </h2>
          </SectionHeader>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured Showreel / Main Visual */}
          <div className="md:col-span-12 lg:col-span-8">
            <ScrollReveal animation="blur-in" delay={300} duration={1400}>
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden group border border-border/40 shadow-2xl">
                <video
                  src="/showreel.mov"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />

                <div className="absolute bottom-10 left-10 text-white pointer-events-none">
                  <span className="technical-mono text-[10px] opacity-60 mb-2 block">Featured Piece</span>
                  <h3 className="editorial-serif text-3xl">Cinematic Travel Narrative</h3>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Side Feature - High End Architecture */}
          <div className="md:col-span-6 lg:col-span-4">
            <ScrollReveal animation="fade-up" delay={500} className="h-full">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden border border-border/40 group">
                <img
                  src="/images/metz-temple-neuf.jpg"
                  alt="Timeless Reflections: Temple Neuf"
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors pointer-events-none" />

                <div className="absolute bottom-8 left-8 right-8">
                  <span className="technical-mono text-white/80 block mb-2">River's Sanctuary</span>
                  <p className="body-sans text-lg text-white/90 italic leading-relaxed backdrop-blur-sm">
                    "Visual thinking is the bridge between complex systems and human experience."
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
}

function VisualTileContent({ project, index }: { project: Project, index: number }) {
  return (
    <>
      {/* Background Image (If available) */}
      {project.image && (
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Cinematic Dark Gradient Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        </div>
      )}

      {/* Background Gradient (If no image) */}
      {!project.image && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-10`}
        />
      )}

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-30">
        <div className="flex justify-between items-start">
          <span className="technical-mono text-xs text-white/70 group-hover:text-white transition-colors">
            0{index + 1}
          </span>
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-all duration-500 text-white">
            {project.icon}
          </div>
        </div>

        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-premium">
          <h3 className="editorial-serif text-2xl lg:text-3xl mb-3 text-white">
            {project.title}
          </h3>
          <p className="body-sans text-sm lg:text-base text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>
        </div>
      </div>

      {/* Interactive Cues */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
        {project.cta && <span className="technical-mono text-[10px] text-white/90 tracking-wider">{project.cta}</span>}
        {project.link ? (
          <ExternalLink className="w-5 h-5 text-white" />
        ) : (
          <div className="w-8 h-8">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
