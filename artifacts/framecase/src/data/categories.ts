export interface CategoryMeta {
  slug: string;
  name: string;
  seoTitle: string;
  tagline: string;
  description: string;
  metaDescription: string;
  materialInfo: string;
  highlights: string[];
}

export const CATEGORIES_DATA: Record<string, CategoryMeta> = {
  'aesthetic-collection': {
    slug: 'aesthetic-collection',
    name: 'Aesthetic Collection',
    seoTitle: 'Aesthetic Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Refined visual moods, clean line art, and dreamy colorways.',
    description: 'Our Aesthetic phone cases bring calm, intentional vibes to your everyday carry. Handpicked designs include dreamy pastel sunset gradients, Japanese kanji typography, ethereal cloudscapes, clean botanical line art, minimal collage arrangements, and coffee culture doodles.',
    metaDescription: 'Shop aesthetic phone cases at ₹299. Dreamy pastel gradients, kanji typography & line art covers with protective gloss & shockproof edges.',
    materialInfo: 'Every design is permanently sealed beneath an optical glass back, ensuring the soft pastel hues and ultra-fine line art never fade, scratch, or turn yellow. Flexible TPU silicon edges wrap around the front to absorb everyday drop impacts.',
    highlights: ['Dreamy cloudscapes, Japanese kanji & minimalist sketches', 'Smooth reflective scratch-resistant finish', '1.2mm raised camera bezel defense', 'Lightweight slim in-hand profile']
  },
  'cars-bikes-collection': {
    slug: 'cars-bikes-collection',
    name: 'Cars & Bikes Collection',
    seoTitle: 'Cars & Bikes Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'High-octane motorsport art, legendary supercars, and track-ready bikes.',
    description: 'Designed for automotive purist speed enthusiasts. Our Cars & Bikes phone cases feature high-definition designs of iconic Italian supercars, twin-turbo drift machines, JDM tuners (Skyline GTR, Supra), Porsche silhouettes, track superbikes, motorcycle helmets, and race liveries.',
    metaDescription: 'Shop cars & bikes phone cases at ₹299. High-octane supercars, JDM tuners & superbikes with protective glass gloss and anti-slip grip bumpers.',
    materialInfo: 'Printed under ultra-clear protective glass, the metallic blacks, deep racing reds, and glossy carbon-weave patterns look identical to freshly polished automotive clear coat. Flexible TPU bumpers absorb sudden drop shocks while driving, riding, or daily commuting.',
    highlights: ['Supercars, JDM legends, and track superbike designs', 'Mirror gloss finish resembling freshly waxed car paint', 'Shock-absorbing TPU frame with anti-slip grip', 'Raised 1.2mm camera rim protection']
  },
  'sports-collection': {
    slug: 'sports-collection',
    name: 'Sports & Energy',
    seoTitle: 'Sports Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Football legends, iconic kicks, jersey numbers, and championship energy.',
    description: 'Our Sports Phone Cases collection is packed with designs made for true sports fans. Discover phone cases featuring legendary football moments, iconic Cristiano Ronaldo (CR7) celebration artwork, Messi tributes, retro basketball sneakers, football boots, stadium silhouettes, and dynamic athletic typography printed crisp and vibrant.',
    metaDescription: 'Shop sports phone cases at ₹299. Football legends, CR7, sneakers & athletic energy phone covers with scratch-resistant gloss & TPU drop defense.',
    materialInfo: 'Engineered for active use, each sports case features our signature scratch-resistant protective backplate. Bold jersey colors, stadium lights, and sneaker graphics stay bright and reflective forever without peeling. The impact-resistant TPU silicon bumper gives you a confident anti-slip grip during workouts and game days.',
    highlights: ['Iconic football, Ronaldo (CR7) & athlete tributes', 'Retro sneaker kicks and boot artwork', 'Anti-slip textured silicon grip with glossy protective back', 'Drop-cushioned corners & ₹299 pricing']
  },
  'new-designs': {
    slug: 'new-designs',
    name: 'New Designs',
    seoTitle: 'New Design Phone Cases — Unique & Attractive Covers (₹299) | Framecase',
    tagline: 'Fresh drops straight from the design studio.',
    description: 'Discover our newest phone case additions: limited-edition art drops, contemporary viral aesthetics, seasonal color palettes, street-style typography, and modern graphic statements freshly crafted for trendsetters.',
    metaDescription: 'Discover new design phone cases at ₹299. Fresh limited art drops, contemporary viral aesthetics, and street typography with shockproof TPU borders.',
    materialInfo: 'Built with our signature scratch-proof backplate and 360-degree shockproof silicon edges, these cases deliver pristine aesthetic brilliance and dependable all-day device defense.',
    highlights: ['Freshly dropped unique designs', 'Precision camera lens cutout protection', 'Scratch-resistant glossy face', 'Uniform ₹299 final pricing']
  },
  'new-arrivalss': {
    slug: 'new-arrivalss',
    name: 'Newly Launched',
    seoTitle: 'Newly Launched Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'The latest drops crafted to transform your everyday carry.',
    description: 'Explore the freshest catalog additions featuring bold graphics, pop-culture statements, vibrant illustrations, retro comic hero art, and clean typography designed to elevate your device instantly.',
    metaDescription: 'Explore newly launched phone cases at ₹299. Bold graphics, pop-culture art & vibrant typography with glossy scratch-resistant finish and drop safety.',
    materialInfo: 'Each case combines an optical protective surface with high-grade shock-absorbing TPU bumpers, ensuring your phone stays safe from daily drops and surface scuffs.',
    highlights: ['Exclusive newly dropped artworks', 'High-contrast vibrant ink beneath protective finish', 'Full perimeter edge-to-edge wrap', 'Slim in-hand ergonomics']
  },
  'best-sellers': {
    slug: 'best-sellers',
    name: 'Top Selling Cases',
    seoTitle: 'Best Selling Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'The crowd favorites and community-rated top picks.',
    description: 'These are the cases our community loves the most. From best-selling retro collages and Japanese typography to iconic celestial charts, supercar art, and sneaker illustrations, these proven crowd-pleasers are guaranteed to turn heads.',
    metaDescription: 'Shop best selling phone cases loved by 10,000+ users in India. Top-rated designs at ₹299 with scratch-resistant back & shockproof silicon bumper.',
    materialInfo: 'Tested by thousands of happy smartphone users across India. The protective glass back resists scratches from keys and coins, while the resilient TPU silicon bumper cushions against unexpected tabletop drops.',
    highlights: ['Over 10,000+ happy devices protected', 'Mirror-like high-clarity gloss back', 'Available for 100+ phone models', 'Unbeatable designer value at ₹299']
  },
  'art-collection': {
    slug: 'art-collection',
    name: 'Arts & Scenery',
    seoTitle: 'Art & Scenery Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Fine art masterpieces, misty mountain horizons, and nature landscapes.',
    description: 'Turn your smartphone into an art gallery. Designs in our Arts & Scenery collection range from impressionist oil paintings (like starry skies and wave crests) to misty pine mountain ranges, neon cyberpunk rain streets, and tranquil coastal seascapes.',
    metaDescription: 'Turn your phone into an art gallery at ₹299. Starry skies, misty mountain horizons & ocean waves with rich glossy color depth and TPU borders.',
    materialInfo: 'The protective layer refracts ambient light directly through the painterly brushstrokes, reproducing vibrant museum-quality colors with real depth. Full TPU edge borders protect the device from face-down drops.',
    highlights: ['Starry night oil paintings, ocean waves & mountain mist', 'Rich painterly color depth under gloss finish', 'Easy to wipe clean of fingerprints', 'Qi wireless charging compatible']
  },
  'zodiac-sign': {
    slug: 'zodiac-sign',
    name: 'Astrology & Zodiac',
    seoTitle: 'Zodiac & Astrology Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Constellations, planetary alignments, and celestial birth charts.',
    description: 'Align your phone with the stars. Our Zodiac cases feature all 12 astrological signs: Leo, Scorpio, Aries, Taurus, and more with golden constellation maps, tarot card aesthetics, moon phases, and celestial star charts.',
    metaDescription: 'Shop Zodiac & astrology phone cases at ₹299. Golden constellation maps and tarot aesthetics with mirror gloss back & shockproof drop bumper.',
    materialInfo: 'Deep obsidian black backgrounds and golden constellation lines are preserved under optical glass, giving a mirror-smooth cosmic look that resists keys and coin scratches in your pocket.',
    highlights: ['All 12 zodiac constellations, tarot cards & moon phases', 'Luminous gold and cosmic black contrast', 'Shockproof TPU drop cushions', 'Custom fit for 100+ devices']
  },
  'mens-collection': {
    slug: 'mens-collection',
    name: "Men's Edit",
    seoTitle: "Men's Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase",
    tagline: 'Bold, structured, and modern designs for everyday gentlemen.',
    description: 'A curated selection of masculine aesthetics: brushed dark metallics, supercar blueprints, carbon fiber weaves, bold monochrome typography, athletic streetwear icons, and stealth geometric patterns.',
    metaDescription: 'Curated mens phone cases at ₹299. Carbon fiber weaves, supercar blueprints & stealth geometric designs with tactile feel & rugged corner defense.',
    materialInfo: 'Combining sleek industrial design with rugged drop safety, the protective back provides a cool, tactile luxury feel while the flexible silicon bumper ensures 360-degree corner security.',
    highlights: ['Carbon fiber weaves, supercar blueprints & stealth geometry', 'Slim pocket-friendly profile', 'Precision responsive button covers', 'Resilient protective surface']
  },
  'girls-collection': {
    slug: 'girls-collection',
    name: "Women's Edit",
    seoTitle: "Women's Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase",
    tagline: 'Chic, vibrant, and artistic designs curated for women.',
    description: 'Discover joyful botanical florals, delicate butterfly wings, empowering quote typography, cozy café moments, and chic pastel collages crafted to complement your outfit and beauty accessories.',
    metaDescription: 'Chic artistic womens phone cases at ₹299. Botanical florals, butterflies & quotes with stain-resistant protective gloss & lightweight build.',
    materialInfo: 'Our sealed sub-surface printing protects the vibrant colors from makeup smudges, perfume, and daily friction, easily wiped clean with a quick swipe of a soft cloth.',
    highlights: ['Botanical florals, butterfly wings & quote typography', 'Stain-resistant and fingerprint-friendly gloss', 'Lightweight protective build', 'Accessible designer price at ₹299']
  },
  'cats-collection': {
    slug: 'cats-collection',
    name: 'Cats & Felines',
    seoTitle: 'Cat Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Playful kittens, cozy illustrations, and feline humor.',
    description: 'The ultimate case lineup for cat lovers. Discover adorable phone cases featuring sleepy ginger tabbies, curious black cats peeking out, sushi-eating kittens, cozy café cats, and playful feline paw pattern doodles.',
    metaDescription: 'Shop adorable cat phone cases at ₹299. Sleepy ginger tabbies, sushi kittens & paw prints with crystal-clear print & shockproof corner wrap.',
    materialInfo: 'Printed with crystal clarity, every whisker and watercolor detail shines with vibrant clarity. The non-slip TPU perimeter protects against accidental table slides and clumsy drops.',
    highlights: ['Sleepy tabbies, sushi kittens & cat paw patterns', 'Ultra-crisp non-fading print sealed beneath protective coat', 'Full shock-absorbing corner wrap', 'Perfect gift for cat parents']
  },
  'evil-eye-nazar': {
    slug: 'evil-eye-nazar',
    name: 'Evil Eye & Nazar',
    seoTitle: 'Evil Eye Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Ancient protective amulets, royal blue talismans, and warding motifs.',
    description: 'Ward off negative energy with symbolic style. Our Evil Eye phone cases feature vibrant Mediterranean cobalt blue nazar amulets, golden sacred sun motifs, protective hamsa hands, and modern mystic spiritual patterns.',
    metaDescription: 'Ward off negativity with Evil Eye phone cases at ₹299. Cobalt blue nazar talismans & sun motifs with scratch-resistant gloss and camera bezel.',
    materialInfo: 'The intense sapphire blue and golden ink details are sealed beneath protective glass for a brilliant protective shine that will never rub off or scratch. TPU silicon rails cushion the phone on every corner.',
    highlights: ['Cobalt blue nazar amulets, hamsa hands & sun rays', 'Brilliant gloss finish with scratch-resistant back', 'Protective raised camera bezel', 'Slim everyday carry']
  },
};

