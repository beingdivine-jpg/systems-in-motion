import { Rocket, Gamepad2, Users, Trophy } from "lucide-react";

const ventures = [
  {
    title: "XentriX Esports",
    role: "Co-Founder",
    period: "2018 – 2023",
    description: "Built esports organization from ground up. Achieved Asia Rank #1 in PUBG Mobile (Season 14). Organized Starburst Women's League — one of India's first all-female tournaments.",
    highlights: ["Asia #1 Rank", "5 Years", "Women's League"],
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

const competitions = [
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

export function InnovationSection() {
  return (
    <section id="innovation" className="py-28 lg:py-36 px-6 lg:px-12 bg-card/50">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <Rocket className="w-5 h-5 text-accent-warm" />
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Entrepreneurship & Innovation
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section intro */}
        <div className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] mb-6">
            Building, experimenting,
            <br />
            <span className="text-muted-foreground italic">competing at scale.</span>
          </h2>
        </div>

        {/* Ventures list */}
        <div className="mb-24">
          {ventures.map((venture, idx) => {
            const Icon = venture.icon;
            return (
              <article
                key={idx}
                className="group grid md:grid-cols-[160px_1fr] gap-4 md:gap-8 py-8 border-b border-border/50 last:border-0"
              >
                {/* Left - meta */}
                <div className="flex md:flex-col items-center md:items-start gap-3">
                  <Icon className="w-6 h-6 text-muted-foreground/30 group-hover:text-accent-warm transition-colors" />
                  <p className="font-mono text-sm text-muted-foreground">{venture.period}</p>
                </div>

                {/* Right - content */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3 className="font-serif text-xl font-medium text-foreground group-hover:text-accent-warm transition-colors">
                      {venture.title}
                    </h3>
                    <span className="text-muted-foreground/40">·</span>
                    <p className="font-sans text-sm text-muted-foreground">{venture.role}</p>
                  </div>
                  <p className="font-sans text-sm text-muted-foreground/80 leading-relaxed mb-4 max-w-xl">
                    {venture.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {venture.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 text-xs font-mono text-accent-warm bg-accent-warm/10 rounded"
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

        {/* Competitions */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <Trophy className="w-5 h-5 text-accent-warm" />
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Competitions
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {competitions.map((comp, idx) => (
              <div
                key={idx}
                className="group p-6 bg-background rounded-lg border border-border/50 hover:border-accent-warm/40 transition-colors"
              >
                <p className="font-mono text-sm text-accent-warm mb-3">{comp.result}</p>
                <p className="font-serif text-lg text-foreground mb-1 group-hover:text-accent-warm transition-colors">
                  {comp.title}
                </p>
                <p className="font-sans text-sm text-muted-foreground">
                  {comp.location} · {comp.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
