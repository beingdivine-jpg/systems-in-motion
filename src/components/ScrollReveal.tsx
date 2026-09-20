import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-in" | "scale-up" | "blur-in" | "fade-right" | "fade-left";
    delay?: number;
    duration?: number;
    threshold?: number;
    once?: boolean;
}

export function ScrollReveal({
    children,
    className = "",
    animation = "fade-up",
    delay = 0,
    duration = 1000,
    threshold = 0.1,
    once = true,
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -100px 0px",
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, once, reducedMotion]);

    const STYLES = {
        "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        "fade-in": isVisible ? "opacity-100" : "opacity-0",
        "scale-up": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
        "blur-in": isVisible ? "opacity-100 blur-0" : "opacity-0 blur-md",
        "fade-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
        "fade-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
    };

    return (
        <div
            ref={ref}
            data-scroll-reveal
            className={`${className} transition-all duration-700 ease-premium ${reducedMotion ? "opacity-100" : STYLES[animation]}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
