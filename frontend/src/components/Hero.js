import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { FOCUS_DESTINATIONS } from "../data/focusDestinations";

const HOLD_MS = 3000; // how long each photo holds before the next crossfade begins

// 2–3 verified ultra-HD photos per destination — interleaved round-robin (Sri Lanka,
// Mauritius, Bhutan, Nepal, repeat) so the hero background never shows two photos of
// the same destination back to back.
const ROTATION_ORDER = ["Sri Lanka", "Mauritius", "Bhutan", "Nepal"];
const BY_SLUG = Object.fromEntries(FOCUS_DESTINATIONS.map((d) => [d.slug, d]));
const ROUNDS = Math.max(...FOCUS_DESTINATIONS.map((d) => d.gallery.length));
const BG_PHOTOS = Array.from({ length: ROUNDS }).flatMap((_, round) =>
  ROTATION_ORDER.map((slug) => {
    const d = BY_SLUG[slug];
    const src = d.gallery[round % d.gallery.length];
    return { src, slug: d.slug, name: d.name, key: `${d.slug}-${round}` };
  })
);

export default function Hero() {
  const rootRef = useRef(null);
  const [bIdx, setBIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBIdx((i) => (i + 1) % BG_PHOTOS.length), HOLD_MS);
    return () => clearInterval(t);
  }, []);

  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-word", { opacity: 0, y: "100%" }, { opacity: 1, y: "0%", duration: 0.9, stagger: 0.07 })
        .fromTo(".hero-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.45")
        .fromTo(".hero-trust", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.3");
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const headline = ["Built", "for", "travel", "businesses", "that", "want", "to", "scale"];

  return (
    <section ref={rootRef} id="hero" data-testid="hero-section" className="relative overflow-hidden bg-[#0D1B2A] min-h-screen flex flex-col">
      {/* Full-screen ultra-HD background — cycles through every destination's photos */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {BG_PHOTOS.map((p, i) => (
          <div
            key={p.key}
            aria-hidden={i !== bIdx}
            className={`absolute inset-0 transition-opacity ease-[cubic-bezier(0.45,0,0.2,1)] duration-[1200ms] ${i === bIdx ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={p.src}
              alt={p.name}
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className={`w-full h-full object-cover select-none [-webkit-user-drag:none] transition-transform ease-out duration-[4500ms] will-change-transform ${i === bIdx ? "scale-[1.08]" : "scale-100"}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0D1B2A]/75 via-[#0D1B2A]/40 to-[#0D1B2A]/85" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-[#0D1B2A] via-transparent to-transparent" />

      {/* Hero line — centered in the middle of the screen */}
      <div className="relative z-10 pointer-events-none flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-6 pt-20 pb-16">
        <h1 data-testid="hero-heading" className="font-['DM_Sans'] font-bold tracking-tight text-white leading-[1.12] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {headline.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-2.5 sm:mr-3 md:mr-4 last:mr-0">
              <span className="hero-word inline-block">{w}</span>
            </span>
          ))}
        </h1>

        <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/agent/register" data-testid="hero-agent-signup-cta" className="hero-cta">
            <span className="inline-flex items-center gap-2 bg-[#F4F1E8] text-[#0D1B2A] hover:bg-white rounded-full pl-6 pr-5 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 shadow-[0_18px_40px_-16px_rgba(244,241,232,0.35)] hover:shadow-[0_22px_50px_-16px_rgba(244,241,232,0.5)]">
              Agent Sign Up <ArrowRight size={15} />
            </span>
          </Link>
          <a href="#explore-destinations" data-testid="hero-explore-cta" className="hero-cta">
            <span className="inline-flex items-center gap-2 border border-white/25 text-white hover:bg-white/10 hover:border-white/40 rounded-full pl-6 pr-5 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 backdrop-blur-sm">
              Explore Destinations <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="hero-trust relative z-10 border-t border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-5 flex flex-wrap items-center justify-center lg:justify-between gap-x-10 gap-y-2 text-[13px] text-white/55 font-['Manrope']">
          <span className="inline-flex items-center gap-2"><Calendar size={14} className="text-[#F4F1E8]/60" /> Established <strong className="text-white font-semibold">1997</strong></span>
          <span className="hidden sm:inline text-white/15">|</span>
          <span><strong className="text-white font-semibold">30+</strong> years of ground operations</span>
          <span className="hidden sm:inline text-white/15">|</span>
          <span><strong className="text-white font-semibold">4</strong> signature destinations, one DMC</span>
          <span className="hidden md:inline text-white/15">|</span>
          <span className="hidden md:inline"><strong className="text-white font-semibold">850+</strong> agent partners worldwide</span>
        </div>
      </div>
    </section>
  );
}
