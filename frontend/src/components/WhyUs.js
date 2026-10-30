import { useLayoutEffect, useRef } from "react";
import { Globe, Zap, Users, MapPin, ArrowUpRight, Award, Building2, ShieldCheck, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Globe, title: "Sell More Destinations", desc: "Expand your portfolio without building a supplier network in every market." },
  { icon: Zap, title: "Respond Faster", desc: "Live rates, ready inventory and specialist support help you turn enquiries around quickly." },
  { icon: Users, title: "One Team to Manage", desc: "FIT, groups, MICE, hotels, transfers and experiences — coordinated through one relationship." },
  { icon: MapPin, title: "Local Support on the Ground", desc: "Destination specialists coordinate the details while you stay focused on your client." },
];

const stats = [
  { icon: Award, value: 30, suffix: "+", label: "Years of Excellence" },
  { icon: Users, value: 850, suffix: "+", label: "Active Agents" },
  { icon: Building2, value: 500, suffix: "K+", label: "Live Hotel Rates" },
  { icon: ShieldCheck, value: 99.9, suffix: "%", label: "Platform Uptime", decimal: true },
];

export default function WhyUs() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".wu-collage-img", { opacity: 0, y: 40, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      gsap.fromTo(".wu-benefit-card", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".wu-benefit-grid", start: "top 80%" },
      });
      gsap.utils.toArray(".wu-stat-num").forEach((el) => {
        const end = parseFloat(el.getAttribute("data-value"));
        const decimal = el.getAttribute("data-decimal") === "true";
        const target = { val: 0 };
        gsap.to(target, {
          val: end, duration: 1.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => { el.textContent = decimal ? target.val.toFixed(1) : Math.floor(target.val).toLocaleString("en-US"); },
        });
      });
      gsap.to(".wu-parallax-img", {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => { ctx.revert(); clearTimeout(t); };
  }, []);

  return (
    <section ref={rootRef} id="why-us" data-testid="why-us-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-14 items-center mb-16 md:mb-20">
          {/* Left — editorial destination collage */}
          <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
            {/* Rotating badge */}
            <div className="hidden md:block absolute top-0 right-0 z-20 w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full wu-spin">
                <defs>
                  <path id="wuCirclePath" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text fontSize="8.3" fill="#174358" letterSpacing="1.5" fontFamily="Manrope">
                  <textPath href="#wuCirclePath" startOffset="0%">
                    HI DMC &middot; DESTINATIONS REDEFINED &middot;
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#174358]" />
              </div>
            </div>

            {/* Main large vertical image */}
            <div className="wu-collage-img absolute top-6 left-[22%] w-[72%] h-[88%] rounded-[1.5rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(13,27,42,0.4)] ring-4 ring-white">
              <img
                src="https://images.unsplash.com/photo-1593331792312-15bead7aaa9b?w=1200&q=90&auto=format&fit=crop"
                alt="Tiger's Nest Monastery, Bhutan"
                className="wu-parallax-img w-full h-full object-cover"
              />
            </div>

            {/* Overlapping smaller image */}
            <div className="wu-collage-img absolute top-[32%] left-0 w-[46%] h-[42%] rounded-[1.25rem] overflow-hidden shadow-[0_30px_60px_-20px_rgba(13,27,42,0.35)] ring-4 ring-white rotate-[-4deg]">
              <img
                src="https://images.unsplash.com/photo-1637826134825-e54e98a9bce7?w=800&q=88&auto=format&fit=crop"
                alt="Bhutan's valleys"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Foreground card image */}
            <div className="wu-collage-img absolute bottom-0 left-[6%] w-[48%] h-[36%] rounded-[1.25rem] overflow-hidden shadow-[0_30px_60px_-20px_rgba(13,27,42,0.4)] ring-4 ring-white rotate-[3deg]">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=88&auto=format&fit=crop"
                alt="Prayer flags in the Himalayas"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating label */}
            <div data-reveal className="absolute -bottom-5 left-[8%] z-20 bg-white rounded-full pl-3 pr-5 py-2.5 shadow-[0_18px_40px_-16px_rgba(13,27,42,0.4)] flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#174358]/10 flex items-center justify-center shrink-0">
                <MapPin size={13} className="text-[#174358]" />
              </span>
              <span className="font-['Manrope'] text-xs font-semibold text-[#0D1B2A] leading-snug">
                Extraordinary places.<br className="sm:hidden" /> Real local expertise.
              </span>
            </div>
          </div>

          {/* Right — business benefits */}
          <div>
            <p data-reveal className="font-['Manrope'] text-[11px] tracking-[0.3em] uppercase font-semibold text-[#174358]/70 mb-5">Why HI DMC</p>
            <h2 data-reveal data-testid="why-us-heading" className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-[44px] text-[#0D1B2A] leading-[1.15] mb-5">
              Built to help you sell more, respond faster, and manage less.
            </h2>
            <p data-reveal className="font-['Manrope'] text-[#0D1B2A]/60 leading-relaxed mb-10 max-w-lg">
              One DMC relationship backed by local teams, live inventory, and 30+ years of ground-handling expertise.
            </p>

            <div className="wu-benefit-grid grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    data-testid={`why-benefit-${b.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="wu-benefit-card group relative bg-white rounded-2xl p-6 border border-[#0D1B2A]/[0.06] shadow-[0_14px_40px_-26px_rgba(13,27,42,0.3)] hover:shadow-[0_22px_50px_-24px_rgba(13,27,42,0.35)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <span className="w-11 h-11 rounded-full bg-[#174358]/[0.08] flex items-center justify-center group-hover:bg-[#174358] transition-colors duration-300">
                        <Icon size={19} strokeWidth={1.6} className="text-[#174358] group-hover:text-white transition-colors duration-300" />
                      </span>
                      <span className="w-8 h-8 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center text-[#0D1B2A]/40 group-hover:bg-[#174358] group-hover:text-white group-hover:border-[#174358] transition-all duration-300">
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    <h3 className="font-['Manrope'] text-[11px] font-bold uppercase tracking-[0.1em] text-[#0D1B2A] mb-2 leading-snug">{b.title}</h3>
                    <p className="font-['Manrope'] text-[13px] text-[#0D1B2A]/55 leading-relaxed">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom proof strip */}
        <div className="bg-white rounded-[1.75rem] border border-[#0D1B2A]/[0.06] shadow-[0_24px_60px_-34px_rgba(13,27,42,0.3)] px-6 md:px-10 py-7 md:py-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#0D1B2A]/[0.08]">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-3 w-full lg:w-auto lg:flex-1 lg:px-8 first:lg:pl-0 py-4 lg:py-0 justify-center lg:justify-start">
                  <Icon size={20} strokeWidth={1.5} className="text-[#174358]/50 shrink-0" />
                  <div>
                    <p className="font-['Manrope'] font-bold tracking-tight text-2xl md:text-3xl text-[#0D1B2A] leading-none">
                      <span className="wu-stat-num" data-value={s.value} data-decimal={!!s.decimal}>0</span>{s.suffix}
                    </p>
                    <p className="font-['Manrope'] text-[11px] text-[#0D1B2A]/45 uppercase tracking-wider font-semibold mt-1">{s.label}</p>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-2 w-full lg:w-auto lg:flex-1 lg:pl-8 py-4 lg:py-0 justify-center lg:justify-end">
              <p className="font-['Manrope'] text-[11px] font-bold uppercase tracking-wider text-[#0D1B2A]/70 text-center lg:text-right">
                Built Exclusively for<br />Travel Agents
              </p>
              <ArrowRight size={16} className="text-[#174358] shrink-0" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .wu-spin { animation: wu-rotate 18s linear infinite; }
        @keyframes wu-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
