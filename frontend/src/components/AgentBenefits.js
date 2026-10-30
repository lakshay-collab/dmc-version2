import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { title: "One Point of Contact", summary: "One relationship for every booking.", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=85" },
  { title: "Sell More Destinations", summary: "Grow your portfolio, not your supplier list.", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=700&q=85" },
  { title: "Faster Quotations", summary: "Live rates. Faster responses.", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=700&q=85" },
  { title: "Local Expertise", summary: "Specialists who know the ground.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=85" },
  { title: "Less Operational Work", summary: "We coordinate. You sell.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=85" },
  { title: "Complex Bookings", summary: "FIT, groups and MICE — handled.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=85" },
  { title: "On-Ground Support", summary: "There while your client travels.", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=85" },
  { title: "Client Stays Yours", summary: "The relationship stays yours.", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=85" },
];

export default function AgentBenefits() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: rootRef.current, start: "top 78%" } }
      );
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  return (
    <section ref={rootRef} id="why-partner" data-testid="agent-benefits-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-16 text-center">
          <p data-reveal className="font-['Manrope'] text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-5">Why Partner With HI DMC</p>
          <h2 data-reveal data-testid="agent-benefits-heading" className="font-['Manrope'] font-bold tracking-tight whitespace-nowrap text-[4.2vw] sm:text-2xl md:text-3xl lg:text-4xl text-[#0D1B2A] leading-[1.12] mb-5">
            More Destinations Less to Manage
          </h2>
          <p data-reveal className="font-['Manrope'] text-[#0D1B2A]/60 leading-relaxed max-w-2xl mx-auto">
            Sell more destinations without managing more suppliers. Your client stays yours — we handle the destination.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {benefits.map((b) => {
            return (
              <div
                key={b.title}
                data-testid={`benefit-${b.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="benefit-card group relative bg-white rounded-[1.5rem] overflow-hidden border border-[#0D1B2A]/[0.06] shadow-[0_18px_50px_-30px_rgba(13,27,42,0.25)] hover:shadow-[0_26px_60px_-28px_rgba(13,27,42,0.32)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/25 via-transparent to-transparent" />
                </div>
                <div className="relative px-6 pt-6 pb-6">
                  <h3 className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.1em] text-[#0D1B2A] mb-2 leading-snug">{b.title}</h3>
                  <p className="font-['Manrope'] text-sm text-[#0D1B2A]/55 leading-relaxed">{b.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
