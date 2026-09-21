import { ScrollReveal } from "./ScrollReveal";
import { experiences, researchProjects } from "@/data/enterprise";
import { ResearchProject } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeader } from "./SectionHeader";

export function EnterpriseSection() {
  return (
    <section id="enterprise" className="py-32 lg:py-48 px-6 lg:px-12 relative overflow-hidden min-h-screen snap-start flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <ScrollReveal animation="fade-up" delay={100}>
          <SectionHeader number="02" title="Enterprise & Operations">
            <h2 className="editorial-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tighter">
              Orchestrating <span className="italic text-muted-foreground/80">complexity</span> in
              global <span className="border-b-2 border-accent-enterprise/20 pb-1">environments.</span>
            </h2>
          </SectionHeader>
        </ScrollReveal>

        <div className="flex flex-col gap-12 lg:gap-16 mb-32 lg:mb-48 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 md:left-[21%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent hidden md:block" />

          {experiences.map((exp, idx) => (
            <div key={idx} className="relative">
              <ScrollReveal animation="fade-up" delay={idx * 100} duration={1000}>
                <article className="group grid grid-cols-1 md:grid-cols-[20%_minmax(0,1fr)] gap-8 lg:gap-16 relative">
                  {/* Left: Metadata */}
                  <div className="hidden md:flex flex-col items-end text-right pt-2 relative z-10">
                    <span className={`technical-mono text-xs mb-2 ${exp.current ? "text-accent-operations" : "text-muted-foreground"}`}>
                      {exp.period}
                    </span>
                    <span className="technical-mono text-[11px] text-muted-foreground">{exp.location}</span>

                    {/* Timeline Node */}
                    <div className={`absolute right-[-33px] lg:right-[-65px] top-3 w-3 h-3 rounded-full border-2 bg-background transition-colors duration-500 ${exp.current ? "border-accent-operations" : "border-border group-hover:border-accent-enterprise"}`} />
                  </div>

                  {/* Right: Content Card */}
                  <div className="relative p-8 rounded-3xl border border-border/40 bg-secondary/5 hover:bg-secondary/10 transition-all duration-500 group-hover:border-accent-enterprise/30">
                    {/* Mobile Metadata */}
                    <div className="flex flex-col sm:flex-row md:hidden items-start sm:items-center gap-4 mb-6">
                      <span className={`technical-mono text-xs ${exp.current ? "text-accent-operations" : "text-muted-foreground"}`}>
                        [{exp.period}]
                      </span>
                      <div className="hidden sm:block h-px bg-border/40 flex-1" />
                      <span className="technical-mono text-[11px] text-muted-foreground">{exp.location}</span>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                      <div>
                        <h3 className="editorial-serif text-3xl mb-1 group-hover:text-accent-enterprise transition-colors">
                          {exp.company}
                        </h3>
                        <p className="technical-mono text-xs text-accent-enterprise">{exp.role}</p>
                      </div>
                      {exp.current && (
                        <span className="self-start shrink-0 technical-mono text-[11px] text-accent-operations bg-accent-operations/10 px-3 py-1 rounded-full border border-accent-operations/20">
                          Active_System
                        </span>
                      )}
                    </div>

                    <p className="body-copy text-muted-foreground mb-8 max-w-3xl">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="technical-mono px-3 py-1.5 bg-background border border-border/50 text-muted-foreground rounded-full text-[11px] group-hover:border-accent-enterprise/20 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* --- STRATEGIC RESEARCH --- */}
        <div className="border-t border-border/40 pt-24 lg:pt-32">
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-px bg-accent-enterprise/50" />
              <span className="technical-mono text-xs tracking-widest text-muted-foreground">Strategic Research & Analysis</span>
            </div>
          </ScrollReveal>

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              aria-label="Strategic research"
            >
              <CarouselContent className="-ml-6">
                {researchProjects.map((project, index) => (
                  <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <ScrollReveal animation="fade-left" delay={index * 100} className="h-full">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col h-full group relative bg-secondary/5 hover:bg-secondary/10 border border-border/40 hover:border-accent-enterprise/30 rounded-[2rem] p-8 transition-all duration-500 cursor-pointer"
                        >
                          <ProjectContent project={project} />
                        </a>
                      ) : (
                        <div className="h-full group relative bg-secondary/5 hover:bg-secondary/10 border border-border/40 hover:border-accent-enterprise/30 rounded-[2rem] p-8 transition-all duration-500 overflow-hidden">
                          <ProjectContent project={project} />
                        </div>
                      )}
                    </ScrollReveal>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex gap-4 justify-end mt-8 pr-12">
                <CarouselPrevious className="static translate-y-0 translate-x-0 bg-transparent border-border hover:bg-secondary hover:text-foreground h-12 w-12" />
                <CarouselNext className="static translate-y-0 translate-x-0 bg-transparent border-border hover:bg-secondary hover:text-foreground h-12 w-12" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectContent({ project }: { project: ResearchProject }) {
  return (
    <>
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:rotate-12 group-hover:scale-110 origin-top-right">
        {project.icon}
      </div>

      <div className="mb-6">
        <span className="technical-mono text-[11px] text-accent-enterprise mb-2 block">{project.type}</span>
        <h3 className="editorial-serif text-2xl lg:text-3xl leading-tight mb-2 group-hover:text-foreground transition-colors">
          {project.title}
        </h3>
        <p className="technical-mono text-xs text-muted-foreground">{project.subtitle}</p>
      </div>

      <p className="body-copy text-muted-foreground mb-8">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-3 mt-auto">
        {project.stats.map((stat, i) => (
          <span key={i} className="inline-flex items-center text-[11px] technical-mono text-muted-foreground bg-background/50 px-3 py-1 rounded-sm border border-border/20">
            {stat}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-2 text-accent-enterprise">
        {project.link && <span className="technical-mono text-[11px]">{project.cta || "View Details"}</span>}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-enterprise">
          <path d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      </div>
    </>
  );
}
