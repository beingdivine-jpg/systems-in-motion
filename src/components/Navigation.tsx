import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "About", href: "#how-i-work" },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Innovation", href: "#innovation" },
  { label: "Visual", href: "#visual" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-background/95 backdrop-blur-md border-b border-border/30"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex items-center gap-1"
          >
            <span className="font-serif text-lg font-medium tracking-tight">Divin</span>
            <span className="font-serif text-lg italic text-muted-foreground">J.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="w-px h-4 bg-border mx-2" />
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-2 font-sans text-sm font-medium text-foreground hover:text-accent-enterprise transition-colors"
            >
              Contact
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-start justify-center h-full px-8 gap-6">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-4">
            Navigation
          </span>
          {[...navItems, { label: "Contact", href: "#contact" }].map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-serif text-4xl text-foreground hover:text-muted-foreground transition-colors"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
