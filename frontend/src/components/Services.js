import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { title: "FIT Packages", stat: "2,500+", statLabel: "Packages", desc: "Fully independent travel packages for individual customers — flexible itineraries, accommodation and complete ground arrangements.", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=85" },
  { title: "Custom Holidays", stat: "Assisted", statLabel: "Quotations", desc: "Share a customised FIT requirement with our agent contact centre and we prepare a full destination quotation.", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=900&q=85" },
  { title: "Group Tours", stat: "500+", statLabel: "Tours/Year", desc: "Ad hoc and large group travel handled end to end — logistics, guides, venues and activities, fully coordinated.", image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&q=85" },
  { title: "Hotels", stat: "500K+", statLabel: "Properties", desc: "Accommodation across major chains and boutique properties, contracted as part of your destination booking.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=85" },
  { title: "Flights", stat: "200+", statLabel: "Airlines", desc: "Multi-carrier flight inventory with competitive fares, flexible booking and real-time seat availability.", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=900&q=85" },
  { title: "Experiences", stat: "10K+", statLabel: "Activities", desc: "Private tours, adventure activities and cultural immersions, sourced through our destination suppliers.", image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=900&q=85" },
  { title: "Transfers", stat: "Door", statLabel: "to Door", desc: "Airport pickups, intercity transfers and chauffeured services arranged through vetted local transport.", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&q=85" },
  { title: "MICE", stat: "45+", statLabel: "Countries", desc: "Meetings, incentives, conferences and exhibitions — ground arrangements coordinated by our dedicated team.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=85" },
];

/* Editorial card: photo on top, clean ivory content below — reads as a premium
   product card rather than a dark photo tile, so it stays visually distinct
   from the destination showcase above it. */
function ServiceCard({ s }) {
  return (
    <div
      data-testid={`service-card-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
      className="service-card group relative shrink-0 snap-start w-[82vw] sm:w-[340px] rounded-[1.5rem] bg-white overflow-hidden shadow-[0_24px_60px_-32px_rgba(13,27,42,0.35)] hover:shadow-[0_30px_70px_-30px_rgba(13,27,42,0.42)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={s.image}
          alt={s.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/20 via-transparent to-transparent" />
      </div>

      <div className="relative px-6 pt-6 pb-6">
        <p className="font-['Manrope'] text-[10px] tracking-[0.18em] uppercase font-semibold text-[#174358]/70 mb-2">
          {s.stat} &middot; {s.statLabel}
        </p>
        <h3 className="font-['Manrope'] font-bold tracking-tight text-xl text-[#0D1B2A] leading-snug mb-2">{s.title}</h3>
        <p className="font-['Manrope'] text-[13px] text-[#0D1B2A]/55 leading-relaxed mb-5 line-clamp-3">{s.desc}</p>
        <a href="#contact" className="font-['Manrope'] inline-flex items-center gap-1.5 text-[13px] font-bold text-[#174358] hover:text-[#1e5a75] transition-colors group/cta w-fit">
          Learn more
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}

export default function Services() {
  const rootRef = useRef(null);
  const scrollerRef = useRef(null);
  const progressRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: rootRef.current, start: "top 75%" } }
      );
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  const updateProgress = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? el.scrollLeft / max : 0;
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.max(pct, 0.02)})`;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft > max - 8);
  };

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section ref={rootRef} id="services" data-testid="services-section" className="py-16 md:py-24 bg-[#F4F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-10 md:mb-14">
          <div>
            <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-5">Destination Services</p>
            <h2 data-reveal data-testid="services-heading" className="font-['Manrope'] font-bold tracking-tight whitespace-nowrap text-[3.8vw] sm:text-2xl md:text-3xl lg:text-4xl text-[#0D1B2A] leading-tight">
              Everything Behind Your Destination Booking
            </h2>
          </div>

          {/* Scroll controls */}
          <div data-reveal className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#0D1B2A] hover:bg-[#174358] hover:text-white hover:border-[#174358] transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight size={16} className="rotate-180" />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#0D1B2A] hover:bg-[#174358] hover:text-white hover:border-[#174358] transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Stats banner */}
        <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 md:mb-16">
          {[
            { num: "2,500+", label: "FIT Packages" },
            { num: "500K+", label: "Hotel Properties" },
            { num: "10K+", label: "Curated Experiences" },
            { num: "200+", label: "Airline Partners" },
          ].map((s) => (
            <div key={s.label} data-testid={`service-stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-[#0D1B2A] rounded-2xl p-5 md:p-6 text-center shadow-[0_18px_50px_-24px_rgba(13,27,42,0.35)]">
              <p className="font-['Manrope'] font-bold tracking-tight text-xl md:text-2xl text-white">{s.num}</p>
              <p className="font-['Manrope'] text-[10px] md:text-[11px] text-white/50 uppercase tracking-[0.2em] font-semibold mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal premium service gallery */}
      <div
        ref={scrollerRef}
        onScroll={updateProgress}
        className="flex gap-5 md:gap-6 overflow-x-auto px-6 md:px-12 lg:px-24 pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((s) => <ServiceCard key={s.title} s={s} />)}
        <div className="shrink-0 w-px" aria-hidden="true" />
      </div>

      {/* Scroll progress indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-6">
        <div className="h-[3px] w-full bg-[#0D1B2A]/10 rounded-full overflow-hidden">
          <div ref={progressRef} className="h-full w-full origin-left bg-[#174358] rounded-full transition-transform duration-150 ease-out" style={{ transform: "scaleX(0.02)" }} />
        </div>
      </div>
    </section>
  );
}
