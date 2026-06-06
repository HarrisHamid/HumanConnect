import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

const dirAttr: Record<Direction, string> = {
  up: "data-reveal",
  left: "data-reveal-left",
  right: "data-reveal-right",
};

export function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const attr = { [dirAttr[direction]]: "" };

  return (
    <div ref={ref} {...attr} className={cn(className)}>
      {children}
    </div>
  );
}
