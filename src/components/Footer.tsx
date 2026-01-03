import { Linkedin, Github, Mail, Download } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:contact@divinjoseph.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative py-24 px-6 lg:px-12 border-t border-border">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(217 91% 60% / 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          {/* Left column */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Curious of systems that think.
            </h3>
            <p className="text-muted-foreground max-w-md mb-8">
              Open to collaborations at the intersection of strategy, technology,
              and creative vision. Let's build something meaningful.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    className="w-12 h-12 rounded-xl bg-muted/30 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-muted-foreground/50 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col items-start md:items-end justify-end">
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 hover:border-muted-foreground/50 transition-all duration-300 mb-4"
            >
              <Download className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <span className="font-display font-medium">Download Resume</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Luxembourg City, Luxembourg
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-sm text-muted-foreground">
            © {new Date().getFullYear()} Divin Joseph. All rights reserved.
          </p>
          <p className="font-mono text-sm text-muted-foreground">
            Engineered by{" "}
            <span className="text-foreground font-medium">Divin</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
