import { useRef, useEffect } from "react";
import gsap from "gsap";

// Define variants mapping
const variants = {
    primary: "bg-white text-black hover:bg-orange-400 hover:text-black hover:scale-105 border border-transparent hover:border-orange-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(249,115,22,0.6)]",
    secondary: "bg-zinc-800/80 text-white border border-white/10 hover:bg-zinc-700 hover:border-white/30 backdrop-blur-md",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/10 hover:border-white/50",
    ghost: "bg-transparent text-white hover:bg-white/5",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-105 shadow-[0_4px_30px_rgba(0,0,0,0.1)]",
    cyber: "bg-black border border-orange-500/50 text-orange-400 hover:bg-orange-950/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] shadow-[0_0_10px_rgba(249,115,22,0.1)]",
    ethereal: "bg-white/5 backdrop-blur-2xl border border-white/10 text-white shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:border-white/30 hover:scale-105 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:animate-shimmer overflow-hidden",
};

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: keyof typeof variants;
}

export default function MagneticButton({
    children,
    className = "",
    variant = "primary",
    ...props
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        const text = textRef.current;

        if (!button || !text) return;

        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const textXTo = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const textYTo = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.3);
            yTo(y * 0.3);

            textXTo(x * 0.1);
            textYTo(y * 0.1);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);
        };

        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const variantStyles = variants[variant];

    return (
        <button
            ref={buttonRef}
            className={`relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 ${variantStyles} ${className}`}
            {...props}
        >
            <span ref={textRef} className="relative z-10 pointer-events-none mix-blend-difference flex items-center justify-center gap-2">
                {children}
            </span>
        </button>
    );
}
