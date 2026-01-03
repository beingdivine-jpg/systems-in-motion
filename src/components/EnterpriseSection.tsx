import { Building2, Database, Award, GraduationCap, Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Ferrero",
    role: "Group IT Project Manager Assistant",
    period: "Oct 2025 - Present",
    location: "Luxembourg HQ",
    description:
      "Working on Global IT Asset Management Project, making messy inventories behave across multi-country operations.",
    tags: ["ITAM", "SAP Integration", "Technology Portfolio"],
    current: true,
  },
  {
    company: "Ferrero",
    role: "SAM Analyst / Contract Manager Assistant",
    period: "Mar 2025 - Sep 2025",
    location: "Luxembourg",
    description:
      "Software Asset Management and contract oversight for Group IT. Ensuring compliance and optimization.",
    tags: ["SAM", "Contract Management", "Compliance"],
    current: false,
  },
  {
    company: "NSI IT Software & Services",
    role: "IT Consultant",
    period: "Oct 2025 - Present",
    location: "Luxembourg",
    description: "Consulting on IT solutions and enterprise services.",
    tags: ["Consulting", "IT Services"],
    current: true,
  },
];

const education = [
  {
    institution: "ESIEE Paris",
    degree: "MSc Management of Technology & Information Systems",
    period: "2023 - 2025",
  },
  {
    institution: "Brandenburg University",
    degree: "SAP S/4HANA (TS410)",
    period: "2023 - 2024",
  },
  {
    institution: "University of Turku",
    degree: "IS International Project Management",
    period: "2023",
  },
];

const skills = [
  "IT Asset Management",
  "SAP S/4HANA",
  "Technology Integration",
  "Market Intelligence",
  "Project Coordination",
];

export function EnterpriseSection() {
  return (
    <section id="enterprise" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-enterprise/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent-enterprise/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-enterprise/10 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-accent-enterprise" />
          </div>
          <span className="font-mono text-sm text-accent-enterprise uppercase tracking-widest">
            01 / Enterprise Systems
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
          Making tech chaos
          <span className="text-accent-enterprise"> work.</span>
        </h2>

        <p className="text-xl text-muted-foreground max-w-2xl mb-16">
          IT Asset Management, SAP integration, and technology portfolio
          optimization at global scale.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main experience column */}
          <div className="lg:col-span-2 space-y-6">
            {experiences.map((exp, idx) => (
              <article
                key={idx}
                className={`group relative p-8 rounded-2xl border transition-all duration-300 hover:border-accent-enterprise/30 ${
                  exp.current
                    ? "border-accent-enterprise/20 bg-gradient-to-br from-accent-enterprise/5 to-transparent"
                    : "border-border/20 bg-card/30 hover:bg-card/50"
                }`}
              >
                {exp.current && (
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-accent-enterprise text-background text-xs font-mono rounded-full">
                    CURRENT
                  </div>
                )}

                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-foreground group-hover:text-accent-enterprise transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-lg text-muted-foreground">{exp.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-accent-enterprise">
                      {exp.period}
                    </p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-accent-enterprise/10 text-accent-enterprise text-sm font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Side column - Education & Skills */}
          <div className="space-y-8">
            {/* Skills card */}
            <div className="p-6 rounded-2xl border border-border/20 bg-card/30">
              <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-accent-enterprise" />
                Core Skills
              </h4>
              <div className="space-y-3">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent-enterprise" />
                    <span className="text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education card */}
            <div className="p-6 rounded-2xl border border-border/20 bg-card/30">
              <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent-enterprise" />
                Education
              </h4>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className="pb-4 border-b border-border/10 last:border-0 last:pb-0"
                  >
                    <p className="font-medium text-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.degree}</p>
                    <p className="text-xs font-mono text-accent-enterprise/70 mt-1">
                      {edu.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement */}
            <div className="p-6 rounded-2xl border border-accent-enterprise/30 bg-gradient-to-br from-accent-enterprise/10 to-transparent">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-accent-enterprise" />
                <span className="font-mono text-xs text-accent-enterprise">
                  ACHIEVEMENT
                </span>
              </div>
              <p className="text-lg font-display font-semibold">3rd Place</p>
              <p className="text-sm text-muted-foreground">
                European Hackathon - French Ministry
              </p>
            </div>

            {/* Certification */}
            <div className="p-6 rounded-2xl border border-border/20 bg-card/30">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">
                  CERTIFICATION
                </span>
              </div>
              <p className="font-display font-semibold">LVMH Inside</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
