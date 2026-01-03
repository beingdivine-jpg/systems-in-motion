import { Linkedin, Github, Mail, Download, Phone } from "lucide-react";

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/divinjoseph",
    label: "LinkedIn",
  },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:divinjoseph517@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative py-24 px-6 lg:px-12 border-t border-border/10"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(217 91% 60% / 0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main quote */}
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
          Curious of systems that{" "}
          <span className="text-accent-enterprise">think.</span>
        </h3>

        <p className="text-muted-foreground max-w-xl mx-auto mb-12">
          Open to collaborations at the intersection of strategy, technology,
          and creative vision. Let's build something meaningful.
        </p>

        {/* Contact buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-border/20 bg-card/30 text-muted-foreground hover:text-foreground hover:border-border/40 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
                <span className="font-mono text-sm">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* CV Download */}
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-display font-medium text-lg"
        >
          <Download className="w-5 h-5" />
          Download CV
        </a>

        {/* Location */}
        <div className="mt-12 text-muted-foreground">
          <p className="font-mono text-sm">Luxembourg / France</p>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border/10">
          <p className="font-mono text-sm text-muted-foreground">
            © {new Date().getFullYear()} Divin Joseph
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            Engineered with curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
