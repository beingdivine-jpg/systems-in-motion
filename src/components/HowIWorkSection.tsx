export function HowIWorkSection() {
  return (
    <section id="how-i-work" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Section label */}
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8">
          How I Work
        </p>

        {/* Philosophy content */}
        <div className="space-y-8">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed text-foreground">
            I don't operate in silos.
          </p>
          
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-muted-foreground">
            I move between structured systems and high-pressure environments.
          </p>
          
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-muted-foreground">
            I translate between people, technology, and execution.
          </p>
          
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-muted-foreground">
            I'm comfortable where clarity is still forming.
          </p>
        </div>

        {/* Visual break */}
        <div className="my-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-xs text-muted-foreground">•</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Context */}
        <p className="font-sans text-base text-muted-foreground leading-relaxed">
          At 24, I've worked at Ferrero's Luxembourg headquarters, 
          coordinated broadcasting for the Paris 2024 Olympics, 
          co-founded an esports organization that reached Asia's top rankings, 
          and competed in European hackathons. Each environment required adapting 
          quickly and thinking across disciplines.
        </p>
      </div>
    </section>
  );
}
