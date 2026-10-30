import { useEffect } from "react";
import { MapPin, Users, Globe, Calendar, Building2, ArrowRight, Shield, Heart, Zap, Eye, Handshake, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CEO_IMAGE = "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/qixudvfh__DSC3428%20%282%29.jpg";
const FOUNDER_IMAGE = "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/23okgmgo_Screenshot%202026-04-16%20at%204.08.48%E2%80%AFPM.png";

const stats = [
  { value: "30+", label: "Years of Experience" },
  { value: "850+", label: "Agent Partners" },
  { value: "45+", label: "Destinations" },
  { value: "6", label: "Global Offices" },
];

const values = [
  { icon: Shield, title: "Trust & Reliability", desc: "Every booking, every transfer, every experience delivered exactly as promised. Our 30-year track record speaks for itself." },
  { icon: Eye, title: "Transparency", desc: "Live rates, clear margins, no hidden costs. Our agents see exactly what they're selling and exactly what they're earning." },
  { icon: Zap, title: "Innovation", desc: "From dynamic packaging to instant confirmations, we invest in technology that gives our agents a competitive edge." },
  { icon: Heart, title: "Local Expertise", desc: "On-ground teams in every destination who live and breathe the regions they serve. No outsourced operations, no guesswork." },
  { icon: Handshake, title: "Partnership First", desc: "We succeed when our agents succeed. Every product, every feature, every support call is designed around the agent's needs." },
];

const accreditations = [
  { abbr: "MOT", full: "Ministry of Tourism, Government of India", type: "Approved Tour Operator" },
  { abbr: "IATA", full: "International Air Transport Association", type: "Accredited Agent" },
  { abbr: "TAAI", full: "Travel Agents Association of India", type: "Member" },
  { abbr: "PATA", full: "Pacific Asia Travel Association", type: "Member" },
  { abbr: "ADTOI", full: "Association of Domestic Tour Operators of India", type: "Member" },
  { abbr: "Travelife", full: "Sustainability Certification Programme", type: "Certified" },
];

const hqHighlights = [
  { icon: Building2, title: "Vatika City Point", desc: "A premium Grade-A commercial hub in Sector 49, Gurgaon. Surrounded by top-tier corporates and minutes from the Delhi-Gurgaon Expressway." },
  { icon: Users, title: "120+ Member Team", desc: "Home to our core operations, destination planning, technology, and partner success teams, all working under one roof to power 45+ destinations." },
  { icon: Globe, title: "Central Nerve Centre", desc: "Every group tour, FIT itinerary, and MICE event across our six-country network is coordinated from this office with live rates and 24/7 agent support." },
  { icon: Zap, title: "Tech-Enabled Workspace", desc: "Open-plan, modern workspace with collaborative zones, dedicated video conferencing suites, and the engineering floor where our B2B platform is built." },
];

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div data-testid="about-page" className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A] via-[#0D1B2A]/95 to-[#174358]/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-28 w-full">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white/40 mb-6 font-['Manrope']">About Hi DMC</p>
          <h1 data-reveal data-testid="about-heading" className="font-['Manrope'] font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] mb-7">
            Technology-Driven.<br />Locally Expert.
          </h1>
          <p data-reveal className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed font-['Manrope']">
            A division of Hi Tours Group, one of Asia's leading travel companies. For over three decades, Hi DMC has been the trusted destination management partner for travel agents worldwide.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#174358]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-16">
          <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-2">
                <p className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl text-white mb-1">{s.value}</p>
                <p className="text-[11px] text-white/45 uppercase tracking-wider font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About HI DMC + Hi Tours Group */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div data-reveal>
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4 font-['Manrope']">Who We Are</p>
              <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#0D1B2A] leading-[1.1] mb-7">Hi DMC, a part of Hi Tours Group</h2>
              <div className="space-y-5 text-sm md:text-[15px] text-[#0D1B2A]/60 leading-relaxed font-['Manrope']">
                <p>Hi DMC is the destination management division of Hi Tours Group, one of Asia's most established travel companies. Founded over three decades ago, Hi Tours Group has grown into a comprehensive travel conglomerate with operations across inbound tourism, outbound travel, MICE, and technology-driven B2B travel solutions.</p>
                <p>With operations spanning six countries and partnerships with over 850 travel agents globally, Hi DMC delivers end-to-end ground handling with the precision of a local operator and the reach of a global network. From FIT packages and group tours to complex MICE events, every booking is backed by our on-ground teams.</p>
                <p>Our proprietary technology platform gives agents live rates, dynamic packaging, and instant confirmations, transforming how B2B travel is sold and delivered. We believe the best travel experiences are built on trust, local knowledge, and technology that works.</p>
              </div>
            </div>
            <div data-reveal-group className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-[#F8FAFB] rounded-2xl p-7 border border-[#0D1B2A]/06 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_24px_60px_-24px_rgba(13,27,42,0.3)] transition-shadow duration-700">
                  <Globe size={22} className="text-[#174358]/40 mb-3" strokeWidth={1.5} />
                  <p className="text-2xl font-bold text-[#0D1B2A] mb-1">45+</p>
                  <p className="text-[10px] text-[#0D1B2A]/40 uppercase tracking-wider font-semibold">Destinations</p>
                </div>
                <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-[#0D1B2A]/06 shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)] hover:shadow-xl transition-shadow duration-500">
                  <Calendar size={22} className="text-[#174358]/40 mb-3" strokeWidth={1.5} />
                  <p className="text-2xl font-bold text-[#0D1B2A] mb-1">30+</p>
                  <p className="text-[10px] text-[#0D1B2A]/40 uppercase tracking-wider font-semibold">Years</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-[#0D1B2A]/06 shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)] hover:shadow-xl transition-shadow duration-500">
                  <Users size={22} className="text-[#174358]/40 mb-3" strokeWidth={1.5} />
                  <p className="text-2xl font-bold text-[#0D1B2A] mb-1">850+</p>
                  <p className="text-[10px] text-[#0D1B2A]/40 uppercase tracking-wider font-semibold">Agent Partners</p>
                </div>
                <div className="bg-[#F8FAFB] rounded-2xl p-6 border border-[#0D1B2A]/06 shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)] hover:shadow-xl transition-shadow duration-500">
                  <Building2 size={22} className="text-[#174358]/40 mb-3" strokeWidth={1.5} />
                  <p className="text-2xl font-bold text-[#0D1B2A] mb-1">6</p>
                  <p className="text-[10px] text-[#0D1B2A]/40 uppercase tracking-wider font-semibold">Global Offices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message from CEO */}
      <section data-testid="ceo-message" className="py-20 md:py-28 px-6 md:px-12 bg-[#F4F1E8]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-2 flex flex-col items-center lg:items-start gap-6">
              <div data-reveal className="group w-64 h-72 rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)]">
                <img src={CEO_IMAGE} alt="Hunar Syal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="text-center lg:text-left">
                <p className="text-lg font-bold text-[#0D1B2A]">Hunar Syal</p>
                <p className="text-[11px] text-[#0D1B2A]/40 uppercase tracking-wider font-semibold">Chief Executive Officer</p>
              </div>
              <div data-reveal className="group w-48 h-56 rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] -mt-2 ml-24 lg:ml-32">
                <img src={FOUNDER_IMAGE} alt="Prem Syal" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="text-center lg:text-left ml-24 lg:ml-32">
                <p className="text-lg font-bold text-[#0D1B2A]">Prem Syal</p>
                <p className="text-[11px] text-[#0D1B2A]/40 uppercase tracking-wider font-semibold">Founder & Chairman</p>
              </div>
            </div>
            <div data-reveal="right" className="lg:col-span-3">
              <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4 font-['Manrope']">A Message from Our CEO</p>
              <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#0D1B2A] leading-[1.1] mb-8">"We build for the agent."</h2>
              <div className="space-y-5 text-sm md:text-[15px] text-[#0D1B2A]/60 leading-relaxed font-['Manrope']">
                <p>When my father Prem Syal founded Hi Tours over three decades ago, his vision was simple: build a travel company that earns trust through consistency, not just promises. That principle has guided us through every expansion, every market cycle, and every technology leap.</p>
                <p>Today, as we grow Hi DMC into one of Asia's most technology-forward destination management companies, that principle remains our North Star. We don't build products for ourselves. We build them for the travel agent who needs live rates at midnight, the group tour operator juggling 200 pax across three countries, and the boutique agency crafting a once-in-a-lifetime honeymoon.</p>
                <p>Our platform exists because we listened to agents. Our on-ground teams exist because we believe technology without local expertise is just software. And our 850+ partner network exists because we deliver on every booking, every time.</p>
                <p>If you're a travel professional looking for a DMC partner who combines the reliability of 30 years with the innovation of tomorrow, we'd love to welcome you to the Hi DMC family.</p>
              </div>
              <p className="mt-6 text-sm font-semibold text-[#0D1B2A]">Hunar Syal</p>
              <p className="text-[10px] text-[#0D1B2A]/40">CEO, Hi DMC | Hi Tours India Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section data-testid="about-values" className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="max-w-2xl mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4 font-['Manrope']">Our Foundation</p>
            <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#0D1B2A] leading-[1.1]">The values we strive for</h2>
          </div>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {values.map((v) => (
              <div key={v.title} data-testid={`value-${v.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-[#F8FAFB] rounded-2xl p-7 border border-[#0D1B2A]/06 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_24px_60px_-24px_rgba(13,27,42,0.3)] hover:border-[#174358]/15 transition-all duration-700">
                <v.icon size={24} className="text-[#174358]/40 mb-4" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">{v.title}</h3>
                <p className="text-xs text-[#0D1B2A]/50 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section data-testid="about-accreditations" className="py-20 md:py-28 px-6 md:px-12 bg-[#F8FAFB]">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4 font-['Manrope']">Accreditations & Trust</p>
            <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#0D1B2A] leading-[1.1]">Industry recognised</h2>
            <p className="text-sm md:text-[15px] text-[#0D1B2A]/50 mt-4 font-['Manrope']">Certified and accredited by the bodies that matter most in global travel.</p>
          </div>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accreditations.map((a) => (
              <div key={a.abbr} className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-[#0D1B2A]/06 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_24px_60px_-24px_rgba(13,27,42,0.3)] hover:border-[#174358]/15 transition-all duration-700">
                <Shield size={16} className="text-[#174358]/40 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#0D1B2A] mb-0.5">{a.abbr}</p>
                  <p className="text-xs text-[#0D1B2A]/45 leading-relaxed">{a.full}</p>
                  <p className="text-[10px] text-[#174358]/50 font-semibold mt-1 uppercase tracking-wider">{a.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Headquarters */}
      <section data-testid="about-hq" className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div data-reveal className="max-w-3xl mb-16">
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4 font-['Manrope']">Where We Operate From</p>
            <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-[#0D1B2A] leading-[1.1] mb-6">Our Headquarters</h2>
            <p className="text-sm md:text-[15px] text-[#0D1B2A]/60 leading-relaxed font-['Manrope']">
              Located in the heart of Gurgaon's commercial district, our headquarters at Vatika City Point serves as the operational nerve centre for the entire Hi DMC network. A team of 120+ travel professionals including destination managers, operations specialists, tech engineers, and partner success leads orchestrate seamless ground handling across 45+ destinations and six countries, every single day.
            </p>
          </div>

          {/* Address card */}
          <div data-reveal className="bg-[#0D1B2A] rounded-2xl p-8 md:p-12 mb-10 shadow-[0_24px_60px_-24px_rgba(13,27,42,0.5)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-5">
                <div className="flex items-start gap-3 mb-6">
                  <MapPin size={18} className="text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold text-white mb-1">Hi Tours India Pvt. Ltd.</p>
                    <p className="text-sm text-white/50 leading-relaxed">Vatika City Point, Sector 49<br />Gurgaon, Haryana 122002<br />India</p>
                  </div>
                </div>
                <div className="space-y-3 pl-8">
                  <a href="tel:+911244600000" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/60 transition-colors">
                    <Phone size={12} /> +91 124 460 0000
                  </a>
                  <a href="mailto:info@hidmc.in" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/60 transition-colors">
                    <Mail size={12} /> info@hidmc.in
                  </a>
                </div>
              </div>
              <div className="md:col-span-7">
                <p className="text-sm text-white/40 leading-relaxed">
                  Vatika City Point is a premium Grade-A commercial complex situated along the Sohna Road corridor in Sector 49, Gurgaon, one of the National Capital Region's most connected business hubs. Minutes from the Delhi-Gurgaon Expressway, the Rapid Metro network, and IGI Airport, our office is designed for the pace of modern B2B travel. Open-plan collaboration floors, dedicated MICE war rooms, video conferencing suites for global partner calls, and the engineering workspace where our proprietary agent platform is built, tested, and shipped, all under one roof.
                </p>
              </div>
            </div>
          </div>

          {/* HQ highlights grid */}
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {hqHighlights.map((h) => (
              <div key={h.title} data-testid={`hq-highlight-${h.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-[#F8FAFB] rounded-2xl p-7 border border-[#0D1B2A]/06 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_24px_60px_-24px_rgba(13,27,42,0.3)] hover:border-[#174358]/15 transition-all duration-700">
                <h.icon size={22} className="text-[#174358]/40 mb-3" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-2">{h.title}</h3>
                <p className="text-xs text-[#0D1B2A]/50 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#174358]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl text-white leading-[1.1] mb-5">Partner With Hi DMC</h2>
          <p data-reveal className="text-white/50 text-sm md:text-base mb-9 max-w-xl mx-auto font-['Manrope'] leading-relaxed">Join 850+ travel agents who trust us for reliable ground handling, live rates, and local expertise across 45+ destinations.</p>
          <div data-reveal className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup"><Button className="bg-white text-[#174358] hover:bg-white/90 rounded-full px-8 py-5 text-sm font-semibold shadow-lg">Sign Up as Partner <ArrowRight size={14} className="ml-1.5" /></Button></Link>
            <a href={process.env.REACT_APP_AGENT_PORTAL_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="text-white/60 hover:text-white rounded-full px-8 py-5 text-sm border border-white/15 hover:border-white/30 font-semibold">Sign In as Agent</Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
