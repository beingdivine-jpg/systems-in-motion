import { Building2, Briefcase, Award, GraduationCap, ArrowUpRight, Zap } from "lucide-react";

const highlights = [
  { label: "Ferrero Group", sublabel: "Luxembourg HQ", color: "enterprise" },
  { label: "Paris 2024", sublabel: "Olympics", color: "operations" },
  { label: "Asia #1", sublabel: "Esports", color: "visual" },
  { label: "35,000+", sublabel: "Festival", color: "warm" },
];

const experience = [
  {
    company: "Ferrero",
    role: "Group IT Project Manager Assistant",
    period: "Oct 2025 - Present",
    description: "Global IT Asset Management Project at HQ. Making messy inventories behave across multi-country operations.",
    tags: ["ITAM", "SAP", "Portfolio Optimization"],
    current: true,
  },
  {
    company: "NSI IT",
    role: "IT Consultant",
    period: "Oct 2025 - Present",
    description: "Consulting on IT solutions and enterprise services.",
    tags: ["Consulting", "IT Services"],
    current: true,
  },
  {
    company: "Ferrero",
    role: "SAM Analyst",
    period: "Mar - Sep 2025",
    description: "Software Asset Management and contract oversight for Group IT.",
    tags: ["SAM", "Contracts", "Compliance"],
    current: false,
  },
];

const education = [
  { school: "ESIEE Paris", degree: "MSc MoTIS", year: "2025" },
  { school: "Brandenburg Univ.", degree: "SAP S/4HANA", year: "2024" },
  { school: "Univ. of Turku", degree: "IS Project Mgmt", year: "2023" },
];

export function EnterpriseSection() {
  return (
    <section id="work" className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-accent-enterprise/5 via-accent-enterprise/2 to-transparent pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-accent-enterprise/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Stats marquee */}
        <div className="mb-16 -mx-6 lg:-mx-12 overflow-hidden">
          <div className="flex gap-6 py-6 border-y border-border/20">
            {[...highlights, ...highlights].map((item, i) => (
              <div
                key={i}
                className={`flex-shrink-0 px-8 py-4 rounded-2xl border backdrop-blur-sm ${
                  item.color === "enterprise"
                    ? "border-accent-enterprise/30 bg-accent-enterprise/5"
                    : item.color === "operations"
                    ? "border-accent-operations/30 bg-accent-operations/5"
                    : item.color === "visual"
                    ? "border-accent-visual/30 bg-accent-visual/5"
                    : "border-accent-warm/30 bg-accent-warm/5"
                }`}
              >
                <p className={`text-2xl font-display font-bold ${
                  item.color === "enterprise"
                    ? "text-accent-enterprise"
                    : item.color === "operations"
                    ? "text-accent-operations"
                    : item.color === "visual"
                    ? "text-accent-visual"
                    : "text-accent-warm"
                }`}>
                  {item.label}
                </p>
                <p className="text-sm text-muted-foreground">{item.sublabel}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-enterprise/10 border border-accent-enterprise/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-accent-enterprise" />
              </div>
              <span className="font-mono text-sm text-accent-enterprise uppercase tracking-wider">
                Enterprise
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Making tech chaos{" "}
              <span className="gradient-text">work.</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-md">
            IT Asset Management, SAP integration, and technology portfolio optimization at global scale.
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main experience cards */}
          <div className="lg:col-span-2 space-y-4">
            {experience.map((exp, idx) => (
              <article
                key={idx}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 card-glow overflow-hidden ${
                  exp.current
                    ? "border-accent-enterprise/30 bg-gradient-to-br from-accent-enterprise/10 via-card to-card"
                    : "border-border/30 bg-card/50 hover:border-accent-enterprise/20"
                }`}
              >
                {exp.current && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-operations/20 border border-accent-operations/30">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-operations opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-operations"></span>
                    </span>
                    <span className="text-xs font-mono text-accent-operations">Active</span>
                  </div>
                )}

                <div className="flex flex-wrap items-start gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent-enterprise transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-muted-foreground">{exp.role}</p>
                  </div>
                  <span className="font-mono text-sm text-accent-enterprise">{exp.period}</span>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-accent-enterprise/10 text-accent-enterprise text-sm font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Side cards */}
          <div className="space-y-4">
            {/* Achievement */}
            <div className="p-6 rounded-2xl border border-accent-warm/30 bg-gradient-to-br from-accent-warm/10 to-card">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-accent-warm" />
                <span className="font-mono text-xs text-accent-warm uppercase">Achievement</span>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">3rd Place</p>
              <p className="text-muted-foreground">European Hackathon</p>
              <p className="text-sm text-accent-warm mt-1">French Ministry</p>
            </div>

            {/* Education */}
            <div className="p-6 rounded-2xl border border-border/30 bg-card/50">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-accent-visual" />
                <span className="font-mono text-xs text-muted-foreground uppercase">Education</span>
              </div>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.school} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-foreground text-sm">{edu.school}</p>
                      <p className="text-xs text-muted-foreground">{edu.degree}</p>
                    </div>
                    <span className="text-xs font-mono text-accent-visual">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="p-6 rounded-2xl border border-border/30 bg-card/50">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-accent-enterprise" />
                <span className="font-mono text-xs text-muted-foreground uppercase">Skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["ITAM", "SAP S/4HANA", "Technology Integration", "Market Intelligence", "Project Coordination"].map((skill) => (
                  <span key={skill} className="px-2 py-1 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
