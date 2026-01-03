import { Zap, Radio, Trophy, Users, ArrowUpRight } from "lucide-react";

const highlights = [
  {
    title: "Paris 2024 Olympics & Paralympics",
    role: "Broadcast Liaison Officer",
    description:
      "Coordinated real-time operations for 50+ international broadcasters including NBC, BBC, Eurosport, and Viacom during the world's largest sporting event.",
    metrics: ["50+ Broadcasters", "Real-time ops", "Global scale"],
    icon: Radio,
  },
  {
    title: "XentriX Esports",
    role: "Founder",
    description:
      "Built and led Asia's #1 ranked PUBG Mobile team. Pioneered esports infrastructure in emerging markets with a focus on player development and competitive excellence.",
    metrics: ["Asia Rank #1", "Team of 12", "5 Championships"],
    icon: Trophy,
  },
  {
    title: "Under 25 Universe",
    role: "Operations Lead",
    description:
      "Masterminded event logistics for France's largest youth festival. Orchestrated vendor coordination, crowd management, and technical production.",
    metrics: ["35,000 Attendees", "50+ Partners", "3-day festival"],
    icon: Users,
  },
];

const tickerItems = [
  "NBC Sports",
  "BBC",
  "Eurosport",
  "Viacom",
  "CCTV",
  "NHK",
  "ARD",
  "France TV",
  "RAI",
  "ESPN",
  "Discovery",
  "Sky Sports",
];

export function OperationsSection() {
  return (
    <section className="relative py-32 px-6 lg:px-12 accent-operations overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 100% 50%, hsl(84 75% 44% / 0.06) 0%, transparent 50%)",
        }}
      />

      {/* Ticker tape */}
      <div className="absolute top-0 left-0 right-0 py-4 border-y border-border bg-background/50 backdrop-blur-sm overflow-hidden">
        <div className="flex animate-ticker">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 px-8 font-mono text-sm text-muted-foreground whitespace-nowrap"
            >
              {item} <span className="text-accent-operations mx-4">●</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-16">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent-operations" />
            <span className="font-mono text-sm text-accent-operations uppercase tracking-widest">
              02 / High-Pressure Operations
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Thriving in Chaos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From Olympic broadcast centers to esports arenas to massive festivals —
            delivering under pressure when there's no margin for error.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-accent-operations/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8 rounded-2xl border border-border bg-card/30 backdrop-blur-sm hover:border-accent-operations/30 transition-all duration-500">
                  {/* Number */}
                  <span className="absolute top-8 right-8 font-mono text-6xl font-bold text-accent-operations/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-accent-operations/10 border border-accent-operations/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-accent-operations" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-accent-operations transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-accent-operations/80 mb-4">
                    {item.role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {item.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-3">
                    {item.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="px-3 py-1.5 rounded-lg bg-accent-operations/10 border border-accent-operations/20 font-mono text-xs text-accent-operations"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-accent-operations" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
