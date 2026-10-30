import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Check, Heart, Utensils, Sun, Mountain, Users, Briefcase, Globe, Plane, Star, SlidersHorizontal, Monitor, LayoutGrid, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import INDIA_CITIES from "../data/indiaCities";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const HERO = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2400&q=85";

const SERVICES = [
  { title: "FIT & Tailor-made", desc: "Bespoke European itineraries built around your client's preferences — live hotel rates, private transfers, and curated experiences.", icon: SlidersHorizontal, stat: "2,400+ FIT packages sold" },
  { title: "Group Tours", desc: "Series departures and custom group itineraries across multi-country European routes with end-to-end logistics.", icon: Users, stat: "180+ group departures/year" },
  { title: "MICE", desc: "Corporate incentives, conferences, and gala events across Europe's finest venues — from Alpine resorts to Parisian palaces.", icon: Briefcase, stat: "65+ MICE events delivered" },
  { title: "Ad Hoc Groups", desc: "One-off group requests with rapid turnaround — weddings, reunions, sports events, and special interest groups.", icon: LayoutGrid, stat: "120+ ad hoc groups/year" },
  { title: "Experiences", desc: "Curated local experiences — cooking classes in Tuscany, Northern Lights chases, Seine river cruises, fjord expeditions.", icon: Star, stat: "500+ bookable experiences" },
  { title: "Transfers & Logistics", desc: "Airport meet-and-greet, private coaches, scenic train bookings, and multi-city transfer coordination across borders.", icon: Plane, stat: "15+ countries covered" },
];

const STATS = [
  { value: "20+", label: "Countries" },
  { value: "2,400+", label: "Packages Sold" },
  { value: "180+", label: "Group Departures" },
  { value: "65+", label: "MICE Events" },
  { value: "35+", label: "Europe Specialists" },
  { value: "48hr", label: "Proposal Turnaround" },
];

const REGIONS = [
  { name: "Western Europe", countries: ["France", "Belgium", "The Netherlands", "Republic of Ireland", "United Kingdom", "Scotland"] },
  { name: "Central Europe", countries: ["Germany", "Austria", "Switzerland", "Czech Republic", "Hungary"] },
  { name: "Southern Europe", countries: ["Spain", "Portugal", "Italy", "Slovenia"] },
  { name: "Northern Europe", subtitle: "Scandinavia & The Nordics", countries: ["Norway", "Sweden", "Finland", "Denmark", "Iceland"] },
];

