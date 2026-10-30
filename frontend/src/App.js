import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import ScrollEffects from "@/components/ScrollEffects";
import Hero from "@/components/Hero";
import AgentBenefits from "@/components/AgentBenefits";
import DestinationShowcase from "@/components/DestinationShowcase";
import WhyUs from "@/components/WhyUs";
import TwoWays from "@/components/TwoWays";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Services from "@/components/Services";
import TravelThemes from "@/components/TravelThemes";
import OurTechnology from "@/components/OurTechnology";
import Accreditations from "@/components/Accreditations";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import DestinationDetail from "@/components/DestinationDetail";
import TechnologyPage from "@/components/TechnologyPage";
import WebinarPage from "@/components/WebinarPage";
import AdminSignups from "@/components/AdminSignups";
import SignupPage from "@/components/SignupPage";
import AboutPage from "@/components/AboutPage";
import BlogPage from "@/components/BlogPage";
import BlogPostPage from "@/components/BlogPostPage";
import AdminBlog from "@/components/AdminBlog";
import ItineraryPage from "@/components/ItineraryPage";
import PlanMyTrip from "@/components/PlanMyTrip";
import ServiceLeadPage from "@/components/ServiceLeadPage";
import PackageDetailPage from "@/components/PackageDetailPage";
import EuropePage from "@/components/EuropePage";
import LegalPage from "@/components/LegalPage";
import EgyptLandingPage from "@/components/EgyptLandingPage";
import AdHomePage from "@/components/AdHomePage";
import AgentLogin from "@/components/AgentLogin";
import AgentRegister from "@/components/AgentRegister";
import AgentDashboard from "@/components/AgentDashboard";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RegionProvider } from "./context/RegionContext";
import { RegionBanner } from "./components/RegionWidgets";

// Every route change lands at the top of the new page — the one exception is a
// navigation that explicitly asks to land on an in-page anchor (location.state.scrollTo),
// which Home's own effect below handles instead.
const ScrollToTop = () => {
  const location = useLocation();

  // Let us own scroll position entirely — otherwise the browser's own
  // back/forward scroll memory can silently override the reset below.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) return;
    // Explicit "instant" beats the site-wide CSS `scroll-behavior: smooth` —
    // a cross-page navigation should land at the top immediately, not glide there.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname, location.state]);
  return null;
};

const Home = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const el = document.querySelector(location.state.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-white" data-home-root>
      <Navbar />
      <Hero />
      <AgentBenefits />
      <DestinationShowcase />
      <WhyUs />
      <Services />
      <OurTechnology />
      <TwoWays />
      <TravelThemes />
      <WhoWeWorkWith />
      <Testimonials />
      <Accreditations />
      <ContactCTA />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <RegionProvider>
        <Toaster position="top-right" />
        <ScrollToTop />
        <ScrollEffects />
        <RegionBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destination/Europe" element={<EuropePage />} />
          <Route path="/destination/:name" element={<DestinationDetail />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/webinars" element={<WebinarPage />} />
          <Route path="/admin/signups" element={<AdminSignups />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/plan-my-trip" element={<PlanMyTrip />} />
          <Route path="/services/:serviceSlug" element={<ServiceLeadPage />} />
          <Route path="/destination/:name/package/:slug" element={<PackageDetailPage />} />
          <Route path="/ads" element={<AdHomePage />} />
          <Route path="/ads/egypt-tour-packages" element={<EgyptLandingPage />} />
          <Route path="/legal/:slug" element={<LegalPage />} />
          <Route path="/agent/login" element={<AgentLogin />} />
          <Route path="/agent/register" element={<AgentRegister />} />
          <Route path="/agent/dashboard" element={<AgentDashboard />} />
        </Routes>
      </RegionProvider>
    </BrowserRouter>
  );
}

export default App;