export function getCategoryMeta(slug?: string, defaultName?: string): CategoryMeta {
  if (slug && CATEGORIES_DATA[slug]) {
    return CATEGORIES_DATA[slug];
  }
  const cleanName = defaultName || (slug ? slug.replace(/-/g, ' ') : 'Curated Collection');
  const fallbackMetaDesc = `Shop ${cleanName} phone cases with unique, attractive designs for iPhone, Samsung, OnePlus & more at ₹299 with free shipping across India.`.slice(0, 160);
  return {
    slug: slug || 'all',
    name: cleanName,
    seoTitle: `${cleanName} Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase`,
    tagline: `Curated ${cleanName} cases designed with a point of view.`,
    description: `Explore our collection of ${cleanName} phone covers featuring iconic thematic illustrations, vibrant graphics, and sharp details tailored for everyday style.`,
    metaDescription: fallbackMetaDesc,
    materialInfo: `Every design is sealed beneath high-grade optical protective glass with flexible shock-absorbing TPU silicon borders, ensuring scratch-free gloss and reliable drop security.`,
    highlights: [
      'Sub-surface sealed artwork that never fades',
      'Scratch-resistant protective surface',
      'Flexible TPU shock-absorbing borders',
      'Uniform ₹299 designer pricing across all models'
    ]
  };
}
