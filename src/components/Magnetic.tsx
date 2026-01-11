import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface MagneticProps {
    children: ReactNode;
    strength?: number;
}

export function Magnetic({ children, strength = 0.5 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const { clientX, clientY } = e;
            const { left, top, width, height } = ref.current.getBoundingClientRect();

            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;

            // If the mouse is within a certain range of the button
            const radius = Math.max(width, height) * 0.8;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < radius) {
                setPosition({
                    x: distanceX * strength,
                    y: distanceY * strength
                });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        ref.current?.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            ref.current?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    const { x, y } = position;

    return (
        <div
            ref={ref}
            style={{
                transform: `translate(${x}px, ${y}px)`,
                transition: isZero(x, y) ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.1s linear',
            }}
            className="inline-block"
        >
            {children}
        </div>
    );
}

function isZero(x: number, y: number) {
    return x === 0 && y === 0;
}
