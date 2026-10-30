import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Zap, BarChart3, Settings, Globe, Layers, Shield, Clock, Users, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import Navbar from "./Navbar";
import Footer from "./Footer";

const IMAGES = {
  hero: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/tol7lzwp_man-laptop-illustration.png",
  plan: "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/gw79q273_Plan.png",
  book: "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/z7l7l9xo_Create-plan-book-sell-HRZ-Format-%E2%80%93-1920x1080-2nd-vrs.png",
  expand: "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/bqeqrjk9_expand-3.png",
  info: "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/b1442dd7_info-1.png",
  itinerary: "https://customer-assets.emergentagent.com/job_8c4b15f3-8e00-4f7a-acca-fa08d90aa8eb/artifacts/ko2xxg0a_Add-a-little-bit-of-body-text.png",
};

const steps = [
  { num: "01", label: "Plan", desc: "Build dynamic itineraries with real-time inventory" },
  { num: "02", label: "Book", desc: "Confirm instantly at the lowest live rates" },
  { num: "03", label: "Expand", desc: "Scale with modular packages and flexible combinations" },
];

const benefits = [
  { icon: TrendingUp, title: "Live Rates & Lowest Pricing", desc: "Access real-time rates across 500K+ hotels, 200+ airlines, and 10K+ experiences. Our lowest price technology automatically surfaces the best available pricing so your clients always get the most competitive rates in the market." },
  { icon: Settings, title: "Inventory Management", desc: "Manage your complete product catalogue from one dashboard. Hotels, flights, transfers, tours and experiences — all with live availability and instant confirmation. No more calling suppliers for rates." },
  { icon: Layers, title: "Integrations", desc: "Seamlessly connected with major GDS systems, hotel chains, airlines, and local suppliers worldwide. One platform that brings all your supplier relationships together." },
  { icon: BarChart3, title: "Profit & Cost Control", desc: "Set your own markups, manage commissions, and track margins in real time. Full visibility over your revenue on every booking — from FIT packages to group tours." },
  { icon: Globe, title: "Scalability", desc: "From a single FIT booking to managing 500-pax group tours across multiple destinations — the platform scales effortlessly. Handle thousands of bookings simultaneously." },
  { icon: Zap, title: "Automation & Flexibility", desc: "Automated confirmations, travel documentation, and mid-trip modifications. Turn hours of manual work into seconds. Your team focuses on selling, not paperwork." },
];

const trustStats = [
  { value: "30+", label: "Years of DMC Excellence" },
  { value: "850+", label: "Active Travel Agents" },
  { value: "500K+", label: "Live Hotel Rates" },
  { value: "45+", label: "Destinations Worldwide" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "200+", label: "Airline Partners" },
];

