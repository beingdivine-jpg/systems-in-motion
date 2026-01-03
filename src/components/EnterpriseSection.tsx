import { Building2, Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    company: "Ferrero Group",
    location: "Luxembourg",
    role: "Group IT Project Manager Assistant",
    period: "Oct 2025 – Present",
    description: "Global IT Asset Management project at headquarters. Working across multi-country operations to optimize technology portfolio.",
    tags: ["ITAM", "SAP", "Portfolio Optimization"],
    current: true,
  },
  {
    company: "NSI IT Software & Services",
    location: "Luxembourg",
    role: "IT Consultant",
    period: "Oct 2025 – Present",
    description: "Consulting on IT solutions and enterprise services.",
    tags: ["Consulting", "IT Services"],
    current: true,
  },
  {
    company: "Ferrero Group",
    location: "Luxembourg",
    role: "Software Asset Management Analyst",
    period: "Mar – Sep 2025",
    description: "Contract oversight and compliance management for Group IT.",
    tags: ["SAM", "Contracts", "Compliance"],
    current: false,
  },
];

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
    note: "Exchange program",
  },
];

export function EnterpriseSection() {
  return (
    <section id="enterprise" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-5 h-5 text-accent-enterprise" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Enterprise & Systems
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium">
            IT Asset Management, global IT projects,
            <span className="block text-muted-foreground italic">structured environments.</span>
          </h2>
        </div>

        {/* Experience grid */}
        <div className="grid gap-8 mb-20">
          {experiences.map((exp, idx) => (
            <article
              key={idx}
              className="group grid md:grid-cols-[200px_1fr] gap-6 p-6 -mx-6 rounded-lg hover:bg-secondary/50 transition-colors duration-300"
            >
              {/* Left - meta */}
              <div className="space-y-1">
                <p className="font-mono text-sm text-muted-foreground">{exp.period}</p>
                <p className="font-mono text-xs text-muted-foreground/60">{exp.location}</p>
                {exp.current && (
                  <span className="inline-flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-operations" />
                    <span className="font-mono text-xs text-accent-operations">Current</span>
                  </span>
                )}
              </div>

              {/* Right - content */}
              <div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-1 group-hover:text-accent-enterprise transition-colors">
                  {exp.company}
                </h3>
                <p className="font-sans text-sm text-muted-foreground mb-3">{exp.role}</p>
                <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed mb-4">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-mono text-muted-foreground bg-secondary rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-5 h-5 text-muted-foreground" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Education
            </span>
          </div>

          <div className="grid gap-6">
            {education.map((edu, idx) => (
              <div key={idx} className="grid md:grid-cols-[200px_1fr] gap-4">
                <p className="font-mono text-sm text-muted-foreground">{edu.year}</p>
                <div>
                  <p className="font-serif text-lg text-foreground">{edu.school}</p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {edu.degree}
                    {edu.note && <span className="text-muted-foreground/60"> · {edu.note}</span>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
