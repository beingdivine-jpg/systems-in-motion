import { GraduationCap } from "lucide-react";

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
      <div className="max-w-4xl mx-auto">
        {/* Section intro */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            How I Work
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Philosophy statements - editorial rhythm */}
        <div className="space-y-0">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] text-foreground mb-8">
            I don't operate in silos.
          </p>
          
          <div className="space-y-4 mb-16">
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-muted-foreground">
              I move between structured systems and high-pressure environments.
            </p>
            
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-muted-foreground">
              I translate between people, technology, and execution.
            </p>
            
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-muted-foreground">
              I'm comfortable where clarity is still forming.
            </p>
          </div>
        </div>

        {/* About Me */}
        <div className="mb-24">
          <h3 className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6">
            About Me
          </h3>
          <div className="relative pl-6 border-l-2 border-foreground/10">
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
              At 24, I've worked at <span className="text-foreground">Ferrero's Luxembourg headquarters</span>, 
              coordinated broadcasting for the <span className="text-foreground">Paris 2024 Olympics</span>, 
              co-founded an esports organization that reached <span className="text-foreground">Asia's top rankings</span>, 
              and competed in <span className="text-foreground">European hackathons</span>. 
            </p>
            <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed mt-4">
              Each environment required adapting quickly and thinking across disciplines.
            </p>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <GraduationCap className="w-5 h-5 text-muted-foreground" />
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Education
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {education.map((edu, idx) => (
              <div key={idx} className="group">
                <p className="font-mono text-sm text-muted-foreground mb-2">{edu.year}</p>
                <p className="font-serif text-lg text-foreground mb-1 group-hover:text-accent-enterprise transition-colors">
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
