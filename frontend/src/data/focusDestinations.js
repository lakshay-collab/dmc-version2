// The four destinations HI DMC puts in front of agents on the homepage.
// Centralised here so Hero, the destination showcase, the quote banner and the
// footer all reference the same curated, verified imagery and facts.

const u = (id, w = 2000, q = 90) => `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop&fm=jpg`;

export const FOCUS_DESTINATIONS = [
  {
    slug: "Sri Lanka",
    name: "Sri Lanka",
    tagline: "Pearl of the Indian Ocean",
    region: "South Asia",
    description: "Misted tea plantations, the scenic hill-country railway, Galle Fort and wildlife-rich national parks, all within a day's drive.",
    facts: [
      { label: "Best season", value: "Dec – Mar, Jun – Sep" },
      { label: "Signature", value: "Hill country train" },
      { label: "HI DMC office", value: "Colombo" },
    ],
    cardImage: u("1566296314736-6eaac1ca0cb9", 2000),
    heroImage: u("1578519050142-afb511e518de", 2400, 90),
    gallery: [
      u("1566296314736-6eaac1ca0cb9", 2400),
      u("1578519050142-afb511e518de", 2400),
      u("1590580808117-1caa8e13f0e5", 2400),
    ],
  },
  {
    slug: "Nepal",
    name: "Nepal",
    tagline: "Roof of the World",
    region: "South Asia",
    description: "Himalayan peaks, ancient monasteries and trekking trails that run from Kathmandu's temple squares to Everest base camp.",
    facts: [
      { label: "Best season", value: "Oct – Dec, Mar – May" },
      { label: "Signature", value: "Himalayan trekking" },
      { label: "HI DMC office", value: "Kathmandu" },
    ],
    cardImage: u("1486911278844-a81c5267e227", 2000),
    heroImage: u("1551632811-561732d1e306", 2400, 90),
    gallery: [
      u("1486911278844-a81c5267e227", 2400),
      u("1551632811-561732d1e306", 2400),
      u("1570366583862-f91883984fde", 2400),
    ],
  },
  {
    slug: "Bhutan",
    name: "Bhutan",
    tagline: "Land of the Thunder Dragon",
    region: "South Asia",
    description: "The cliffside Tiger's Nest, fortress dzongs and dramatic valleys — the last Himalayan kingdom, carefully preserved.",
    facts: [
      { label: "Best season", value: "Mar – May, Sep – Nov" },
      { label: "Signature", value: "Tiger's Nest Monastery" },
      { label: "HI DMC office", value: "Thimphu" },
    ],
    cardImage: u("1593331792312-15bead7aaa9b", 2000),
    heroImage: u("1637826134825-e54e98a9bce7", 2400, 90),
    gallery: [
      u("1593331792312-15bead7aaa9b", 2400),
      u("1585940043926-92f50991d354", 2400),
      u("1637826134825-e54e98a9bce7", 2400),
    ],
  },
  {
    slug: "Mauritius",
    name: "Mauritius",
    tagline: "Indian Ocean Paradise",
    region: "Indian Ocean Islands",
    description: "Turquoise lagoons, the dramatic cliffs of Le Morne and barefoot-luxury resorts set along a multicultural island.",
    facts: [
      { label: "Best season", value: "May – Dec" },
      { label: "Signature", value: "Le Morne & lagoon resorts" },
      { label: "HI DMC office", value: "Port Louis" },
    ],
    cardImage: u("1573843981267-be1999ff37cd", 2000),
    heroImage: u("1589197331516-4d84b72ebde3", 2400, 90),
    gallery: [
      u("1573843981267-be1999ff37cd", 2400),
      u("1540202404-a2f29016b523", 2400),
      u("1551882547-ff40c63fe5fa", 2400),
    ],
  },
];
