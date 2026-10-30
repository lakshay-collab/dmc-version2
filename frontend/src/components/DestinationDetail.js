import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Globe, Calendar, CreditCard, Languages, Users, Package, Plane, Compass, Hotel, Car, Map, Sparkles, Phone, Mail, Check, Utensils, TrendingUp, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const factIcons = { "Capital": Globe, "Currency": CreditCard, "Languages": Languages, "Best Season": Calendar, "Hi DMC Office": MapPin, "Local Team": Users };
const serviceIcons = { "FIT Packages": Package, "Group Tours": Users, "Experiences": Compass, "Hotels": Hotel, "Flights": Plane, "Ad Hoc Groups": Sparkles, "Transfers": Car, "MICE": Map };

const phoneCodes = [
  { code: "+91", flag: "\u{1F1EE}\u{1F1F3}" }, { code: "+1", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}" }, { code: "+971", flag: "\u{1F1E6}\u{1F1EA}" },
  { code: "+65", flag: "\u{1F1F8}\u{1F1EC}" }, { code: "+61", flag: "\u{1F1E6}\u{1F1FA}" },
  { code: "+49", flag: "\u{1F1E9}\u{1F1EA}" }, { code: "+33", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "+81", flag: "\u{1F1EF}\u{1F1F5}" }, { code: "+86", flag: "\u{1F1E8}\u{1F1F3}" },
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh",
  "Jammu and Kashmir", "Ladakh", "Puducherry",
];

const inputClass = "bg-[#F8FAFB] border-[#0D1B2A]/08 text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 h-11 rounded-lg focus:border-[#174358]/40 focus:ring-1 focus:ring-[#174358]/20 text-sm";
const labelClass = "text-[11px] text-[#0D1B2A]/50 font-semibold uppercase tracking-wider mb-1.5 block";

/* Same premium field treatment as the homepage quote form — labeled, pill-free
   rounded fields on a soft fill — just scoped to this one destination. */