export default function TechnologyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section data-testid="tech-hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-24 bg-[#0D1B2A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div data-reveal-group>
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white/40 mb-5 font-['Manrope']">Our Technology Platform</p>
              <h1 data-testid="tech-hero-heading" className="font-['Manrope'] font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-7">
                Live Rates. Lowest Prices.<br />
                30 Years of Trusted DMC Excellence.
              </h1>
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-9 max-w-xl font-['Manrope']">
                Your agents deserve live pricing from the world's largest travel inventory — combined with the superior destination management quality they've relied on for three decades. Our lowest price technology ensures every booking is the best deal available.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/#contact" data-testid="tech-hero-demo-btn">
                  <Button className="bg-white text-[#174358] hover:bg-white/90 rounded-full px-8 py-5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all">
                    Request a Demo <ArrowRight size={15} className="ml-2" />
                  </Button>
                </Link>
                <a href="#how-it-works" data-testid="tech-hero-learn-btn">
                  <Button variant="outline" className="rounded-full px-8 py-5 text-sm font-semibold border-white/20 text-white hover:bg-white/5 transition-all">
                    See How It Works <ChevronRight size={15} className="ml-1" />
                  </Button>
                </a>
              </div>
            </div>
            <div data-reveal="right" className="hidden lg:block">
              <img src={IMAGES.hero} alt="Travel agent using Hi DMC platform" className="w-full max-w-lg mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — Plan / Book / Expand */}
      <section id="how-it-works" data-testid="tech-how-it-works" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-3 font-['Manrope']">How It Works</p>
            <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-[#0D1B2A] leading-[1.05] mb-5">
              Plan. Book. Expand.
            </h2>
            <p className="text-[#0D1B2A]/50 max-w-2xl mx-auto text-base leading-relaxed font-['Manrope']">
              Three steps to transform how your agency builds and sells travel. Live rates, instant confirmation, and the pricing power of 30 years of DMC relationships.
            </p>
          </div>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.num} data-testid={`tech-step-${s.num}`} className="relative bg-white rounded-2xl p-8 md:p-10 border border-[#0D1B2A]/06 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:border-[#174358]/15 hover:shadow-[0_24px_60px_-24px_rgba(13,27,42,0.3)] transition-all duration-700 group">
                <span className="text-6xl font-['Manrope'] font-bold tracking-tight text-[#174358]/08 absolute top-4 right-6">{s.num}</span>
                <h3 className="text-xl font-bold text-[#0D1B2A] mb-2 mt-4">{s.label}</h3>
                <p className="text-sm text-[#0D1B2A]/45 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLAN Section */}
      <section data-testid="tech-plan-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div data-reveal>
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-3 font-['Manrope']">Step 01</p>
              <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#0D1B2A] leading-[1.1] mb-6">
                Plan Dynamic Itineraries
              </h2>
              <p className="text-[#0D1B2A]/55 leading-relaxed mb-7 text-base font-['Manrope']">
                Build complete multi-destination itineraries with live rates from our global inventory. Drag and drop hotels, flights, transfers, tours and experiences — with real-time pricing that updates as you build. No more spreadsheets. No more waiting for supplier quotes.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Multi-destination itineraries with live pricing per component",
                  "Drag and drop hotels, flights, rental cars, tours & activities",
                  "Real-time availability across 500K+ hotels worldwide",
                  "Automatic lowest price selection from multiple suppliers",
                  "Save and reuse itinerary templates for repeat destinations",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#174358]/08 flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={11} className="text-[#174358]/60" /></div>
                    <span className="text-sm text-[#0D1B2A]/55 leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div data-reveal-img className="group rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] border border-[#0D1B2A]/06">
                <img src={IMAGES.plan} alt="Plan dynamic travel itineraries with live rates" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK Section */}
      <section data-testid="tech-book-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div data-reveal-img className="group rounded-2xl overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] border border-white/08">
                <img src={IMAGES.book} alt="Book with live rates and instant confirmation" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
            <div data-reveal="right" className="order-1 lg:order-2">
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white/40 mb-3 font-['Manrope']">Step 02</p>
              <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-white leading-[1.1] mb-6">
                Book at Live Rates
              </h2>
              <p className="text-white/50 leading-relaxed mb-7 text-base font-['Manrope']">
                Search, select, and confirm — all at live rates with instant booking confirmation. Our lowest price technology scans multiple suppliers in real time to guarantee your agents the most competitive pricing. No callbacks, no pending confirmations. Just instant, confirmed bookings.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Live rates from multiple suppliers — always the lowest price",
                  "Instant booking confirmation with real-time availability",
                  "On-sale inventory and exclusive DMC-negotiated rates",
                  "Set your own markups and commissions per booking",
                  "Automated travel documentation and vouchers",
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/08 flex items-center justify-center flex-shrink-0 mt-0.5"><Check size={11} className="text-white/60" /></div>
                    <span className="text-sm text-white/50 leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPAND Section */}
      <section data-testid="tech-expand-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="text-center mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-3 font-['Manrope']">Step 03</p>
            <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#0D1B2A] leading-[1.1] mb-6">
              Expand with Modular Packaging
            </h2>
            <p className="text-[#0D1B2A]/50 max-w-2xl mx-auto text-base leading-relaxed font-['Manrope']">
              Scale from FIT bookings to complex group tours using our modular packaging engine. Combine single products into shared or private modules, then flexibly assemble them into complete itineraries. One system — unlimited combinations.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mb-16">
            <div data-reveal-img className="group rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] border border-[#0D1B2A]/06 bg-white p-4 md:p-6">
              <img src={IMAGES.expand} alt="Expand with modular travel packaging" className="w-full rounded-xl object-cover group-hover:scale-[1.03] transition-transform duration-700" />
            </div>
          </div>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Single Products", desc: "Flights, hotels, transfers, activities — each bookable individually with live rates from our global supplier network." },
              { title: "Flexible Modules", desc: "Combine products into shared group tour modules, fixed private packages, or fully flexible custom itineraries." },
              { title: "Complete Itineraries", desc: "Assemble modules into complete multi-destination itineraries. Any combination, any destination, any group size." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-7 border border-[#0D1B2A]/06 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:border-[#174358]/15 hover:shadow-[0_24px_60px_-24px_rgba(13,27,42,0.3)] transition-all duration-700">
                <h4 className="text-sm font-bold text-[#0D1B2A] mb-2">{item.title}</h4>
                <p className="text-xs text-[#0D1B2A]/40 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section data-testid="tech-benefits-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div data-reveal>
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-3 font-['Manrope']">Platform Benefits</p>
              <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#0D1B2A] leading-[1.1] mb-6">
                Everything Your Agency Needs
              </h2>
              <p className="text-[#0D1B2A]/50 leading-relaxed mb-10 text-base font-['Manrope']">
                Built for travel agents who demand live rates, the lowest prices, and the quality of a DMC with 30 years of on-the-ground expertise across 45+ countries.
              </p>
              <div data-reveal-group className="space-y-6">
                {benefits.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} data-testid={`tech-benefit-${b.title.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}`} className="group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#174358]/06 flex items-center justify-center flex-shrink-0 group-hover:bg-[#174358]/12 transition-colors">
                          <Icon size={18} strokeWidth={1.5} className="text-[#174358]/50 group-hover:text-[#174358] transition-colors" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0D1B2A] mb-1">{b.title}</h4>
                          <p className="text-xs text-[#0D1B2A]/40 leading-relaxed">{b.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative lg:sticky lg:top-32">
              <div data-reveal-img className="group rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] border border-[#0D1B2A]/06">
                <img src={IMAGES.info} alt="Platform features — inventory, integrations, scalability, automation" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section data-testid="tech-trust-stats" className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-[#174358]">
        <div className="max-w-7xl mx-auto">
          <div data-reveal-group className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustStats.map((s) => (
              <div key={s.label} className="text-center py-4">
                <p className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl text-white mb-1">{s.value}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section data-testid="tech-cta" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-[#0D1B2A] leading-[1.05] mb-6">
            Ready for Live Rates and the Best Pricing?
          </h2>
          <p data-reveal className="text-[#0D1B2A]/50 text-base leading-relaxed mb-9 font-['Manrope']">
            Join 850+ travel agents who trust our platform for live pricing, instant confirmations, and the superior destination management quality we've delivered for over 30 years.
          </p>
          <div data-reveal className="flex flex-wrap justify-center gap-4">
            <Link to="/#contact" data-testid="tech-cta-demo-btn">
              <Button className="bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full px-10 py-6 text-sm font-semibold shadow-lg shadow-[#174358]/20 hover:shadow-xl transition-all">
                Request a Demo <ArrowRight size={15} className="ml-2" />
              </Button>
            </Link>
            <Link to="/#contact" data-testid="tech-cta-signup-btn">
              <Button variant="outline" className="rounded-full px-10 py-6 text-sm font-semibold border-[#174358]/20 text-[#174358] hover:bg-[#174358]/05 transition-all">
                Sign Up as Agent <ArrowRight size={15} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
