import { Camera, Play, Film, Sparkles, Video, Image } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Travel", "Tech", "Street", "Events"];

const photos = [
  { id: 1, category: "Travel", size: "large" },
  { id: 2, category: "Tech", size: "medium" },
  { id: 3, category: "Street", size: "medium" },
  { id: 4, category: "Events", size: "small" },
  { id: 5, category: "Travel", size: "small" },
  { id: 6, category: "Tech", size: "large" },
];

export function VisualSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="visual" className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-visual/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent-visual/10 border border-accent-visual/20 flex items-center justify-center">
                <Camera className="w-5 h-5 text-accent-visual" />
              </div>
              <span className="font-mono text-sm text-accent-visual uppercase tracking-wider">
                Visual Work
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Through the{" "}
              <span className="text-accent-visual">lens.</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-md">
            Photography, videography, and content creation. Capturing moments that tell stories.
          </p>
        </div>

        {/* Video showreel */}
        <div className="relative aspect-video rounded-3xl border border-accent-visual/20 bg-gradient-to-br from-accent-visual/5 via-card to-card overflow-hidden group cursor-pointer mb-12">
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-visual/20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent-visual to-accent-enterprise flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Play className="w-10 h-10 text-background ml-1" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <Film className="w-5 h-5 text-accent-visual" />
            <span className="font-mono text-sm text-muted-foreground">Showreel coming soon</span>
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <span className="px-4 py-2 rounded-full bg-accent-visual/20 border border-accent-visual/30 text-accent-visual text-sm font-mono">
              2024
            </span>
          </div>

          {/* Scanlines effect */}
          <div className="absolute inset-0 pointer-events-none opacity-5" style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground)) 2px, hsl(var(--foreground)) 4px)'
          }} />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-mono text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent-visual text-background"
                  : "bg-card/50 text-muted-foreground hover:text-foreground border border-border/30 hover:border-accent-visual/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo grid - creative masonry */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onMouseEnter={() => setHoveredId(photo.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative rounded-2xl overflow-hidden border border-border/20 cursor-pointer transition-all duration-500 ${
                photo.size === "large" ? "md:col-span-2 md:row-span-2" :
                photo.size === "medium" ? "md:row-span-2" : ""
              } ${hoveredId === photo.id ? "border-accent-visual/50 scale-[1.02]" : ""}`}
            >
              {/* Gradient placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-muted/30 to-muted/10" />

              {/* Category icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
                  <span className="text-sm font-mono text-muted-foreground/30">{photo.category}</span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 flex items-end p-6 ${
                hoveredId === photo.id ? "opacity-100" : "opacity-0"
              }`}>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent-visual/20 text-accent-visual text-sm font-mono mb-2">
                    {photo.category}
                  </span>
                  <p className="text-foreground font-display font-medium">Coming soon</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content creator note */}
        <div className="mt-12 p-6 rounded-2xl border border-border/20 bg-card/30 flex flex-wrap items-center gap-6">
          <div className="w-12 h-12 rounded-xl bg-accent-visual/10 border border-accent-visual/20 flex items-center justify-center">
            <Video className="w-6 h-6 text-accent-visual" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <h4 className="font-display font-semibold text-foreground mb-1">Content Creator Background</h4>
            <p className="text-muted-foreground">
              Previously grew online presence curating gaming content for niche communities. 
              Storytelling through visuals and engaging audiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
