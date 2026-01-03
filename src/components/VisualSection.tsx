import { Camera, Play, Expand } from "lucide-react";
import { useState } from "react";

const photoCategories = ["Travel", "Street", "Tech", "Portrait"];

const photos = [
  {
    id: 1,
    category: "Travel",
    title: "Golden Hour",
    location: "Santorini, Greece",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: 2,
    category: "Street",
    title: "Urban Flow",
    location: "Paris, France",
    aspectRatio: "aspect-[3/2]",
  },
  {
    id: 3,
    category: "Tech",
    title: "Circuit Dreams",
    location: "Luxembourg",
    aspectRatio: "aspect-square",
  },
  {
    id: 4,
    category: "Portrait",
    title: "The Maker",
    location: "Studio",
    aspectRatio: "aspect-[4/5]",
  },
  {
    id: 5,
    category: "Travel",
    title: "Mountain Silence",
    location: "Swiss Alps",
    aspectRatio: "aspect-[3/2]",
  },
  {
    id: 6,
    category: "Street",
    title: "Night Markets",
    location: "Bangkok, Thailand",
    aspectRatio: "aspect-square",
  },
];

export function VisualSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="visual" className="relative py-32 px-6 lg:px-12 accent-visual">
      {/* Subtle film grain effect through overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(0 0% 75% / 0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Camera className="w-5 h-5 text-accent-visual" />
            <span className="font-mono text-sm text-accent-visual uppercase tracking-widest">
              03 / Visual Work
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Through the Lens
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Quiet observation. Stories in stillness. A counterpoint to the
            operational intensity — finding beauty in the spaces between.
          </p>
        </div>

        {/* Video showreel placeholder */}
        <div className="relative rounded-2xl overflow-hidden mb-16 group cursor-pointer">
          <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')] opacity-10" />
            
            {/* Play button */}
            <div className="relative z-10 w-24 h-24 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Play className="w-10 h-10 text-foreground fill-foreground ml-1" />
            </div>

            {/* Label */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
              <span className="font-mono text-sm text-muted-foreground">
                SHOWREEL 2024
              </span>
              <span className="text-muted-foreground/50">•</span>
              <span className="font-mono text-sm text-muted-foreground">
                2:34
              </span>
            </div>
          </div>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", ...photoCategories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-foreground text-background"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo grid - Masonry-like layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`group relative ${photo.aspectRatio} rounded-xl overflow-hidden cursor-pointer`}
              onMouseEnter={() => setHoveredPhoto(photo.id)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              {/* Placeholder with gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-muted/60 to-muted/30 transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Film grain texture */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')] opacity-20" />

              {/* Hover overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-500 ${
                  hoveredPhoto === photo.id ? "opacity-90" : "opacity-0"
                }`}
              />

              {/* Content on hover */}
              <div
                className={`absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ${
                  hoveredPhoto === photo.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <span className="font-mono text-xs text-accent-visual/80 mb-1">
                  {photo.category}
                </span>
                <h4 className="font-display text-lg font-semibold text-foreground mb-1">
                  {photo.title}
                </h4>
                <p className="text-sm text-muted-foreground">{photo.location}</p>
              </div>

              {/* Expand icon */}
              <div
                className={`absolute top-4 right-4 transition-all duration-300 ${
                  hoveredPhoto === photo.id
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <Expand className="w-4 h-4 text-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
