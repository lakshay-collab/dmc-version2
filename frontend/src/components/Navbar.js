import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, MapPin, Users, SlidersHorizontal, Monitor, FileText, Hotel, Plane, ArrowLeftRight, Compass, Car, CalendarCheck, Layers, Settings2, ArrowRight, Search, Train, Package, LayoutGrid, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { useRegion } from "../context/RegionContext";
import { FOCUS_DESTINATIONS } from "../data/focusDestinations";
import axios from "axios";

const PORTAL = process.env.REACT_APP_AGENT_PORTAL_URL;
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const RECENT_KEY = "hidmc_recent_dests";
const MAX_RECENT = 5;

function getRecentDests() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; }
}
function addRecentDest(name) {
  const recent = getRecentDests().filter(d => d !== name);
  recent.unshift(name);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

export default function Navbar({ forceLight = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDD, setOpenDD] = useState(null);
  const [destSearch, setDestSearch] = useState("");
  const [allDests, setAllDests] = useState([]);
  const [gateModal, setGateModal] = useState(null);
  const [recentDests, setRecentDests] = useState(getRecentDests);
  const ref = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { config } = useRegion();
  const isLight = forceLight || scrolled;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setOpenDD(null); setMobileOpen(false); setDestSearch(""); }, [location.pathname]);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpenDD(null); setDestSearch(""); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    axios.get(`${API}/destinations`).then((r) => {
      const all = config.destinations
        ? r.data.filter(d => config.destinations.includes(d.name))
        : r.data;
      setAllDests(all);
    }).catch(() => {});
  }, [config.code, config.destinations]);

  const close = () => { setOpenDD(null); setMobileOpen(false); setDestSearch(""); };
  const trackDest = (name) => { addRecentDest(name); setRecentDests(getRecentDests()); close(); };
  const toggle = (n) => { setOpenDD(openDD === n ? null : n); setDestSearch(""); if (n === "dest") setRecentDests(getRecentDests()); };
  const goHash = (e, hash) => {
    e.preventDefault(); close();
    if (location.pathname === "/") { const el = document.querySelector(hash); if (el) el.scrollIntoView({ behavior: "smooth" }); }
    else navigate("/", { state: { scrollTo: hash } });
  };

  const filteredDests = destSearch.trim()
    ? allDests.filter((d) => d.name.toLowerCase().includes(destSearch.toLowerCase())).slice(0, 12)
    : [];

  const txtM = isLight ? "text-[#0D1B2A]/60" : "text-white/70";

  const NavTab = ({ label, id }) => {
    return (
      <button data-testid={`nav-${id}`} onClick={() => toggle(id)}
        className={`flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold tracking-wide rounded-full transition-all ${openDD === id ? (isLight ? "bg-[#174358] text-white" : "bg-white text-[#0D1B2A]") : txtM}`}>
        {label} <ChevronDown size={12} className={`transition-transform duration-300 ${openDD === id ? "rotate-180" : ""}`} />
      </button>
    );
  };

  return (
    <nav data-testid="navbar" ref={ref} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "py-2 px-4" : "py-3 bg-transparent px-0"}`}>
      <div className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "max-w-7xl rounded-full bg-white/90 backdrop-blur-xl shadow-[0_18px_44px_-18px_rgba(13,27,42,0.32)] border border-white/50 px-5 md:px-6 py-1.5" : "max-w-7xl px-6 md:px-12 py-0"}`}>
        <Link
          to="/"
          data-testid="navbar-logo"
          className="flex items-center flex-shrink-0"
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
        >
          <img src={isLight ? "/hidmc-logo-color.png" : "/hidmc-logo-white.png"} alt="Hi DMC" className="transition-all duration-300 h-10" />
        </Link>

        <div className="hidden lg:flex items-center gap-1 ml-6">
          <NavTab label="Destinations" id="dest" />
          <NavTab label="Services" id="svc" />
          <NavTab label="Products" id="prod" />
          {[{ l: "Technology", h: "/technology" }, { l: "Webinars", h: "/webinars" }, { l: "About", h: "/about" }].map((n) => (
            <Link key={n.l} to={n.h} className={`px-4 py-2 text-[13px] font-bold tracking-wide rounded-full transition-all ${txtM}`}>{n.l}</Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/signup" data-testid="nav-agent-signup">
            <Button className={`rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-all ${isLight ? "bg-[#174358] text-white hover:bg-[#1e5a75] shadow-lg shadow-[#174358]/15" : "bg-white text-[#0D1B2A] hover:bg-white/90"}`}>
              Agent Sign Up
            </Button>
          </Link>
        </div>

        <button data-testid="mobile-menu-toggle" className={`lg:hidden ${isLight ? "text-[#0D1B2A]" : "text-white"}`} onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ========= DESTINATIONS DROPDOWN ========= */}
      {openDD === "dest" && (
        <div data-testid="dest-dropdown" className="hidden lg:block absolute top-full left-0 right-0 animate-fadeInUp" style={{ animationDuration: "200ms" }}>
          <div className="bg-white border-t border-[#0D1B2A]/06 shadow-[0_30px_80px_-20px_rgba(13,27,42,0.18)]">
            <div className="max-w-5xl mx-auto px-12 py-10">
              <div className="max-w-xl mb-8">
                <p className="text-[#0D1B2A]/40 text-xs uppercase tracking-[0.15em] font-bold mb-3">Find a Destination</p>
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0D1B2A]/20" />
                  <input data-testid="dest-search" type="text" placeholder="Where do you want to go?" value={destSearch} onChange={(e) => setDestSearch(e.target.value)} autoFocus
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-[#F8FAFB] border border-[#0D1B2A]/08 text-base text-[#0D1B2A] placeholder:text-[#0D1B2A]/25 focus:outline-none focus:border-[#174358]/25 focus:bg-white transition-all" />
                </div>
              </div>

              {destSearch.trim() ? (
                <div>
                  {filteredDests.length > 0 ? (
                    <div className="flex flex-wrap gap-3">
                      {filteredDests.map((d) => (
                        <Link key={d.name} to={`/destination/${d.name}`} onClick={() => trackDest(d.name)}
                          className="px-6 py-3 rounded-full text-sm font-semibold text-[#0D1B2A]/70 border border-[#0D1B2A]/10 hover:bg-[#174358] hover:text-white hover:border-[#174358] transition-all duration-200">{d.name}</Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-base text-[#0D1B2A]/35">No destinations found for "<span className="text-[#0D1B2A]/60 font-semibold">{destSearch}</span>"</p>
                  )}
                </div>
              ) : (
                <div>
                  {recentDests.length > 0 && (
                    <div className="mb-8">
                      <p className="text-[#0D1B2A]/40 text-xs uppercase tracking-[0.15em] font-bold mb-4">Recently Searched</p>
                      <div className="flex flex-wrap gap-2.5">
                        {recentDests.map((name) => (
                          <Link key={name} to={name === "Europe" ? "/destination/Europe" : `/destination/${name}`} onClick={() => trackDest(name)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#174358] bg-[#174358]/06 border border-[#174358]/10 hover:bg-[#174358] hover:text-white hover:border-[#174358] transition-all duration-200">
                            <Clock size={13} className="opacity-50" />{name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-[#0D1B2A]/40 text-xs uppercase tracking-[0.15em] font-bold mb-4">Our Destinations</p>
                    <div className="flex flex-wrap gap-3">
                      {FOCUS_DESTINATIONS.map((d) => (
                        <Link key={d.name} to={`/destination/${d.name}`} onClick={() => trackDest(d.name)}
                          className="px-6 py-3 rounded-full text-sm font-semibold text-[#0D1B2A]/70 border border-[#0D1B2A]/10 hover:bg-[#174358] hover:text-white hover:border-[#174358] transition-all duration-200">{d.name}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-7 border-t border-[#0D1B2A]/06">
                <Link to="/#explore-destinations" onClick={(e) => goHash(e, "#explore-destinations")}
                  className="inline-flex items-center gap-2.5 text-base font-bold text-[#174358] hover:text-[#0D1B2A] transition-colors group">
                  <MapPin size={18} /> View All {FOCUS_DESTINATIONS.length} Destinations <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========= SERVICES DROPDOWN ========= */}
      {openDD === "svc" && (
        <div data-testid="svc-dropdown" className="hidden lg:block absolute top-full left-0 right-0 animate-fadeInUp" style={{ animationDuration: "200ms" }}>
          <div className="bg-white border-t border-[#0D1B2A]/06 shadow-[0_30px_80px_-20px_rgba(13,27,42,0.18)]">
            <div className="max-w-5xl mx-auto px-12 py-10">
              <div className="grid grid-cols-5 gap-4">
                {[
                  { icon: SlidersHorizontal, label: "FIT & Tailor-made", desc: "Custom itineraries designed around your client's preferences", color: "text-[#174358]", bg: "bg-[#174358]/06", href: "/services/fit" },
                  { icon: Users, label: "Groups · GIT & Ad Hoc", desc: "Series departures, ad hoc groups, and full ground handling", color: "text-[#174358]", bg: "bg-[#174358]/06", href: "/services/groups" },
                  { icon: Monitor, label: "MICE", desc: "End-to-end meetings, incentives, conferences & exhibitions", color: "text-[#174358]", bg: "bg-[#174358]/06", href: "/services/mice" },
                  { icon: LayoutGrid, label: "Agent Portal", desc: "Book, manage and track all your trips in one platform", color: "text-amber-600", bg: "bg-amber-50", href: "/services/agent-portal" },
                  { icon: FileText, label: "Request a Quote", desc: "Get a custom proposal with our best rates within 48 hours", color: "text-white", bg: "bg-[#174358]", href: "/signup", highlight: true },
                ].map((item) => {
                  const card = (
                    <div className={`group h-full p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${item.highlight ? "bg-[#174358] border-[#174358] hover:bg-[#1e5a75] shadow-lg shadow-[#174358]/20" : "border-[#0D1B2A]/06 hover:border-[#174358]/15 hover:shadow-xl hover:shadow-[#174358]/06"}`}>
                      <div className={`w-12 h-12 rounded-xl ${item.highlight ? "bg-white/15" : item.bg} flex items-center justify-center mb-5`}>
                        <item.icon size={22} className={`${item.highlight ? "text-white" : item.color} transition-colors`} />
                      </div>
                      <p className={`text-base font-bold mb-2 ${item.highlight ? "text-white" : "text-[#0D1B2A]"}`}>{item.label}</p>
                      <p className={`text-sm leading-relaxed ${item.highlight ? "text-white/70" : "text-[#0D1B2A]/45"}`}>{item.desc}</p>
                    </div>
                  );
                  return <Link key={item.label} to={item.href} onClick={close}>{card}</Link>;
                  return <Link key={item.label} to={item.href} onClick={close}>{card}</Link>;
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========= PRODUCTS DROPDOWN ========= */}
      {openDD === "prod" && (
        <div data-testid="prod-dropdown" className="hidden lg:block absolute top-full left-0 right-0 animate-fadeInUp" style={{ animationDuration: "200ms" }}>
          <div className="bg-white border-t border-[#0D1B2A]/06 shadow-[0_30px_80px_-20px_rgba(13,27,42,0.18)]">
            <div className="max-w-5xl mx-auto px-12 py-10">
              <div className="flex items-center gap-3 mb-7">
                <p className="text-base font-bold text-[#0D1B2A]">Hi DMC Agent Portal</p>
                <span className="w-1 h-1 rounded-full bg-[#0D1B2A]/15"></span>
                <p className="text-sm text-[#0D1B2A]/40">Live inventory &middot; Instant confirmations</p>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {[
                  { icon: Layers, label: "DMC Packages", desc: "FIT packages where we have our own DMC operations", bg: "bg-[#174358]/06", color: "text-[#174358]" },
                  { icon: Settings2, label: "Customized Packages", desc: "Customize your own activities and hotels", bg: "bg-violet-50", color: "text-violet-500" },
                  { icon: Hotel, label: "Hotels", desc: "Search and book from our global hotel inventory", bg: "bg-sky-50", color: "text-sky-500" },
                  { icon: Compass, label: "Experiences", desc: "Tours, tickets, sightseeing and local activities", bg: "bg-rose-50", color: "text-rose-500" },
                  { icon: Plane, label: "Flights", desc: "Best fares on domestic and international routes", bg: "bg-indigo-50", color: "text-indigo-500" },
                  { icon: ArrowLeftRight, label: "Multi-city", desc: "Plan complex multi-city and multi-country routes", bg: "bg-teal-50", color: "text-teal-500" },
                  { icon: Package, label: "Packages", desc: "Browse ready-made itineraries across destinations", bg: "bg-orange-50", color: "text-orange-500" },
                  { icon: Car, label: "Transfers", desc: "Airport pickups, drop-offs and intercity transfers", bg: "bg-cyan-50", color: "text-cyan-500" },
                  { icon: Train, label: "Trains", desc: "Book rail tickets for scenic and intercity routes", bg: "bg-emerald-50", color: "text-emerald-500" },
                  { icon: CalendarCheck, label: "My Bookings", desc: "View, manage and track all your reservations", bg: "bg-amber-500", color: "text-white", highlight: true },
                ].map((item) => (
                  <button key={item.label} onClick={() => { close(); setGateModal(item.label); }}
                    className={`group p-5 rounded-2xl border transition-all duration-300 text-left ${item.highlight ? "bg-amber-500 border-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20" : "border-[#0D1B2A]/06 hover:border-[#174358]/15 hover:shadow-xl hover:shadow-[#174358]/06"}`}>
                    <div className={`w-11 h-11 rounded-xl ${item.highlight ? "bg-white/20" : item.bg} flex items-center justify-center mb-4`}>
                      <item.icon size={20} className={`${item.color} transition-colors`} />
                    </div>
                    <p className={`text-[15px] font-bold mb-1 ${item.highlight ? "text-white" : "text-[#0D1B2A]"}`}>{item.label}</p>
                    <p className={`text-[13px] leading-relaxed ${item.highlight ? "text-white/80" : "text-[#0D1B2A]/40"}`}>{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========= MOBILE MENU ========= */}
      {mobileOpen && (
        <div data-testid="mobile-menu" className="lg:hidden bg-white mt-0 mx-0 p-5 shadow-xl animate-fadeInUp max-h-[85vh] overflow-y-auto border-t border-[#0D1B2A]/06">
          <div className="max-w-lg mx-auto flex flex-col gap-0.5">
            {/* Destinations Mobile */}
            <button onClick={() => toggle(openDD === "dest-m" ? null : "dest-m")} className="flex items-center justify-between text-base font-bold text-[#0D1B2A] py-3 px-2">
              Destinations <ChevronDown size={16} className={`text-[#0D1B2A]/30 transition-transform ${openDD === "dest-m" ? "rotate-180" : ""}`} />
            </button>
            {openDD === "dest-m" && (
              <div className="pb-4 px-2 space-y-2">
                <div className="relative mb-3">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0D1B2A]/20" />
                  <input type="text" placeholder="Search destinations..." value={destSearch} onChange={(e) => setDestSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8FAFB] border border-[#0D1B2A]/08 text-sm text-[#0D1B2A] placeholder:text-[#0D1B2A]/30 focus:outline-none" />
                </div>
                {(destSearch.trim() ? filteredDests : FOCUS_DESTINATIONS).map((d) => (
                  <Link key={d.name} to={`/destination/${d.name}`} onClick={() => trackDest(d.name)} className="flex items-center gap-2.5 text-[15px] text-[#0D1B2A]/60 py-2 hover:text-[#174358]"><MapPin size={15} /> {d.name}</Link>
                ))}
                <Link to="/#explore-destinations" onClick={(e) => goHash(e, "#explore-destinations")} className="flex items-center gap-2.5 text-[15px] font-bold text-[#174358] py-2"><ArrowRight size={15} /> View All {FOCUS_DESTINATIONS.length}</Link>
              </div>
            )}

            {/* Services Mobile */}
            <button onClick={() => toggle(openDD === "svc-m" ? null : "svc-m")} className="flex items-center justify-between text-base font-bold text-[#0D1B2A] py-3 px-2">
              Services <ChevronDown size={16} className={`text-[#0D1B2A]/30 transition-transform ${openDD === "svc-m" ? "rotate-180" : ""}`} />
            </button>
            {openDD === "svc-m" && (
              <div className="pb-4 px-2 space-y-1">
                <Link to="/services/fit" onClick={close} className="flex items-center gap-3 text-[15px] text-[#0D1B2A]/60 py-2.5"><SlidersHorizontal size={17} /> FIT & Tailor-made</Link>
                <Link to="/services/groups" onClick={close} className="flex items-center gap-3 text-[15px] text-[#0D1B2A]/60 py-2.5"><Users size={17} /> Groups · GIT & Ad Hoc</Link>
                <Link to="/services/mice" onClick={close} className="flex items-center gap-3 text-[15px] text-[#0D1B2A]/60 py-2.5"><Monitor size={17} /> MICE</Link>
                <Link to="/services/agent-portal" onClick={close} className="flex items-center gap-3 text-[15px] text-amber-600 font-semibold py-2.5"><LayoutGrid size={17} /> Agent Portal</Link>
                <Link to="/signup" onClick={close} className="flex items-center gap-3 text-[15px] font-bold text-[#174358] py-2.5"><FileText size={17} /> Request a Quote</Link>
              </div>
            )}

            {/* Products Mobile */}
            <button onClick={() => toggle(openDD === "prod-m" ? null : "prod-m")} className="flex items-center justify-between text-base font-bold text-[#0D1B2A] py-3 px-2">
              Products <ChevronDown size={16} className={`text-[#0D1B2A]/30 transition-transform ${openDD === "prod-m" ? "rotate-180" : ""}`} />
            </button>
            {openDD === "prod-m" && (
              <div className="pb-4 px-2 space-y-1">
                {[
                  { icon: Layers, l: "DMC Packages" }, { icon: Settings2, l: "Customized Packages" }, { icon: Hotel, l: "Hotels" },
                  { icon: Compass, l: "Experiences" }, { icon: Plane, l: "Flights" }, { icon: ArrowLeftRight, l: "Multi-city" },
                  { icon: Package, l: "Packages" }, { icon: Car, l: "Transfers" }, { icon: Train, l: "Trains" },
                  { icon: CalendarCheck, l: "My Bookings" },
                ].map((item) => (
                  <button key={item.l} onClick={() => { close(); setGateModal(item.l); }} className="flex items-center gap-3 text-[15px] text-[#0D1B2A]/60 py-2.5 w-full text-left"><item.icon size={17} /> {item.l}</button>
                ))}
              </div>
            )}

            <Link to="/technology" onClick={close} className="text-base font-bold text-[#0D1B2A] py-3 px-2">Technology</Link>
            <Link to="/webinars" onClick={close} className="text-base font-bold text-[#0D1B2A] py-3 px-2">Webinars</Link>
            <Link to="/about" onClick={close} className="text-base font-bold text-[#0D1B2A] py-3 px-2">About</Link>

            <div className="mt-3 pt-3 border-t border-[#0D1B2A]/08">
              <Link to="/signup" onClick={close} className="block">
                <Button className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-full text-sm font-bold py-3">Agent Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========= GATE MODAL ========= */}
      {gateModal && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={() => setGateModal(null)}>
          <div className="fixed inset-0 bg-[#0D1B2A]/50 backdrop-blur-sm" />
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-fadeInUp relative z-10" style={{ animationDuration: "200ms" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setGateModal(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0D1B2A]/05 flex items-center justify-center hover:bg-[#0D1B2A]/10 transition-colors">
              <X size={16} className="text-[#0D1B2A]/40" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#174358]/08 flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const iconMap = { "DMC Packages": Layers, "Customized Packages": Settings2, "Hotels": Hotel, "Experiences": Compass, "Flights": Plane, "Multi-city": ArrowLeftRight, "Packages": Package, "Transfers": Car, "Trains": Train, "My Bookings": CalendarCheck };
                  const Ic = iconMap[gateModal] || LayoutGrid;
                  return <Ic size={24} className="text-[#174358]" />;
                })()}
              </div>
              <h3 className="text-xl font-bold text-[#0D1B2A] mb-1">Access {gateModal}</h3>
              <p className="text-sm text-[#0D1B2A]/45">Log in to your agent account or sign up to get started.</p>
            </div>

            <div className="space-y-3">
              <a href={PORTAL} target="_blank" rel="noopener noreferrer" className="block" onClick={() => setGateModal(null)}>
                <Button className="w-full bg-[#174358] text-white hover:bg-[#1e5a75] rounded-xl py-5 text-[15px] font-bold">
                  Log In to Agent Portal
                </Button>
              </a>
              <Link to="/signup" onClick={() => setGateModal(null)}>
                <Button variant="outline" className="w-full border-[#0D1B2A]/12 text-[#0D1B2A]/70 hover:text-[#0D1B2A] hover:bg-[#0D1B2A]/03 rounded-xl py-5 text-[15px] font-bold mt-3">
                  Sign Up as Agent
                </Button>
              </Link>
            </div>

            <p className="text-center text-xs text-[#0D1B2A]/30 mt-5">Access to {gateModal} requires an active agent account.</p>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
