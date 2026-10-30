import { useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Headset, Building2, Compass, PartyPopper } from "lucide-react";
import { Button } from "../components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const segments = [
  {
    icon: Headset,
    title: "Travel Agents",
    desc: "Sell more destinations without building a supplier network for every trip.",
    cta: "Explore Partnership",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=85&auto=format&fit=crop",
  },
  {
    icon: Building2,
    title: "Travel Companies",
    desc: "Centralise destination sourcing, quotations, and booking coordination through one DMC.",
    cta: "Work With Us",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=85&auto=format&fit=crop",
  },
  {
    icon: Compass,
    title: "Tour Operators",
    desc: "Handle FIT and group requirements with one destination partner managing the ground.",
    cta: "See Capabilities",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1000&q=85&auto=format&fit=crop",
  },
  {
    icon: PartyPopper,
    title: "MICE Specialists",
    desc: "Coordinate meetings, incentives, conferences, and events with reliable local execution.",
    cta: "Plan With Us",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1000&q=85&auto=format&fit=crop",
  },
];

export default function WhoWeWorkWith() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".www-card").forEach((card, i) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: "top 82%" } });
        tl.fromTo(card, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: i * 0.08 })
          .fromTo(card.querySelector(".www-img"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power3.out" }, "<")
          .fromTo(card.querySelectorAll(".www-text"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" }, "-=0.45")
          .fromTo(card.querySelector(".www-cta"), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.15");
      });
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  return (
    <section ref={rootRef} id="who-we-work-with" data-testid="who-we-work-with-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <p data-reveal className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-5">Who We Work With</p>
          <h2 data-reveal data-testid="who-we-work-with-heading" className="font-['Manrope'] font-bold tracking-tight whitespace-nowrap text-[3.8vw] sm:text-2xl md:text-3xl lg:text-4xl text-[#0D1B2A] mb-9 leading-tight">
            Built for the Businesses That Sell Travel
          </h2>
          <a data-reveal href="#contact" data-testid="who-we-work-with-cta">
            <Button className="bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full px-8 py-6 font-['Manrope'] text-sm font-semibold shadow-sm transition-all">
              Partner with HI DMC <ArrowRight size={15} className="ml-2" />
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-7">
          {segments.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                data-testid={`segment-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="www-card group relative bg-white rounded-[1.75rem] overflow-hidden border border-[#0D1B2A]/[0.06] shadow-[0_18px_50px_-30px_rgba(13,27,42,0.25)] hover:shadow-[0_32px_70px_-28px_rgba(13,27,42,0.32)] hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="www-img relative h-56 md:h-60 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/55 via-[#0D1B2A]/05 to-transparent transition-colors duration-300 group-hover:from-[#0D1B2A]/70" />
                </div>

                <div className="relative px-7 pt-9 pb-7">
                  <div className="absolute -top-6 left-7 w-12 h-12 rounded-xl bg-[#174358] shadow-[0_12px_28px_-10px_rgba(23,67,88,0.6)] flex items-center justify-center ring-4 ring-white group-hover:bg-[#0D1B2A] transition-colors duration-300">
                    <Icon size={20} strokeWidth={1.75} className="text-white" />
                  </div>

                  <h3 className="www-text font-['Manrope'] font-bold tracking-tight text-xl md:text-2xl text-[#0D1B2A] mb-2.5">{s.title}</h3>
                  <p className="www-text font-['Manrope'] text-sm text-[#0D1B2A]/55 leading-relaxed mb-5 max-w-sm">{s.desc}</p>

                  <span className="www-cta inline-flex items-center gap-1.5 text-[13px] font-bold text-[#174358] group-hover:text-[#0D1B2A] group-hover:gap-2.5 transition-all duration-200">
                    {s.cta} <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
