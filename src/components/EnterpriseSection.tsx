import { Building2, GraduationCap } from "lucide-react";

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
    note: "Exchange",
  },
];

export function EnterpriseSection() {
  return (
    <section id="enterprise" className="py-28 lg:py-36 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <Building2 className="w-5 h-5 text-accent-enterprise" />
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Enterprise & Systems
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section intro */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] mb-6">
            IT Asset Management, global IT projects,
            <br />
            <span className="text-muted-foreground italic">structured environments.</span>
          </h2>
        </div>

        {/* Experience list */}
        <div className="mb-24">
          {experiences.map((exp, idx) => (
            <article
              key={idx}
              className="group grid md:grid-cols-[160px_1fr] gap-4 md:gap-8 py-8 border-b border-border/50 last:border-0"
            >
              {/* Left - meta */}
              <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1">
                <p className="font-mono text-sm text-muted-foreground">{exp.period}</p>
                {exp.current && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-operations animate-pulse" />
                    <span className="font-mono text-xs text-accent-operations">Active</span>
                  </span>
                )}
              </div>

              {/* Right - content */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent-enterprise transition-colors">
                    {exp.company}
                  </h3>
                  <span className="text-muted-foreground/40">·</span>
                  <p className="font-sans text-sm text-muted-foreground">{exp.role}</p>
                </div>
                <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed mb-4 max-w-xl">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono text-muted-foreground bg-secondary/80 rounded"
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
