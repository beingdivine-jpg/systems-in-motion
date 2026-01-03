import { Camera, Play, Film, Sparkles, Video } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Travel", "Tech", "Street", "Events"];

const photos = [
  { id: 1, category: "Travel", aspectRatio: "aspect-[3/4]" },
  { id: 2, category: "Tech", aspectRatio: "aspect-video" },
  { id: 3, category: "Street", aspectRatio: "aspect-square" },
  { id: 4, category: "Events", aspectRatio: "aspect-[3/4]" },
  { id: 5, category: "Travel", aspectRatio: "aspect-video" },
  { id: 6, category: "Tech", aspectRatio: "aspect-square" },
];

export function VisualSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="visual" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* Subtle gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent-visual/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-visual/10 flex items-center justify-center">
            <Camera className="w-6 h-6 text-accent-visual" />
          </div>
          <span className="font-mono text-sm text-accent-visual uppercase tracking-widest">
            03 / Visual Storytelling
          </span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
          Seeing the world
          <span className="text-accent-visual"> differently.</span>
        </h2>

        <p className="text-xl text-muted-foreground max-w-2xl mb-16">
          Photography, videography, and content creation. Capturing moments that
          tell stories.
        </p>

        {/* Video showreel placeholder */}
        <div className="relative aspect-video rounded-2xl border border-border/20 bg-card/30 backdrop-blur-sm mb-12 overflow-hidden group cursor-pointer">
          {/* Placeholder gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-background to-muted/10" />

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-accent-visual/50 flex items-center justify-center bg-background/50 backdrop-blur-sm group-hover:scale-110 group-hover:border-accent-visual transition-all duration-300">
              <Play className="w-10 h-10 text-accent-visual ml-1" />
            </div>
          </div>

          {/* Corner labels */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <Film className="w-5 h-5 text-accent-visual" />
            <span className="font-mono text-sm text-muted-foreground">
              Showreel coming soon
            </span>
          </div>

          <div className="absolute bottom-6 right-6">
            <span className="px-3 py-1 rounded-full bg-accent-visual/20 text-accent-visual text-sm font-mono">
              2024
            </span>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent-visual text-background"
                  : "bg-card/30 text-muted-foreground hover:bg-card/50 border border-border/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo grid - placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              className={`relative rounded-xl overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10 border border-border/10 group cursor-pointer hover:border-accent-visual/30 transition-all duration-300 ${
                item.aspectRatio === "aspect-[3/4]"
                  ? "row-span-2 aspect-[3/4]"
                  : item.aspectRatio === "aspect-video"
                  ? "col-span-2 aspect-video"
                  : "aspect-square"
              }`}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <span className="text-xs text-muted-foreground/50 font-mono">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-sm font-mono text-accent-visual">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Content creator note */}
        <div className="mt-12 p-6 rounded-2xl border border-border/20 bg-card/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Video className="w-5 h-5 text-accent-visual" />
            <span className="font-mono text-sm text-muted-foreground">
              CONTENT CREATOR
            </span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Previously grew online presence curating gaming content for niche
            communities. Storytelling through visuals and engaging audiences.
          </p>
        </div>
      </div>
    </section>
  );
}
