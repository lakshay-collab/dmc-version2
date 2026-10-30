import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Quote, ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { FOCUS_DESTINATIONS } from "../data/focusDestinations";

const testimonials = [
  { name: "Carlos Vega", role: "CEO", company: "Horizonte Tours", avatar: "1507003211169-0a1dd7228f2d", quote: "HI DMC gives us the confidence to sell Bhutan without worrying about permits, supplier coordination, or last-minute changes.", tags: ["Bhutan", "Groups"], featured: true },
  { name: "Aisha Rahman", role: "Head of Partnerships", company: "NextGen Holidays", avatar: "1580489944761-15a19d654956", quote: "For Mauritius, their local hotel relationships and on-ground support make our honeymoon bookings much easier to manage.", tags: ["Mauritius", "Honeymoons"] },
  { name: "James Crawford", role: "Managing Director", company: "Pacific Journeys", avatar: "1472099645785-5658abf4ff4e", quote: "Sri Lanka is one of our strongest sellers, and having one team handle hotels, transport and experiences saves us hours on every booking.", tags: ["Sri Lanka", "FIT"] },
  { name: "Sarah Mitchell", role: "Director of Operations", company: "Wanderlux Travel", avatar: "1544005313-94ddf0286df2", quote: "Our Nepal trekking clients are the most demanding we have. HI DMC's Kathmandu team gets every permit, lodge and sherpa guide right, every time.", tags: ["Nepal", "FIT"], featured: true },
  { name: "Elena Petrov", role: "VP Sales", company: "EuroStar Travels", avatar: "1573497019940-1c28c88b4f3e", quote: "We needed a last-minute group of 30 to Bhutan. HI DMC turned the permits and itinerary around in 72 hours, with premium lodges throughout.", tags: ["Bhutan", "Groups"] },
  { name: "Ravi Menon", role: "Founder", company: "Spice Route Holidays", avatar: "1506794778202-cad84cf45f1d", quote: "HI DMC is our go-to for Mauritius and Sri Lanka — their resort partnerships mean we consistently get better rates for our honeymoon clients.", tags: ["Mauritius", "Honeymoons"] },
  { name: "Lena Svensson", role: "Operations Head", company: "Nordic Adventures", avatar: "1544717305-2782549b5136", quote: "Our clients trekking in Nepal need a DMC that understands altitude and safety logistics. HI DMC's on-ground team has never let us down.", tags: ["Nepal", "Adventure"], featured: true },
  { name: "David Okonkwo", role: "CEO", company: "Sahara Expeditions", avatar: "1531427186611-ecfd6d936c79", quote: "What I love about HI DMC is the transparency across every destination — clear pricing, one relationship, and a contact who picks up the phone.", tags: ["Multi-Destination", "MICE"] },
];

const avatarUrl = (id) => `https://images.unsplash.com/photo-${id}?w=200&q=85&auto=format&fit=crop`;

