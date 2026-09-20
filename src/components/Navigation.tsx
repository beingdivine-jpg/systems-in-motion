import { useState, useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Magnetic } from "./Magnetic";
import { navItems } from "@/data/navigation";

const directoryItems = [...navItems, { label: "Contact", href: "#contact" }];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setIsScrolled(window.scrollY > 30);
      const readingLine = Math.max(120, window.innerHeight * 0.3);
      const active = directoryItems.filter(({ href }) => {
        const element = document.getElementById(href.slice(1));
        return element && element.getBoundingClientRect().top <= readingLine;
      }).at(-1);
      setActiveSection(active?.href ?? "");
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMobileMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <nav aria-label="Main navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "py-4 bg-background/80 backdrop-blur-xl border-b border-border/10"
        : "py-8 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <Magnetic strength={0.2}>
            <a href="#" className="group flex items-center gap-2" aria-label="Divin Joseph — back to top">
              <span className="editorial-serif text-2xl font-medium tracking-tight group-hover:italic transition-all duration-500">Divin</span>
              <span className="editorial-serif text-2xl italic text-muted-foreground/60 group-hover:text-foreground transition-colors duration-500">J.</span>
            </a>
          </Magnetic>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}
                aria-current={activeSection === item.href ? "location" : undefined}
                className={`body-sans px-5 py-2 text-[11px] font-medium tracking-widest uppercase hover:text-foreground transition-colors relative group ${activeSection === item.href ? "text-foreground" : "text-muted-foreground"}`}>
                <span>{item.label}</span>
                <span aria-hidden="true" className={`absolute bottom-1 left-5 right-5 h-px bg-foreground origin-left transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100 ${activeSection === item.href ? "scale-x-100" : "scale-x-0"}`} />
              </a>
            ))}
            <div className="w-px h-3 bg-border/40 mx-4" />
            <a href="#contact" aria-current={activeSection === "#contact" ? "location" : undefined}
              className="group flex items-center gap-2 px-6 py-2 bg-foreground text-background rounded-full body-sans text-[11px] font-medium tracking-widest uppercase hover:bg-foreground/90 transition-all duration-500 hover:scale-105">
              Contact <ArrowUpRight aria-hidden="true" className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <Dialog.Trigger asChild>
            <button type="button" aria-label="Open navigation" className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5">
              <span className="w-6 h-[1.5px] bg-foreground" />
              <span className="w-6 h-[1.5px] bg-foreground" />
            </button>
          </Dialog.Trigger>
        </div>
      </nav>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out duration-300" />
        <Dialog.Content aria-describedby={undefined}
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right duration-300 focus:outline-none">
          <Dialog.Title className="sr-only">Navigation</Dialog.Title>
          <div className={`absolute top-0 inset-x-0 flex items-center justify-between px-6 ${isScrolled ? "py-4" : "py-8"}`}>
            <span aria-hidden="true" className="editorial-serif text-2xl">Divin <span className="italic text-muted-foreground/60">J.</span></span>
            <Dialog.Close asChild>
              <button type="button" aria-label="Close navigation" className="w-12 h-12 flex items-center justify-center">
                <X className="w-6 h-6" strokeWidth={1.5} />
              </button>
            </Dialog.Close>
          </div>
          <div className="min-h-full flex flex-col items-center justify-center px-6 pt-32 pb-12 gap-8 text-center">
            <span className="body-sans text-xs tracking-[0.3em] font-medium text-muted-foreground uppercase">Directory</span>
            <div className="flex flex-col gap-5 sm:gap-8">
              {directoryItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={activeSection === item.href ? "location" : undefined}
                  className={`editorial-serif text-5xl transition-colors duration-300 hover:italic hover:text-accent-warm ${activeSection === item.href ? "text-accent-warm italic" : "text-foreground"}`}>
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-col items-center gap-4">
              <div className="w-12 h-px bg-border/40" />
              <span className="body-sans text-xs font-medium text-muted-foreground uppercase tracking-widest">Luxembourg</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
