"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-motion";

type SmoothScroll = {
  scrollTo: (target: string | HTMLElement) => void;
  stop: () => void;
  start: () => void;
};

const SmoothScrollContext = createContext<SmoothScroll>({
  scrollTo: () => undefined,
  stop: () => undefined,
  start: () => undefined,
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.4,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const scrollTo = useCallback(
    (target: string | HTMLElement) => {
      const el =
        typeof target === "string"
          ? document.querySelector<HTMLElement>(target)
          : target;
      if (!el) return;

      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, {
          offset: 0,
          duration: 1.35,
        });
      } else {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
    },
    [],
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
    document.documentElement.classList.add("is-locked");
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
    document.documentElement.classList.remove("is-locked");
  }, []);

  const value = useMemo(
    () => ({ scrollTo, stop, start }),
    [scrollTo, stop, start],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
