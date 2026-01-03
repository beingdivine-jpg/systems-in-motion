import { Linkedin, Github, Mail, Download, ArrowUpRight, MapPin } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/in/divinjoseph", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "mailto:divinjoseph517@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer id="contact" className="relative py-24 px-6 lg:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-accent-enterprise/5 to-transparent" />
        <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-accent-visual/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] bg-accent-operations/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Main CTA */}
        <div className="mb-12">
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Curious of systems that{" "}
            <span className="gradient-text">think.</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Open to collaborations at the intersection of strategy, technology, and creative vision. 
            Let's build something meaningful.
          </p>
        </div>

        {/* Contact cards */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl border border-border/30 bg-card/50 hover:border-accent-enterprise/30 hover:bg-accent-enterprise/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-muted/50 group-hover:bg-accent-enterprise/10 flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-accent-enterprise transition-colors" />
                </div>
                <span className="font-display font-medium text-foreground">{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent-enterprise transition-colors" />
              </a>
            );
          })}
        </div>

        {/* CV Download */}
        <div className="mb-12">
          <a
            href="#"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent-visual via-accent-enterprise to-accent-operations text-background font-display font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <Download className="w-5 h-5" />
            Download CV
          </a>
        </div>

        {/* Location */}
        <div className="flex items-center justify-center gap-2 text-muted-foreground mb-16">
          <MapPin className="w-4 h-4" />
          <span className="font-mono text-sm">Luxembourg / France</span>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-sm text-muted-foreground">
              © {new Date().getFullYear()} Divin Joseph
            </p>
            <p className="text-sm text-muted-foreground">
              Engineered with <span className="gradient-text font-medium">curiosity</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
