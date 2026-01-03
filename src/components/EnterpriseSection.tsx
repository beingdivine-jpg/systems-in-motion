import { Building2, Radio } from "lucide-react";

const experiences = [
  {
    company: "Paris 2024 Olympics & Paralympics",
    location: "France",
    role: "Liaison Officer",
    period: "Jul – Sep 2024",
    description: "Coordinated broadcasting relations for 50+ international rights holders including NBC, BBC, Eurosport, and Viacom. Managed influencer relations during live events. Bridge between operations, media, and technical teams.",
    tags: ["50+ Broadcasters", "2 Venues", "15+ Influencers"],
    current: false,
    highlight: true,
  },
  {
    company: "Ferrero Group",
    location: "Luxembourg",
    role: "Group IT Project Manager Assistant",
    period: "Oct 2025 – Present",
    description: "Global IT Asset Management project at headquarters. Working across multi-country operations to optimize technology portfolio.",
    tags: ["ITAM", "SAP", "Portfolio Optimization"],
    current: true,
    highlight: false,
  },
  {
    company: "NSI IT Software & Services",
    location: "Luxembourg",
    role: "IT Consultant",
    period: "Oct 2025 – Present",
    description: "Consulting on IT solutions and enterprise services.",
    tags: ["Consulting", "IT Services"],
    current: true,
    highlight: false,
  },
  {
    company: "Ferrero Group",
    location: "Luxembourg",
    role: "Software Asset Management Analyst",
    period: "Mar – Sep 2025",
    description: "Contract oversight and compliance management for Group IT.",
    tags: ["SAM", "Contracts", "Compliance"],
    current: false,
    highlight: false,
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
            Enterprise & Operations
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section intro */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] mb-6">
            Global events, IT systems,
            <br />
            <span className="text-muted-foreground italic">structured environments.</span>
          </h2>
        </div>

        {/* Experience list */}
        <div>
          {experiences.map((exp, idx) => (
            <article
              key={idx}
              className={`group grid md:grid-cols-[160px_1fr] gap-4 md:gap-8 py-8 border-b border-border/50 last:border-0 ${
                exp.highlight ? "bg-accent-operations/5 -mx-6 px-6 rounded-lg border-accent-operations/20" : ""
              }`}
            >
              {/* Left - meta */}
              <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1">
                <div className="flex items-center gap-2">
                  {exp.highlight && <Radio className="w-4 h-4 text-accent-operations" />}
                  <p className="font-mono text-sm text-muted-foreground">{exp.period}</p>
                </div>
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
                  <h3 className={`font-serif text-xl font-medium text-foreground group-hover:text-accent-enterprise transition-colors ${
                    exp.highlight ? "text-accent-operations group-hover:text-accent-operations" : ""
                  }`}>
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
                      className={`px-2.5 py-1 text-xs font-mono rounded ${
                        exp.highlight 
                          ? "text-accent-operations bg-accent-operations/10" 
                          : "text-muted-foreground bg-secondary/80"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
