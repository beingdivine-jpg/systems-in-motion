import { Rocket, Radio, Trophy, Users, Gamepad2, Flame } from "lucide-react";

const ventures = [
  {
    title: "XentriX Esports",
    role: "Co-Founder",
    period: "2018 - 2023",
    achievement: "Asia Rank #1",
    description:
      "Co-founded and scaled an esports organization. Recruited players, organized tournaments including Starburst Women's League — one of the earliest all-female squad tournaments in India. Secured sponsorships as a professional player.",
    metrics: [
      { label: "Years Active", value: "5" },
      { label: "Peak Rank", value: "Asia #1" },
      { label: "Major Event", value: "Starburst League" },
    ],
    icon: Gamepad2,
    accentClass: "accent-operations",
  },
  {
    title: "Paris 2024 Olympics",
    role: "Liaison Officer",
    period: "Jul - Sep 2024",
    achievement: "50+ Broadcasters",
    description:
      "Coordinated broadcasting relations for international rights holders including NBC, BBC, Eurosport, Viacom. Managed 15+ social media influencers during live events at Roland Garros & Yves du Manoir.",
    metrics: [
      { label: "Broadcasters", value: "50+" },
      { label: "Influencers", value: "15+" },
      { label: "Venues", value: "2" },
    ],
    icon: Radio,
    accentClass: "accent-enterprise",
  },
  {
    title: "Under 25 Universe",
    role: "Event Coordinator",
    period: "2022 - 2023",
    achievement: "35,000 Attendees",
    description:
      "Contributed to organizing one of the largest youth festivals in Asia. End-to-end event management from logistics to execution at Under25 Summit in Bengaluru.",
    metrics: [
      { label: "Attendees", value: "35,000+" },
      { label: "Location", value: "Bengaluru" },
      { label: "Scale", value: "Asia's Largest" },
    ],
    icon: Users,
    accentClass: "accent-visual",
  },
];

const ticker = [
  "XentriX Esports",
  "Paris 2024",
  "Under25 Summit",
  "Olympics",
  "Paralympics",
  "PUBG Mobile",
  "Starburst League",
  "NBC",
  "BBC",
  "Eurosport",
];

export function OperationsSection() {
  return (
    <section
      id="startups"
      className="relative py-32 px-6 lg:px-12 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-operations/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-enterprise/10 rounded-full blur-[100px] animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Ticker tape */}
      <div className="relative overflow-hidden py-4 mb-16 border-y border-border/10">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span
              key={i}
              className="mx-8 text-2xl font-display font-bold text-muted-foreground/20 hover:text-accent-operations/50 transition-colors cursor-default"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-operations/10 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-accent-operations" />
          </div>
          <span className="font-mono text-sm text-accent-operations uppercase tracking-widest">
            02 / Startups & Innovation
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl">
          Building ideas that
          <span className="text-accent-operations"> don't wait.</span>
        </h2>

        <p className="text-xl text-muted-foreground max-w-2xl mb-16">
          From esports organizations to Olympic coordination. Thriving in
          high-pressure, high-stakes environments.
        </p>

        {/* Ventures grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map((venture, idx) => {
            const Icon = venture.icon;
            const isOperations = venture.accentClass === "accent-operations";
            const isEnterprise = venture.accentClass === "accent-enterprise";

            return (
              <article
                key={idx}
                className="group relative p-8 rounded-2xl border border-border/20 bg-card/30 backdrop-blur-sm hover:border-accent-operations/30 transition-all duration-500 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent-operations/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        isOperations
                          ? "bg-accent-operations/10"
                          : isEnterprise
                          ? "bg-accent-enterprise/10"
                          : "bg-accent-visual/10"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 ${
                          isOperations
                            ? "text-accent-operations"
                            : isEnterprise
                            ? "text-accent-enterprise"
                            : "text-accent-visual"
                        }`}
                      />
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-mono ${
                        isOperations
                          ? "bg-accent-operations/20 text-accent-operations"
                          : isEnterprise
                          ? "bg-accent-enterprise/20 text-accent-enterprise"
                          : "bg-accent-visual/20 text-accent-visual"
                      }`}
                    >
                      {venture.achievement}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold mb-1">
                    {venture.title}
                  </h3>
                  <p className="text-muted-foreground mb-1">{venture.role}</p>
                  <p className="text-sm font-mono text-muted-foreground/60 mb-4">
                    {venture.period}
                  </p>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {venture.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/10">
                    {venture.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <p className="font-display font-bold text-foreground">
                          {metric.value}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Philosophy callout */}
        <div className="mt-16 p-8 rounded-2xl border border-accent-operations/20 bg-gradient-to-r from-accent-operations/5 to-transparent">
          <div className="flex items-start gap-4">
            <Flame className="w-8 h-8 text-accent-operations flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-xl font-display font-semibold mb-2">
                The Afterwork Builder
              </h4>
              <p className="text-muted-foreground max-w-3xl">
                I'm curious about systems that think, driven by the friction
                between "this is how it's done" and "what if it's better?" The
                best ideas often come from challenging conventions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
