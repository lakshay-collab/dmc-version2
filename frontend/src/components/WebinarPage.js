import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Users, Video } from "lucide-react";
import { Button } from "../components/ui/button";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const webinars = [
  {
    id: 1,
    title: "Selling India: FIT Packages & Hidden Gems for 2026",
    date: "2026-02-18",
    time: "14:00 GMT",
    duration: "45 min",
    speaker: "Rajesh Mehta",
    speakerRole: "Head of India Operations, Hi DMC",
    description: "Discover how to sell India beyond the Golden Triangle. We'll cover our top-performing FIT packages, new experiential products, and how to use our platform to build custom India itineraries with live rates.",
    topics: ["FIT package bestsellers", "Live pricing on India hotels", "New experiential products", "Platform demo"],
    type: "Product Showcase",
  },
  {
    id: 2,
    title: "Live Rates & Lowest Price Technology: Platform Walkthrough",
    date: "2026-03-12",
    time: "10:00 GMT",
    duration: "60 min",
    speaker: "Sarah Chen",
    speakerRole: "VP Technology, Hi DMC",
    description: "A hands-on walkthrough of our dynamic packaging platform. See how live rates work, how the lowest price engine selects the best supplier, and how to set your markups and commissions.",
    topics: ["Live rate engine demo", "Lowest price technology", "Markup & commission setup", "Booking workflow"],
    type: "Platform Training",
  },
  {
    id: 3,
    title: "MICE & Group Tours: Scaling Operations with Modular Packaging",
    date: "2026-03-26",
    time: "15:00 GMT",
    duration: "45 min",
    speaker: "David Thompson",
    speakerRole: "Director of Group Sales, Hi DMC",
    description: "Learn how our modular packaging system handles complex group itineraries across multiple destinations. From shared group tours to fully flexible private modules — see how agents are scaling their MICE business.",
    topics: ["Group tour modules", "MICE event planning", "Multi-destination logistics", "Case study: 200-pax incentive trip"],
    type: "Case Study",
  },
  {
    id: 4,
    title: "Summer 2026: Europe & Mediterranean Destination Briefing",
    date: "2026-06-04",
    time: "11:00 GMT",
    duration: "50 min",
    speaker: "Elena Papadopoulos",
    speakerRole: "Regional Manager, Europe & Med, Hi DMC",
    description: "Get ahead of summer demand with our Europe and Mediterranean destination briefing. We'll share inventory updates, new hotel partnerships, exclusive DMC-negotiated rates, and top-selling itineraries for Greece, Italy, Spain, and Turkey.",
    topics: ["Summer inventory updates", "Exclusive DMC rates", "Greece & Italy highlights", "New hotel partnerships"],
    type: "Destination Briefing",
  },
  {
    id: 5,
    title: "Automating Your Agency: From Booking to Travel Documentation",
    date: "2026-07-15",
    time: "14:00 GMT",
    duration: "40 min",
    speaker: "Sarah Chen",
    speakerRole: "VP Technology, Hi DMC",
    description: "Discover how to eliminate manual work from your booking process. We'll demonstrate automated confirmations, voucher generation, mid-trip modifications, and how the platform handles post-booking changes seamlessly.",
    topics: ["Automated confirmations", "Voucher generation", "Mid-trip modifications", "Time-saving workflows"],
    type: "Platform Training",
  },
  {
    id: 6,
    title: "Hi DMC Platform Demo: Live Rates, Lowest Prices & How to Get Started",
    date: "2026-04-27",
    time: "12:00 PM IST",
    duration: "60 min",
    speaker: "Hi DMC Team",
    speakerRole: "Hi DMC",
    description: "Join us for a live walkthrough of the Hi DMC platform. See how travel agents access live rates, benefit from our lowest price technology, and leverage 30 years of DMC excellence to grow their business. Open Q&A at the end.",
    topics: ["Live rates demo", "Lowest price technology", "Agent onboarding", "Q&A"],
    type: "Platform Training",
    meetingLink: "https://meet.zoho.com/srfl-hwm-bfu",
  },
];

