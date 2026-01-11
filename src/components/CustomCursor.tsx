import { useEffect, useState } from "react";

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden lg:block`}
            style={{
                transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isHovering ? 2 : isClicking ? 0.8 : 1
                    })`,
                transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease",
            }}
        >
            <div
                className={`w-full h-full rounded-full border border-white/40 flex items-center justify-center`}
            >
                <div className="w-1 h-1 bg-white rounded-full" />
            </div>

            {/* Target Lines (Technical Feel) */}
            <div className={`absolute top-1/2 left-0 w-full h-[0.5px] bg-white/20 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute top-0 left-1/2 h-full w-[0.5px] bg-white/20 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    );
}
