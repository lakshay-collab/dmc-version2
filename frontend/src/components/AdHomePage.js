import { useState, useEffect } from "react";
import { MapPin, Phone, X, Loader2, ArrowRight, Globe, Shield, Users, Headphones, Star, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "./Navbar";

const API = process.env.REACT_APP_BACKEND_URL;

const DESTINATIONS = [
  { name: "Egypt", image: "https://images.unsplash.com/photo-1678388103961-5e1254fcc42a?w=500&q=80", link: "/ads/egypt-tour-packages" },
  { name: "Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80", link: "/destination/Japan" },
  { name: "Vietnam", image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&q=80", link: "/destination/Vietnam" },
  { name: "Sri Lanka", image: "https://images.unsplash.com/photo-1578519050142-afb511e518de?w=500&q=80", link: "/destination/Sri%20Lanka" },
  { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80", link: "/destination/Bali" },
  { name: "Jordan", image: "https://images.unsplash.com/photo-1580834341580-8c17a3a630c8?w=500&q=80", link: "/destination/Jordan" },
  { name: "Turkey", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=500&q=80", link: "/destination/Turkey" },
  { name: "South Africa", image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=500&q=80", link: "/destination/South%20Africa" },
  { name: "Morocco", image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=500&q=80", link: "/destination/Morocco" },
  { name: "Kazakhstan", image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=500&q=80", link: "/destination/Kazakhstan" },
  { name: "Cambodia", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=500&q=80", link: "/destination/Cambodia" },
  { name: "Malaysia", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&q=80", link: "/destination/Malaysia" },
];

/* ── Inquiry Modal ── */
function InquiryModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", destination: "" });
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
        destination: form.destination || "", source_page: "Ad Homepage", form_type: "B2C",
      });
      setDone(true);
    } catch { toast.error("Something went wrong."); } finally { setLoading(false); }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <h3 className="text-[18px] font-bold text-[#0D1B2A]">Plan Your Holiday</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-[#0D1B2A]/05 flex items-center justify-center"><X size={18} className="text-[#0D1B2A]/40" /></button>
        </div>
        {done ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-[#174358]/10 rounded-full flex items-center justify-center mx-auto mb-4"><Phone size={22} className="text-[#174358]" /></div>
            <p className="font-bold text-[17px] text-[#0D1B2A] mb-1">We'll Be in Touch!</p>
            <p className="text-[13px] text-[#0D1B2A]/55">Our destination specialist will call you within 30 minutes.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 pb-6 pt-3 space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-1.5 block">Where would you like to go?</label>
              <Input value={form.destination} onChange={e => setForm(p => ({ ...p, destination: e.target.value }))} placeholder="e.g. Egypt, Japan, Bali..." className="h-12 rounded-full px-5 text-[14px] bg-[#F8FAFB] border-[#0D1B2A]/08 focus:border-[#174358]/30 focus:bg-white transition-colors" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-1.5 block">Full Name *</label>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" className="h-12 rounded-full px-5 text-[14px] bg-[#F8FAFB] border-[#0D1B2A]/08 focus:border-[#174358]/30 focus:bg-white transition-colors" required />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-1.5 block">Phone Number *</label>
              <div className="flex gap-2">
                <div className="flex items-center gap-1.5 px-4 h-12 rounded-full border border-[#0D1B2A]/08 bg-[#F8FAFB] text-[13px] text-[#0D1B2A]/60 shrink-0">&#127470;&#127475; +91</div>
                <Input type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="98765 43210" className="h-12 rounded-full px-5 text-[14px] bg-[#F8FAFB] border-[#0D1B2A]/08 focus:border-[#174358]/30 focus:bg-white transition-colors flex-1" required />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-[#174358]/60 uppercase tracking-[0.2em] mb-1.5 block">Email</label>
              <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" className="h-12 rounded-full px-5 text-[14px] bg-[#F8FAFB] border-[#0D1B2A]/08 focus:border-[#174358]/30 focus:bg-white transition-colors" />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full h-12 font-semibold text-[14px] shadow-lg shadow-[#174358]/15">
              {loading ? <Loader2 size={16} className="animate-spin mr-2" /> : null}{loading ? "Submitting..." : "Get Free Consultation"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ── Main Ad Homepage ── */
export default function AdHomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, []);

  return (
    <div data-testid="ad-homepage" className="min-h-screen bg-white">
      <Navbar forceLight />
      <div className="sticky top-20 z-40 bg-white border-b border-[#0D1B2A]/06 mt-20">
        <div className="max-w-[1200px] mx-auto px-5 py-2.5 flex items-center justify-end">
          <Button onClick={() => setModalOpen(true)} className="bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full px-5 h-9 text-[12px] font-bold shadow-sm">
            Inquire <span className="hidden sm:inline ml-1">/ Plan Your Holiday</span>
          </Button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f5f7fa]" />
        <div className="relative max-w-[1200px] mx-auto px-5 pt-20 sm:pt-28 pb-8 sm:pb-12 text-center">
          <h1 data-reveal className="font-['Manrope'] font-bold tracking-tight text-[40px] sm:text-[56px] lg:text-[68px] text-[#0D1B2A] leading-[1.1] mb-6">
            Travel, your way.
          </h1>
          <p data-reveal className="text-[15px] sm:text-[17px] text-[#0D1B2A]/55 max-w-xl mx-auto mb-10 leading-relaxed">
            Handcrafted tour packages across 45+ destinations. Local experts, transparent pricing, and 30 years of trust.
          </p>

          {/* Search-style CTA */}
          <div data-reveal className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full border border-[#0D1B2A]/08 shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)] flex items-center p-1.5 sm:p-2">
              <div className="flex items-center gap-2.5 flex-1 pl-4">
                <MapPin size={18} className="text-[#174358] shrink-0" />
                <input
                  type="text" readOnly
                  placeholder="Where would you like to go?"
                  className="w-full text-[14px] sm:text-[15px] text-[#0D1B2A]/70 placeholder:text-[#0D1B2A]/40 bg-transparent outline-none cursor-pointer"
                  onClick={() => setModalOpen(true)}
                />
              </div>
              <Button onClick={() => setModalOpen(true)} className="bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full h-10 sm:h-11 px-5 sm:px-7 text-[13px] font-bold shadow-md shadow-[#174358]/15 shrink-0">
                Plan for Free
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Image Band */}
        <div className="relative max-w-[1400px] mx-auto px-4 pb-6 sm:pb-10">
          <div data-reveal-group className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
            {[
              "https://images.unsplash.com/photo-1678388103961-5e1254fcc42a?w=400&h=300&fit=crop&q=80",
              "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop&q=80",
              "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop&q=80",
              "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop&q=80",
              "https://images.unsplash.com/photo-1580834341580-8c17a3a630c8?w=400&h=300&fit=crop&q=80",
            ].map((src, i) => (
              <div key={i} className={`rounded-2xl sm:rounded-2xl overflow-hidden ${i >= 3 ? "hidden sm:block" : ""}`} style={{ aspectRatio: "4/3" }}>
                <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div className="bg-[#F8FAFB] py-4 border-y border-[#0D1B2A]/06">
          <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-center gap-6 sm:gap-10 flex-wrap text-center">
            <div className="flex items-center gap-1.5">
              <div className="flex">{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#f59e0b" stroke="none" />)}</div>
              <span className="text-[12px] text-[#0D1B2A]/55 font-medium">Rated by 850+ partners</span>
            </div>
            <span className="text-[#0D1B2A]/20 hidden sm:inline">|</span>
            <span className="text-[12px] text-[#0D1B2A]/55 font-medium">30+ Years Experience</span>
            <span className="text-[#0D1B2A]/20 hidden sm:inline">|</span>
            <span className="text-[12px] text-[#0D1B2A]/55 font-medium">45+ Destinations</span>
            <span className="text-[#0D1B2A]/20 hidden sm:inline">|</span>
            <span className="text-[12px] text-[#0D1B2A]/55 font-medium">6 Global Offices</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-[28px] sm:text-[34px] text-[#0D1B2A] text-center mb-12">
            Custom holidays don't have to be complicated
          </h2>
          <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Globe, num: "1", title: "Dream it", desc: "Tell us your destination, travel dates, and preferences. We start planning immediately." },
              { icon: Users, num: "2", title: "Customize it", desc: "A local specialist crafts your itinerary, one-on-one, tailored to your style and budget." },
              { icon: Heart, num: "3", title: "Book it", desc: "We handle every detail. Flights, hotels, transfers, guides. You just show up and enjoy." },
              { icon: Headphones, num: "4", title: "Travel with support", desc: "24/7 on-ground assistance throughout your trip. We're always just a call away." },
            ].map(s => (
              <div key={s.title} className="text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#174358]/08 flex items-center justify-center mx-auto sm:mx-0 mb-4">
                  <span className="text-[16px] font-bold text-[#174358]">{s.num}</span>
                </div>
                <h3 className="text-[15px] font-bold text-[#0D1B2A] mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#0D1B2A]/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="text-center mt-12">
            <Button onClick={() => setModalOpen(true)} variant="outline" className="rounded-full px-8 h-11 text-[13px] font-bold border-[#174358]/30 text-[#174358] hover:bg-[#174358]/04">
              Start Planning <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Discover Destinations */}
      <section id="destinations" className="py-20 md:py-28 px-5 bg-[#F8FAFB]">
        <div className="max-w-[1200px] mx-auto">
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-[28px] sm:text-[34px] text-[#0D1B2A] text-center mb-3">
            Discover extraordinary destinations
          </h2>
          <p data-reveal className="text-[14px] text-[#0D1B2A]/55 text-center mb-12 max-w-lg mx-auto">
            Explore our curated collection of destinations, each with local experts and handcrafted itineraries.
          </p>
          <div data-reveal-group className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {DESTINATIONS.map(d => (
              <Link key={d.name} to={d.link} data-testid={`dest-card-${d.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative rounded-2xl sm:rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white text-[14px] sm:text-[16px] font-bold">{d.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hi DMC */}
      <section className="py-20 md:py-28 px-5">
        <div className="max-w-[1000px] mx-auto">
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-[28px] sm:text-[34px] text-[#0D1B2A] text-center mb-12">
            Why travel with Hi DMC
          </h2>
          <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "30 years of trust", desc: "A division of Hi Tours Group, one of Asia's most established travel companies since 1993." },
              { icon: MapPin, title: "Local offices, local experts", desc: "Six offices across Asia and the Middle East. Our teams live where you travel." },
              { icon: Headphones, title: "24/7 on-ground support", desc: "Dedicated trip coordinator for every booking. If something goes wrong at 2AM, someone picks up." },
            ].map(r => (
              <div key={r.title} className="text-center px-4">
                <div className="w-14 h-14 rounded-2xl bg-[#174358]/06 flex items-center justify-center mx-auto mb-4"><r.icon size={22} className="text-[#174358]" /></div>
                <h3 className="text-[15px] font-bold text-[#0D1B2A] mb-2">{r.title}</h3>
                <p className="text-[13px] text-[#0D1B2A]/55 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-5 bg-[#0D1B2A]">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-[28px] sm:text-[34px] text-white mb-4">
            Ready to plan your next trip?
          </h2>
          <p data-reveal className="text-[14px] text-white/50 mb-8">Get a custom itinerary crafted by our destination specialists. It's free, no strings attached.</p>
          <Button data-reveal onClick={() => setModalOpen(true)} className="bg-white text-[#0D1B2A] hover:bg-[#0D1B2A]/05 rounded-full h-12 px-8 text-[14px] font-bold shadow-lg">
            Get Free Consultation <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] border-t border-white/10 px-5 py-8">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white text-[14px] font-bold font-['Manrope'] font-bold tracking-tight">HI DMC</p>
            <p className="text-white/25 text-[11px] mt-0.5">A Division of Hi Tours India Pvt. Ltd.</p>
          </div>
          <p className="text-white/15 text-[10px]">Vatika City Point, Sector 49, Gurgaon, Haryana 122002</p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3" style={{ background: "linear-gradient(transparent, white 40%)" }}>
        <Button onClick={() => setModalOpen(true)}
          className="w-full bg-[#174358] hover:bg-[#1e5a75] text-white rounded-full h-[52px] font-bold text-[14px] shadow-xl shadow-[#174358]/20">
          Plan Your Holiday
        </Button>
      </div>
      <div className="sm:hidden h-20" />

      <InquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
