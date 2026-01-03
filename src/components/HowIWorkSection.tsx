import { User, GraduationCap } from "lucide-react";

const education = [
  {
    school: "ESIEE Paris / Université Gustave Eiffel",
    degree: "MSc Management of Technology Information Systems",
    year: "2025",
    note: "With distinction",
  },
  {
    school: "Brandenburg University of Applied Sciences",
    degree: "SAP S/4HANA Certification",
    year: "2024",
    note: null,
  },
  {
    school: "University of Turku",
    degree: "IS Project Management",
    year: "2023",
    note: "Exchange",
  },
];

export function HowIWorkSection() {
  return (
    <section id="how-i-work" className="py-28 lg:py-36 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section header - consistent with other sections */}
        <div className="flex items-center gap-4 mb-16">
          <User className="w-5 h-5 text-muted-foreground" />
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            About
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section intro - matches other sections' h2 pattern */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] mb-6">
            I don't operate in silos.
            <br />
            <span className="text-muted-foreground italic">I translate and adapt.</span>
          </h2>
        </div>

        {/* About content - using same article grid pattern as other sections */}
        <div className="mb-24">
          <article className="group grid md:grid-cols-[160px_1fr] gap-4 md:gap-8 py-8 border-b border-border/50">
            {/* Left - meta */}
            <div className="flex md:flex-col items-center md:items-start gap-3">
              <span className="font-mono text-sm text-muted-foreground">24 years old</span>
            </div>

            {/* Right - content */}
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <h3 className="font-serif text-xl font-medium text-foreground">
                  Cross-Disciplinary Background
                </h3>
              </div>
              <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed mb-4 max-w-xl">
                Worked at <span className="text-foreground">Ferrero's Luxembourg headquarters</span>, 
                coordinated broadcasting for the <span className="text-foreground">Paris 2024 Olympics</span>, 
                co-founded an esports organization that reached <span className="text-foreground">Asia's top rankings</span>, 
                and competed in <span className="text-foreground">European hackathons</span>.
              </p>
              <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed max-w-xl">
                Each environment required adapting quickly and thinking across disciplines.
              </p>
            </div>
          </article>

          {/* Philosophy points as a second article */}
          <article className="group grid md:grid-cols-[160px_1fr] gap-4 md:gap-8 py-8 border-b border-border/50 last:border-0">
            {/* Left - meta */}
            <div className="flex md:flex-col items-center md:items-start gap-3">
              <span className="font-mono text-sm text-muted-foreground">Approach</span>
            </div>

            {/* Right - content */}
            <div className="space-y-3">
              <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed max-w-xl">
                I move between structured systems and high-pressure environments.
              </p>
              <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed max-w-xl">
                I translate between people, technology, and execution.
              </p>
              <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed max-w-xl">
                I'm comfortable where clarity is still forming.
              </p>
            </div>
          </article>
        </div>

        {/* Education - using same subsection pattern as InnovationSection competitions */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <GraduationCap className="w-5 h-5 text-muted-foreground" />
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Education
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="group p-6 bg-card/50 rounded-lg border border-border/50 hover:border-foreground/20 transition-colors"
              >
                <p className="font-mono text-sm text-muted-foreground mb-3">{edu.year}</p>
                <p className="font-serif text-lg text-foreground mb-1 group-hover:text-foreground transition-colors">
                  {edu.school}
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  {edu.degree}
                  {edu.note && <span className="text-muted-foreground/50"> · {edu.note}</span>}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
