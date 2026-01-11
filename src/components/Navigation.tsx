import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { navItems } from "@/data/navigation";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
          ? "py-4 bg-background/80 backdrop-blur-xl border-b border-border/10"
          : "py-8 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Bespoke Logo */}
          <Magnetic strength={0.2}>
            <a href="#" className="group flex items-center gap-2">
              <span className="editorial-serif text-2xl font-medium tracking-tight group-hover:italic transition-all duration-500">
                Divin
              </span>
              <span className="editorial-serif text-2xl italic text-muted-foreground/40 group-hover:text-foreground transition-colors duration-500">
                J.
              </span>
            </a>
          </Magnetic>

          {/* Desktop editorial nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="body-sans px-5 py-2 text-[11px] font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors relative group overflow-hidden"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-1 left-5 right-5 h-px bg-foreground origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500" />
              </a>
            ))}
            <div className="w-px h-3 bg-border/40 mx-4" />
            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-2 bg-foreground text-background rounded-full body-sans text-[11px] font-medium tracking-widest uppercase hover:bg-foreground/90 transition-all duration-500 hover:scale-105"
            >
              Contact
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none group relative z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-[1.5px] bg-foreground transition-all duration-500 ${isMobileMenuOpen ? "rotate-45 translate-y-[4.5px]" : ""
                }`}
            />
            <span
              className={`w-6 h-[1.5px] bg-foreground transition-all duration-500 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen Editorial Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl transition-all duration-700 ease-in-out md:hidden ${isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-12 text-center">
          <span className="body-sans text-[10px] tracking-[0.4em] font-medium text-muted-foreground/40 uppercase">
            Directory
          </span>
          <div className="flex flex-col gap-8">
            {[...navItems, { label: "Contact", href: "#contact" }].map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`editorial-serif text-5xl transition-all duration-700 hover:italic hover:text-muted-foreground ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="w-12 h-px bg-border/40" />
            <span className="body-sans text-[10px] font-medium opacity-40 uppercase tracking-widest">Luxembourg / France</span>
          </div>
        </div>
      </div>
    </>
  );
}
