import { useState, useEffect } from "react";
import { Star, Phone, Clock, Shield, Users, Headphones, Award, X, Loader2, MapPin, Heart, Building2, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "./Navbar";

const API = process.env.REACT_APP_BACKEND_URL;

const PACKAGES = [
  { id: 1, title: "Classic Egypt: Cairo & Nile Cruise", duration: "7 Days & 6 Nights", days: 7, cities: [{ d: 2, c: "Cairo" }, { d: 3, c: "Nile Cruise" }, { d: 1, c: "Luxor" }, { d: 1, c: "Aswan" }], rating: 4.9, reviews: 24, price: 82999, originalPrice: 109999, style: ["cultural", "family"], image: "https://images.unsplash.com/photo-1678388103961-5e1254fcc42a?w=600&q=80", slug: "classic-egypt-cairo-nile", hasItinerary: true },
  { id: 2, title: "Pyramids & Red Sea Beach Combo", duration: "8 Days & 7 Nights", days: 8, cities: [{ d: 3, c: "Cairo" }, { d: 1, c: "Alexandria" }, { d: 3, c: "Hurghada" }, { d: 1, c: "Cairo" }], rating: 4.8, reviews: 18, price: 94999, originalPrice: 124999, style: ["honeymoon", "adventure"], image: "https://images.unsplash.com/photo-1677775766807-ff09c770da6e?w=600&q=80", slug: "pyramids-red-sea-combo", hasItinerary: true },
  { id: 3, title: "Grand Egypt Explorer | 10 Day Special", duration: "10 Days & 9 Nights", days: 10, cities: [{ d: 3, c: "Cairo" }, { d: 2, c: "Luxor" }, { d: 2, c: "Aswan" }, { d: 2, c: "Hurghada" }], rating: 4.9, reviews: 31, price: 129999, originalPrice: 159999, style: ["cultural", "family", "adventure"], image: "https://images.unsplash.com/photo-1678199765556-361c8de4c979?w=600&q=80", slug: "grand-egypt-explorer" },
  { id: 4, title: "Egypt Honeymoon: Romance on the Nile", duration: "6 Days & 5 Nights", days: 6, cities: [{ d: 2, c: "Cairo" }, { d: 3, c: "Nile Cruise" }, { d: 1, c: "Luxor" }], rating: 5.0, reviews: 12, price: 119999, originalPrice: 149999, style: ["honeymoon"], image: "https://images.unsplash.com/photo-1716639154156-db53b75a22ad?w=600&q=80", slug: "honeymoon-on-the-nile" },
  { id: 5, title: "Desert Oasis & White Desert Adventure", duration: "5 Days & 4 Nights", days: 5, cities: [{ d: 1, c: "Cairo" }, { d: 2, c: "Siwa Oasis" }, { d: 1, c: "White Desert" }, { d: 1, c: "Cairo" }], rating: 4.7, reviews: 9, price: 74999, originalPrice: 95999, style: ["adventure", "solo"], image: "https://images.unsplash.com/photo-1722595053086-eb36d4c3a6f5?w=600&q=80", slug: "desert-oasis-adventure" },
  { id: 6, title: "Egypt Luxury Heritage Collection", duration: "9 Days & 8 Nights", days: 9, cities: [{ d: 3, c: "Cairo" }, { d: 2, c: "Luxor" }, { d: 2, c: "Aswan" }, { d: 2, c: "Hurghada" }], rating: 4.8, reviews: 15, price: 189999, originalPrice: 239999, style: ["cultural", "family"], image: "https://images.unsplash.com/photo-1557640047-75c97a5f1ea4?w=600&q=80", slug: "egypt-luxury-heritage" },
  { id: 7, title: "Cairo & Alexandria Short Break", duration: "4 Days & 3 Nights", days: 4, cities: [{ d: 2, c: "Cairo" }, { d: 1, c: "Alexandria" }, { d: 1, c: "Cairo" }], rating: 4.6, reviews: 22, price: 54999, originalPrice: 69999, style: ["cultural", "solo"], image: "https://images.unsplash.com/photo-1710886324980-997f7742f16c?w=600&q=80" },
  { id: 8, title: "Egypt Family Discovery with Sharm El Sheikh", duration: "7 Days & 6 Nights", days: 7, cities: [{ d: 2, c: "Cairo" }, { d: 2, c: "Luxor" }, { d: 2, c: "Sharm El Sheikh" }, { d: 1, c: "Cairo" }], rating: 4.8, reviews: 27, price: 89999, originalPrice: 114999, style: ["family"], image: "https://images.unsplash.com/photo-1629468855534-450d7c4c5f72?w=600&q=80" },
  { id: 9, title: "Pharaoh's Trail: Solo Explorer Special", duration: "6 Days & 5 Nights", days: 6, cities: [{ d: 2, c: "Cairo" }, { d: 1, c: "Dahshur" }, { d: 1, c: "Luxor" }, { d: 1, c: "Valley of Kings" }], rating: 4.7, reviews: 14, price: 67999, originalPrice: 84999, style: ["solo", "cultural"], image: "https://images.pexels.com/photos/37559111/pexels-photo-37559111.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 10, title: "Nile Cruise Premium: Luxor to Aswan", duration: "5 Days & 4 Nights", days: 5, cities: [{ d: 1, c: "Luxor" }, { d: 1, c: "Edfu" }, { d: 1, c: "Kom Ombo" }, { d: 2, c: "Aswan" }], rating: 4.9, reviews: 33, price: 99999, originalPrice: 129999, style: ["honeymoon", "cultural"], image: "https://images.pexels.com/photos/32286113/pexels-photo-32286113.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 11, title: "Egypt Adventure & Red Sea Diving", duration: "8 Days & 7 Nights", days: 8, cities: [{ d: 2, c: "Cairo" }, { d: 3, c: "Hurghada" }, { d: 2, c: "Sharm El Sheikh" }, { d: 1, c: "Cairo" }], rating: 4.6, reviews: 11, price: 109999, originalPrice: 139999, style: ["adventure"], image: "https://images.unsplash.com/photo-1678388103961-5e1254fcc42a?w=600&q=80" },
  { id: 12, title: "Budget Egypt: Best of Cairo & Giza", duration: "3 Days & 2 Nights", days: 3, cities: [{ d: 2, c: "Cairo" }, { d: 1, c: "Giza" }], rating: 4.5, reviews: 41, price: 39999, originalPrice: 52999, style: ["solo", "cultural"], image: "https://images.unsplash.com/photo-1677775766807-ff09c770da6e?w=600&q=80" },
];

const STYLES = [
  { key: "all", label: "All" }, { key: "honeymoon", label: "Honeymoon" }, { key: "family", label: "Family" },
  { key: "solo", label: "Solo" }, { key: "cultural", label: "Cultural" }, { key: "adventure", label: "Adventure" },
];
const DURATIONS = [
  { key: "all", label: "All" }, { key: "short", label: "3-5 Days" }, { key: "medium", label: "6-7 Days" }, { key: "long", label: "8+ Days" },
];

const SPECIALIST_PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
];

/* ── Form ── */
function CallbackForm({ packageTitle, inline, onDone }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) { toast.error("Name and phone are required"); return; }
    setLoading(true);
    try {
      const [first, ...rest] = form.name.trim().split(" ");
      await axios.post(`${API}/api/inquiries`, {
        first_name: first, last_name: rest.join(" ") || "", agency_name: form.name,
        email: form.email, phone: form.phone, phone_code: "+91",
        destination: "Egypt", source_page: packageTitle ? `Ad LP - ${packageTitle}` : "Ad LP - Egypt Tour Packages", form_type: "B2C",
      });
      setDone(true); if (onDone) onDone();
      if (window.history) window.history.pushState({}, "", "/thank-you");
    } catch { toast.error("Something went wrong."); } finally { setLoading(false); }
  };
  if (done) return (
    <div className={`text-center ${inline ? "py-5" : "p-8"}`}>
      <div className="w-12 h-12 bg-[#174358]/10 rounded-full flex items-center justify-center mx-auto mb-3"><Phone size={20} className="text-[#174358]" /></div>
      <p className="font-bold text-[15px] text-[#0D1B2A] mb-1">We'll Call You Shortly!</p>
      <p className="text-[13px] text-[#0D1B2A]/55">Our Egypt specialist will reach out within 30 minutes.</p>
    </div>
  );
  return (
    <form onSubmit={submit} className={inline ? "space-y-3" : "p-5 space-y-4"}>
      <div>
        <label className="text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-1.5 block">Full Name *</label>
        <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Enter your name" className="h-12 rounded-full px-5 text-[13px] bg-[#F8FAFB] border-[#0D1B2A]/08 focus:border-[#174358]/30 focus:bg-white transition-colors" required />
      </div>
      <div>
        <label className="text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-1.5 block">Phone Number *</label>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-4 h-12 rounded-full border border-[#0D1B2A]/08 bg-[#F8FAFB] text-[13px] text-[#0D1B2A]/60 shrink-0">&#127470;&#127475; +91</div>
          <Input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="98765 43210" className="h-12 rounded-full px-5 text-[13px] bg-[#F8FAFB] border-[#0D1B2A]/08 focus:border-[#174358]/30 focus:bg-white transition-colors flex-1" required />
        </div>
      </div>
      <div>
        <label className="text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-1.5 block">Email</label>
        <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" className="h-12 rounded-full px-5 text-[13px] bg-[#F8FAFB] border-[#0D1B2A]/08 focus:border-[#174358]/30 focus:bg-white transition-colors" />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full h-11 font-bold text-[13px] shadow-md shadow-[#174358]/15">
        {loading ? <Loader2 size={15} className="animate-spin mr-2" /> : null}{loading ? "Submitting..." : "Request Callback"}
      </Button>
      <p className="text-[10px] text-[#0D1B2A]/40 text-center leading-snug">We'll call you within 30 min during 10AM-7PM IST</p>
    </form>
  );
}

function CallbackModal({ open, onClose, packageTitle }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div data-testid="callback-modal" className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div>
            <h3 className="text-[16px] font-bold text-[#0D1B2A]">Request Callback</h3>
            {packageTitle && <p className="text-[12px] text-[#0D1B2A]/40 mt-0.5 line-clamp-1">{packageTitle}</p>}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-[#0D1B2A]/05 flex items-center justify-center"><X size={18} className="text-[#0D1B2A]/40" /></button>
        </div>
        <CallbackForm packageTitle={packageTitle} />
      </div>
    </div>
  );
}

/* ── Package Card ── */
function PackageCard({ pkg, onCallback }) {
  const savings = pkg.originalPrice - pkg.price;
  const content = (
    <div data-testid={`pkg-card-${pkg.id}`} className="bg-white rounded-2xl border border-[#0D1B2A]/06 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row">
      <div className="relative sm:w-[280px] w-full shrink-0">
        <img src={pkg.image} alt={pkg.title} className="w-full h-[200px] sm:h-full object-cover" loading="lazy" />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-md flex items-center gap-1"><Clock size={11} /> {pkg.duration}</div>
        {pkg.rating >= 4.7 && <div className="absolute top-3 right-3 bg-[#174358] text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">{pkg.rating} <Star size={10} fill="white" /></div>}
      </div>
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-[#0D1B2A] text-[15px] sm:text-[16px] leading-snug mb-3">{pkg.title}</h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {pkg.cities.map(c => <span key={c.c} className="text-[11px] font-semibold rounded-md px-2 py-0.5 bg-[#174358]/06 text-[#174358]">{c.d}D <span className="font-normal opacity-70">{c.c}</span></span>)}
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={13} fill={i <= Math.floor(pkg.rating) ? "#f59e0b" : "#e5e7eb"} stroke="none" />)}</div>
            <span className="text-[12px] text-[#0D1B2A]/40">({pkg.reviews})</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-3 pt-3 border-t border-[#0D1B2A]/06">
          <div>
            <div className="text-[11px] text-[#0D1B2A]/40 line-through">INR {pkg.originalPrice.toLocaleString("en-IN")}</div>
            <div className="flex items-baseline gap-1"><span className="text-[20px] sm:text-[22px] font-bold text-[#0D1B2A]">INR {pkg.price.toLocaleString("en-IN")}</span><span className="text-[11px] text-[#0D1B2A]/40">/person</span></div>
            <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">SAVE INR {savings.toLocaleString("en-IN")}</div>
          </div>
          <Button data-testid={`pkg-cb-${pkg.id}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onCallback(pkg.title); }}
            className="bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full h-10 px-5 text-[12px] font-bold shrink-0 shadow-md shadow-[#174358]/10">Request Callback</Button>
        </div>
      </div>
    </div>
  );
  if (pkg.hasItinerary) return <Link to={`/destination/Egypt/package/${pkg.slug}`} className="block">{content}</Link>;
  return content;
}

/* ── Mini Card ── */
function MiniCard({ pkg, onCallback }) {
  return (
    <div className="min-w-[260px] sm:min-w-[280px] bg-white rounded-2xl border border-[#0D1B2A]/06 overflow-hidden shrink-0 hover:shadow-md transition-shadow">
      <img src={pkg.image} alt={pkg.title} className="w-full h-[140px] object-cover" loading="lazy" />
      <div className="p-3.5">
        <div className="flex flex-wrap gap-1 mb-2">
          {pkg.cities.slice(0, 3).map(c => <span key={c.c} className="text-[10px] font-semibold rounded px-1.5 py-0.5 bg-[#174358]/06 text-[#174358]">{c.d}D {c.c}</span>)}
        </div>
        <h4 className="text-[13px] font-bold text-[#0D1B2A] leading-snug mb-2 line-clamp-2">{pkg.title}</h4>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i <= Math.floor(pkg.rating) ? "#f59e0b" : "#e5e7eb"} stroke="none" />)}</div>
          <span className="text-[10px] text-[#0D1B2A]/40">({pkg.reviews})</span>
        </div>
        <div className="flex items-end justify-between">
          <div><span className="text-[10px] text-[#0D1B2A]/40 line-through block">INR {pkg.originalPrice.toLocaleString("en-IN")}</span><span className="text-[15px] font-bold text-[#0D1B2A]">INR {pkg.price.toLocaleString("en-IN")}</span><span className="text-[10px] text-[#0D1B2A]/40 ml-1">/person</span></div>
        </div>
        <button onClick={() => onCallback(pkg.title)} className="w-full mt-3 bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full h-9 text-[11px] font-bold transition-colors shadow-sm">Request Callback</button>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function EgyptLandingPage() {
  const [style, setStyle] = useState("all");
  const [dur, setDur] = useState("all");
  const [visible, setVisible] = useState(6);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPkg, setModalPkg] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, []);
  const openCb = (t) => { setModalPkg(t || null); setModalOpen(true); };

  const filtered = PACKAGES.filter(p => {
    if (style !== "all" && !p.style.includes(style)) return false;
    if (dur === "short" && p.days > 5) return false;
    if (dur === "medium" && (p.days < 6 || p.days > 7)) return false;
    if (dur === "long" && p.days < 8) return false;
    return true;
  });
  const shown = filtered.slice(0, visible);

  return (
    <div data-testid="egypt-lp" className="min-h-screen bg-[#F8FAFB]">
      <Navbar forceLight />
      <div className="bg-white border-b border-[#0D1B2A]/08 px-4 py-2.5 mt-20">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <span className="text-[12px] text-[#0D1B2A]/55 hidden sm:inline">Destination Specialists to Egypt</span>
          <span className="text-[10px] text-[#0D1B2A]/40 sm:hidden">Egypt Specialists</span>
          <Button data-testid="header-cb" onClick={() => openCb()} className="bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full h-9 px-4 text-[12px] font-bold shadow-sm sm:hidden">
            <Phone size={13} className="mr-1.5" /> Get a Call
          </Button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 sm:py-8">
        <div className="mb-8">
          <h1 data-reveal data-testid="lp-heading" className="text-[24px] sm:text-[30px] font-bold text-[#0D1B2A] leading-tight">Egypt Tour Packages</h1>
          <p data-reveal className="text-[13px] sm:text-[14px] text-[#0D1B2A]/55 mt-1.5">Customise or choose from 44+ Egypt packages with best pricing, Nile cruises, and expert local support.</p>
        </div>

        <div className="flex gap-6">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-[#0D1B2A]/06 p-4 mb-5">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-[#0D1B2A]/40 uppercase tracking-wider">Duration</span>
                  {DURATIONS.map(d => (
                    <button key={d.key} data-testid={`dur-${d.key}`} onClick={() => { setDur(d.key); setVisible(6); }}
                      className={`px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-all ${dur === d.key ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "bg-white text-[#0D1B2A]/55 border-[#0D1B2A]/08 hover:border-[#0D1B2A]/25"}`}>{d.label}</button>
                  ))}
                </div>
                <div className="w-px bg-[#0D1B2A]/10 hidden sm:block" />
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold text-[#0D1B2A]/40 uppercase tracking-wider">Travel Style</span>
                  {STYLES.map(s => (
                    <button key={s.key} data-testid={`style-${s.key}`} onClick={() => { setStyle(s.key); setVisible(6); }}
                      className={`px-3 py-1.5 text-[11px] font-semibold rounded-full border transition-all ${style === s.key ? "bg-[#174358] text-white border-[#174358]" : "bg-white text-[#0D1B2A]/55 border-[#0D1B2A]/08 hover:border-[#0D1B2A]/25"}`}>{s.label}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cards */}
            <div data-reveal-group className="space-y-4">
              {shown.slice(0, 4).map(pkg => <PackageCard key={pkg.id} pkg={pkg} onCallback={openCb} />)}
            </div>

            {/* Accreditation + Review Breaker */}
            {shown.length >= 4 && (
              <div className="my-6 bg-[#0D1B2A] rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="p-6 md:w-1/2 border-b md:border-b-0 md:border-r border-white/10">
                    <div className="flex items-center gap-2 mb-4"><Award size={18} className="text-amber-400" /><span className="text-white/90 text-[13px] font-bold">Trusted & Accredited</span></div>
                    <div className="flex flex-wrap gap-2">
                      {["TripAdvisor", "ISO 9001:2015", "Ministry of Tourism", "IATA Accredited", "PATA Member"].map(b => (
                        <div key={b} className="bg-white/10 rounded-lg px-3 py-2 flex items-center gap-1.5"><Shield size={11} className="text-white/50" /><span className="text-[11px] font-semibold text-white/80">{b}</span></div>
                      ))}
                    </div>
                    <p className="text-white/30 text-[11px] mt-3">30+ years of trusted operations across 45+ destinations</p>
                  </div>
                  <div className="p-6 md:w-1/2">
                    <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(i => <Star key={i} size={15} fill="#f59e0b" stroke="none" />)}</div>
                    <p className="text-[14px] text-white/80 italic leading-relaxed mb-4">"Our Egypt trip through Hi DMC was absolutely flawless. The Nile cruise, the pyramids at sunrise, the local guides who knew every hidden gem. Every single detail was taken care of."</p>
                    <p className="text-white font-bold text-[13px]">Ananya Sharma</p>
                    <p className="text-white/40 text-[11px]">Travelled Feb 2026 with family</p>
                  </div>
                </div>
              </div>
            )}

            {shown.length > 4 && <div data-reveal-group className="space-y-4">{shown.slice(4).map(pkg => <PackageCard key={pkg.id} pkg={pkg} onCallback={openCb} />)}</div>}

            {/* Load More */}
            <div className="text-center py-8">
              <p className="text-[13px] text-[#0D1B2A]/40 mb-3">You've viewed {Math.min(visible, filtered.length)} of 44 packages for Egypt</p>
              {visible < filtered.length && (
                <button data-testid="load-more" onClick={() => setVisible(v => v + 6)}
                  className="border-2 border-[#174358]/30 text-[#174358] font-bold text-[13px] rounded-full px-8 py-3 hover:border-[#174358] hover:bg-[#174358]/04 transition-colors">Load More Egypt Packages</button>
              )}
            </div>

            {/* ── What Makes Us Different ── */}
            <section className="mb-10 bg-white rounded-2xl border border-[#0D1B2A]/06 overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 data-reveal className="text-[20px] sm:text-[22px] font-bold text-[#0D1B2A] mb-2">What Makes Us Different</h2>
                <p data-reveal className="text-[13px] text-[#0D1B2A]/55 mb-6">We're not an aggregator. We're the destination management company. Here's what that means for you.</p>
                <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { icon: Building2, title: "Local Office in Egypt", desc: "Our own office in Cairo with full-time operations staff. Not outsourced, not remote. We're physically there." },
                    { icon: Users, title: "Local Specialists", desc: "Egyptian-born destination experts who've lived the itineraries they design. They know what guidebooks can't tell you." },
                    { icon: Heart, title: "We Actually Care", desc: "Every traveller gets a dedicated trip coordinator. Not a chatbot, not a call centre. A real person who follows up." },
                    { icon: Headphones, title: "24/7 Customer Support", desc: "On-ground assistance available round the clock. If something goes wrong at 2AM, someone picks up." },
                    { icon: Shield, title: "30-Year Trust", desc: "A division of Hi Tours Group, operational since 1993. 850+ travel partners across 45+ destinations trust us daily." },
                  ].map(r => (
                    <div key={r.title} className="flex gap-3.5 p-4 rounded-2xl bg-[#F8FAFB] border border-[#0D1B2A]/06">
                      <div className="w-10 h-10 rounded-lg bg-[#174358]/08 flex items-center justify-center shrink-0"><r.icon size={18} className="text-[#174358]" /></div>
                      <div><h3 className="text-[13px] font-bold text-[#0D1B2A] mb-1">{r.title}</h3><p className="text-[11px] text-[#0D1B2A]/55 leading-relaxed">{r.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tag Sections */}
            {[
              { title: "Egypt Family Tours", fk: "family" },
              { title: "Egypt Honeymoon Tours", fk: "honeymoon" },
              { title: "Egypt Cultural Tours", fk: "cultural" },
              { title: "Egypt Adventure Tours", fk: "adventure" },
            ].map(sec => {
              const items = PACKAGES.filter(p => p.style.includes(sec.fk)).slice(0, 4);
              if (!items.length) return null;
              return (
                <section key={sec.title} className="mb-8">
                  <h2 data-reveal className="text-[18px] sm:text-[20px] font-bold text-[#0D1B2A] mb-4">{sec.title}</h2>
                  <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
                    {items.map(pkg => <MiniCard key={`${sec.fk}-${pkg.id}`} pkg={pkg} onCallback={openCb} />)}
                  </div>
                </section>
              );
            })}

            {/* Blogs */}
            <section className="mb-8">
              <h2 data-reveal className="text-[18px] sm:text-[20px] font-bold text-[#0D1B2A] mb-4">Egypt Travel Guides</h2>
              <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: "Best Time to Visit Egypt: Month-by-Month Guide", img: "https://images.unsplash.com/photo-1678388103961-5e1254fcc42a?w=400&q=80" },
                  { title: "10 Things First-Timers Should Know Before Visiting Egypt", img: "https://images.unsplash.com/photo-1629468855534-450d7c4c5f72?w=400&q=80" },
                  { title: "Complete Nile Cruise Guide: Luxor to Aswan & Back", img: "https://images.unsplash.com/photo-1716639154156-db53b75a22ad?w=400&q=80" },
                ].map(b => (
                  <div key={b.title} className="bg-white rounded-2xl border border-[#0D1B2A]/06 overflow-hidden">
                    <img src={b.img} alt={b.title} className="w-full h-[140px] object-cover" /><div className="p-4"><span className="text-[10px] font-bold text-[#174358] uppercase tracking-wider">Travel Guide</span><h4 className="text-[13px] font-bold text-[#0D1B2A] mt-1 leading-snug line-clamp-2">{b.title}</h4><p className="text-[11px] text-[#0D1B2A]/40 mt-2">5 min read</p></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sticky Sidebar ── */}
          <div className="hidden lg:block w-[320px] shrink-0">
            <div className="sticky top-[72px]">
              <div className="bg-white rounded-2xl border border-[#0D1B2A]/06 shadow-sm overflow-hidden">
                <div className="bg-[#0D1B2A] px-5 py-5">
                  <h3 className="text-[15px] font-bold text-white mb-3">Speak to an Egypt Specialist</h3>
                  <div className="flex items-center gap-1">
                    {SPECIALIST_PHOTOS.map((src, i) => (
                      <img key={i} src={src} alt="" className="w-10 h-10 rounded-full border-2 border-[#0D1B2A] object-cover -ml-1.5 first:ml-0" />
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <CallbackForm inline />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] px-4 py-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <Link to="/ads" className="text-white text-[15px] font-bold hover:opacity-80 transition-opacity font-['Manrope'] font-bold tracking-tight">HI DMC</Link>
          <p className="text-white/30 text-[11px] mt-1">A Division of Hi Tours India Pvt. Ltd.</p>
          <p className="text-white/20 text-[11px] mt-1">Vatika City Point, Sector 49, Gurgaon, Haryana 122002</p>
          <p className="text-white/10 text-[10px] mt-4">Prices are indicative and subject to availability.</p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3" style={{ background: "linear-gradient(transparent, white 40%)" }}>
        <Button data-testid="sticky-cta" onClick={() => openCb()}
          className="w-full bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full h-[52px] font-bold text-[14px] shadow-xl shadow-[#174358]/20">
          <Phone size={16} className="mr-2" /> Request Callback
        </Button>
      </div>
      <div className="lg:hidden h-20" />

      <CallbackModal open={modalOpen} onClose={() => setModalOpen(false)} packageTitle={modalPkg} />
    </div>
  );
}
