import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { projects } from "@/data/visual";
import { Project } from "@/types";
import { SectionHeader } from "./SectionHeader";
import { Showreel } from "./Showreel";

export function VisualSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSlide = () => setCurrentSlide(carouselApi.selectedScrollSnap() + 1);
    updateSlide();
    carouselApi.on("select", updateSlide);
    carouselApi.on("reInit", updateSlide);
    return () => {
      carouselApi.off("select", updateSlide);
      carouselApi.off("reInit", updateSlide);
    };
  }, [carouselApi]);

  return (
    <section id="visual" className="py-32 lg:py-48 px-6 lg:px-12 bg-background relative overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto">
        {/* --- PART 1: VISUAL STORYTELLING --- */}

        {/* Header & Philosophy */}
        <ScrollReveal animation="fade-up" delay={100}>
          <SectionHeader number="04" title="Visual Storytelling">
            <h2 className="editorial-serif text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-tighter mb-8">
              Making complex ideas <br />
              <span className="text-muted-foreground/80">clear through design.</span>
            </h2>

            <div className="pl-6 border-l-2 border-accent-visual/30">
              <p className="body-sans text-lg lg:text-xl text-muted-foreground leading-relaxed">
                The research and analysis behind these projects were a team effort. The <strong className="text-foreground font-medium">storytelling, visual direction and final presentation design</strong> are my own. Each piece explores how to make a complex subject easier to understand.
              </p>
            </div>
          </SectionHeader>
        </ScrollReveal>

        {/* 4-Tile Slider (Carousel) */}
        <div className="mb-24 lg:mb-48 cursor-grab active:cursor-grabbing">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={setCarouselApi}
            aria-label="Visual projects"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {projects.map((project, index) => (
                <CarouselItem key={index} aria-label={`${index + 1} of ${projects.length}: ${project.title}`} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-2/5">
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
            <div className="flex gap-4 items-center justify-end mt-6 lg:mt-8 lg:pr-12">
              <span className="technical-mono text-xs text-muted-foreground mr-auto" aria-live="polite" aria-atomic="true">
                <span className="sr-only">Project </span>{String(currentSlide).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
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
              Capturing <span className="italic text-muted-foreground/80">narratives</span> through
              cinematic <span className="border-b-2 border-accent-visual/20 pb-1">vision.</span>
            </h2>
          </SectionHeader>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured Showreel / Main Visual */}
          <div className="md:col-span-12 lg:col-span-8">
            <ScrollReveal animation="blur-in" delay={300} duration={1400}>
              <Showreel />
            </ScrollReveal>
          </div>

          {/* Side Feature - High End Architecture */}
          <div className="md:col-span-6 lg:col-span-4">
            <ScrollReveal animation="fade-up" delay={500} className="h-full">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full rounded-[2rem] overflow-hidden border border-border/40 group">
                <img
                  src="/images/metz-temple-neuf.jpg"
                  alt="Timeless Reflections: Temple Neuf"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

                <div className="absolute bottom-8 left-8 right-8">
                  <span className="technical-mono text-xs text-white block mb-2">River's Sanctuary</span>
                  <p className="body-sans text-lg text-white italic leading-relaxed">
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
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Cinematic Dark Gradient Overlay for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
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
          <span className="technical-mono text-xs text-white">
            0{index + 1}
          </span>
          <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-all duration-500 text-white">
            {project.icon}
          </div>
        </div>

        <div>
          <h3 className="editorial-serif text-2xl lg:text-3xl mb-3 text-white">
            {project.title}
          </h3>
          <p className="body-sans text-sm lg:text-base text-white leading-relaxed">
            {project.description}
          </p>
          {project.link && (
            <div className="flex items-center gap-2 mt-5 text-white">
              <span className="technical-mono text-[11px] tracking-wider underline underline-offset-4 decoration-white/60">{project.cta || "View project"}</span>
              <ExternalLink aria-hidden="true" className="w-4 h-4 shrink-0" />
            </div>
          )}
        </div>
      </div>

    </>
  );
}