function AgentSignupForm({ countryName }) {
  const [form, setForm] = useState({ first_name: "", last_name: "", agency_name: "", email: "", phone_code: "+91", phone: "", state: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const isIndia = form.phone_code === "+91";
  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.agency_name || !form.email || !form.phone) { toast.error("Please fill required fields"); return; }
    if (isIndia && !form.state) { toast.error("Please select your state"); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, { ...form, source_page: `Destination - ${countryName}`, destination: countryName, form_type: "B2B" });
      setSent(true); window.history.pushState({}, "", `${window.location.pathname}/thank-you`); toast.success("Sign up successful!");
    } catch { toast.error("Something went wrong."); }
    finally { setLoading(false); }
  };

  if (sent) return (
    <div data-testid="hero-form-success" className="bg-white rounded-[1.75rem] p-10 text-center shadow-[0_44px_110px_-48px_rgba(13,27,42,0.5)]">
      <div className="w-14 h-14 rounded-full bg-[#174358]/10 flex items-center justify-center mx-auto mb-5">
        <Check size={26} className="text-[#174358]" />
      </div>
      <h3 className="font-['Manrope'] font-bold tracking-tight text-xl text-[#0D1B2A] mb-2">Thank You for Signing Up</h3>
      <p className="text-[#0D1B2A]/45 text-sm leading-relaxed">Our customer success team will get in touch with you shortly.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} data-testid="hero-inquiry-form" className="bg-white rounded-[1.75rem] p-6 md:p-8 space-y-4 shadow-[0_44px_110px_-48px_rgba(13,27,42,0.5)]">
      <div className="mb-1">
        <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A] mb-1">Sign Up for {countryName} Access</h3>
        <p className="text-xs text-[#0D1B2A]/45">Get live rates and start booking in minutes.</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>First Name *</label>
          <Input data-testid="hero-input-first" placeholder="First name" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Last Name *</label>
          <Input data-testid="hero-input-last" placeholder="Last name" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Agency Name *</label>
        <Input data-testid="hero-input-agency" placeholder="Your travel agency" value={form.agency_name} onChange={(e) => update("agency_name", e.target.value)} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Phone Number *</label>
        <div className="flex gap-2">
          <Select value={form.phone_code} onValueChange={(v) => { update("phone_code", v); if (v !== "+91") update("state", ""); }}>
            <SelectTrigger className="bg-[#F8FAFB] border-[#0D1B2A]/08 text-[#0D1B2A] h-11 rounded-lg w-[100px] text-sm flex-shrink-0"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-white border-[#0D1B2A]/10 max-h-[200px]">
              {phoneCodes.map((pc) => (<SelectItem key={pc.code} value={pc.code} className="text-sm"><span className="mr-1">{pc.flag}</span> {pc.code}</SelectItem>))}
            </SelectContent>
          </Select>
          <Input data-testid="hero-input-phone" type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={`${inputClass} flex-1`} />
        </div>
      </div>
      {isIndia && (
        <div>
          <label className={labelClass}>State *</label>
          <Select value={form.state} onValueChange={(v) => update("state", v)}>
            <SelectTrigger data-testid="hero-input-state" className="bg-[#F8FAFB] border-[#0D1B2A]/08 text-[#0D1B2A] h-11 rounded-lg w-full text-sm"><SelectValue placeholder="Select your state" /></SelectTrigger>
            <SelectContent className="bg-white border-[#0D1B2A]/10 max-h-[200px]">
              {indianStates.map((s) => (<SelectItem key={s} value={s} className="text-sm">{s}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div>
        <label className={labelClass}>Email *</label>
        <Input data-testid="hero-input-email" type="email" placeholder="email@agency.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full py-5 text-sm font-semibold shadow-sm transition-colors disabled:opacity-50">
        {loading ? "Submitting..." : (<>Sign Up for Agent Login <ArrowRight size={14} className="ml-1.5" /></>)}
      </Button>
    </form>
  );
}

export default function DestinationDetail() {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setLoading(true);
    axios.get(`${API}/destinations/detail/${encodeURIComponent(name)}`)
      .then((r) => setData(r.data))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return (<div className="min-h-screen bg-white"><Navbar /><div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-[#174358]/20 border-t-[#174358] rounded-full animate-spin" /></div></div>);
  if (!data) return (<div className="min-h-screen bg-white"><Navbar /><div className="flex flex-col items-center justify-center min-h-screen gap-4"><h2 className="font-['Manrope'] font-bold tracking-tight text-3xl text-[#0D1B2A]">Destination not found</h2><Link to="/" className="text-sm text-[#174358] hover:underline">Back to Home</Link></div></div>);

  const detail = data.detail;
  const heroImage = detail?.hero_image || data.image_url;

  return (
    <div data-testid="destination-detail-page" className="min-h-screen bg-white">
      <Navbar />

      {/* 1. Hero with Signup Form */}
      <section data-testid="dest-hero" className="relative min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt={data.name} data-parallax="18" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/70 to-[#0D1B2A]/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-end">
            <div className="lg:col-span-3">
              <Link to="/" data-reveal data-testid="back-to-home" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm font-medium mb-6 transition-colors"><ArrowLeft size={16} /> Home</Link>
              <p data-reveal className="text-sm text-white/50 font-semibold uppercase tracking-[0.2em] mb-4">{data.region}</p>
              <h1 data-reveal data-testid="dest-name" className="font-['Manrope'] font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-5">
                Your Destination Management<br />Company for <em className="not-italic text-white/70">{data.name}</em>
              </h1>
              <p data-reveal className="font-['Manrope'] text-base text-white/55 max-w-xl mb-7 leading-relaxed">Over 30 years of on-ground expertise. Your trusted DMC partner for {data.name}.</p>
              <a href={process.env.REACT_APP_AGENT_PORTAL_URL} target="_blank" rel="noopener noreferrer" data-reveal data-testid="dest-signin-btn"><Button variant="ghost" className="text-white/70 hover:text-white rounded-full px-6 py-4 text-sm border border-white/25 hover:border-white/50 font-semibold">Sign In as Agent</Button></a>
            </div>
            {detail && (
              <div className="lg:col-span-2">
                <AgentSignupForm countryName={data.name} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      {detail?.services_in_country && (
        <section data-testid="dest-stats" className="bg-[#174358]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            <div data-reveal-group className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
              {[{ val: "1,000+", label: "Hotels" }, { val: "100+", label: "Ready-Made Packages" }, { val: "350+", label: "Bookable Experiences" }, { val: "50+", label: "Local Specialists" }, { val: "30+", label: "Years in " + data.name }].map((s) => (
                <div key={s.label} className="text-center py-2">
                  <p className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl text-white mb-1">{s.val}</p>
                  <p className="text-[11px] text-white/45 uppercase tracking-wider font-semibold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Key Facts */}
      {detail?.key_facts && (
        <section data-testid="dest-facts" className="bg-[#F8FAFB] border-b border-[#0D1B2A]/05">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
            <div data-reveal-group className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {detail.key_facts.map((f) => { const Icon = factIcons[f.label] || Globe; return (
                <div key={f.label} data-testid={`fact-${f.label.toLowerCase().replace(/\s+/g, '-')}`} className="text-center">
                  <Icon size={18} className="text-[#174358]/40 mx-auto mb-2" strokeWidth={1.5} />
                  <p className="text-[10px] text-[#0D1B2A]/40 uppercase tracking-wider font-semibold mb-0.5">{f.label}</p>
                  <p className="text-sm font-semibold text-[#0D1B2A]">{f.value}</p>
                </div>
              ); })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Your India Team — Stats Only */}
      {detail?.team_info && (
        <section data-testid="dest-team" className="py-16 md:py-20 px-6 md:px-12 bg-[#0D1B2A]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white/40 mb-4">Your {data.name} Team</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-4">On-the-Ground Expertise</h2>
              <p data-reveal className="font-['Manrope'] text-sm text-white/45 max-w-2xl mx-auto leading-relaxed">{detail.team_info.description}</p>
            </div>
            <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Office Location", value: detail.team_info.office, icon: MapPin },
                { label: "Team Size", value: detail.team_info.team_size + " Specialists", icon: Users },
                { label: "On-Ground Experience", value: "30+ Years", icon: Calendar },
                { label: "Languages Spoken", value: "12+ Languages", icon: Languages },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white/05 rounded-xl p-6 border border-white/08 text-center hover:border-white/15 transition-all">
                    <Icon size={22} className="text-white/30 mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-lg font-semibold text-white mb-1">{item.value}</p>
                    <p className="text-[10px] text-white/35 uppercase tracking-wider font-semibold">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. Case Studies — MOVED UP (more important) */}
      {detail?.case_studies && (
        <section data-testid="dest-case-studies" className="py-20 md:py-24 px-6 md:px-12 bg-[#F8FAFB]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">Destination Metrics</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A]">How Travel Agents Rate<br /><em className="not-italic text-[#174358]">{data.name}</em></h2>
            </div>
            <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detail.case_studies.map((cs) => (
                <div key={cs.headline} data-testid={`case-study-${cs.category.toLowerCase().replace(/\s+/g, '-')}`} className="bg-white rounded-2xl p-8 shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] hover:shadow-[0_28px_70px_-28px_rgba(13,27,42,0.35)] transition-shadow duration-500">
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-[10px] bg-[#174358]/08 text-[#174358]/60 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">{cs.category}</span>
                    <div className="text-right">
                      <p className="font-['Manrope'] font-bold tracking-tight text-3xl text-[#174358]">{cs.metric}</p>
                      <p className="text-[10px] text-[#0D1B2A]/30 uppercase tracking-wider font-semibold">{cs.metric_label}</p>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#0D1B2A] mb-3">{cs.headline}</h3>
                  <p className="text-xs text-[#0D1B2A]/45 leading-relaxed">{cs.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Services */}
      {detail?.services_in_country && (
        <section data-testid="dest-services" className="py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-16">
              <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">What We Offer</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-5">Our Services for <em className="not-italic text-[#174358]">{data.name}</em></h2>
              <p data-reveal className="font-['Manrope'] text-sm text-[#0D1B2A]/60 leading-relaxed">End-to-end travel services — from FIT packages and group tours to MICE events. All with live rates.</p>
            </div>
            {detail.services_in_country.slice(0, 4).map((svc, i) => {
              const Icon = serviceIcons[svc.title] || Package;
              const isEven = i % 2 === 0;
              return (
                <div key={svc.title} data-testid={`dest-service-${svc.title.toLowerCase().replace(/\s+/g, '-')}`} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 last:mb-0">
                  <div className={isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-[#174358]/8 flex items-center justify-center"><Icon size={22} strokeWidth={1.5} className="text-[#174358]" /></div>
                      <div className="bg-[#174358]/8 rounded-full px-4 py-1.5"><span className="text-base font-bold text-[#174358]">{svc.count}</span></div>
                    </div>
                    <h3 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl leading-tight text-[#0D1B2A] mb-4">{svc.title}</h3>
                    <p data-reveal className="font-['Manrope'] text-sm text-[#0D1B2A]/60 leading-relaxed mb-6">{svc.desc}</p>
                    <Link to="/signup" data-reveal className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#174358] hover:text-[#1e5a75] transition-colors group">Start selling <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" /></Link>
                  </div>
                  <div className={isEven ? "order-2 lg:order-2" : "order-2 lg:order-1"}><div className="rounded-2xl overflow-hidden img-zoom group shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)]"><img src={svc.image} alt={svc.title} data-reveal-img className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105" /></div></div>
                </div>
              );
            })}
            <div className="section-divider my-16" />
            <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.services_in_country.slice(4).map((svc) => {
                const Icon = serviceIcons[svc.title] || Package;
                return (
                  <div key={svc.title} data-testid={`dest-service-${svc.title.toLowerCase().replace(/\s+/g, '-')}`} className="group rounded-2xl overflow-hidden bg-[#F8FAFB] shadow-[0_18px_50px_-24px_rgba(13,27,42,0.22)] hover:shadow-[0_28px_70px_-28px_rgba(13,27,42,0.3)] transition-shadow duration-500">
                    <div className="h-40 img-zoom overflow-hidden"><img src={svc.image} alt={svc.title} className="w-full h-full object-cover" /></div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-[#174358]/8 flex items-center justify-center group-hover:bg-[#174358] transition-colors"><Icon size={18} strokeWidth={1.5} className="text-[#174358] group-hover:text-white transition-colors" /></div>
                        <span className="text-sm font-bold text-[#174358]">{svc.count}</span>
                      </div>
                      <h4 className="font-semibold text-[#0D1B2A] text-sm mb-1.5">{svc.title}</h4>
                      <p className="text-xs text-[#0D1B2A]/50 leading-relaxed">{svc.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 7. Suggested Travel Itineraries */}
      {detail?.packages && detail.packages.length > 0 && (
        <section data-testid="dest-packages" className="py-20 md:py-24 px-6 md:px-12 bg-[#0D1B2A]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-white/40 mb-4">Travel Itineraries</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-4">Suggested travel itineraries <em className="not-italic text-white/50">for your clients</em></h2>
              <p data-reveal className="font-['Manrope'] text-sm text-white/45 leading-relaxed">Ready-to-sell package ideas. Customise dates, hotels, and experiences with live rates on the platform.</p>
            </div>
            <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detail.packages.map((pkg, idx) => {
                const pkgSlug = pkg.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                const hasItinerary = data.name === "Egypt";
                const expImg = detail.key_experiences?.[idx % (detail.key_experiences?.length || 1)]?.image || detail.hero_image || data.image_url;

                const CardInner = (
                  <>
                    <img src={expImg} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/95 via-[#0D1B2A]/50 to-[#0D1B2A]/20" />
                    <div className="relative z-10 h-full flex flex-col justify-end p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[9px] bg-white/15 text-white/80 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm">{pkg.tag}</span>
                        <span className="text-[10px] text-white/50 font-semibold">{pkg.duration}</span>
                      </div>
                      <h3 className="font-['Manrope'] font-bold tracking-tight text-xl md:text-2xl text-white leading-tight mb-2">{pkg.title}</h3>
                      <p className="text-[11px] text-white/40 mb-3 flex items-center gap-1"><MapPin size={10} /> {pkg.cities}</p>
                      <div className="space-y-1 mb-4">
                        {pkg.highlights.slice(0, 3).map((h) => (
                          <div key={h} className="flex items-center gap-1.5">
                            <Star size={8} className="text-white/40" />
                            <span className="text-[10px] text-white/55">{h}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-white/10">
                        <span className="text-[11px] font-semibold text-white/60 group-hover:text-white transition-colors flex items-center gap-1.5">
                          {hasItinerary ? "View Itinerary" : "Enquire Now"} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </>
                );

                return hasItinerary ? (
                  <Link key={pkg.title} to={`/destination/${encodeURIComponent(data.name)}/package/${pkgSlug}`}
                    data-testid={`package-${pkg.title.toLowerCase().replace(/\s+/g, '-').slice(0, 25)}`}
                    className="relative rounded-2xl overflow-hidden group cursor-pointer block" style={{ minHeight: "380px" }}>
                    {CardInner}
                  </Link>
                ) : (
                  <Link key={pkg.title} to="/signup"
                    data-testid={`package-${pkg.title.toLowerCase().replace(/\s+/g, '-').slice(0, 25)}`}
                    className="relative rounded-2xl overflow-hidden group cursor-pointer block" style={{ minHeight: "380px" }}>
                    {CardInner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. Regions */}
      {detail?.regions && (
        <section data-testid="dest-regions" className="py-20 md:py-24 px-6 md:px-12 bg-[#F8FAFB]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">Explore by Region</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A]">Regions of <em className="not-italic text-[#174358]">{data.name}</em></h2>
            </div>
            <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detail.regions.map((region) => (
                <div key={region.name} data-testid={`region-${region.name.toLowerCase().replace(/\s+/g, '-')}`} className="relative group rounded-2xl overflow-hidden" style={{ height: "280px" }}>
                  <img src={region.image} alt={region.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-white mb-2">{region.name}</h3>
                    <p className="text-xs text-white/55 leading-relaxed mb-3">{region.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {region.highlights.map((h) => (<span key={h} className="text-[9px] bg-white/15 text-white/70 px-2 py-0.5 rounded-full font-semibold">{h}</span>))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Key Cities */}
      {detail?.key_destinations_within && (
        <section data-testid="dest-cities" className="py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">Where We Operate</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A]">Key Cities in <em className="not-italic text-[#174358]">{data.name}</em></h2>
            </div>
            <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {detail.key_destinations_within.map((city) => (
                <div key={city.name} data-testid={`city-${city.name.toLowerCase()}`} className="relative group rounded-2xl overflow-hidden img-zoom" style={{ height: "300px" }}>
                  <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-white mb-1.5">{city.name}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{city.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Key Experiences */}
      {detail?.key_experiences && (
        <section data-testid="dest-experiences" className="py-20 md:py-24 px-6 md:px-12 bg-[#F8FAFB]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">Signature Experiences</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A]">Key Experiences in <em className="not-italic text-[#174358]">{data.name}</em></h2>
              <p data-reveal className="font-['Manrope'] text-sm text-[#0D1B2A]/60 mt-4 leading-relaxed">Curated experiences your clients will love. Book through your agent portal.</p>
            </div>
            <div data-reveal-group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {detail.key_experiences.map((exp) => (
                <div key={exp.title} data-testid={`experience-${exp.title.toLowerCase().replace(/\s+/g, '-').slice(0, 25)}`} className="bg-white rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.22)] hover:shadow-[0_28px_70px_-28px_rgba(13,27,42,0.3)] transition-shadow duration-500 group">
                  <div className="h-52 img-zoom overflow-hidden"><img src={exp.image} alt={exp.title} className="w-full h-full object-cover" /></div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2"><MapPin size={12} className="text-[#174358]/50" /><span className="text-[10px] text-[#174358]/60 uppercase tracking-wider font-semibold">{exp.location}</span></div>
                    <h3 className="font-['Manrope'] font-bold tracking-tight text-xl text-[#0D1B2A] mb-2">{exp.title}</h3>
                    <p className="text-xs text-[#0D1B2A]/50 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. Flavours / Food */}
      {detail?.food && (
        <section data-testid="dest-food" className="py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-14">
              <div data-reveal className="flex items-center gap-3 mb-4">
                <Utensils size={18} className="text-[#174358]/40" />
                <p className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60">Food & Cuisine</p>
              </div>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A] mb-5">The Flavours of <em className="not-italic text-[#174358]">{data.name}</em></h2>
              <p data-reveal className="font-['Manrope'] text-sm text-[#0D1B2A]/60 leading-relaxed">{detail.food.intro}</p>
            </div>
            <div data-reveal-group className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.food.cuisines.map((c) => (
                <div key={c.name} data-testid={`cuisine-${c.name.toLowerCase().replace(/\s+/g, '-')}`} className="bg-[#F8FAFB] rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#174358]/06">
                  <h4 className="font-semibold text-[#0D1B2A] text-base mb-2">{c.name}</h4>
                  <p className="text-xs text-[#0D1B2A]/50 leading-relaxed mb-4">{c.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.dishes.map((d) => (<span key={d} className="text-[9px] bg-[#174358]/06 text-[#174358]/60 px-2.5 py-1 rounded-full font-semibold">{d}</span>))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. Paired Destinations */}
      {data.paired_destinations && data.paired_destinations.length > 0 && (
        <section data-testid="dest-paired" className="py-16 md:py-20 px-6 md:px-12 bg-[#F8FAFB] border-t border-[#0D1B2A]/05">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-10">
              <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-4">Pairs Well With</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0D1B2A]">Destinations That Complement <em className="not-italic text-[#174358]">{data.name}</em></h2>
            </div>
            <div data-reveal-group className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {data.paired_destinations.map((pd) => (
                <Link key={pd.name} to={`/destination/${encodeURIComponent(pd.name)}`} data-testid={`paired-${pd.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative group rounded-2xl overflow-hidden" style={{ height: "220px" }}>
                  <img src={pd.image_url} alt={pd.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-[#0D1B2A]/20 to-transparent group-hover:from-[#174358]/80 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">{pd.region}</p>
                    <h3 className="font-['Manrope'] font-bold tracking-tight text-xl text-white">{pd.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 13. Final CTA */}
      <section id="get-started" data-testid="dest-final-cta" className="py-16 md:py-20 px-6 md:px-12 bg-[#174358]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-5">Start Selling <em className="not-italic text-white/60">{data.name}</em> Today</h2>
          <p data-reveal className="font-['Manrope'] text-white/50 text-sm mb-8 max-w-xl mx-auto leading-relaxed">Sign up to access our full {data.name} inventory with live rates. Existing partners can log in to book directly.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup"><Button className="bg-white text-[#174358] hover:bg-white/90 rounded-full px-8 py-5 text-sm font-semibold shadow-lg">Sign Up as Partner</Button></Link>
            <a href={process.env.REACT_APP_AGENT_PORTAL_URL} target="_blank" rel="noopener noreferrer" data-testid="final-signin"><Button variant="ghost" className="text-white/60 hover:text-white rounded-full px-8 py-5 text-sm border border-white/15 hover:border-white/30 font-semibold">Sign In as Agent</Button></a>
            <Link to="/"><Button variant="ghost" className="text-white/30 hover:text-white/60 rounded-full px-8 py-5 text-sm">All Destinations</Button></Link>
          </div>
        </div>
      </section>

      {/* Fallback for non-detailed destinations */}
      {!detail && (
        <section className="py-20 md:py-24 px-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl text-[#0D1B2A] mb-6">Your Destination Management Company for <em className="not-italic text-[#174358]">{data.name}</em></h2>
            <p className="text-sm text-[#0D1B2A]/55 leading-relaxed mb-8">{data.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/signup"><Button className="bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full px-8 py-5 text-sm font-semibold shadow-md">Start Selling {data.name} <ArrowRight size={14} className="ml-1.5" /></Button></Link>
              <a href={process.env.REACT_APP_AGENT_PORTAL_URL} target="_blank" rel="noopener noreferrer"><Button variant="outline" className="border-[#174358] text-[#174358] hover:bg-[#174358]/5 rounded-full px-8 py-5 text-sm font-semibold">Sign In as Agent</Button></a>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
