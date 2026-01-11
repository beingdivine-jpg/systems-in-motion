import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
    number: string;
    title: string;
    Icon?: LucideIcon;
    accentClass?: string;
    alignment?: "left" | "center";
    children?: React.ReactNode;
}

export function SectionHeader({ number, title, Icon, accentClass = "text-foreground", alignment = "left", children }: SectionHeaderProps) {
    return (
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 lg:mb-32 ${alignment === "center" ? "items-center text-center" : ""}`}>
            <div className="max-w-3xl relative">
                <span className="technical-mono block mb-6 text-xs tracking-widest uppercase opacity-60 text-accent-visual/80">
                    {number} // {title}
                </span>

                {children}

                {/* Optional Icon decoration if provided */}
                {Icon && (
                    <div className="absolute -left-12 top-0 hidden lg:flex items-center justify-center p-2 opacity-50">
                        <Icon className={`w-4 h-4 ${accentClass}`} />
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-border" />
                <span className="technical-mono text-[10px] tracking-widest uppercase opacity-40">System: Active</span>
            </div>
        </div>
    );
}
