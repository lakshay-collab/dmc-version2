import { useState, useEffect } from "react";
import { ArrowRight, Check, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FOCUS_DESTINATIONS } from "../data/focusDestinations";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Our four signature destinations — the panel image slowly cross-fades between them.
const DEST_IMAGES = FOCUS_DESTINATIONS.map((d) => ({ id: d.slug, name: d.name, url: d.cardImage }));

const phoneCodes = [
  { code: "+91", flag: "\u{1F1EE}\u{1F1F3}", label: "India" },
  { code: "+1", flag: "\u{1F1FA}\u{1F1F8}", label: "USA" },
  { code: "+44", flag: "\u{1F1EC}\u{1F1E7}", label: "UK" },
  { code: "+971", flag: "\u{1F1E6}\u{1F1EA}", label: "UAE" },
  { code: "+65", flag: "\u{1F1F8}\u{1F1EC}", label: "Singapore" },
  { code: "+61", flag: "\u{1F1E6}\u{1F1FA}", label: "Australia" },
  { code: "+49", flag: "\u{1F1E9}\u{1F1EA}", label: "Germany" },
  { code: "+33", flag: "\u{1F1EB}\u{1F1F7}", label: "France" },
  { code: "+81", flag: "\u{1F1EF}\u{1F1F5}", label: "Japan" },
  { code: "+86", flag: "\u{1F1E8}\u{1F1F3}", label: "China" },
  { code: "+55", flag: "\u{1F1E7}\u{1F1F7}", label: "Brazil" },
  { code: "+27", flag: "\u{1F1FF}\u{1F1E6}", label: "South Africa" },
  { code: "+966", flag: "\u{1F1F8}\u{1F1E6}", label: "Saudi Arabia" },
  { code: "+39", flag: "\u{1F1EE}\u{1F1F9}", label: "Italy" },
  { code: "+34", flag: "\u{1F1EA}\u{1F1F8}", label: "Spain" },
  { code: "+7", flag: "\u{1F1F7}\u{1F1FA}", label: "Russia" },
  { code: "+82", flag: "\u{1F1F0}\u{1F1F7}", label: "South Korea" },
  { code: "+60", flag: "\u{1F1F2}\u{1F1FE}", label: "Malaysia" },
  { code: "+66", flag: "\u{1F1F9}\u{1F1ED}", label: "Thailand" },
  { code: "+90", flag: "\u{1F1F9}\u{1F1F7}", label: "Turkey" },
];

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const testimonials = [
  { name: "Vikram Malhotra", agency: "Malhotra World Travels", city: "New Delhi", quote: "Hi DMC's live rates saved us hours every day. We stopped calling suppliers for quotes — everything is instant now. Our booking volume tripled in 6 months.", rating: 5 },
  { name: "Priya Nair", agency: "Southern Star Holidays", city: "Kochi", quote: "The white-label solution is exactly what we needed. Our clients see our brand, but we get Hi DMC's 30 years of DMC quality behind every booking.", rating: 5 },
  { name: "Ankit Sharma", agency: "Sharma International Tours", city: "Jaipur", quote: "Best pricing I've found anywhere. The lowest price technology consistently beats what we were getting from our direct supplier contracts.", rating: 5 },
  { name: "Meera Krishnan", agency: "TravelCraft India", city: "Chennai", quote: "We used to take 2 days to build a Europe itinerary. With Hi DMC's platform, we do it in 20 minutes with live rates. Game changer for our agency.", rating: 5 },
  { name: "Rahul Deshmukh", agency: "Deshmukh Holidays", city: "Pune", quote: "The MICE module is brilliant. We handled a 300-pax incentive trip across 3 countries without a single manual spreadsheet. The platform scaled effortlessly.", rating: 5 },
  { name: "Sunita Agarwal", agency: "Agarwal Travel Services", city: "Kolkata", quote: "I was skeptical at first, but the support team walked us through everything. Within a week, we were booking faster than ever. The live rates are unbeatable.", rating: 5 },
  { name: "Deepak Patel", agency: "Gujarat Globe Trotters", city: "Ahmedabad", quote: "Our margins improved by 22% after switching to Hi DMC. The markup controls and cost visibility gave us complete clarity on every booking.", rating: 5 },
  { name: "Kavitha Reddy", agency: "Deccan Voyages", city: "Hyderabad", quote: "Ready-made itineraries saved our team so much time. We just customise and sell. Our agents close deals faster and clients love the quality.", rating: 5 },
  { name: "Arjun Singh", agency: "Royal Rajasthan Travels", city: "Udaipur", quote: "We've been with Hi DMC for 8 years. The platform keeps getting better. Live pricing, instant confirmations — it's like having a tech team without the cost.", rating: 5 },
  { name: "Neha Gupta", agency: "Gupta International", city: "Lucknow", quote: "The dynamic packaging feature lets us build unique experiences for each client. No two itineraries are the same, and pricing is always competitive.", rating: 5 },
];

