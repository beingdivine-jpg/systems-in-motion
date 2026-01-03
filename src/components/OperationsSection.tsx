import { Radio, Gamepad2, Users, Trophy } from "lucide-react";

const operations = [
  {
    title: "Paris 2024 Olympics & Paralympics",
    role: "Liaison Officer",
    period: "Jul – Sep 2024",
    description: "Coordinated broadcasting relations for 50+ international rights holders including NBC, BBC, Eurosport, and Viacom. Managed influencer relations during live events. Bridge between operations, media, and technical teams.",
    highlights: ["50+ Broadcasters", "2 Venues", "15+ Influencers"],
    icon: Radio,
  },
  {
    title: "XentriX Esports",
    role: "Co-Founder",
    period: "2018 – 2023",
    description: "Built esports organization from ground up. Achieved Asia Rank #1 in PUBG Mobile (Season 14). Organized Starburst Women's League — one of India's first all-female tournaments. Secured sponsorships and managed competitive teams.",
    highlights: ["Asia #1 Rank", "5 Years", "Women's League Founder"],
    icon: Gamepad2,
  },
  {
    title: "Under 25 Universe",
    role: "Event Coordinator",
    period: "2022 – 2023",
    description: "Contributed to one of Asia's largest youth festivals. End-to-end event management spanning logistics, coordination, and execution.",
    highlights: ["35,000+ Attendees", "3-Day Festival"],
    icon: Users,
  },
];

const hackathons = [
  {
    title: "European Hackathon",
    result: "3rd Place",
    location: "French Ministry",
    year: "2024",
  },
  {
    title: "Haining Innovation Competition",
    result: "National Finals",
    location: "China",
    year: "2024",
  },
];

export function OperationsSection() {
  return (
    <section id="operations" className="py-24 lg:py-32 px-6 lg:px-12 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Radio className="w-5 h-5 text-accent-operations" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Live Operations & Innovation
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium">
            High-pressure environments,
            <span className="block text-muted-foreground italic">real-time problem solving.</span>
          </h2>
        </div>

        {/* Operations */}
        <div className="space-y-12 mb-20">
          {operations.map((op, idx) => {
            const Icon = op.icon;
            return (
              <article
                key={idx}
                className="group grid md:grid-cols-[200px_1fr] gap-6 p-6 -mx-6 rounded-lg hover:bg-background/80 transition-colors duration-300"
              >
                {/* Left - meta */}
                <div className="space-y-3">
                  <Icon className="w-8 h-8 text-muted-foreground/40 group-hover:text-accent-operations transition-colors" />
                  <p className="font-mono text-sm text-muted-foreground">{op.period}</p>
                </div>

                {/* Right - content */}
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-1 group-hover:text-accent-operations transition-colors">
                    {op.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground mb-3">{op.role}</p>
                  <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed mb-4">
                    {op.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {op.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2 py-1 text-xs font-mono text-accent-operations bg-accent-operations/10 rounded"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Hackathons */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="w-5 h-5 text-accent-warm" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Competitions
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {hackathons.map((hack, idx) => (
              <div
                key={idx}
                className="p-6 border border-border rounded-lg hover:border-accent-warm/30 transition-colors"
              >
                <p className="font-mono text-sm text-accent-warm mb-2">{hack.result}</p>
                <p className="font-serif text-lg text-foreground mb-1">{hack.title}</p>
                <p className="font-sans text-sm text-muted-foreground">
                  {hack.location} · {hack.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
