import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOCUS_DESTINATIONS } from "../data/focusDestinations";

gsap.registerPlugin(ScrollTrigger);

function DestinationCard({ d }) {
  return (
    <Link
      to={`/destination/${encodeURIComponent(d.slug)}`}
      data-testid={`destination-card-${d.slug.toLowerCase().replace(/\s+/g, "-")}`}
      className="dest-card group block"
    >
      <div className="relative overflow-hidden rounded-[1.5rem] h-[220px] sm:h-[260px] lg:h-[300px] shadow-[0_30px_80px_-40px_rgba(13,27,42,0.5)]">
        <img
          src={d.cardImage}
          alt={d.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/0 group-hover:bg-[#0D1B2A]/10 transition-colors duration-500" />
      </div>

      <div className="flex items-center justify-between mt-4 px-0.5">
        <h3 className="font-['Manrope'] font-bold tracking-tight text-xl md:text-2xl text-[#0D1B2A] leading-none">{d.name}</h3>
        <span className="shrink-0 w-9 h-9 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#174358] group-hover:bg-[#174358] group-hover:text-white group-hover:border-[#174358] transition-all duration-300">
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}

export default function DestinationShowcase() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dest-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  return (
    <section ref={rootRef} id="explore-destinations" data-testid="destination-showcase-section" className="py-14 md:py-20 px-6 md:px-12 lg:px-24 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-10 text-center">
          <p data-reveal className="font-['Manrope'] text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-5">Our Signature Destinations</p>
          <h2 data-reveal data-testid="destination-showcase-heading" className="font-['Manrope'] font-bold tracking-tight whitespace-nowrap text-[3.6vw] sm:text-2xl md:text-3xl lg:text-4xl text-[#0D1B2A] leading-[1.12]">
            Destinations Deep Local Expertise
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {FOCUS_DESTINATIONS.map((d) => <DestinationCard key={d.slug} d={d} />)}
        </div>
      </div>
    </section>
  );
}
