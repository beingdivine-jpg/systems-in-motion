import { Linkedin, Github, Mail, Download, MapPin } from "lucide-react";

const links = [
  { icon: Linkedin, href: "https://linkedin.com/in/divinjoseph", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:divinjoseph517@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer id="contact" className="py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Closing statement */}
        <p className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
          I'm interested in environments where systems are being built, tested, and improved — 
          <span className="text-foreground italic"> not just maintained.</span>
        </p>

        {/* Contact links */}
        <div className="flex justify-center gap-6 mb-12">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
                <span className="font-sans text-sm hidden md:inline">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* CV Download */}
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-lg font-sans text-sm text-foreground hover:bg-foreground hover:text-background transition-all duration-300 mb-12"
        >
          <Download className="w-4 h-4" />
          Download CV
        </a>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-16">
          <MapPin className="w-4 h-4" />
          <span className="font-mono text-sm">Luxembourg / France</span>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Divin Joseph
          </p>
        </div>
      </div>
    </footer>
  );
}
