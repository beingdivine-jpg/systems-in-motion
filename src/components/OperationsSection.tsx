import { Rocket, Radio, Gamepad2, Users, Trophy, Flame, ArrowUpRight } from "lucide-react";

const ventures = [
  {
    title: "Paris 2024 Olympics",
    subtitle: "Liaison Officer",
    period: "Jul - Sep 2024",
    badge: "50+ Broadcasters",
    badgeColor: "enterprise",
    description: "Coordinated broadcasting relations for NBC, BBC, Eurosport, Viacom and 50+ international rights holders. Managed 15+ influencers during live events.",
    icon: Radio,
    stats: [
      { value: "50+", label: "Broadcasters" },
      { value: "2", label: "Venues" },
      { value: "15+", label: "Influencers" },
    ],
    featured: true,
  },
  {
    title: "XentriX Esports",
    subtitle: "Co-Founder",
    period: "2018 - 2023",
    badge: "Asia #1",
    badgeColor: "visual",
    description: "Built and scaled esports org from scratch. Organized Starburst Women's League — one of India's first all-female tournaments. Secured sponsorships as pro player.",
    icon: Gamepad2,
    stats: [
      { value: "5", label: "Years" },
      { value: "#1", label: "Asia Rank" },
      { value: "S14", label: "Peak Season" },
    ],
    featured: true,
  },
  {
    title: "Under 25 Universe",
    subtitle: "Event Coordinator",
    period: "2022 - 2023",
    badge: "35,000 Attendees",
    badgeColor: "operations",
    description: "Contributed to one of Asia's largest youth festivals. End-to-end event management from logistics to execution.",
    icon: Users,
    stats: [
      { value: "35K+", label: "Attendees" },
      { value: "3", label: "Days" },
      { value: "Asia", label: "Scale" },
    ],
    featured: false,
  },
];

const ticker = ["Olympics", "Paralympics", "XentriX", "PUBG Mobile", "Under25", "Starburst League", "NBC", "BBC", "Eurosport"];

export function OperationsSection() {
  return (
    <section id="startups" className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-accent-operations/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-1/3 w-[400px] h-[400px] bg-accent-visual/10 rounded-full blur-[120px]" />
      </div>

      {/* Ticker */}
      <div className="relative overflow-hidden py-6 mb-12 border-y border-border/10">
        <div className="marquee-track">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className="mx-6 text-3xl md:text-4xl font-display font-bold text-muted-foreground/10 hover:text-accent-operations/30 transition-colors duration-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-operations/10 border border-accent-operations/20 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-accent-operations" />
              </div>
              <span className="font-mono text-sm text-accent-operations uppercase tracking-wider">
                Startups & Innovation
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Ideas that{" "}
              <span className="text-accent-operations">don't wait.</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-md">
            From esports arenas to Olympic broadcast centers — thriving in high-pressure, high-stakes environments.
          </p>
        </div>

        {/* Ventures - creative layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {ventures.filter(v => v.featured).map((venture, idx) => {
            const Icon = venture.icon;
            return (
              <article
                key={idx}
                className="group relative p-8 rounded-3xl border border-border/30 bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm overflow-hidden card-glow"
              >
                {/* Background glow */}
                <div className={`absolute top-0 right-0 w-1/2 h-1/2 rounded-full blur-[80px] opacity-20 pointer-events-none ${
                  venture.badgeColor === "enterprise" ? "bg-accent-enterprise" :
                  venture.badgeColor === "visual" ? "bg-accent-visual" : "bg-accent-operations"
                }`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      venture.badgeColor === "enterprise" ? "bg-accent-enterprise/10 border border-accent-enterprise/20" :
                      venture.badgeColor === "visual" ? "bg-accent-visual/10 border border-accent-visual/20" :
                      "bg-accent-operations/10 border border-accent-operations/20"
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        venture.badgeColor === "enterprise" ? "text-accent-enterprise" :
                        venture.badgeColor === "visual" ? "text-accent-visual" : "text-accent-operations"
                      }`} />
                    </div>
                    <div className={`px-4 py-2 rounded-full font-mono text-sm font-medium ${
                      venture.badgeColor === "enterprise" ? "bg-accent-enterprise/20 text-accent-enterprise border border-accent-enterprise/30" :
                      venture.badgeColor === "visual" ? "bg-accent-visual/20 text-accent-visual border border-accent-visual/30" :
                      "bg-accent-operations/20 text-accent-operations border border-accent-operations/30"
                    }`}>
                      {venture.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 group-hover:gradient-text transition-all">
                    {venture.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-1">{venture.subtitle}</p>
                  <p className="font-mono text-sm text-muted-foreground/60 mb-4">{venture.period}</p>

                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {venture.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/20">
                    {venture.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className={`text-2xl font-display font-bold ${
                          venture.badgeColor === "enterprise" ? "text-accent-enterprise" :
                          venture.badgeColor === "visual" ? "text-accent-visual" : "text-accent-operations"
                        }`}>
                          {stat.value}
                        </p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className={`w-6 h-6 ${
                    venture.badgeColor === "enterprise" ? "text-accent-enterprise" :
                    venture.badgeColor === "visual" ? "text-accent-visual" : "text-accent-operations"
                  }`} />
                </div>
              </article>
            );
          })}
        </div>

        {/* Under25 - smaller card */}
        {ventures.filter(v => !v.featured).map((venture, idx) => {
          const Icon = venture.icon;
          return (
            <article
              key={idx}
              className="group p-6 rounded-2xl border border-border/30 bg-card/50 backdrop-blur-sm card-glow"
            >
              <div className="flex flex-wrap items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-accent-operations/10 border border-accent-operations/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-accent-operations" />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-display font-bold">{venture.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-accent-operations/20 text-accent-operations text-sm font-mono">
                      {venture.badge}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-1">{venture.subtitle} · {venture.period}</p>
                  <p className="text-muted-foreground text-sm">{venture.description}</p>
                </div>
                <div className="flex gap-6">
                  {venture.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-xl font-display font-bold text-accent-operations">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}

        {/* Philosophy callout */}
        <div className="mt-12 p-8 rounded-3xl gradient-border">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-visual to-accent-operations flex items-center justify-center flex-shrink-0">
              <Flame className="w-7 h-7 text-background" />
            </div>
            <div>
              <h4 className="text-xl font-display font-bold mb-2 gradient-text">The Afterwork Builder</h4>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                I'm curious about systems that think — driven by the friction between 
                "this is how it's done" and "what if it's better?" 
                The best ideas come from challenging conventions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