const partnerLogos = [
  { name: "Marriott", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/ql8ywhfb_Download%20225x225.png" },
  { name: "Hilton", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/tvyx2nn7_Image%20225x225.png" },
  { name: "Emirates", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/y7lxzjfa_Image%20218x231.png" },
  { name: "Expedia", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/euccdyev_Download%20300x168.png" },
  { name: "TUI Musement", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/qa5zbbm9_Download%20474x106.png" },
  { name: "Travelife", src: "https://customer-assets.emergentagent.com/job_9a57b70a-7fda-4e0f-8fd3-cbc57f5e99da/artifacts/smw07n0z_Image%20290x174.jpeg" },
];

const inputClass = "bg-[#F8FAFB] border-[#0D1B2A]/08 text-[#0D1B2A] placeholder:text-[#0D1B2A]/40 h-12 px-5 rounded-full focus:border-[#174358]/30 focus:bg-white transition-colors";

export default function SignupPage() {
  const [form, setForm] = useState({ first_name: "", last_name: "", agency_name: "", email: "", phone_code: "+91", phone: "", state: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [bIdx, setBIdx] = useState(0);

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, []);

  // Slowly cross-fade the destination image.
  useEffect(() => {
    const t = setInterval(() => setBIdx((i) => (i + 1) % DEST_IMAGES.length), 1200);
    return () => clearInterval(t);
  }, []);

  const isIndia = form.phone_code === "+91";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name || !form.agency_name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (isIndia && !form.state) {
      toast.error("Please select your state");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, { ...form, source_page: "Signup Page", form_type: "B2B" });
      setSubmitted(true);
      window.history.pushState({}, "", "/signup/thank-you");
      toast.success("Sign up successful!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const scrollLeft = () => setScrollPos((p) => Math.max(0, p - 1));
  const scrollRight = () => setScrollPos((p) => Math.min(testimonials.length - 1, p + 1));

  return (
    <div className="min-h-screen bg-white">
      <Navbar forceLight />

      {/* Hero + Form — premium card: rotating destination image panel + elegant form */}
      <section data-testid="signup-hero" className="py-12 md:py-16 px-6 md:px-12 lg:px-24 bg-[#F4F1E8]">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-[0_44px_110px_-48px_rgba(13,27,42,0.5)] p-3 sm:p-4 lg:p-5">
            <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-5 lg:gap-8">
            {/* Left — rotating destination image + copy */}
            <div className="relative min-h-[320px] lg:min-h-full overflow-hidden rounded-[1.4rem]">
              {DEST_IMAGES.map((d, i) => (
                <img
                  key={d.id}
                  src={d.url}
                  alt={`${d.name} — destination we service`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] ease-in-out duration-[900ms] ${i === bIdx ? "opacity-100 scale-105" : "opacity-0 scale-100"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B2A]/35 via-transparent to-[#0D1B2A]/55" aria-hidden="true" />
            </div>

            {/* Right — form */}
            <div className="px-1.5 py-4 lg:px-6 lg:py-8">
              {submitted ? (
                <div data-testid="signup-success" className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                    <Check size={28} className="text-emerald-500" />
                  </div>
                  <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A] mb-3">Thank You for Signing Up</h3>
                  <p className="text-[#0D1B2A]/50 text-sm leading-relaxed max-w-sm">
                    Our customer success team will get in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} data-testid="signup-form" className="space-y-4">
                  <div className="mb-5">
                    <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-[#0D1B2A] mb-1">Sign Up for Agent Access</h3>
                    <p className="text-xs text-[#0D1B2A]/45">Free account setup. Start booking in minutes.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#174358]/60 font-semibold uppercase tracking-[0.2em] mb-1.5 block">First Name *</label>
                      <Input data-testid="signup-first-name" placeholder="First name" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} className={inputClass} />
                    </div>
                    <div>
                      <label className="text-[11px] text-[#174358]/60 font-semibold uppercase tracking-[0.2em] mb-1.5 block">Last Name *</label>
                      <Input data-testid="signup-last-name" placeholder="Last name" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#174358]/60 font-semibold uppercase tracking-[0.2em] mb-1.5 block">Agency Name *</label>
                    <Input data-testid="signup-agency-name" placeholder="Your travel agency" value={form.agency_name} onChange={(e) => update("agency_name", e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#174358]/60 font-semibold uppercase tracking-[0.2em] mb-1.5 block">Phone Number *</label>
                    <div className="flex gap-2">
                      <Select value={form.phone_code} onValueChange={(v) => { update("phone_code", v); if (v !== "+91") update("state", ""); }}>
                        <SelectTrigger data-testid="signup-phone-code" className="bg-[#F8FAFB] border-[#0D1B2A]/08 text-[#0D1B2A] h-12 rounded-full px-5 w-[130px] flex-shrink-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#0D1B2A]/10 max-h-[250px]">
                          {phoneCodes.map((pc) => (
                            <SelectItem key={pc.code} value={pc.code} className="text-[#0D1B2A]/70 focus:text-[#0D1B2A] focus:bg-[#174358]/05">
                              <span className="mr-2">{pc.flag}</span> {pc.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input data-testid="signup-phone" type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={`${inputClass} flex-1`} />
                    </div>
                  </div>
                  {isIndia && (
                    <div>
                      <label className="text-[11px] text-[#174358]/60 font-semibold uppercase tracking-[0.2em] mb-1.5 block">State *</label>
                      <Select value={form.state} onValueChange={(v) => update("state", v)}>
                        <SelectTrigger data-testid="signup-state" className="bg-[#F8FAFB] border-[#0D1B2A]/08 text-[#0D1B2A] h-12 rounded-full px-5 w-full">
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#0D1B2A]/10 max-h-[250px]">
                          {indianStates.map((s) => (
                            <SelectItem key={s} value={s} className="text-[#0D1B2A]/70 focus:text-[#0D1B2A] focus:bg-[#174358]/05">{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <label className="text-[11px] text-[#174358]/60 font-semibold uppercase tracking-[0.2em] mb-1.5 block">Email *</label>
                    <Input data-testid="signup-email" type="email" placeholder="email@agency.com" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass} />
                  </div>
                  <Button type="submit" data-testid="signup-submit-btn" disabled={loading}
                    className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full py-5 text-sm font-semibold shadow-sm transition-colors disabled:opacity-50">
                    {loading ? "Submitting..." : (<>Sign Up for Agent Login <ArrowRight size={14} className="ml-1.5" /></>)}
                  </Button>
                </form>
              )}
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Strip */}
      <section data-testid="signup-partners" className="bg-white py-8 px-6 border-b border-[#0D1B2A]/05">
        <div className="max-w-6xl mx-auto">
          <p data-reveal className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#0D1B2A]/20 text-center mb-6">Trusted Supply Partners</p>
          <div data-reveal-group className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            {partnerLogos.map((p) => (
              <div key={p.name} className="flex items-center justify-center opacity-100 hover:scale-105 transition-transform duration-300">
                <img src={p.src} alt={p.name} className="h-8 md:h-10 w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Scroller */}
      <section data-testid="signup-testimonials" className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-[#F8FAFB]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p data-reveal className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#174358]/60 mb-2">What Agents Say</p>
              <h2 data-reveal className="font-['Manrope'] font-bold tracking-tight text-3xl md:text-4xl text-[#0D1B2A]">
                Trusted by 850+ Travel Agents
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button data-testid="testimonial-prev" onClick={scrollLeft} disabled={scrollPos === 0}
                className="w-10 h-10 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#174358]/05 transition-colors disabled:opacity-30">
                <ChevronLeft size={18} className="text-[#0D1B2A]/50" />
              </button>
              <button data-testid="testimonial-next" onClick={scrollRight} disabled={scrollPos >= testimonials.length - 3}
                className="w-10 h-10 rounded-full border border-[#0D1B2A]/10 flex items-center justify-center hover:bg-[#174358]/05 transition-colors disabled:opacity-30">
                <ChevronRight size={18} className="text-[#0D1B2A]/50" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${scrollPos * (100 / 3)}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.name} data-testid={`signup-testimonial-${t.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="min-w-[calc(33.333%-14px)] bg-white rounded-2xl p-6 border border-[#0D1B2A]/06 hover:border-[#174358]/15 hover:shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)] transition-all flex-shrink-0 hidden md:block">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={13} fill="#174358" className="text-[#174358]/80" />
                    ))}
                  </div>
                  <p className="text-sm text-[#0D1B2A]/55 leading-relaxed mb-5 line-clamp-4">"{t.quote}"</p>
                  <div className="border-t border-[#0D1B2A]/05 pt-4">
                    <p className="text-sm font-bold text-[#0D1B2A]">{t.name}</p>
                    <p className="text-[11px] text-[#0D1B2A]/35">{t.agency}, {t.city}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: stack cards */}
            <div data-reveal-group className="md:hidden space-y-4">
              {testimonials.slice(0, 4).map((t) => (
                <div key={t.name} className="bg-white rounded-2xl p-5 border border-[#0D1B2A]/06 shadow-[0_12px_40px_-16px_rgba(13,27,42,0.18)]">
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} fill="#174358" className="text-[#174358]/80" />
                    ))}
                  </div>
                  <p className="text-sm text-[#0D1B2A]/55 leading-relaxed mb-4">"{t.quote}"</p>
                  <p className="text-sm font-bold text-[#0D1B2A]">{t.name}</p>
                  <p className="text-[11px] text-[#0D1B2A]/35">{t.agency}, {t.city}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
