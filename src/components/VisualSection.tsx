import { Camera, Play, Video } from "lucide-react";

export function VisualSection() {
  return (
    <section id="visual" className="py-28 lg:py-36 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <Camera className="w-5 h-5 text-accent-visual" />
          <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Visual & Creative
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Section intro */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.15] mb-6">
            Videography, photography,
            <br />
            <span className="text-muted-foreground italic">visual storytelling.</span>
          </h2>
        </div>

        {/* Video showreel placeholder */}
        <div className="relative aspect-[16/9] rounded-lg border border-border bg-gradient-to-br from-secondary/80 to-secondary/30 overflow-hidden group cursor-pointer mb-8">
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-foreground/15 flex items-center justify-center group-hover:border-foreground/30 group-hover:scale-105 transition-all duration-500">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-foreground/30 group-hover:text-foreground/50 ml-0.5" />
            </div>
          </div>

          {/* Label */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2">
            <Video className="w-4 h-4 text-muted-foreground/60" />
            <span className="font-mono text-xs text-muted-foreground/60">Showreel · Coming soon</span>
          </div>
        </div>

        {/* Photo grid placeholder */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 mb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className={`aspect-square rounded border border-border/50 bg-gradient-to-br from-secondary/50 to-secondary/20 hover:border-accent-visual/30 transition-all duration-300 ${
                i === 1 ? "col-span-2 row-span-2" : ""
              }`}
            />
          ))}
        </div>

        {/* Note */}
        <div className="relative pl-6 border-l-2 border-accent-visual/30">
          <p className="font-sans text-base text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Visual thinking</span> — 
            I approach communication visually, whether through video, photography, 
            or structuring information. Previously grew online presence curating 
            gaming content for niche communities.
          </p>
        </div>
      </div>
    </section>
  );
}
