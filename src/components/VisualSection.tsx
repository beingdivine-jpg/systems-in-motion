import { Camera, Play, Video } from "lucide-react";

export function VisualSection() {
  return (
    <section id="visual" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-5 h-5 text-accent-visual" />
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Visual & Creative
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium">
            Videography, photography,
            <span className="block text-muted-foreground italic">visual storytelling.</span>
          </h2>
        </div>

        {/* Video showreel placeholder */}
        <div className="relative aspect-video rounded-lg border border-border bg-secondary/50 overflow-hidden group cursor-pointer mb-12">
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-2 border-foreground/20 flex items-center justify-center group-hover:border-foreground/40 group-hover:scale-105 transition-all duration-300">
              <Play className="w-8 h-8 text-foreground/40 group-hover:text-foreground/60 ml-1" />
            </div>
          </div>

          {/* Label */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <Video className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono text-sm text-muted-foreground">Showreel · Coming soon</span>
          </div>
        </div>

        {/* Photo grid placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg border border-border bg-secondary/30 hover:border-accent-visual/30 transition-colors duration-300 ${
                i === 1 ? "md:col-span-2 md:row-span-2 aspect-auto md:aspect-square" : ""
              }`}
            />
          ))}
        </div>

        {/* Note */}
        <div className="p-6 border border-border rounded-lg">
          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
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
