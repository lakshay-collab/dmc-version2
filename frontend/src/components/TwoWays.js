import { useLayoutEffect, useRef } from "react";
import { Compass, FileText, Network, UserCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { n: "01", icon: Compass, title: "Choose the destination", desc: "Nepal, Bhutan, Mauritius or Sri Lanka — browse what's available or tell us the brief.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&q=80" },
  { n: "02", icon: FileText, title: "Book online or send the requirement", desc: "Book eligible products in the portal. For custom FIT, groups and MICE, our team sends a quotation.", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=500&q=80" },
  { n: "03", icon: Network, title: "We coordinate the ground", desc: "Hotels, transport, guides and experiences — HI DMC manages every local supplier behind the booking.", image: "https://images.unsplash.com/photo-1637826134825-e54e98a9bce7?w=500&q=80" },
  { n: "04", icon: UserCheck, title: "You keep the customer", desc: "The relationship stays yours. HI DMC stays your contact for the destination.", image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=500&q=80" },
];

export default function TwoWays() {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: rootRef.current, start: "top 70%", end: "bottom 60%", scrub: 0.5 } }
        );
      }
      gsap.utils.toArray(".how-step").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  return (
    <section ref={rootRef} id="how-we-work" data-testid="two-ways-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F8FAFB] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-5">How HI DMC Works</p>
          <h2 data-reveal data-testid="how-it-works-heading" className="font-['Manrope'] font-bold tracking-tight whitespace-nowrap text-[3.8vw] sm:text-2xl md:text-3xl lg:text-4xl text-[#0D1B2A] leading-tight">
            You Bring the Booking We Manage the Destination
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-[88px] left-0 right-0 h-px bg-[#0D1B2A]/10" aria-hidden="true" />
          <div ref={lineRef} className="hidden lg:block absolute top-[88px] left-0 right-0 h-px origin-left bg-gradient-to-r from-[#174358] via-[#174358]/70 to-[#174358]/20" aria-hidden="true" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.n} data-testid={`how-step-${s.n}`} className="how-step relative">
                  <div className="relative w-20 h-20 mb-7">
                    <div className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-[#F8FAFB] shadow-[0_18px_40px_-18px_rgba(13,27,42,0.4)]">
                      <img src={s.image} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#0D1B2A]/55" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon size={24} strokeWidth={1.75} className="text-white" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#174358] text-white text-[11px] font-bold flex items-center justify-center font-['Manrope'] ring-4 ring-[#F8FAFB]">
                      {s.n}
                    </span>
                  </div>
                  <h4 className="font-['Manrope'] text-base font-bold text-[#0D1B2A] mb-2.5">{s.title}</h4>
                  <p className="font-['Manrope'] text-sm text-[#0D1B2A]/50 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
