import { Globe, Mail, Phone } from "lucide-react";
import { Separator } from "../components/ui/separator";
import { RegionFooterToggle } from "./RegionWidgets";
import { useRegion } from "../context/RegionContext";

const footerLinks = {
  Services: ["FIT Packages", "Custom Holidays", "Group Tours", "Hotels", "Flights", "Experiences", "Transfers", "MICE"],
  Destinations: [
    { label: "Nepal", href: "/destination/Nepal" },
    { label: "Bhutan", href: "/destination/Bhutan" },
    { label: "Mauritius", href: "/destination/Mauritius" },
    { label: "Sri Lanka", href: "/destination/Sri Lanka" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Sign Up", href: "/signup" },
    { label: "Agent Login", href: process.env.REACT_APP_AGENT_PORTAL_URL, external: true },
  ],
};

export default function Footer() {
  const { config } = useRegion();
  return (
    <footer data-testid="footer" className="pt-16 pb-6 px-6 md:px-12 lg:px-24 bg-white border-t border-[#0D1B2A]/[0.08]">
      <div className="max-w-7xl mx-auto">
        <div data-reveal-group className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-14">
          <div className="col-span-2">
            <img src="/hidmc-logo-color.png" alt="Hi DMC" className="h-10 mb-4" />
            <p className="text-xs text-[#0D1B2A]/85 leading-relaxed mb-4 max-w-xs">Technology-driven, globally connected, locally expert destination management for travel agents worldwide.</p>
            <p className="text-[11px] text-[#0D1B2A]/65 mb-5">Part of <a href="https://hitours.group" target="_blank" rel="noopener noreferrer" className="text-[#174358] hover:text-[#1e5a75] underline underline-offset-2 transition-colors">Hi Tours Group</a></p>
            <div className="space-y-2 mb-5">
              <a href="mailto:sales@hidmc.com" className="flex items-center gap-2 text-xs text-[#0D1B2A]/55 hover:text-[#174358] transition-colors"><Mail size={12} />sales@hidmc.com</a>
              <a href="tel:+911244600000" className="flex items-center gap-2 text-xs text-[#0D1B2A]/55 hover:text-[#174358] transition-colors"><Phone size={12} />+91 124 4600000</a>
              <a href="https://www.hidmc.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-[#0D1B2A]/55 hover:text-[#174358] transition-colors"><Globe size={12} />www.hidmc.com</a>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/hidmc_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" data-testid="footer-instagram" className="w-8 h-8 rounded-full bg-[#0D1B2A]/[0.05] flex items-center justify-center hover:bg-[#174358]/10 transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#0D1B2A]/50 hover:text-[#174358] transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/hidmc/" target="_blank" rel="noopener noreferrer" data-testid="footer-linkedin" className="w-8 h-8 rounded-full bg-[#0D1B2A]/[0.05] flex items-center justify-center hover:bg-[#174358]/10 transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#0D1B2A]/50 hover:text-[#174358] transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#0D1B2A]/90 mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => {
                  const item = typeof l === "string" ? { label: l, href: "#" } : l;
                  return (
                    <li key={item.label}>
                      <a href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} className="text-xs text-[#0D1B2A]/80 hover:text-[#174358] transition-colors">{item.label}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="bg-[#0D1B2A]/[0.08]" />

        {/* Region Selector */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#0D1B2A]/65 uppercase tracking-wider font-semibold">Select your region</p>
          <RegionFooterToggle />
        </div>

        <Separator className="bg-[#0D1B2A]/[0.08]" />
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-[#0D1B2A]/60">&copy; {new Date().getFullYear()} {config.legalEntity}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {[
              { label: "Privacy Policy", href: "/legal/privacy-policy" },
              { label: "Terms & Conditions", href: "/legal/terms-and-conditions" },
              { label: "Cookie Policy", href: "/legal/cookie-policy" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-[10px] text-[#0D1B2A]/60 hover:text-[#174358] transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
