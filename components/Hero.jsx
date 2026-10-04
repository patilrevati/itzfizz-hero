"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["WELCOME", "ITZFIZZ"];
const STATS = [
  { value: "58%", label: "Increase in pick up point use" },
  { value: "23%", label: "Decrease in customer phone calls" },
  { value: "27%", label: "Increase in pick up point use" },
  { value: "40%", label: "Decrease in customer phone calls" },
];

export default function Hero() {
  const root = useRef(null);
  const car = useRef(null);

  useLayoutEffect(() => {
    // gsap.context scopes selectors to this component and cleans up on unmount
    const ctx = gsap.context(() => {
      // 1) Intro: time-based, plays once on load
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".letter", { y: 40, opacity: 0, duration: 0.9, stagger: 0.05 })
        .from(".stat", { y: 30, opacity: 0, duration: 0.8, stagger: 0.25 }, "-=0.3")
        .from(car.current, { opacity: 0, duration: 1 }, "-=1");

      // 2) Scroll: progress-based, pinned and scrubbed with 1s smoothing
      const travel = () => window.innerWidth - car.current.offsetWidth * 0.8;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          car.current,
          { x: () => -car.current.offsetWidth * 0.2, scale: 1 },
          { x: travel, scale: 1.15, ease: "none", duration: 1 },
          0
        )
        .to(".wheel", { rotation: 720, ease: "none", duration: 1 }, 0)
        .to(".letter", { y: -30, opacity: 0.15, stagger: 0.03, ease: "none", duration: 0.8 }, 0.1)
        .to(".stat", { y: -40, stagger: 0.08, ease: "none", duration: 0.8 }, 0.1);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex h-screen flex-col items-center overflow-hidden pt-[12vh]">
      <h1
        aria-label="Welcome Itzfizz"
        className="flex flex-wrap justify-center gap-x-[1.2em] gap-y-2 px-4 text-[clamp(1.4rem,5vw,3.6rem)] font-bold tracking-[0.35em]"
      >
        {WORDS.map((word) => (
          <span key={word} aria-hidden="true" className="flex">
            {[...word].map((ch, i) => (
              <span key={i} className="letter inline-block will-change-transform">{ch}</span>
            ))}
          </span>
        ))}
      </h1>

      <div className="mt-[6vh] flex flex-wrap justify-center gap-8 px-4 md:gap-16">
        {STATS.map((s, i) => (
          <div key={i} className="stat text-center will-change-transform">
            <b className="block text-[clamp(2rem,5vw,3.5rem)] text-accent">{s.value}</b>
            <span className="text-sm text-neutral-500">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-[14vh] h-0.5 bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />
      <div ref={car} className="absolute bottom-[calc(14vh+1px)] left-0 w-[clamp(220px,32vw,420px)] will-change-transform">
        <Car />
      </div>

      <p className="absolute bottom-[4vh] text-xs tracking-[0.3em] text-neutral-500">SCROLL</p>
    </section>
  );
}
