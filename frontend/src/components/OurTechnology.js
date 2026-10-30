import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

// Strongest portal visual — the plan / book / sell product shot.
const PORTAL_VISUAL = "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/z7l7l9xo_Create-plan-book-sell-HRZ-Format-%E2%80%93-1920x1080-2nd-vrs.png";

const capabilities = [
  {
    no: "01",
    label: "Browse",
    title: "See What's Available",
    desc: "Destination products, accommodation, transfers, tours and experiences across supported destinations.",
  },
  {
    no: "02",
    label: "Book",
    title: "Book Supported Products Online",
    desc: "Book available products directly through the portal with HI DMC coordinating the destination arrangements.",
  },
  {
    no: "03",
    label: "Ask",
    title: "Send Complex Requirements to Our Team",
    desc: "For custom FIT, groups and MICE, send us the requirement and our team will prepare the quotation.",
  },
];

export default function OurTechnology() {
  return (
    <section id="technology" data-testid="technology-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#0D1B2A] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div data-reveal-group className="text-center mx-auto mb-14 md:mb-16">
          <p data-reveal className="text-[11px] tracking-[0.3em] uppercase font-semibold text-white/40 mb-5 font-['Manrope']">Agent Portal</p>
          <h2 data-reveal data-testid="technology-heading" className="font-['Manrope'] font-bold tracking-tight whitespace-nowrap text-[3.8vw] sm:text-2xl md:text-3xl lg:text-4xl text-white leading-[1.08]">
            One Portal for Bookings One Team for Everything Else
          </h2>
        </div>

        {/* One premium portal visual — framed like a high-end product */}
        <div data-reveal-img className="relative max-w-5xl mx-auto mb-20 md:mb-24 rounded-2xl overflow-hidden border border-white/10 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-1.5 px-4 py-3 bg-white/[0.04] border-b border-white/[0.08]">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <div className="ml-4 h-5 w-full max-w-xs rounded-full bg-white/[0.06]" />
          </div>
          <img src={PORTAL_VISUAL} alt="Hi DMC Agent Portal" className="wu-img-scale block w-full" />
        </div>

        {/* Thin divider that draws across */}
        <div className="wu-rule h-px w-full bg-white/15 mb-12 md:mb-16" aria-hidden="true" />

        {/* Three capabilities — editorial columns, not cards */}
        <div data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {capabilities.map((c) => (
            <div
              key={c.no}
              data-testid={`tech-feature-${c.label.toLowerCase()}`}
              className="md:px-10 md:border-l md:border-white/10 md:first:border-l-0 md:first:pl-0"
            >
              <span className="block font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-white/20 leading-none mb-5">{c.no}</span>
              <p className="font-['Manrope'] text-[11px] tracking-[0.25em] uppercase font-semibold text-white/45 mb-3">{c.label}</p>
              <h3 className="font-['Manrope'] font-bold tracking-tight text-xl md:text-[22px] text-white leading-snug mb-3">{c.title}</h3>
              <p className="font-['Manrope'] text-sm text-white/50 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Proof — presented as typography */}
        <div data-reveal className="mt-20 md:mt-24 flex items-center justify-center gap-8 md:gap-14 flex-wrap text-center">
          <p className="font-['Manrope'] text-white/70">
            <span className="font-bold tracking-tight text-3xl md:text-4xl text-white align-middle">30+</span>
            <span className="text-sm md:text-[15px] ml-3 align-middle text-white/55">Years of Excellence</span>
          </p>
          <span className="hidden sm:block w-px h-8 bg-white/15" aria-hidden="true" />
          <p className="font-['Manrope'] text-white/70">
            <span className="font-bold tracking-tight text-3xl md:text-4xl text-white align-middle">850+</span>
            <span className="text-sm md:text-[15px] ml-3 align-middle text-white/55">Agent Partners</span>
          </p>
        </div>

        {/* Two actions only */}
        <div data-reveal className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/technology" data-testid="technology-explore-cta">
            <Button className="bg-white text-[#174358] hover:bg-white/90 rounded-full px-8 py-5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all group">
              Explore the Agent Portal <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <a href="#contact" data-testid="technology-cta">
            <Button variant="outline" className="rounded-full px-8 py-5 text-sm font-semibold border-white/20 text-white hover:bg-white/5 transition-all group">
              Speak to Our Team <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
