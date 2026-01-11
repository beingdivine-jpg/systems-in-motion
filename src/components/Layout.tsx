import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { CustomCursor } from "./CustomCursor";

interface LayoutProps {
    children: ReactNode;
    className?: string; // Allow passing standard HTML props if needed, but keep it simple mostly
}

export function Layout({ children, className = "" }: LayoutProps) {
    useEffect(() => {
        // Native browser scrolling is preferred for CSS Scroll Snapping
    }, []);

    return (
        <div className={`min-h-screen bg-background text-foreground ${className}`}>
            {/* Cinematic Ambience */}
            <div className="noise-overlay" />
            <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-500/5 via-background to-background pointer-events-none" />

            <CustomCursor />
            <Navigation />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
