import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Phone, Clock, MapPin, Shield, Users, Compass, Award, Coffee } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const phoneCodes = [
  { code: "+91", flag: "\u{1F1EE}\u{1F1F3}" }, { code: "+1", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}" }, { code: "+971", flag: "\u{1F1E6}\u{1F1EA}" },
  { code: "+65", flag: "\u{1F1F8}\u{1F1EC}" }, { code: "+61", flag: "\u{1F1E6}\u{1F1FA}" },
];
const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
  "Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
  "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Chandigarh",
];

const includeIcons = [Shield, Users, Compass, Award, Coffee];

const TABS = ["At a Glance", "Itinerary", "Pricing", "Things to Know"];

/* ── Sidebar ── */
function Sidebar({ destName, pkgTitle }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", agency_name: "", email: "", phone_code: "+91", phone: "", state: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const isIndia = form.phone_code === "+91";
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.agency_name || !form.email || !form.phone) { toast.error("Please fill required fields"); return; }
    if (isIndia && !form.state) { toast.error("Please select your state"); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, { ...form, source_page: `Package - ${pkgTitle}`, destination: destName, form_type: "B2B" });
      setSent(true);
      window.history.pushState({}, "", `${window.location.pathname}/thank-you`);
      toast.success("Inquiry submitted!");
    } catch { toast.error("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div data-testid="pkg-sidebar" className="bg-[#F8FAFB] rounded-2xl p-7 border border-[#0D1B2A]/10">
      <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#0D1B2A]/30 mb-2">Meet Our {destName} Experts</p>
      <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A] mb-3">Speak to a specialist.</h3>
      <p className="text-xs text-[#0D1B2A]/50 leading-relaxed mb-5">
        Our {destName} team are waiting to help you plan your next journey. Speak to a specialist today and we'll begin drafting your tailored itinerary.
      </p>
      {sent ? (
        <div data-testid="sidebar-success" className="text-center py-4">
          <p className="text-sm font-semibold text-emerald-600 mb-1">Thank you!</p>
          <p className="text-xs text-[#0D1B2A]/40">We'll be in touch within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={submit} data-testid="pkg-inquiry-form" className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <Input data-testid="pkg-input-first" placeholder="First name *" value={form.first_name} onChange={e => u("first_name", e.target.value)} className="bg-white border-[#0D1B2A]/10 h-9 text-xs rounded-lg" />
            <Input data-testid="pkg-input-last" placeholder="Last name *" value={form.last_name} onChange={e => u("last_name", e.target.value)} className="bg-white border-[#0D1B2A]/10 h-9 text-xs rounded-lg" />
          </div>
          <Input data-testid="pkg-input-agency" placeholder="Agency name *" value={form.agency_name} onChange={e => u("agency_name", e.target.value)} className="bg-white border-[#0D1B2A]/10 h-9 text-xs rounded-lg" />
          <div className="flex gap-2">
            <Select value={form.phone_code} onValueChange={v => { u("phone_code", v); if (v !== "+91") u("state", ""); }}>
              <SelectTrigger className="bg-white border-[#0D1B2A]/10 h-9 rounded-lg w-[90px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white max-h-[200px]">{phoneCodes.map(pc => <SelectItem key={pc.code} value={pc.code} className="text-xs"><span className="mr-1">{pc.flag}</span>{pc.code}</SelectItem>)}</SelectContent>
            </Select>
            <Input data-testid="pkg-input-phone" type="tel" placeholder="Phone *" value={form.phone} onChange={e => u("phone", e.target.value)} className="bg-white border-[#0D1B2A]/10 h-9 text-xs rounded-lg flex-1" />
          </div>
          {isIndia && (
            <Select value={form.state} onValueChange={v => u("state", v)}>
              <SelectTrigger className="bg-white border-[#0D1B2A]/10 h-9 rounded-lg w-full text-xs"><SelectValue placeholder="Select state *" /></SelectTrigger>
              <SelectContent className="bg-white max-h-[200px]">{indianStates.map(s => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}</SelectContent>
            </Select>
          )}
          <Input data-testid="pkg-input-email" type="email" placeholder="Email *" value={form.email} onChange={e => u("email", e.target.value)} className="bg-white border-[#0D1B2A]/10 h-9 text-xs rounded-lg" />
          <Button type="submit" disabled={loading} data-testid="pkg-inquire-btn"
            className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full py-4 text-xs font-bold uppercase tracking-[0.15em] shadow-sm hover:shadow-md transition-all">
            {loading ? "Submitting..." : "Inquire Now"}
          </Button>
        </form>
      )}
      <a href="tel:+911244600000" className="flex items-center justify-center gap-2 text-xs text-[#0D1B2A]/40 hover:text-[#0D1B2A]/70 mt-4 transition-colors">
        <Phone size={12} /> +91 124 4600000
      </a>
    </div>
  );
}

/* ── Stay Block ── */
function StayBlock({ stay, isOpen, onToggle }) {
  const [hotelScroll, setHotelScroll] = useState(0);
  const [expScroll, setExpScroll] = useState(0);

  return (
    <div data-testid={`stay-${stay.day_range.replace(/\s+/g, '-').toLowerCase()}`}>
      {/* Transport marker */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full bg-[#0D1B2A] border-2 border-white shadow-sm flex-shrink-0" />
        <p className="text-sm font-medium text-[#0D1B2A]/60">{stay.transport}</p>
      </div>

      {/* Stay card */}
      <div className="ml-6 mb-8 bg-white rounded-2xl border border-[#0D1B2A]/08 overflow-hidden">
        <div className="px-6 pt-4 pb-2">
          <p className="text-[11px] text-[#0D1B2A]/40 font-semibold mb-1">{stay.day_range}</p>
        </div>
        <button onClick={onToggle} className="w-full px-6 pb-4 flex items-center justify-between text-left group">
          <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl md:text-3xl text-[#0D1B2A] group-hover:text-[#174358] transition-colors leading-tight">{stay.title}</h3>
          <ChevronDown size={20} className={`text-[#0D1B2A]/30 transition-transform flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* At a Glance */}
            {stay.glance.length > 0 && (
              <div className="mb-8">
                <p className="text-[10px] tracking-[0.15em] uppercase font-bold text-[#0D1B2A]/30 mb-3">At a Glance</p>
                <ul className="space-y-2">
                  {stay.glance.map((g) => (
                    <li key={g} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#174358]/50 mt-2 flex-shrink-0" />
                      <p className="text-sm text-[#0D1B2A]/60 leading-relaxed">{g}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hotels */}
            {stay.hotels.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-['Manrope'] font-bold tracking-tight text-xl text-[#0D1B2A]">Suggested hotels for {stay.title.split(":")[0]}</p>
                  {stay.hotels.length > 3 && (
                    <div className="flex gap-1.5">
                      <button onClick={() => setHotelScroll(p => Math.max(0, p - 1))} className="w-8 h-8 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#F8FAFB] transition-colors"><ChevronLeft size={14} /></button>
                      <button onClick={() => setHotelScroll(p => Math.min(stay.hotels.length - 3, p + 1))} className="w-8 h-8 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#F8FAFB] transition-colors"><ChevronRight size={14} /></button>
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="flex gap-4 transition-transform duration-500" style={{ transform: `translateX(-${hotelScroll * 280}px)` }}>
                    {stay.hotels.map((h) => (
                      <div key={h.name} data-testid={`hotel-${h.name.toLowerCase().replace(/\s+/g, '-')}`} className="group min-w-[260px] rounded-2xl overflow-hidden border border-[#0D1B2A]/08 bg-white flex-shrink-0 shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <div className="relative h-44 overflow-hidden">
                          <img src={h.image} alt={h.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <span className="absolute bottom-3 left-3 text-[8px] font-bold uppercase tracking-[0.15em] bg-[#0D1B2A]/80 text-white px-2.5 py-1 rounded">{h.tier}</span>
                        </div>
                        <div className="p-4">
                          <h4 className="font-['Manrope'] font-bold tracking-tight text-lg text-[#0D1B2A] mb-1">{h.name}</h4>
                          <p className="text-[11px] text-[#0D1B2A]/40">{h.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Experiences */}
            {stay.experiences.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-['Manrope'] font-bold tracking-tight text-xl text-[#0D1B2A]">Suggested experiences for {stay.day_range}</p>
                  {stay.experiences.length > 3 && (
                    <div className="flex gap-1.5">
                      <button onClick={() => setExpScroll(p => Math.max(0, p - 1))} className="w-8 h-8 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#F8FAFB]"><ChevronLeft size={14} /></button>
                      <button onClick={() => setExpScroll(p => Math.min(stay.experiences.length - 3, p + 1))} className="w-8 h-8 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#F8FAFB]"><ChevronRight size={14} /></button>
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="flex gap-4 transition-transform duration-500" style={{ transform: `translateX(-${expScroll * 280}px)` }}>
                    {stay.experiences.map((exp) => (
                      <div key={exp.title} data-testid={`experience-${exp.title.toLowerCase().replace(/\s+/g, '-')}`} className="group min-w-[260px] rounded-2xl overflow-hidden border border-[#0D1B2A]/08 bg-white flex-shrink-0 shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <div className="h-40 overflow-hidden">
                          <img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="p-4">
                          <h4 className="font-['Manrope'] font-bold tracking-tight text-lg text-[#0D1B2A] mb-0.5">{exp.title}</h4>
                          <p className="text-[10px] text-[#0D1B2A]/35 mb-2">{exp.location}</p>
                          <p className="text-xs text-[#0D1B2A]/50 leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


export default function PackageDetailPage() {
  const { name, slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("At a Glance");
  const [openStays, setOpenStays] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);
  const [openFaq, setOpenFaq] = useState({});
  const [otherPkgs, setOtherPkgs] = useState([]);
  const [otherScroll, setOtherScroll] = useState(0);

  const sectionRefs = { "At a Glance": useRef(null), Itinerary: useRef(null), Pricing: useRef(null), "Things to Know": useRef(null) };
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setLoading(true);
    axios.get(`${API}/destinations/${encodeURIComponent(name)}/packages/${slug}`)
      .then(r => { setPkg(r.data); setOpenStays({ 0: true }); })
      .catch(() => setPkg(null))
      .finally(() => setLoading(false));
    // fetch other packages for the carousel (with hero images)
    axios.get(`${API}/destinations/detail/${encodeURIComponent(name)}`)
      .then(async (r) => {
        const pkgs = r.data?.detail?.packages || [];
        const others = pkgs.filter(p => {
          const s = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          return s !== slug;
        });
        // Fetch hero images for each other package
        const withImages = await Promise.all(others.map(async (p) => {
          const s = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          try {
            const res = await axios.get(`${API}/destinations/${encodeURIComponent(name)}/packages/${s}`);
            return { ...p, hero_image: res.data.hero_image };
          } catch { return p; }
        }));
        setOtherPkgs(withImages);
      }).catch(() => {});
  }, [name, slug]);

  useEffect(() => {
    const h = () => {
      for (const tab of [...TABS].reverse()) {
        const ref = sectionRefs[tab];
        if (ref.current && ref.current.getBoundingClientRect().top <= 120) { setActiveTab(tab); break; }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkg]);

  const scrollTo = (tab) => {
    const ref = sectionRefs[tab];
    if (ref.current) window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  const toggleStay = (i) => setOpenStays(p => ({ ...p, [i]: !p[i] }));
  const expandAll = () => {
    const next = !allExpanded;
    setAllExpanded(next);
    if (pkg) {
      const m = {};
      pkg.stays.forEach((_, i) => { m[i] = next; });
      setOpenStays(m);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#174358]/20 border-t-[#174358] rounded-full animate-spin" /></div>;

  if (!pkg) return (
    <div className="min-h-screen bg-[#F4F1E8] flex flex-col items-center justify-center gap-4">
      <h2 className="font-['Manrope'] font-bold tracking-tight text-3xl text-[#0D1B2A]">Itinerary not found</h2>
      <Link to={`/destination/${name}`} className="text-sm text-[#174358] hover:underline">Back to {name}</Link>
    </div>
  );

  return (
    <div data-testid="package-detail-page" className="min-h-screen bg-[#F4F1E8]">

      {/* ── Hero ── */}
      <section ref={heroRef} data-testid="pkg-hero" className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={pkg.hero_image} alt={pkg.title} data-parallax="18" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-[#0D1B2A]/40 to-[#0D1B2A]/10" />
        </div>
        <div className="absolute top-0 left-0 right-0 z-20">
          <Navbar />
        </div>
        <div className="relative z-10 w-full px-5 md:px-12 lg:px-20 pb-10 md:pb-16">
          <div className="max-w-[1400px] mx-auto">
            <Link to={`/destination/${name}`} data-reveal data-testid="back-to-dest" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold uppercase tracking-[0.15em] mb-4 md:mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to {name}
            </Link>
            <p data-reveal className="text-white/50 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-4">{name} &middot; {pkg.duration}</p>
            <h1 data-reveal data-testid="pkg-title" className="font-['Manrope'] font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95] mb-5 md:mb-6 max-w-[900px]">
              {pkg.title}
            </h1>
            <p data-reveal className="font-['Manrope'] text-white/60 text-sm md:text-base lg:text-lg max-w-xl leading-relaxed mb-6 md:mb-8">{pkg.subtitle}</p>
            <div data-reveal className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.15em] font-semibold">Starting from</p>
                <p className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl text-white">&#8377;{pkg.starting_price}</p>
                <span className="text-white/40 text-[10px] md:text-xs">per person</span>
              </div>
              <button onClick={() => scrollTo("Pricing")} data-testid="hero-inquire-btn"
                className="sm:ml-2 bg-[#174358] text-white rounded-full px-6 md:px-8 py-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1e5a75] shadow-sm transition-colors w-fit">
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Tabs ── */}
      <div className="sticky top-0 z-30 bg-[#F4F1E8] border-b border-[#0D1B2A]/08">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide -mx-1">
            {TABS.map(tab => (
              <button key={tab} data-testid={`tab-${tab.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => scrollTo(tab)}
                className={`px-4 md:px-5 py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab ? "border-[#0D1B2A] text-[#0D1B2A]" : "border-transparent text-[#0D1B2A]/30 hover:text-[#0D1B2A]/60"
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content with sidebar ── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-20 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left */}
          <div className="lg:col-span-2">

            {/* At a Glance / Highlights */}
            <section ref={sectionRefs["At a Glance"]} data-testid="pkg-highlights" className="mb-16">
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-8">Highlights</h2>
              <ul data-reveal-group className="space-y-4">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#174358] mt-2 flex-shrink-0" />
                    <p className="text-sm text-[#0D1B2A]/65 leading-relaxed">{h}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Itinerary */}
            <section ref={sectionRefs.Itinerary} data-testid="pkg-itinerary" className="mb-10">
              <div className="flex items-end justify-between mb-6">
                <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A]">Itinerary</h2>
                <button onClick={expandAll} data-testid="expand-all-btn"
                  className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#0D1B2A]/40 hover:text-[#0D1B2A]/70 border border-[#0D1B2A]/10 px-4 py-2 rounded-full transition-colors">
                  <ChevronDown size={14} className={allExpanded ? "rotate-180" : ""} /> {allExpanded ? "Collapse" : "Expand"} All Stays
                </button>
              </div>

              {/* Timeline */}
              <div className="border-l-2 border-[#0D1B2A]/10 ml-1.5">
                {pkg.stays.map((stay, i) => (
                  <StayBlock key={stay.day_range} stay={stay} isOpen={!!openStays[i]} onToggle={() => toggleStay(i)} />
                ))}
                {/* Final marker */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#0D1B2A] border-2 border-white shadow-sm flex-shrink-0 -ml-[7px]" />
                  <p className="text-sm font-medium text-[#0D1B2A]/60">Fly Home</p>
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section ref={sectionRefs.Pricing} data-testid="pkg-pricing" className="mb-10">
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-2">Pricing</h2>
              <p data-reveal className="font-['Manrope'] text-xs text-[#0D1B2A]/50 mb-6">Per person &middot; excluding international flights.</p>
              <div className="border border-[#0D1B2A]/08 rounded-2xl overflow-hidden overflow-x-auto">
                <div className="hidden md:grid grid-cols-5 bg-[#F8FAFB] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#0D1B2A]/40 min-w-[600px]">
                  <span>Departing</span><span>Price from</span><span>Deposit from</span><span></span><span></span>
                </div>
                {pkg.pricing.map((row) => (
                  <div key={`${row.month}-${row.season}`} data-testid={`pricing-row-${row.month.toLowerCase().replace(/\s+/g, '-')}`} className="grid grid-cols-2 md:grid-cols-5 items-center px-5 md:px-6 py-3.5 border-t border-[#0D1B2A]/06 hover:bg-[#F8FAFB]/50 transition-colors gap-2 md:gap-0">
                    <div>
                      <p className="font-['Manrope'] font-bold tracking-tight text-base md:text-lg text-[#0D1B2A]">{row.month}</p>
                      <p className="text-[10px] text-[#0D1B2A]/35">{row.season}</p>
                    </div>
                    <p className="font-['Manrope'] font-bold tracking-tight text-base md:text-lg text-[#0D1B2A] text-right md:text-left">&#8377;{row.price}</p>
                    <p className="hidden md:block text-sm text-[#0D1B2A]/50">{row.deposit === "\u2014" ? "\u2014" : `\u20B9${row.deposit}`}</p>
                    <span className="hidden md:block"></span>
                    <button onClick={() => scrollTo("At a Glance")}
                      className="col-span-2 md:col-span-1 bg-[#174358] text-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] hover:bg-[#1e5a75] transition-colors rounded-full md:justify-self-end">
                      Inquire
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Things to Know */}
            <section ref={sectionRefs["Things to Know"]} data-testid="pkg-things-to-know" className="mb-6">
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-6">Things to Know</h2>
              <div className="border border-[#0D1B2A]/08 rounded-2xl overflow-hidden divide-y divide-[#0D1B2A]/06">
                {pkg.things_to_know.map((faq) => (
                  <div key={faq.title} data-testid={`faq-${faq.title.toLowerCase().replace(/\s+/g, '-').slice(0, 25)}`}>
                    <button onClick={() => setOpenFaq(p => ({ ...p, [faq.title]: !p[faq.title] }))}
                      className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#F8FAFB]/50 transition-colors">
                      <h3 className="font-['Manrope'] font-bold tracking-tight text-xl text-[#0D1B2A]">{faq.title}</h3>
                      <ChevronDown size={18} className={`text-[#0D1B2A]/30 transition-transform ${openFaq[faq.title] ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq[faq.title] && (
                      <div className="px-6 pb-5 animate-in fade-in duration-200">
                        <p className="text-sm text-[#0D1B2A]/55 leading-relaxed">{faq.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Sidebar destName={name} pkgTitle={pkg.title} />
            </div>
          </div>
        </div>
      </div>

      {/* ── What We Include ── */}
      {pkg.includes && (
        <section data-testid="pkg-includes" className="py-12 px-5 md:px-12 lg:px-20 bg-gradient-to-b from-[#F8FAFB] to-[#F4F1E8] border-t border-[#0D1B2A]/06">
          <div className="max-w-[1400px] mx-auto">
            <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl leading-tight text-[#0D1B2A] text-center mb-2">What we include, every time</h2>
            <div data-reveal-group className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-10">
              {pkg.includes.map((inc) => {
                const Icon = includeIcons[pkg.includes.indexOf(inc)] || Shield;
                return (
                  <div key={inc.title} className="text-center">
                    <Icon size={24} className="text-[#174358]/60 mx-auto mb-3" strokeWidth={1.5} />
                    <h4 className="font-['Manrope'] font-bold tracking-tight text-lg text-[#0D1B2A] mb-1">{inc.title}</h4>
                    <p className="text-[11px] text-[#0D1B2A]/40 leading-relaxed">{inc.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Other Tours Carousel ── */}
      {otherPkgs.length > 0 && (
        <section data-testid="pkg-other-tours" className="py-12 px-5 md:px-12 lg:px-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-8">
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A]">
                Other amazing {name} tours you may like.
              </h2>
              <div className="hidden md:flex gap-1.5">
                <button onClick={() => setOtherScroll(p => Math.max(0, p - 1))} className="w-9 h-9 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#F8FAFB]"><ChevronLeft size={16} /></button>
                <button onClick={() => setOtherScroll(p => Math.min(otherPkgs.length - 3, p + 1))} className="w-9 h-9 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#F8FAFB]"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="flex gap-5 transition-transform duration-500" style={{ transform: `translateX(-${otherScroll * 290}px)` }}>
                {otherPkgs.map((op) => {
                  const opSlug = op.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                  return (
                    <Link key={op.title} to={`/destination/${name}/package/${opSlug}`} className="min-w-[270px] rounded-2xl overflow-hidden group flex-shrink-0 block">
                      <div className="relative h-72">
                        <img src={op.hero_image || pkg.hero_image} alt={op.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-[#0D1B2A]/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="text-[10px] text-white/50 font-semibold uppercase tracking-wider mb-2">{op.duration} &middot; {name}</p>
                          <h3 className="font-['Manrope'] font-bold tracking-tight text-xl text-white leading-tight">{op.title}</h3>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section data-testid="pkg-bottom-cta" className="py-3.5 px-5 md:px-12 lg:px-20 bg-[#F4F1E8] border-t border-[#0D1B2A]/06">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-xs text-[#0D1B2A]/40">From</p>
            <p className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A]">&#8377;{pkg.starting_price} <span className="text-xs text-[#0D1B2A]/40 font-sans">pp</span></p>
          </div>
          <button onClick={() => scrollTo("At a Glance")} className="bg-[#174358] text-white rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#1e5a75] shadow-sm transition-colors">
            Enquire now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