function getMonthYear(dateStr) {
  const d = new Date(dateStr);
  return { month: d.getMonth(), year: d.getFullYear() };
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

const typeColors = {
  "Product Showcase": "bg-[#174358]/10 text-[#174358]",
  "Platform Training": "bg-[#0D1B2A]/08 text-[#0D1B2A]/70",
  "Case Study": "bg-[#174358]/06 text-[#174358]/80",
  "Destination Briefing": "bg-[#0D1B2A]/05 text-[#0D1B2A]/60",
};

export default function WebinarPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(2026);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filteredWebinars = webinars.filter((w) => {
    const { month, year } = getMonthYear(w.date);
    return month === selectedMonth && year === selectedYear;
  });

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const isPast = (dateStr) => new Date(dateStr) < new Date();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section data-testid="webinar-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-24 bg-[#0D1B2A] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div data-reveal-group className="max-w-3xl">
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white/40 mb-5 font-['Manrope']">Webinars & Events</p>
            <h1 data-testid="webinar-hero-heading" className="font-['Manrope'] font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] mb-7">
              Learn, Connect, Grow.
            </h1>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl font-['Manrope']">
              Join our expert-led webinars to discover new destinations, master our platform, and learn how top-performing agents are growing their business with Hi DMC.
            </p>
          </div>
        </div>
      </section>

      {/* Month Selector */}
      <section data-testid="webinar-month-selector" className="py-10 px-6 md:px-12 lg:px-24 bg-[#F8FAFB] border-b border-[#0D1B2A]/06">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Manrope'] font-bold tracking-tight text-2xl md:text-3xl text-[#0D1B2A]">
              Browse by Month
            </h2>
            <div className="flex items-center gap-3">
              <button data-testid="webinar-prev-month" onClick={handlePrevMonth} className="w-9 h-9 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#174358]/05 transition-colors">
                <ChevronLeft size={16} className="text-[#0D1B2A]/50" />
              </button>
              <span className="text-sm font-semibold text-[#0D1B2A] min-w-[120px] text-center">{selectedYear}</span>
              <button data-testid="webinar-next-month" onClick={handleNextMonth} className="w-9 h-9 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#174358]/05 transition-colors">
                <ChevronRight size={16} className="text-[#0D1B2A]/50" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
            {MONTHS.map((m, idx) => {
              const hasWebinars = webinars.some((w) => {
                const { month, year } = getMonthYear(w.date);
                return month === idx && year === selectedYear;
              });
              const isSelected = selectedMonth === idx;
              return (
                <button
                  key={m}
                  data-testid={`webinar-month-${m.toLowerCase()}`}
                  onClick={() => setSelectedMonth(idx)}
                  className={`relative py-3 px-1 rounded-xl text-center transition-all text-xs font-semibold tracking-wide
                    ${isSelected
                      ? "bg-[#174358] text-white shadow-lg shadow-[#174358]/20"
                      : hasWebinars
                        ? "bg-white text-[#0D1B2A] border border-[#174358]/15 hover:border-[#174358]/30"
                        : "bg-white/60 text-[#0D1B2A]/30 border border-[#0D1B2A]/06"
                    }`}
                >
                  {m.slice(0, 3)}
                  {hasWebinars && !isSelected && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#174358]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Webinar Listing */}
      <section data-testid="webinar-listing" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl text-[#0D1B2A] leading-[1.1] mb-2">
            {MONTHS[selectedMonth]} {selectedYear}
          </h3>
          <p className="text-sm text-[#0D1B2A]/40 mb-12 font-['Manrope']">
            {filteredWebinars.length} webinar{filteredWebinars.length !== 1 ? "s" : ""} scheduled
          </p>

          {filteredWebinars.length === 0 ? (
            <div data-testid="webinar-empty-state" className="text-center py-20 bg-[#F8FAFB] rounded-2xl border border-[#0D1B2A]/06">
              <div className="w-16 h-16 rounded-full bg-[#174358]/06 flex items-center justify-center mx-auto mb-5">
                <Calendar size={28} strokeWidth={1.5} className="text-[#174358]/30" />
              </div>
              <p className="text-lg font-semibold text-[#0D1B2A]/60 mb-2">Sorry, no webinar for this month found.</p>
              <p className="text-sm text-[#0D1B2A]/35 max-w-md mx-auto">
                Check other months or sign up below to get notified when new webinars are announced.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredWebinars.map((w) => (
                <div
                  key={w.id}
                  data-testid={`webinar-card-${w.id}`}
                  className={`rounded-2xl border transition-all duration-500 ${isPast(w.date) ? "border-[#0D1B2A]/06 bg-[#F8FAFB]/60 opacity-70" : "border-[#0D1B2A]/06 bg-white shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)] hover:border-[#174358]/20 hover:shadow-xl"}`}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`text-[10px] tracking-wider uppercase font-bold px-3 py-1 rounded-full ${typeColors[w.type] || "bg-gray-100 text-gray-600"}`}>
                        {w.type}
                      </span>
                      {isPast(w.date) && (
                        <span className="text-[10px] tracking-wider uppercase font-bold px-3 py-1 rounded-full bg-[#0D1B2A]/05 text-[#0D1B2A]/40">
                          Past Event
                        </span>
                      )}
                    </div>
                    <h4 className="font-['Manrope'] font-bold tracking-tight text-2xl md:text-3xl text-[#0D1B2A] mb-3">{w.title}</h4>
                    <p className="text-sm text-[#0D1B2A]/45 leading-relaxed mb-5 max-w-3xl">{w.description}</p>

                    <div className="flex flex-wrap gap-5 mb-5">
                      <div className="flex items-center gap-2 text-sm text-[#0D1B2A]/50">
                        <Calendar size={14} className="text-[#174358]/50" />
                        <span>{formatDate(w.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0D1B2A]/50">
                        <Clock size={14} className="text-[#174358]/50" />
                        <span>{w.time} ({w.duration})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0D1B2A]/50">
                        <Users size={14} className="text-[#174358]/50" />
                        <span>{w.speaker}, {w.speakerRole}</span>
                      </div>
                    </div>

                    {w.topics && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {w.topics.map((t) => (
                          <span key={t} className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#174358]/04 text-[#174358]/60">{t}</span>
                        ))}
                      </div>
                    )}

                    {!isPast(w.date) && (
                      <a href={w.meetingLink || "#register"} target={w.meetingLink ? "_blank" : undefined} rel={w.meetingLink ? "noopener noreferrer" : undefined} data-testid={`webinar-register-${w.id}`}>
                        <Button className="bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full px-7 py-5 text-sm font-semibold shadow-md hover:shadow-lg transition-all">
                          {w.meetingLink ? "Join Webinar" : "Register Now"} <ArrowRight size={14} className="ml-2" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Registration Form (Zoho Embed Placeholder) */}
      <section id="register" data-testid="webinar-register-section" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
        <div className="max-w-3xl mx-auto">
          <div data-reveal className="text-center mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-3 font-['Manrope']">Register</p>
            <h2 className="font-['Manrope'] font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-[#0D1B2A] leading-[1.05] mb-5">
              Sign Up for Upcoming Webinars
            </h2>
            <p className="text-[#0D1B2A]/50 text-base leading-relaxed font-['Manrope']">
              Fill in the form below to register for our next webinar. You'll receive a confirmation email with the meeting link.
            </p>
          </div>

          {/* Zoho Embed Form Placeholder */}
          <div
            data-reveal
            data-testid="webinar-zoho-form-placeholder"
            className="rounded-2xl border-2 border-dashed border-[#174358]/15 bg-white p-12 md:p-16 text-center shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)]"
          >
            <div className="w-14 h-14 rounded-full bg-[#174358]/06 flex items-center justify-center mx-auto mb-5">
              <Video size={24} strokeWidth={1.5} className="text-[#174358]/40" />
            </div>
            <p className="text-base font-semibold text-[#0D1B2A]/60 mb-2">Zoho Registration Form</p>
            <p className="text-sm text-[#0D1B2A]/35 max-w-md mx-auto mb-6">
              Your Zoho embed form will appear here. Replace this placeholder with your Zoho form embed code.
            </p>
            <code className="text-xs text-[#174358]/40 bg-[#174358]/04 px-4 py-2 rounded-lg inline-block">
              {'<!-- Paste your Zoho embed code here -->'}
            </code>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
