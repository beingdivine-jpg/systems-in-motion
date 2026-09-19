import { Linkedin, Mail, MapPin, ArrowUpRight } from "lucide-react";

const links = [
  { icon: Linkedin, href: "https://linkedin.com/in/divinjoseph", label: "LinkedIn" },
  { icon: Mail, href: "mailto:divinjoseph517@gmail.com", label: "Email" },
];

import { ScrollReveal } from "./ScrollReveal";
import { ChevronUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="py-32 lg:py-48 px-6 lg:px-12 relative overflow-hidden bg-secondary/30 snap-start">
      <div className="max-w-5xl mx-auto">
        {/* Closing statement */}
        <div className="mb-32">
          <ScrollReveal animation="blur-in">
            <h2 className="editorial-serif text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-foreground mb-8">
              I'm interested in environments where systems are being <span className="italic text-muted-foreground/60">built, tested, and improved</span> —
              <span className="block mt-4 text-accent-warm">not just maintained.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-end mb-32">
          {/* Left: Contact Info */}
          <div className="space-y-12">
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="flex flex-col gap-8">
                <span className="technical-mono text-xs tracking-[0.5em] opacity-40 uppercase">Connect // Direct</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className="group flex items-center justify-between p-6 border border-border/40 rounded-2xl bg-background/50 backdrop-blur-sm hover:bg-foreground hover:text-background transition-all duration-700"
                        aria-label={link.label}
                      >
                        <div className="flex items-center gap-4">
                          <Icon className="w-5 h-5 opacity-60 group-hover:opacity-100" />
                          <span className="technical-mono text-[10px]">{link.label}</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={400}>
              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin className="w-4 h-4 opacity-40" />
                <span className="technical-mono text-[9px] tracking-widest uppercase">Base: Luxembourg</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col items-end gap-12">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-4 technical-mono text-[9px] opacity-40 hover:opacity-100 transition-opacity group"
            >
              Back to Surface
              <div className="w-10 h-10 border border-border/40 rounded-full flex items-center justify-center group-hover:bg-border/20 transition-colors">
                <ChevronUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="technical-mono text-[8px] opacity-30">
            Design & Build by Divin J. // {new Date().getFullYear()} ©
          </p>
          <div className="flex items-center gap-12">
            <span className="technical-mono text-[8px] opacity-30">Built with React & Vite</span>
            <span className="technical-mono text-[8px] opacity-30">Typography: Cormorant & IBM Plex</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
