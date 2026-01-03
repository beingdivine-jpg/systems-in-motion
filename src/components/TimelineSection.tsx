const timeline = [
  { year: "2025", title: "Ferrero Group", subtitle: "IT Project Manager Assistant", type: "work" },
  { year: "2025", title: "MSc MoTIS", subtitle: "ESIEE Paris · With distinction", type: "education" },
  { year: "2024", title: "Paris Olympics", subtitle: "Liaison Officer", type: "work" },
  { year: "2024", title: "European Hackathon", subtitle: "3rd Place", type: "achievement" },
  { year: "2024", title: "SAP S/4HANA", subtitle: "Certification", type: "education" },
  { year: "2023", title: "Under 25 Universe", subtitle: "35,000 Attendees", type: "work" },
  { year: "2018–23", title: "XentriX Esports", subtitle: "Asia Rank #1", type: "startup" },
];

const typeColors: Record<string, string> = {
  work: "bg-accent-enterprise/20",
  education: "bg-muted",
  achievement: "bg-accent-warm/20",
  startup: "bg-accent-operations/20",
};

export function TimelineSection() {
  return (
    <section id="timeline" className="py-28 lg:py-36 px-6 lg:px-12 bg-card/30">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mt-4">
            Timeline
          </h2>
        </div>

        {/* Timeline - clean vertical */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="relative grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start"
              >
                {/* Year - left on desktop */}
                <div className="hidden md:block text-right pr-8">
                  <span className="font-mono text-sm text-muted-foreground">{item.year}</span>
                </div>

                {/* Dot */}
                <div className="absolute left-0 md:relative md:left-auto flex justify-center">
                  <div className={`w-[15px] h-[15px] rounded-full border-2 border-background ${typeColors[item.type] || "bg-muted"}`} />
                </div>

                {/* Content */}
                <div className="pl-8 md:pl-0">
                  <span className="font-mono text-xs text-muted-foreground md:hidden">{item.year}</span>
                  <h3 className="font-serif text-lg text-foreground">{item.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
