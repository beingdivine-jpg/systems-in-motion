const timeline = [
  {
    year: "2025",
    title: "Ferrero Group",
    subtitle: "Group IT Project Manager Assistant",
    type: "work",
  },
  {
    year: "2025",
    title: "MSc Management of Technology IS",
    subtitle: "ESIEE Paris · With distinction",
    type: "education",
  },
  {
    year: "2024",
    title: "Paris Olympics & Paralympics",
    subtitle: "Liaison Officer · Broadcasting",
    type: "work",
  },
  {
    year: "2024",
    title: "European Hackathon",
    subtitle: "3rd Place · French Ministry",
    type: "achievement",
  },
  {
    year: "2024",
    title: "SAP S/4HANA Certification",
    subtitle: "Brandenburg University",
    type: "education",
  },
  {
    year: "2023",
    title: "Under 25 Universe",
    subtitle: "Event Coordinator · 35,000 Attendees",
    type: "work",
  },
  {
    year: "2018–23",
    title: "XentriX Esports",
    subtitle: "Co-Founder · Asia Rank #1",
    type: "startup",
  },
];

export function TimelineSection() {
  return (
    <section id="timeline" className="py-24 lg:py-32 px-6 lg:px-12 bg-secondary/20">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Progression
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-medium mt-4">
            Timeline
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className={`relative grid md:grid-cols-2 gap-4 md:gap-8 ${
                  idx % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-2 h-2 -translate-x-1/2 mt-2 rounded-full bg-foreground/30" />

                {/* Year - mobile shows on left, desktop alternates */}
                <div className={`pl-10 md:pl-0 ${idx % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8 md:order-2"}`}>
                  <span className="font-mono text-sm text-muted-foreground">{item.year}</span>
                </div>

                {/* Content */}
                <div className={`pl-10 md:pl-0 ${idx % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right md:order-1"}`}>
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