function TestimonialCard({ t }) {
  return (
    <div
      data-testid={`testimonial-${t.name.toLowerCase().replace(/\s+/g, "-")}`}
      className={`testimonial-card group shrink-0 bg-white rounded-[1.75rem] border border-[#0D1B2A]/[0.06] shadow-[0_18px_50px_-28px_rgba(13,27,42,0.25)] hover:shadow-[0_26px_60px_-26px_rgba(13,27,42,0.32)] hover:-translate-y-1 transition-all duration-300 flex flex-col ${
        t.featured ? "w-[88vw] sm:w-[480px] p-9 md:p-10" : "w-[82vw] sm:w-[360px] p-8"
      }`}
    >
      <Quote size={t.featured ? 56 : 40} className="text-[#174358]/10 mb-4 shrink-0" strokeWidth={1.5} fill="currentColor" />
      <p className={`font-['Manrope'] text-[#0D1B2A]/70 leading-relaxed mb-8 flex-1 ${t.featured ? "text-lg md:text-xl" : "text-[15px]"}`}>
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {t.tags.map((tag) => (
          <span key={tag} className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider text-[#174358] bg-[#174358]/[0.08] rounded-full px-3 py-1.5">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3 pt-6 border-t border-[#0D1B2A]/[0.07]">
        <img
          src={avatarUrl(t.avatar)}
          alt={t.name}
          loading="lazy"
          className={`shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm ${t.featured ? "w-12 h-12" : "w-10 h-10"}`}
        />
        <div className="min-w-0">
          <p className="font-['Manrope'] text-sm font-bold text-[#0D1B2A] truncate">{t.name}</p>
          <p className="font-['Manrope'] text-[11px] text-[#0D1B2A]/45 truncate">{t.role}, {t.company}</p>
        </div>
      </div>
    </div>
  );
}

function DestinationAccentCard({ d }) {
  return (
    <Link
      to={`/destination/${encodeURIComponent(d.slug)}`}
      data-testid={`testimonial-accent-${d.slug.toLowerCase().replace(/\s+/g, "-")}`}
      className="group relative shrink-0 w-[220px] sm:w-[260px] rounded-[1.75rem] overflow-hidden shadow-[0_18px_50px_-28px_rgba(13,27,42,0.3)]"
    >
      <img src={d.cardImage} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/85 via-[#0D1B2A]/10 to-transparent" />
      <div className="relative h-full min-h-[300px] flex flex-col justify-end p-5">
        <p className="font-['Manrope'] text-[10px] tracking-[0.2em] uppercase font-semibold text-white/60 mb-1">{d.region}</p>
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-['Manrope'] font-bold text-white text-lg">{d.name}</h4>
          <ArrowUpRight size={15} className="text-white/70 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>
    </Link>
  );
}

// Interleave the reviews with a few destination accent cards so the strip reads
// as a rich, premium mix rather than a flat row of identical quote cards.
const track = [
  { type: "t", data: testimonials[0] },
  { type: "img", data: FOCUS_DESTINATIONS[0] },
  { type: "t", data: testimonials[1] },
  { type: "t", data: testimonials[2] },
  { type: "img", data: FOCUS_DESTINATIONS[1] },
  { type: "t", data: testimonials[3] },
  { type: "t", data: testimonials[4] },
  { type: "img", data: FOCUS_DESTINATIONS[2] },
  { type: "t", data: testimonials[5] },
  { type: "t", data: testimonials[6] },
  { type: "img", data: FOCUS_DESTINATIONS[3] },
  { type: "t", data: testimonials[7] },
];

export default function Testimonials() {
  const scrollerRef = useRef(null);
  const progressRef = useRef(null);
  const [clickPaused, setClickPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Drifts right-to-left on its own. A click freezes it in place; hovering over
  // the strip while frozen sets it moving again, and it re-freezes the moment
  // the cursor leaves.
  const running = !clickPaused || hovering;
  const userActiveRef = useRef(false);
  const userActiveTimeoutRef = useRef(null);

  // A real manual scroll/drag always wins — it marks a short "user is driving"
  // window so the auto-drift below doesn't fight the browser's own scrolling
  // (that fight was the cause of the visible shake).
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const markActive = () => {
      userActiveRef.current = true;
      clearTimeout(userActiveTimeoutRef.current);
      userActiveTimeoutRef.current = setTimeout(() => { userActiveRef.current = false; }, 400);
    };
    el.addEventListener("wheel", markActive, { passive: true });
    el.addEventListener("touchmove", markActive, { passive: true });
    el.addEventListener("pointerdown", markActive);
    return () => {
      el.removeEventListener("wheel", markActive);
      el.removeEventListener("touchmove", markActive);
      el.removeEventListener("pointerdown", markActive);
      clearTimeout(userActiveTimeoutRef.current);
    };
  }, []);

  // rAF-driven drift, writing scrollLeft directly frame-by-frame (not
  // scrollBy/scrollTo) so there is never a competing smooth-scroll animation
  // to fight with — that conflict is what caused the shake.
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = scrollerRef.current;
    if (!el) return;
    let rafId;
    let lastTime = performance.now();
    const speed = 0.07; // px per ms
    const step = (now) => {
      const dt = Math.min(now - lastTime, 100);
      lastTime = now;
      if (running && !userActiveRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          let next = el.scrollLeft + speed * dt;
          if (next >= max) next = 0;
          el.scrollLeft = next;
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [running]);

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
    setClickPaused(true);
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section data-testid="testimonials-section" className="py-20 md:py-28 bg-[#F4F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <p data-reveal className="font-['Manrope'] text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-5">Partner Stories</p>
            <h2 data-reveal data-testid="testimonials-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl text-[#0D1B2A] leading-tight mb-5">
              Built for the people who sell travel.
            </h2>
            <p data-reveal className="font-['Manrope'] text-[#0D1B2A]/60 leading-relaxed">
              See how travel businesses use HI DMC to simplify destination operations, respond faster, and deliver confidently.
            </p>
          </div>

          <div data-reveal className="hidden md:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Previous testimonials"
              className="w-11 h-11 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#0D1B2A] hover:bg-[#174358] hover:text-white hover:border-[#174358] transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label="Next testimonials"
              className="w-11 h-11 rounded-full border border-[#0D1B2A]/15 flex items-center justify-center text-[#0D1B2A] hover:bg-[#174358] hover:text-white hover:border-[#174358] transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={updateProgress}
          onClick={() => setClickPaused((p) => !p)}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onTouchStart={() => setClickPaused((p) => !p)}
          title={clickPaused ? "Hover to resume" : "Click to pause"}
          className="flex gap-6 overflow-x-auto px-6 md:px-12 lg:px-24 pb-2 cursor-pointer [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {track.map((item, i) =>
            item.type === "t" ? (
              <TestimonialCard key={`t-${item.data.name}`} t={item.data} />
            ) : (
              <DestinationAccentCard key={`img-${item.data.slug}-${i}`} d={item.data} />
            )
          )}
          <div className="shrink-0 w-px" aria-hidden="true" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mt-6">
        <div className="h-[3px] w-full bg-[#0D1B2A]/10 rounded-full overflow-hidden mb-10">
          <div ref={progressRef} className="h-full w-full origin-left bg-[#174358] rounded-full transition-transform duration-150 ease-out" style={{ transform: "scaleX(0.02)" }} />
        </div>
        <p data-reveal className="text-center font-['Manrope'] text-sm text-[#0D1B2A]/45">
          Trusted by <strong className="text-[#0D1B2A]/70 font-semibold">850+</strong> active travel agents across multiple international markets.
        </p>
      </div>
    </section>
  );
}
