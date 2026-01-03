import { Building2, Database, Globe, Layers, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "IT Asset Management",
    company: "Ferrero Group",
    role: "Group IT Project Manager Assistant",
    description:
      "Spearheading ITAM initiatives across multi-country operations. Driving SAP S/4HANA integration and technology portfolio optimization for one of the world's largest confectionery companies.",
    tags: ["SAP S/4HANA", "ITAM", "Portfolio Optimization"],
    metrics: ["Multi-country visibility", "Enterprise scale", "Asset lifecycle"],
    icon: Database,
  },
  {
    title: "Technology Integration",
    company: "Enterprise Systems",
    role: "Systems Coordinator",
    description:
      "Orchestrating complex technology ecosystems. Building bridges between legacy infrastructure and modern cloud solutions while maintaining operational continuity.",
    tags: ["Cloud Migration", "System Integration", "DevOps"],
    metrics: ["Zero-downtime deployment", "Cross-platform sync", "API architecture"],
    icon: Layers,
  },
  {
    title: "Market Intelligence",
    company: "Strategic Operations",
    role: "Data & Strategy",
    description:
      "Transforming raw market data into actionable strategic insights. Developing frameworks for competitive analysis and technology trend forecasting.",
    tags: ["Data Analytics", "Strategy", "Forecasting"],
    metrics: ["Trend analysis", "Competitive mapping", "Decision support"],
    icon: Globe,
  },
];

export function EnterpriseSection() {
  return (
    <section id="work" className="relative py-32 px-6 lg:px-12 accent-enterprise">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 0% 0%, hsl(217 91% 60% / 0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-5 h-5 text-accent-enterprise" />
            <span className="font-mono text-sm text-accent-enterprise uppercase tracking-widest">
              01 / Enterprise Systems
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Building at Scale
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Managing complex IT ecosystems, driving technology transformation, and
            creating systems that serve millions across continents.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <article
                key={project.title}
                className="group relative p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm card-hover overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(217 91% 60% / 0.05) 0%, transparent 60%)",
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent-enterprise/10 border border-accent-enterprise/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-accent-enterprise" />
                  </div>

                  {/* Company badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-mono text-muted-foreground mb-3">
                    {project.company}
                  </span>

                  {/* Title & Role */}
                  <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-accent-enterprise transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.role}</p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-muted/50 text-xs font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {project.metrics.map((metric) => (
                        <span
                          key={metric}
                          className="text-xs font-mono text-accent-enterprise/80"
                        >
                          → {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight className="w-5 h-5 text-accent-enterprise" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
