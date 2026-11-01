export interface CategoryMeta {
  slug: string;
  name: string;
  seoTitle: string;
  tagline: string;
  description: string;
  materialInfo: string;
  highlights: string[];
}

export const CATEGORIES_DATA: Record<string, CategoryMeta> = {
  'aesthetic-collection': {
    slug: 'aesthetic-collection',
    name: 'Aesthetic Collection',
    seoTitle: 'Aesthetic Phone Cases (₹299) — 9H Tempered Glass Aesthetic Covers | Framecase',
    tagline: 'Refined visual moods, clean line art, and dreamy colorways.',
    description: 'Our Aesthetic Collection features hand-curated art for creators, dreamers, and minimalists. From soft gradient hues and ethereal skyscapes to Japanese typography and subtle modern illustrations, each case brings a calm, intentional vibe to your smartphone.',
    materialInfo: 'Every aesthetic design is permanently sealed beneath a 9H optical tempered glass back, guaranteeing that the delicate pastel tones and crisp line art never fade, scratch, or yellow over time. Flexible TPU shock-absorbing borders provide everyday drop defense without adding bulk.',
    highlights: ['Vibrant non-fading sub-surface pastel print', 'Cool-to-the-touch mirror gloss finish', '1.2mm raised camera and screen edge lip', 'Shockproof drop-cushioning corners']
  },
  'cars-bikes-collection': {
    slug: 'cars-bikes-collection',
    name: 'Cars & Bikes Collection',
    seoTitle: 'Cars & Bikes Phone Cases (₹299) — Supercar & Motorcycle Glass Cases | Framecase',
    tagline: 'High-octane motorsport art, legendary supercars, and track-ready bikes.',
    description: 'Engineered for speed enthusiasts and automotive purists. Explore iconic supercar silhouettes, turbocharger schematics, roaring superbikes, and racing liveries detailed with millimeter precision.',
    materialInfo: 'Printed under ultra-clear 9H tempered glass, the deep metallic blacks, racing reds, and carbon-weave textures radiate with high-definition depth. The textured TPU bumper gives you maximum grip when driving, gaming, or commuting.',
    highlights: ['High-definition vector race liveries', 'Gloss finish looks like freshly polished automotive paint', 'Impact-resistant flexible silicon perimeter', 'Tactile button cutouts for effortless control']
  },
  'new-designs': {
    slug: 'new-designs',
    name: 'New Designs',
    seoTitle: 'Newly Launched Phone Cases (₹299) — Latest 9H Glass Drops | Framecase',
    tagline: 'Fresh drops straight from the design studio.',
    description: 'Discover our newest additions: limited-edition art drops, contemporary viral aesthetics, seasonal color palettes, and modern graphic statements freshly crafted for trendsetters.',
    materialInfo: 'Built with our signature 9H scratch-proof tempered glass backplate and 360-degree shockproof silicon edges, these cases deliver pristine aesthetic brilliance and dependable all-day device defense.',
    highlights: ['Freshly dropped designs', 'Precision camera lens cutout protection', 'Scratch-resistant 9H glass face', 'Uniform ₹299 final pricing']
  },
  'new-arrivalss': {
    slug: 'new-arrivalss',
    name: 'Newly Launched',
    seoTitle: 'Newly Launched Phone Cases (₹299) — Fresh Phone Covers | Framecase',
    tagline: 'The latest drops crafted to transform your everyday carry.',
    description: 'Explore the freshest catalog additions featuring bold graphics, pop-culture statements, vibrant illustrations, and clean typography designed to elevate your device instantly.',
    materialInfo: 'Each case combines an optical 9H tempered glass surface with high-grade shock-absorbing TPU bumpers, ensuring your phone stays safe from daily drops and surface scuffs.',
    highlights: ['Exclusive newly dropped artworks', 'High-contrast vibrant ink beneath glass', 'Full perimeter edge-to-edge wrap', 'Slim in-hand ergonomics']
  },
  'best-sellers': {
    slug: 'best-sellers',
    name: 'Top Selling Cases',
    seoTitle: 'Best Selling Phone Cases (₹299) — Most Loved 9H Glass Covers | Framecase',
    tagline: 'The crowd favorites and community-rated top picks.',
    description: 'These are the cases our community cannot get enough of. From best-selling retro collages to iconic celestial and automotive artwork, these proven crowd-pleasers are guaranteed to turn heads.',
    materialInfo: 'Tested by thousands of happy smartphone users across India. The 9H glass back resists scratches from keys and coins, while the resilient TPU silicon bumper cushions against unexpected tabletop drops.',
    highlights: ['Over 10,000+ happy devices protected', 'Mirror-like high-clarity gloss back', 'Available for 100+ phone models', 'Unbeatable designer value at ₹299']
  },
  'art-collection': {
    slug: 'art-collection',
    name: 'Arts & Scenery',
    seoTitle: 'Art & Scenery Phone Cases (₹299) — Landscape & Painterly Glass Cases | Framecase',
    tagline: 'Fine art masterpieces, misty mountain horizons, and nature landscapes.',
    description: 'Carry a personal art gallery wherever you roam. Featuring painterly oil brushstrokes, serene oceanic swells, lush forest glades, and atmospheric cityscapes captured in stunning detail.',
    materialInfo: 'The high-clarity 9H tempered glass layer refracts ambient light through the brushwork and scenery, creating an authentic oil-on-canvas depth that matte plastic cases simply cannot replicate.',
    highlights: ['Fine art print fidelity with museum-grade color depth', 'Smooth glass back easy to clean with microfiber cloth', 'Protective 1.2mm camera bezel', 'Qi wireless charging compatible']
  },
  'zodiac-sign': {
    slug: 'zodiac-sign',
    name: 'Astrology & Zodiac',
    seoTitle: 'Zodiac & Astrology Phone Cases (₹299) — Celestial Glass Covers | Framecase',
    tagline: 'Constellations, planetary alignments, and celestial birth charts.',
    description: 'Celebrate your cosmic alignment with our Zodiac & Astrology collection. Detailed celestial charts, luminous starlight patterns, and tarot-inspired illustrations that honor your astrological journey.',
    materialInfo: 'Deep cosmic obsidian blacks and luminous celestial golds are sealed behind scratch-resistant 9H glass, ensuring the stars and constellations stay luminous for years to come.',
    highlights: ['High-contrast celestial artwork', '9H scratch-proof protective glass', 'Shock-absorbing corner cushions', 'Available for all 12 zodiac archetypes']
  },
  'sports-collection': {
    slug: 'sports-collection',
    name: 'Sports & Energy',
    seoTitle: 'Sports Phone Cases (₹299) — Football, Basketball & Athletes | Framecase',
    tagline: 'Championship energy, athletic drive, and sporting legends.',
    description: 'For passionate athletes and fans. Celebrate iconic jersey typography, stadium atmospheres, and triumphant athletic moments captured with intense dynamic energy.',
    materialInfo: 'Engineered for active lifestyles. The impact-resistant TPU perimeter provides enhanced grip in sweaty palms, while the 9H glass preserves bold team colors without peeling.',
    highlights: ['Dynamic athletic graphic design', 'Enhanced anti-slip textured side rails', 'Drop-absorbing corner airbags', 'Universal ₹299 pricing']
  },
  'mens-collection': {
    slug: 'mens-collection',
    name: "Men's Edit",
    seoTitle: "Men's Phone Cases (₹299) — Sleek Glass Phone Covers for Men | Framecase",
    tagline: 'Bold, structured, and modern designs for everyday gentlemen.',
    description: 'A curated selection of masculine aesthetics: brushed metallics, architectural blueprints, supercar blueprints, carbon textures, and minimal monochrome statements.',
    materialInfo: 'Combining sleek industrial design with rugged drop safety, the 9H glass back provides a cool, tactile luxury feel while the flexible silicon bumper ensures 360-degree corner security.',
    highlights: ['Clean industrial and architectural aesthetics', 'Slim pocket-friendly profile', 'Precision responsive button covers', 'Resilient 9H surface']
  },
  'girls-collection': {
    slug: 'girls-collection',
    name: "Women's Edit",
    seoTitle: "Women's Phone Cases (₹299) — Chic & Elegant Glass Phone Covers | Framecase",
    tagline: 'Chic, vibrant, and artistic designs curated for women.',
    description: 'Discover joyful botanical florals, delicate butterfly wings, empowering quote typography, and chic pastel collages crafted to complement your outfit and beauty accessories.',
    materialInfo: 'Our sealed sub-surface printing protects the vibrant colors from makeup smudges, perfume, and daily friction, easily wiped clean with a quick swipe of a soft cloth.',
    highlights: ['Fashion-forward artistic designs', 'Stain-resistant and fingerprint-friendly glass', 'Lightweight protective build', 'Accessible designer price at ₹299']
  },
  'cats-collection': {
    slug: 'cats-collection',
    name: 'Cats & Felines',
    seoTitle: 'Cat Phone Cases (₹299) — Cute & Whimsical Feline Glass Cases | Framecase',
    tagline: 'Playful kittens, cozy illustrations, and feline humor.',
    description: 'For devoted cat parents and animal enthusiasts. Charming illustrated kitties, cozy coffee-shop scenes, and funny feline expressions to make you smile every time you pick up your phone.',
    materialInfo: 'Crafted with optical-grade 9H tempered glass for a bright, scratch-free gloss finish, backed by flexible shock-absorbing silicon sides that safeguard against accidental slips.',
    highlights: ['Heartwarming feline illustrations', 'Ultra-crisp non-fading print', 'Full rim edge protection', 'Perfect gift for cat lovers']
  },
  'evil-eye-nazar': {
    slug: 'evil-eye-nazar',
    name: 'Evil Eye & Nazar',
    seoTitle: 'Evil Eye Phone Cases (₹299) — Nazar & Protective Talisman Covers | Framecase',
    tagline: 'Ancient protective amulets, royal blue talismans, and warding motifs.',
    description: 'Keep negative energies at bay with our Evil Eye & Nazar collection. Featuring vibrant cobalt blue concentric amulets, golden sacred geometry, and protective talisman art.',
    materialInfo: 'The brilliant sapphire and cobalt hues are magnified under luminous 9H tempered glass, ensuring your protective talisman stays shining bright without peeling or fading.',
    highlights: ['Symbolic protective talisman graphics', 'High-gloss optical glass back', 'Shock-resistant TPU frame', 'Smooth pocket-friendly feel']
  },
};

export function getCategoryMeta(slug?: string, defaultName?: string): CategoryMeta {
  if (slug && CATEGORIES_DATA[slug]) {
    return CATEGORIES_DATA[slug];
  }
  const cleanName = defaultName || (slug ? slug.replace(/-/g, ' ') : 'Curated Collection');
  return {
    slug: slug || 'all',
    name: cleanName,
    seoTitle: `${cleanName} Phone Cases (₹299) — 9H Tempered Glass Covers | Framecase`,
    tagline: `Curated ${cleanName} cases designed with a point of view.`,
    description: `Explore our collection of ${cleanName} phone covers. Handpicked for trendsetters who desire both remarkable visual aesthetics and reliable everyday protection.`,
    materialInfo: `Every design is sealed beneath high-grade 9H optical tempered glass with flexible shock-absorbing TPU silicon borders, ensuring scratch-free gloss and reliable drop security.`,
    highlights: [
      'Sub-surface sealed artwork that never fades',
      'Scratch-resistant 9H tempered glass surface',
      'Flexible TPU shock-absorbing borders',
      'Uniform ₹299 designer pricing across all models'
    ]
  };
}