const STYLES = [
  { title: "Honeymoons & Romance", icon: Heart, desc: "Venetian gondolas, Santorini sunsets, Parisian escapes, Swiss chalets — romantic Europe at its finest.", routes: ["Paris & Loire Valley", "Amalfi Coast & Capri", "Santorini & Greek Islands", "Swiss Alpine Retreats"], image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80" },
  { title: "Northern Lights & Arctic", icon: Sun, desc: "Chase the aurora across Norway, Iceland, Finland, and Swedish Lapland. Glass igloos, husky safaris, and midnight sun.", routes: ["Norway Fjords & Tromso", "Iceland Golden Circle", "Finnish Lapland Igloos", "Swedish Icehotel"], image: "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=600&q=80" },
  { title: "Culinary Trails", icon: Utensils, desc: "From Michelin-starred Paris to Basque pintxos, Tuscan vineyards to Copenhagen's New Nordic — food trails that sell.", routes: ["French Wine Regions", "Italian Pasta & Pizza Trail", "Spanish Tapas Route", "Nordic Gastronomy"], image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80" },
  { title: "Alpine & Adventure", icon: Mountain, desc: "Swiss Alps, Austrian Tyrol, French Chamonix, Italian Dolomites — hiking, skiing, scenic trains, and mountain luxury.", routes: ["Glacier Express", "Mont Blanc Circuit", "Jungfraujoch", "Dolomites Trekking"], image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=600&q=80" },
];

const PACKAGES = [
  { title: "Paris, Swiss Alps & Italy", days: "12 Days", cities: "Paris — Lucerne — Interlaken — Venice — Florence — Rome", tag: "Bestseller" },
  { title: "London & Scotland Explorer", days: "9 Days", cities: "London — Edinburgh — Highlands — Isle of Skye", tag: "Popular" },
  { title: "Scandinavia Northern Lights", days: "10 Days", cities: "Oslo — Tromso — Lofoten — Rovaniemi — Helsinki", tag: "Winter" },
  { title: "Spain & Portugal Discovery", days: "11 Days", cities: "Barcelona — Madrid — Seville — Lisbon — Porto", tag: "Popular" },
  { title: "Central European Classic", days: "10 Days", cities: "Prague — Vienna — Budapest — Munich", tag: "Classic" },
  { title: "Mediterranean Honeymoon", days: "14 Days", cities: "Rome — Amalfi — Santorini — Paris", tag: "Romance" },
];

const EXPERIENCES = [
  { title: "Seine River Dinner Cruise", location: "Paris, France", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80" },
  { title: "Gondola Ride at Sunset", location: "Venice, Italy", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=400&q=80" },
  { title: "Northern Lights Safari", location: "Tromso, Norway", image: "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=400&q=80" },
  { title: "Swiss Alps Scenic Train", location: "Interlaken, Switzerland", image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=400&q=80" },
  { title: "Flamenco Night in Seville", location: "Seville, Spain", image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=400&q=80" },
  { title: "Blue Lagoon Geothermal Spa", location: "Reykjavik, Iceland", image: "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=400&q=80" },
  { title: "Prague Castle Walking Tour", location: "Prague, Czech Republic", image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=400&q=80" },
  { title: "Tuscan Cooking Class", location: "Florence, Italy", image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80" },
];

const phoneCodes = [{ code: "+91", label: "IN +91" }, { code: "+1", label: "US +1" }, { code: "+44", label: "UK +44" }, { code: "+971", label: "AE +971" }, { code: "+65", label: "SG +65" }];
const indianStates = Object.keys(INDIA_CITIES).sort();
const iCls = "bg-white border-[#0D1B2A]/10 text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 h-10 rounded-lg focus:border-[#174358]/40 text-xs";

export default function EuropePage() {
  const [form, setForm] = useState({ agency_name: "", contact_name: "", phone_code: "+91", phone: "", email: "", state: "", city: "", pin_code: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeRegion, setActiveRegion] = useState("Western Europe");
  const isIndia = form.phone_code === "+91";
  const cities = isIndia && form.state ? (INDIA_CITIES[form.state] || []) : [];
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const selectState = (v) => setForm(f => ({ ...f, state: v, city: "", pin_code: "" }));
  const selectCity = (v) => { const m = cities.find(c => c.city === v); setForm(f => ({ ...f, city: v, pin_code: m ? m.pin : "" })); };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agency_name.trim() || !form.contact_name.trim() || !form.phone.trim() || !form.email.trim()) { toast.error("Please fill all required fields"); return; }
    if (isIndia && !form.state) { toast.error("Select your state"); return; }
    setLoading(true);
    try {
      const np = form.contact_name.trim().split(" ");
      await axios.post(`${API}/inquiries`, { first_name: np[0], last_name: np.slice(1).join(" ") || "", agency_name: form.agency_name, email: form.email, phone_code: form.phone_code, phone: form.phone, state: form.state, city: form.city, pin_code: form.pin_code, country: isIndia ? "India" : "", source_page: "Destination - Europe", destination: "Europe", form_type: "B2B" });
      setSubmitted(true);
      window.history.pushState({}, "", "/destination/Europe/thank-you");
      toast.success("Inquiry submitted!");
    } catch { toast.error("Something went wrong."); }
    finally { setLoading(false); }
  };

  const activeCountries = REGIONS.find(r => r.name === activeRegion)?.countries || [];

  return (
    <div data-testid="europe-page" className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Europe" data-parallax="18" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/85 via-[#0D1B2A]/40 to-[#0D1B2A]/15" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p data-reveal className="text-white/40 text-[10px] uppercase tracking-[0.25em] font-semibold mb-4">Europe — 20+ Countries</p>
            <h1 data-reveal className="font-['Manrope'] font-bold tracking-tight text-5xl sm:text-6xl md:text-7xl text-white leading-[0.95] mb-5">Your DMC<br />to Europe</h1>
            <p data-reveal className="font-['Manrope'] text-white/55 text-sm md:text-base max-w-lg leading-relaxed">One DMC partnership for all of Europe. Live rates, local teams, and seamless ground handling — from Paris to the Northern Lights.</p>
          </div>
          <div className="lg:col-span-5">
            {submitted ? (
              <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
                <Check size={28} className="text-emerald-500 mx-auto mb-3" />
                <h3 className="font-['Manrope'] font-bold tracking-tight text-xl text-[#0D1B2A] mb-2">Thank You!</h3>
                <p className="text-[#0D1B2A]/40 text-xs">Our Europe team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} data-testid="europe-inquiry-form" className="bg-white rounded-2xl p-5 space-y-2 shadow-xl border border-[#0D1B2A]/06">
                <p className="font-['Manrope'] font-bold tracking-tight text-lg text-[#0D1B2A] mb-1">Get Europe Rates</p>
                <Input placeholder="Agency / Company Name *" value={form.agency_name} onChange={e => u("agency_name", e.target.value)} className={iCls} />
                <Input placeholder="Contact Person Name *" value={form.contact_name} onChange={e => u("contact_name", e.target.value)} className={iCls} />
                <div className="flex gap-2">
                  <Select value={form.phone_code} onValueChange={v => { u("phone_code", v); if (v !== "+91") { u("state",""); u("city",""); u("pin_code",""); } }}>
                    <SelectTrigger className="bg-white border-[#0D1B2A]/10 h-10 rounded-lg w-[85px] text-[10px]"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-white max-h-48">{phoneCodes.map(p => <SelectItem key={p.code} value={p.code} className="text-xs">{p.label}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input type="tel" placeholder="Phone *" value={form.phone} onChange={e => u("phone", e.target.value)} className={`flex-1 ${iCls}`} />
                </div>
                <Input type="email" placeholder="Email *" value={form.email} onChange={e => u("email", e.target.value)} className={iCls} />
                {isIndia && (
                  <>
                    <Select value={form.state} onValueChange={selectState}>
                      <SelectTrigger className="bg-white border-[#0D1B2A]/10 h-10 rounded-lg text-xs"><SelectValue placeholder="State *" /></SelectTrigger>
                      <SelectContent className="bg-white max-h-48">{indianStates.map(s => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}</SelectContent>
                    </Select>
                    {form.state && (
                      <div className="grid grid-cols-2 gap-2">
                        <Select value={form.city} onValueChange={selectCity}>
                          <SelectTrigger className="bg-white border-[#0D1B2A]/10 h-10 rounded-lg text-xs"><SelectValue placeholder="City *" /></SelectTrigger>
                          <SelectContent className="bg-white max-h-48">{cities.map(c => <SelectItem key={c.city} value={c.city} className="text-xs">{c.city}</SelectItem>)}</SelectContent>
                        </Select>
                        <Input value={form.pin_code} onChange={e => u("pin_code", e.target.value)} placeholder="Pin Code" className={iCls} />
                      </div>
                    )}
                  </>
                )}
                <Button type="submit" disabled={loading} className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full py-4 text-xs font-bold shadow-sm hover:shadow-md transition-all">
                  {loading ? <><Loader2 size={14} className="mr-2 animate-spin" /> Submitting...</> : "Request Europe Rates"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Our Services for Europe */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">What We Do</p>
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-12">Our services for Europe</h2>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <div key={s.title} className="bg-[#F8FAFB] rounded-2xl p-6 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.2)] hover:shadow-[0_28px_70px_-28px_rgba(13,27,42,0.28)] transition-shadow duration-500 group">
                <s.icon size={20} className="text-[#174358]/40 mb-4" strokeWidth={1.5} />
                <h3 className="text-sm font-bold text-[#0D1B2A] mb-1.5">{s.title}</h3>
                <p className="font-['Manrope'] text-xs text-[#0D1B2A]/60 leading-relaxed mb-3">{s.desc}</p>
                <p className="text-[10px] font-bold text-[#174358]/60 uppercase tracking-wider">{s.stat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 px-6 md:px-12 bg-[#0D1B2A]">
        <div data-reveal-group className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="text-center py-2">
              <p className="font-['Manrope'] font-bold tracking-tight text-2xl md:text-3xl text-white mb-0.5">{s.value}</p>
              <p className="text-[9px] text-white/40 uppercase tracking-wider font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations by Region — Tag-based */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F8FAFB]">
        <div className="max-w-7xl mx-auto">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">20+ European Destinations</p>
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-10">Browse by region</h2>

          {/* Region tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {REGIONS.map(r => (
              <button key={r.name} onClick={() => setActiveRegion(r.name)} data-testid={`region-tab-${r.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-5 py-2.5 text-xs font-bold rounded-full border transition-all ${
                  activeRegion === r.name
                    ? "bg-[#174358] text-white border-[#174358] shadow-sm"
                    : "bg-white text-[#0D1B2A]/55 border-[#0D1B2A]/10 hover:border-[#174358]/40 hover:text-[#0D1B2A]/80"
                }`}>
                {r.name} <span className="ml-1 text-[10px] opacity-60">({r.countries.length})</span>
              </button>
            ))}
          </div>

          {/* Country pills for active region */}
          <div className="bg-white rounded-2xl p-6 border border-[#0D1B2A]/06">
            <p className="text-[10px] text-[#0D1B2A]/30 uppercase tracking-wider font-bold mb-4">
              {activeRegion} {REGIONS.find(r => r.name === activeRegion)?.subtitle ? `— ${REGIONS.find(r => r.name === activeRegion).subtitle}` : ""}
            </p>
            <div className="flex flex-wrap gap-3">
              {activeCountries.map(c => (
                <div key={c} data-testid={`country-pill-${c.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F8FAFB] border border-[#0D1B2A]/06 hover:border-[#174358]/20 hover:bg-[#174358]/04 transition-all cursor-default">
                  <Globe size={14} className="text-[#174358]/40" />
                  <span className="text-sm font-semibold text-[#0D1B2A]/70">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel Styles */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">Travel Styles</p>
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-12">Sell Europe by theme</h2>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STYLES.map(t => (
              <div key={t.title} className="rounded-2xl overflow-hidden group flex flex-col sm:flex-row bg-white shadow-[0_18px_50px_-24px_rgba(13,27,42,0.22)] hover:shadow-[0_28px_70px_-28px_rgba(13,27,42,0.3)] transition-shadow duration-500">
                <div className="relative w-full sm:w-2/5 min-h-[180px] flex-shrink-0">
                  <img src={t.image} alt={t.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <t.icon size={15} className="text-[#174358]/50" />
                    <h3 className="text-sm font-bold text-[#0D1B2A]">{t.title}</h3>
                  </div>
                  <p className="text-xs text-[#0D1B2A]/45 leading-relaxed mb-3">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.routes.map(r => (
                      <span key={r} className="text-[9px] bg-[#174358]/06 text-[#174358]/60 px-2 py-0.5 rounded-full font-semibold">{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#0D1B2A]">
        <div className="max-w-7xl mx-auto">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white/40 mb-4">Ready-to-sell Itineraries</p>
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-4">Custom packages we create for your clients</h2>
          <p data-reveal className="font-['Manrope'] text-sm text-white/40 mb-12 leading-relaxed">Customise dates, hotels, and experiences with live rates on the platform.</p>
          <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PACKAGES.map(p => (
              <Link key={p.title} to="/signup" className="bg-white/05 rounded-2xl p-5 border border-white/08 hover:border-white/20 hover:bg-white/08 transition-all group block">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[9px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{p.tag}</span>
                  <span className="text-[10px] text-white/35 font-semibold">{p.days}</span>
                </div>
                <h3 className="font-['Manrope'] font-bold tracking-tight text-lg text-white mb-1.5 group-hover:text-white/90">{p.title}</h3>
                <p className="text-[10px] text-white/35 flex items-center gap-1 mb-3"><MapPin size={9} /> {p.cities}</p>
                <span className="text-[10px] font-semibold text-white/40 group-hover:text-white/70 transition-colors flex items-center gap-1">
                  Enquire Now <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Europe Experiences */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F4F1E8]">
        <div className="max-w-7xl mx-auto">
          <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">Bookable Experiences</p>
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-12">Europe experiences</h2>
          <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {EXPERIENCES.map(e => (
              <div key={e.title} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ height: "220px" }}>
                <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <h3 className="text-sm font-semibold text-white leading-tight mb-0.5">{e.title}</h3>
                  <p className="text-[10px] text-white/45">{e.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6 md:px-12 bg-[#174358]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-4">Ready to sell Europe?</h2>
          <p data-reveal className="font-['Manrope'] text-white/45 text-sm mb-7 leading-relaxed">Sign up for agent access and start receiving live European hotel rates, transfers, and experiences.</p>
          <div className="flex justify-center gap-3">
            <Link to="/signup"><Button className="bg-white text-[#174358] hover:bg-white/90 rounded-full px-8 py-4 text-sm font-semibold shadow-lg">Sign Up as Partner</Button></Link>
            <a href="tel:+911244600000"><Button variant="ghost" className="text-white/60 hover:text-white rounded-full px-8 py-4 text-sm border border-white/15 font-semibold">Call Us</Button></a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
