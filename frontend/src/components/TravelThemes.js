import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Every card links somewhere real — the destination page for the two we don't
// have matching articles for yet, a destination-specific blog post where one exists.
const experiences = [
  { title: "Himalayan Trekking", dest: "Nepal", desc: "Everest and Annapurna trails, mountain lodges and sherpa-guided treks.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=700&q=85", href: "/destination/Nepal" },
  { title: "Monastery Pilgrimage", dest: "Bhutan", desc: "The Tiger's Nest hike, dzong fortresses and blessing ceremonies.", image: "https://images.unsplash.com/photo-1593331792312-15bead7aaa9b?w=700&q=85", href: "/destination/Bhutan" },
  { title: "Lagoon & Island Luxury", dest: "Mauritius", desc: "Overwater villas, Le Morne sunsets and barefoot-luxury resorts.", image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=700&q=85", href: "/blog/honeymoon-in-mauritius-private-lagoon-villas" },
  { title: "Tea Country & Heritage Rail", dest: "Sri Lanka", desc: "Misted plantations, the Ella scenic railway and colonial hill towns.", image: "https://images.unsplash.com/photo-1578519050142-afb511e518de?w=700&q=85", href: "/blog/why-sri-lankas-tea-estate-hotels-are-a-must-visit" },
  { title: "Himalayan Valleys", dest: "Bhutan", desc: "Punakha's dzong, Phobjikha's crane valley and farmhouse stays.", image: "https://images.unsplash.com/photo-1637826134825-e54e98a9bce7?w=700&q=85", href: "/destination/Bhutan" },
  { title: "Wildlife & National Parks", dest: "Sri Lanka", desc: "Leopard tracking in Yala and elephant gatherings at Minneriya.", image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=700&q=85", href: "/blog/luxury-vs-budget-sri-lankas-top-safari-lodges" },
];

function ThemeCard({ t, testid }) {
  return (
    <Link to={t.href} onClick={(e) => e.stopPropagation()} data-testid={testid}
      className="group relative block shrink-0 rounded-2xl overflow-hidden shadow-[0_18px_50px_-24px_rgba(13,27,42,0.25)] w-[78vw] sm:w-[360px] h-[440px]">
      <img src={t.image} alt={t.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 font-['Manrope']">
        <p className="text-[11px] text-white/70 font-semibold uppercase tracking-[0.2em] mb-2">{t.dest}</p>
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <h3 className="font-['Manrope'] font-bold tracking-tight text-2xl text-white">{t.title}</h3>
          <span className="shrink-0 w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#0D1B2A] group-hover:border-white transition-all duration-300">
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </div>
        <p className="text-xs text-white/60 leading-relaxed">{t.desc}</p>
      </div>
    </Link>
  );
}

export default function TravelThemes() {
  const doubled = [...experiences, ...experiences];
  const [clickPaused, setClickPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  // Drifts on its own; a click freezes it, and hovering while frozen sets it
  // moving again until the cursor leaves.
  const running = !clickPaused || hovering;

  return (
    <section id="themes" data-testid="travel-themes-section" className="py-20 md:py-28 bg-[#F4F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-12 md:mb-14 text-center">
        <p data-reveal className="text-[11px] tracking-[0.25em] uppercase font-semibold text-[#174358]/60 mb-5">Curated Experiences</p>
        <h2 data-reveal data-testid="themes-heading" className="font-['Manrope'] font-bold tracking-tight whitespace-nowrap text-[3.8vw] sm:text-2xl md:text-3xl lg:text-4xl text-[#0D1B2A] leading-tight">
          Travel Styles Across All Destinations
        </h2>
      </div>

      <div className="relative">
        <div
          data-testid="themes-marquee"
          onClick={() => setClickPaused((p) => !p)}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onTouchStart={() => setClickPaused((p) => !p)}
          className="flex gap-5 md:gap-6 pl-6 md:pl-12 lg:pl-24 animate-scroll-themes cursor-pointer"
          style={{ width: "max-content", animationPlayState: running ? "running" : "paused" }}
          title={clickPaused ? "Hover to resume" : "Click to pause"}
        >
          {doubled.map((t, i) => (
            <ThemeCard key={`${t.title}-${i}`} t={t} testid={i < experiences.length ? `theme-${t.title.toLowerCase().replace(/\s+/g, "-")}` : undefined} />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-16 md:w-24 h-full bg-gradient-to-r from-[#F4F1E8] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-16 md:w-24 h-full bg-gradient-to-l from-[#F4F1E8] to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
