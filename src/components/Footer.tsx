import { Linkedin, Github, Mail, Download, MapPin, ArrowUpRight } from "lucide-react";

const links = [
  { icon: Linkedin, href: "https://linkedin.com/in/divinjoseph", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:divinjoseph517@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer id="contact" className="py-28 lg:py-36 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto">
        {/* Closing statement */}
        <div className="text-center mb-16">
          <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-4">
            I'm interested in environments where systems are being built, tested, and improved —
          </p>
          <p className="font-serif text-2xl md:text-3xl italic text-muted-foreground">
            not just maintained.
          </p>
        </div>

        {/* Contact links */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="flex items-center gap-6">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-sans text-sm">{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                </a>
              );
            })}
          </div>

          {/* CV Download */}
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded font-sans text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-20">
          <MapPin className="w-4 h-4" />
          <span className="font-mono text-sm">Luxembourg / France</span>
        </div>

        {/* Bottom */}
        <div className="text-center pt-8 border-t border-border/50">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Divin Joseph
          </p>
        </div>
      </div>
    </footer>
  );
}
