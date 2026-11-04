import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPublicPath = path.resolve(__dirname, '../../artifacts/framecase/dist/public');
const publicDir = path.resolve(__dirname, '../../artifacts/framecase/public');
const templateHtmlPath = path.join(distPublicPath, 'index.html');

if (!fs.existsSync(templateHtmlPath)) {
  console.error('Template index.html not found at', templateHtmlPath);
  process.exit(1);
}

// Read and preserve pristine base template with empty <div id="root"></div>
let rawTemplate = fs.readFileSync(templateHtmlPath, 'utf8');
// If rawTemplate already contains pre-rendered contents inside root, reset it to clean shell
rawTemplate = rawTemplate.replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>');
const baseTemplateHtml = rawTemplate;

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const UPSTREAM_COLLECTION_MAP = {
  'new-designs': 'new-arrivalss',
  'new-arrivalss': 'new-arrivalss',
  'best-sellers': 'best-sellers',
  'aesthetic-collection': 'aesthetic-collection',
  'cars-bikes-collection': 'cars-bikes-collection',
  'sports-collection': 'sports-collection',
  'art-collection': 'art-collection',
  'zodiac-sign': 'zodiac-sign',
  'mens-collection': 'mens-collection',
  'girls-collection': 'girls-collection',
  'cats-collection': 'cats-collection',
  'evil-eye-nazar': 'evil-eye-nazar',
};

const CATEGORIES_DATA = {
  'new-designs': {
    slug: 'new-designs',
    name: 'New Designs',
    seoTitle: 'New Design Phone Cases — Unique & Attractive Covers (₹299) | Framecase',
    tagline: 'Fresh drops straight from the design studio.',
    description: 'Discover our newest phone case additions: limited-edition art drops, contemporary viral aesthetics, seasonal color palettes, street-style typography, and modern graphic statements freshly crafted for trendsetters.',
    materialInfo: 'Built with our signature scratch-proof backplate and 360-degree shockproof silicon edges, these cases deliver pristine aesthetic brilliance and dependable all-day device defense.',
    highlights: ['Freshly dropped unique designs', 'Precision camera lens cutout protection', 'Scratch-resistant glossy face', 'Uniform ₹299 final pricing']
  },
  'new-arrivalss': {
    slug: 'new-arrivalss',
    name: 'Newly Launched',
    seoTitle: 'Newly Launched Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'The latest drops crafted to transform your everyday carry.',
    description: 'Explore the freshest catalog additions featuring bold graphics, pop-culture statements, vibrant illustrations, retro comic hero art, and clean typography designed to elevate your device instantly.',
    materialInfo: 'Each case combines an optical protective surface with high-grade shock-absorbing TPU bumpers, ensuring your phone stays safe from daily drops and surface scuffs.',
    highlights: ['Exclusive newly dropped artworks', 'High-contrast vibrant ink beneath protective finish', 'Full perimeter edge-to-edge wrap', 'Slim in-hand ergonomics']
  },
  'best-sellers': {
    slug: 'best-sellers',
    name: 'Top Selling Cases',
    seoTitle: 'Best Selling Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'The crowd favorites and community-rated top picks.',
    description: 'These are the cases our community loves the most. From best-selling retro collages and Japanese typography to iconic celestial charts, supercar art, and sneaker illustrations, these proven crowd-pleasers are guaranteed to turn heads.',
    materialInfo: 'Tested by thousands of happy smartphone users across India. The protective glass back resists scratches from keys and coins, while the resilient TPU silicon bumper cushions against unexpected tabletop drops.',
    highlights: ['Over 10,000+ happy devices protected', 'Mirror-like high-clarity gloss back', 'Available for 100+ phone models', 'Unbeatable designer value at ₹299']
  },
  'aesthetic-collection': {
    slug: 'aesthetic-collection',
    name: 'Aesthetic',
    seoTitle: 'Aesthetic Phone Cases — Unique & Attractive Covers (₹299) | Framecase',
    tagline: 'Soft palettes, dreamscapes, and mood-driven visuals.',
    description: 'Transform your phone into a visual mood board. Our Aesthetic collection features pastel gradients, celestial line art, dreamy cloud horizons, Japanese floral accents, and subtle typography created for mindful design enthusiasts.',
    materialInfo: 'Every case features our signature scratch-resistant protective backplate with flexible shockproof TPU borders for an anti-slip grip and daily drop security.',
    highlights: ['Pastel gradients & celestial line art', 'Sub-surface crisp printing', 'Anti-slip TPU borders', 'Drop-cushioned corners at ₹299']
  },
  'cars-bikes-collection': {
    slug: 'cars-bikes-collection',
    name: 'Cars & Bikes',
    seoTitle: 'Cars & Bikes Phone Cases — Unique & Attractive Covers (₹299) | Framecase',
    tagline: 'Turbocharged graphics, iconic chassis, and asphalt culture.',
    description: 'Fuel your passion with designs inspired by speed. Explore phone cases showcasing legendary Japanese drift silhouettes, European supercars, classic café racers, and motorsport liveries.',
    materialInfo: 'High-contrast vibrant ink sealed beneath optical gloss gives supercar paint luster while flexible TPU cushions against heavy drops.',
    highlights: ['JDM icons & European supercars', 'Deep tire tread & carbon textures', 'High-gloss reflective finish', 'Accessible ₹299 pricing']
  },
  'sports-collection': {
    slug: 'sports-collection',
    name: 'Sports & Football',
    seoTitle: 'Sports Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Football legends, iconic kicks, jersey numbers, and championship energy.',
    description: 'Our Sports Phone Cases collection is packed with designs made for true sports fans. Discover phone cases featuring legendary football moments, iconic Cristiano Ronaldo (CR7) celebration artwork, Messi tributes, retro basketball sneakers, football boots, stadium silhouettes, and dynamic athletic typography printed crisp and vibrant.',
    materialInfo: 'Engineered for active use, each sports case features our signature scratch-resistant protective backplate. Bold jersey colors, stadium lights, and sneaker graphics stay bright and reflective forever without peeling. The impact-resistant TPU silicon bumper gives you a confident anti-slip grip during workouts and game days.',
    highlights: ['Iconic football, Ronaldo (CR7) & athlete tributes', 'Retro sneaker kicks and boot artwork', 'Anti-slip textured silicon grip with glossy protective back', 'Drop-cushioned corners & ₹299 pricing']
  },
  'art-collection': {
    slug: 'art-collection',
    name: 'Arts & Scenery',
    seoTitle: 'Art & Scenery Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Fine art masterpieces, misty mountain horizons, and nature landscapes.',
    description: 'Turn your smartphone into an art gallery. Designs range from impressionist oil paintings (starry skies, wave crests) to misty pine mountain ranges and tranquil seascapes.',
    materialInfo: 'The protective layer reproduces vibrant museum-quality colors with real depth. Full TPU edge borders protect from face-down drops.',
    highlights: ['Starry night oil paintings & ocean waves', 'Rich painterly color depth under gloss finish', 'Easy to wipe clean', 'Qi wireless charging compatible']
  },
  'zodiac-sign': {
    slug: 'zodiac-sign',
    name: 'Astrology & Zodiac',
    seoTitle: 'Zodiac & Astrology Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Constellations, planetary alignments, and celestial birth charts.',
    description: 'Align your phone with the stars. Features all 12 astrological signs: Leo, Scorpio, Aries, Taurus, and more with golden constellation maps, tarot card aesthetics, and moon phases.',
    materialInfo: 'Deep obsidian black backgrounds and golden constellation lines are preserved under optical glass for a mirror-smooth cosmic look.',
    highlights: ['All 12 zodiac constellations & moon phases', 'Luminous gold and cosmic black contrast', 'Shockproof TPU drop cushions', 'Custom fit for 100+ devices']
  },
  'mens-collection': {
    slug: 'mens-collection',
    name: "Men's Edit",
    seoTitle: "Men's Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase",
    tagline: 'Bold, structured, and modern designs for everyday gentlemen.',
    description: 'A curated selection of masculine aesthetics: brushed dark metallics, supercar blueprints, carbon fiber weaves, bold monochrome typography, athletic streetwear icons, and stealth geometric patterns.',
    materialInfo: 'Combining sleek industrial design with rugged drop safety, the protective back provides a tactile luxury feel with 360-degree corner security.',
    highlights: ['Carbon fiber weaves & supercar blueprints', 'Slim pocket-friendly profile', 'Precision responsive button covers', 'Resilient protective surface']
  },
  'girls-collection': {
    slug: 'girls-collection',
    name: "Women's Edit",
    seoTitle: "Women's Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase",
    tagline: 'Chic, vibrant, and artistic designs curated for women.',
    description: 'Discover joyful botanical florals, delicate butterfly wings, empowering quote typography, cozy café moments, and chic pastel collages crafted to complement your outfit.',
    materialInfo: 'Our sealed sub-surface printing protects vibrant colors from makeup smudges, perfume, and daily friction, easily wiped clean with a soft cloth.',
    highlights: ['Botanical florals & butterfly wings', 'Stain-resistant and fingerprint-friendly gloss', 'Lightweight protective build', 'Accessible designer price at ₹299']
  },
  'cats-collection': {
    slug: 'cats-collection',
    name: 'Cats & Felines',
    seoTitle: 'Cat Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Playful kittens, cozy illustrations, and feline humor.',
    description: 'The ultimate case lineup for cat lovers. Discover phone cases featuring sleepy ginger tabbies, curious black cats peeking out, sushi kittens, and playful cat paw doodles.',
    materialInfo: 'Printed with crystal clarity, every whisker and watercolor detail shines with vibrant clarity. Non-slip TPU protects against accidental drops.',
    highlights: ['Sleepy tabbies & cat paw patterns', 'Ultra-crisp non-fading print sealed beneath protective coat', 'Full shock-absorbing corner wrap', 'Perfect gift for cat parents']
  },
  'evil-eye-nazar': {
    slug: 'evil-eye-nazar',
    name: 'Evil Eye & Nazar',
    seoTitle: 'Evil Eye Phone Cases — Unique & Attractive Design Covers (₹299) | Framecase',
    tagline: 'Ancient protective amulets, royal blue talismans, and warding motifs.',
    description: 'Ward off negative energy with symbolic style. Features vibrant Mediterranean cobalt blue nazar amulets, golden sacred sun motifs, protective hamsa hands, and mystic spiritual patterns.',
    materialInfo: 'Intense sapphire blue and golden ink details are sealed beneath protective glass for a brilliant shine that will never rub off or scratch.',
    highlights: ['Cobalt blue nazar amulets & sun rays', 'Brilliant gloss finish with scratch-resistant back', 'Protective raised camera bezel', 'Slim everyday carry']
  }
};

const navCollections = [
  { label: 'New designs', slug: 'new-designs' },
  { label: 'Best sellers', slug: 'best-sellers' },
  { label: 'Aesthetic', slug: 'aesthetic-collection' },
  { label: 'Cars & bikes', slug: 'cars-bikes-collection' },
  { label: 'Arts & scenery', slug: 'art-collection' },
  { label: 'Astrology', slug: 'zodiac-sign' },
  { label: 'Sports', slug: 'sports-collection' },
  { label: "Men's collection", slug: "mens-collection" },
  { label: "Women's collection", slug: "girls-collection" },
  { label: 'Cats collection', slug: 'cats-collection' },
  { label: 'Evil eye collection', slug: 'evil-eye-nazar' },
];

function renderHeaderNav() {
  return `
    <div class="announcement">
      <span>Complimentary shipping on orders over ₹999</span>
      <span class="announcement-detail">Designed to be noticed. Built to protect.</span>
    </div>
    <header class="site-header">
      <a href="/" class="brand" aria-label="Framecase home">
        <img src="/brand-logo.png" alt="FrameCase" class="brand-logo" width="30" height="30" />
        <span class="brand-word">Frame<span>Case</span></span>
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="/new-designs">New designs</a>
        <a href="/best-sellers">Best sellers</a>
        <a href="/aesthetic-collection">Aesthetic</a>
        <a href="/cars-bikes-collection">Cars &amp; bikes</a>
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
        <a href="/faq">FAQs</a>
        <a href="/#catalog">Shop all</a>
      </nav>
      <div class="header-actions">
        <a href="/#catalog" class="icon-button" aria-label="Search"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></a>
        <button type="button" class="bag-button" aria-label="Shopping bag"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg><span>0</span></button>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="footer-top">
        <div>
          <a href="/" class="brand footer-brand">
            <span class="brand-mark">F</span>
            <span class="brand-word">frame<span>case</span></span>
          </a>
          <p>Cases with a point of view.</p>
        </div>
        <div class="footer-links">
          <div>
            <p>Explore</p>
            <a href="/#catalog">All designs</a>
            <a href="/new-designs">New designs</a>
            <a href="/best-sellers">Best sellers</a>
            <a href="/aesthetic-collection">Aesthetic</a>
            <a href="/cars-bikes-collection">Cars &amp; bikes</a>
          </div>
          <div>
            <p>Company &amp; Help</p>
            <a href="/about">About Us</a>
            <a href="/faq">FAQ’s</a>
            <a href="/blog">Blog</a>
            <a href="mailto:nkeepson@gmail.com" class="footer-contact-link">nkeepson@gmail.com</a>
          </div>
          <div>
            <p>Follow along</p>
            <a href="https://www.instagram.com/framecase.in?srtk=YWYzZDk4a3N2bWVl&amp;utm_source=qr" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Framecase</span>
        <span>Made for every device, every version of you.</span>
      </div>
    </footer>
  `;
}

function injectMetadata(html, { title, description, canonicalUrl, ogType = 'website', ogImage, jsonLd, bodyContent, hydrationScript }) {
  let res = html;
  if (title) {
    res = res.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
    res = res.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${escapeHtml(title)}"`);
    res = res.replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${escapeHtml(title)}"`);
  }
  if (description) {
    res = res.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${escapeHtml(description)}"`);
    res = res.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${escapeHtml(description)}"`);
    res = res.replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${escapeHtml(description)}"`);
  }
  if (canonicalUrl) {
    res = res.replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="${escapeHtml(canonicalUrl)}"`);
    res = res.replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}"`);
  }
  if (ogType) {
    res = res.replace(/<meta property="og:type" content="[^"]*"/i, `<meta property="og:type" content="${escapeHtml(ogType)}"`);
  }

  if (ogImage) {
    const safeImg = escapeHtml(ogImage);
    res = res.replace(/<meta property="og:image" content="[^"]*"/i, '');
    res = res.replace(/<meta name="twitter:image" content="[^"]*"/i, '');
    res = res.replace('</head>', `  <meta property="og:image" content="${safeImg}" />\n  <meta property="og:image:secure_url" content="${safeImg}" />\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="1200" />\n  <meta name="twitter:image" content="${safeImg}" />\n</head>`);
  }

  if (jsonLd) {
    const jsonStr = JSON.stringify(jsonLd);
    res = res.replace('</head>', `  <script type="application/ld+json">${jsonStr}</script>\n</head>`);
  }

  if (hydrationScript) {
    res = res.replace('</head>', `  ${hydrationScript}\n</head>`);
  }

  if (bodyContent) {
    res = res.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root"><div class="site-shell">${renderHeaderNav()}<main>${bodyContent}</main>${renderFooter()}</div></div>`);
  }

  return res;
}

async function fetchCollectionProducts(colSlug) {
  try {
    const upstreamSlug = UPSTREAM_COLLECTION_MAP[colSlug] || colSlug;
    const url = `https://phonevilla.in/collections/${upstreamSlug}/products.json?limit=100`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Framecase/1.0', Accept: 'application/json' } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch (err) {
    console.error(`Error fetching collection ${colSlug}:`, err.message);
    return [];
  }
}

async function run() {
  console.log('--- Starting Prerender Generation ---');

  const sitemapUrls = [
    { loc: 'https://framecase.in/', changefreq: 'daily', priority: '1.0' },
    { loc: 'https://framecase.in/about', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://framecase.in/faq', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://framecase.in/blog', changefreq: 'daily', priority: '0.9' },
  ];

  // 1. Static Pages
  const staticPages = [
    {
      route: 'about',
      title: 'About Us — Unique & Attractive Design Phone Cases | Framecase',
      description: 'Discover Framecase: unique & attractive design phone cases featuring optical glass finish, flexible shockproof TPU borders, and accessible ₹299 pricing.',
      canonicalUrl: 'https://framecase.in/about',
      content: `
        <div class="content-page-shell">
          <div class="content-page-header">
            <a href="/" class="back-to-catalog">← Back to home</a>
            <p class="eyebrow">Our Story · The Framecase Philosophy</p>
            <h1 class="content-page-title">Cases with a point of view.</h1>
            <p class="content-page-subtitle">We believe your phone is the one object you hold all day. It shouldn't look like everyone else's.</p>
          </div>
          <div class="editorial-body">
            <p class="editorial-lead">Framecase was founded on a simple observation: modern phone cases are either boring black silicone bricks or fragile plastic shells that turn yellow in weeks.</p>
            <div class="about-grid">
              <div class="about-card"><h3>Curated Artwork</h3><p>Every single design in our catalog is carefully selected or created to deliver distinctive visual personality across anime, motorsport, fine arts, and minimalism.</p></div>
              <div class="about-card"><h3>Optical Glass &amp; Shock TPU</h3><p>Our cases combine a glossy 9H scratch-resistant glass face with flexible shockproof silicone edges for drop protection and rich color clarity.</p></div>
              <div class="about-card"><h3>Direct ₹299 Pricing</h3><p>By producing directly and skipping retail markups, we deliver luxury aesthetic cases uniformly priced at ₹299 across 100+ phone models.</p></div>
            </div>
            <div class="material-highlight-box">
              <h3>The Framecase Guarantee</h3>
              <p>Every case is crafted to fit Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Oppo, and Realme with precision cutouts for lenses, charging ports, and responsive button covers.</p>
              <a href="/#catalog" class="primary-button">Explore the Collection →</a>
            </div>
          </div>
        </div>
      `
    },
    {
      route: 'faq',
      title: 'Frequently Asked Questions (FAQs) — Unique Design Phone Covers | Framecase',
      description: 'Everything you need to know about Framecase phone cases, supported devices (iPhone, Samsung, OnePlus, Vivo, Oppo, Realme), shipping across India, and durability.',
      canonicalUrl: 'https://framecase.in/faq',
      content: `
        <div class="content-page-shell">
          <div class="content-page-header">
            <a href="/" class="back-to-catalog">← Back to home</a>
            <p class="eyebrow">Customer Support · Help &amp; FAQs</p>
            <h1 class="content-page-title">Frequently Asked Questions</h1>
            <p class="content-page-subtitle">Clear answers on materials, device compatibility, delivery across India, and our easy ordering process.</p>
          </div>
          <div class="editorial-body">
            <div class="faq-list">
              <div class="faq-item"><h3>What materials are Framecase covers made of?</h3><p>Each Framecase combines a 9H tempered optical glass backplate with flexible shock-absorbing TPU silicone bumpers for crystal clarity and drop safety.</p></div>
              <div class="faq-item"><h3>Which phone models are supported?</h3><p>We support over 100+ phone models across Apple iPhone, Samsung Galaxy, OnePlus, Xiaomi/Redmi, Vivo, Oppo, Realme, Google Pixel, Motorola, and more.</p></div>
              <div class="faq-item"><h3>What is the price of each case?</h3><p>All phone cases are priced uniformly at ₹299. Shipping is complimentary on orders above ₹999.</p></div>
              <div class="faq-item"><h3>How do I place an order?</h3><p>Select your phone brand and model on any product page, tap 'Buy Now', and your customized order summary is copied and opened in Instagram Direct for instant confirmation.</p></div>
            </div>
            <div class="material-highlight-box">
              <h3>Still have a question?</h3>
              <p>Reach out to our customer care team anytime at <a href="mailto:nkeepson@gmail.com">nkeepson@gmail.com</a> or DM us on Instagram @framecase.in.</p>
              <a href="/#catalog" class="primary-button">Start Shopping →</a>
            </div>
          </div>
        </div>
      `
    },
    {
      route: 'blog',
      title: 'Framecase Journal — Unique & Attractive Phone Case Designs',
      description: 'Read in-depth articles and guides about phone case aesthetics, everyday drop protection, and styling your smartphone carry.',
      canonicalUrl: 'https://framecase.in/blog',
      content: `
        <div class="content-page-shell">
          <div class="content-page-header">
            <a href="/" class="back-to-catalog">← Back to home</a>
            <p class="eyebrow">The Framecase Journal · Style, Drops &amp; Guides</p>
            <h1 class="content-page-title">Stories Behind the Frame</h1>
            <p class="content-page-subtitle">Deep dives into case design, phone styling trends, and device care.</p>
          </div>
          <div class="editorial-body">
            <div class="blog-grid">
              <article class="blog-card">
                <span class="blog-tag">Design Guide</span>
                <h3>Why 9H Glossy Glass Cases Are Taking Over in 2026</h3>
                <p>Learn how optical glass backings preserve vibrant pigments while providing reliable scratch resistance compared to traditional plastic skins.</p>
                <a href="/#catalog" class="seo-cta-link">Shop Glass Cases →</a>
              </article>
              <article class="blog-card">
                <span class="blog-tag">Trend Report</span>
                <h3>Matching Your Phone Case to Your Daily Mood</h3>
                <p>From motorsport aesthetic typography to tranquil nature landscapes, explore how phone cases have evolved into statement accessories.</p>
                <a href="/#catalog" class="seo-cta-link">Explore Moods →</a>
              </article>
            </div>
          </div>
        </div>
      `
    }
  ];

  for (const page of staticPages) {
    const dir = path.join(distPublicPath, page.route);
    fs.mkdirSync(dir, { recursive: true });
    const rendered = injectMetadata(baseTemplateHtml, {
      title: page.title,
      description: page.description,
      canonicalUrl: page.canonicalUrl,
      bodyContent: page.content,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.title,
        description: page.description,
        url: page.canonicalUrl,
        publisher: { '@type': 'Organization', name: 'Framecase', url: 'https://framecase.in/' }
      }
    });
    fs.writeFileSync(path.join(dir, 'index.html'), rendered);
    fs.writeFileSync(path.join(distPublicPath, `${page.route}.html`), rendered);
    console.log(`Generated static page: /${page.route}`);
  }

  // 2. Category Collections
  const allCollectionSlugs = Object.keys(CATEGORIES_DATA);
  const allUniqueProducts = new Map();
  let firstCollectionProducts = [];

  for (const slug of allCollectionSlugs) {
    sitemapUrls.push({
      loc: `https://framecase.in/${slug}`,
      changefreq: 'daily',
      priority: '0.85'
    });

    const meta = CATEGORIES_DATA[slug];
    const rawProds = await fetchCollectionProducts(slug);

    if (slug === 'best-sellers' || (firstCollectionProducts.length === 0 && rawProds.length > 0)) {
      firstCollectionProducts = rawProds;
    }

    // Save actual products
    for (const p of rawProds) {
      if (p.handle && !allUniqueProducts.has(p.handle)) {
        allUniqueProducts.set(p.handle, { ...p, collectionSlug: slug, collectionName: meta.name });
      }
    }

    const productCardsHtml = rawProds.slice(0, 48).map((p) => {
      const img = p.images?.[0]?.src || '';
      return `
        <div class="product-card">
          <a href="/products/${encodeURIComponent(p.handle)}" class="product-card-link">
            <div class="product-media">
              ${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(p.title)}" loading="lazy" />` : '<div class="image-fallback">Framecase</div>'}
            </div>
            <div class="product-info">
              <h3>${escapeHtml(p.title)}</h3>
              <p class="product-description">${escapeHtml(meta.name)}</p>
              <div class="product-price"><strong>₹299</strong></div>
            </div>
          </a>
        </div>
      `;
    }).join('\n');

    const catContent = `
      <div class="content-page-shell category-page-shell">
        <div class="content-page-header">
          <a href="/" class="back-to-catalog">← Back to home</a>
          <p class="eyebrow">Curated Collection · 9H Glass Edition</p>
          <h1 class="content-page-title">${escapeHtml(meta.name)}</h1>
          <p class="content-page-subtitle">${escapeHtml(meta.tagline)}</p>
        </div>
        <div class="category-toolbar">
          <p class="result-count">${rawProds.length} designs available in this collection</p>
        </div>
        <div class="product-grid">
          ${productCardsHtml || '<p class="catalog-state">Designs syncing live…</p>'}
        </div>
        <div class="category-editorial-section">
          <div class="category-editorial-card">
            <div class="category-editorial-body">
              <p class="eyebrow">About ${escapeHtml(meta.name)}</p>
              <h2>${escapeHtml(meta.name)}: Curated Art &amp; In-Hand Protection</h2>
              <p class="category-editorial-description">${escapeHtml(meta.description)}</p>
              <p class="category-editorial-materials">${escapeHtml(meta.materialInfo)}</p>
            </div>
            <div class="category-highlights-box">
              <h3>Highlights &amp; Engineering</h3>
              <ul>
                ${meta.highlights.map(h => `<li>✓ <span>${escapeHtml(h)}</span></li>`).join('\n')}
              </ul>
              <div class="category-price-banner">
                <strong>₹299</strong>
                <span>All designs in this category · Free shipping over ₹999</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Category Hydration Payload
    const normalizedCategoryProducts = rawProds.slice(0, 48).map((p) => {
      const srcImg = p.images?.[0]?.src || null;
      return {
        id: p.handle,
        title: p.title,
        description: 'A polished glass case with a glossy finish and protective silicon sides.',
        imageUrl: srcImg?.startsWith('//') ? `https:${srcImg}` : srcImg,
        price: '₹299',
        compareAtPrice: '₹449',
        productUrl: `/products/${p.handle}`,
        collectionSlug: slug,
        collectionName: meta.name,
        tags: Array.isArray(p.tags) ? p.tags : [],
        isFeatured: true,
      };
    });

    const categoryInitialPayload = {
      collection: slug,
      catalog: {
        products: normalizedCategoryProducts,
        collections: navCollections.map(c => ({ slug: c.slug, name: c.label, count: c.slug === slug ? rawProds.length : 0 })),
        syncedAt: new Date().toISOString(),
        sourceOnline: true,
        page: 1,
        hasNextPage: rawProds.length > 48,
      }
    };

    const hydrationScript = `<script id="__FRAMECASE_DATA__">window.__FRAMECASE_INITIAL_DATA__ = ${JSON.stringify(categoryInitialPayload)};</script>`;

    const dir = path.join(distPublicPath, slug);
    fs.mkdirSync(dir, { recursive: true });
    const rendered = injectMetadata(baseTemplateHtml, {
      title: meta.seoTitle,
      description: meta.description,
      canonicalUrl: `https://framecase.in/${slug}`,
      bodyContent: catContent,
      hydrationScript,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: meta.name,
        description: meta.description,
        url: `https://framecase.in/${slug}`,
        hasPart: rawProds.slice(0, 24).map(p => ({
          '@type': 'Product',
          name: p.title,
          url: `https://framecase.in/products/${p.handle}`,
          image: p.images?.[0]?.src,
          offers: {
            '@type': 'Offer',
            price: '299',
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock'
          }
        }))
      }
    });
    fs.writeFileSync(path.join(dir, 'index.html'), rendered);
    fs.writeFileSync(path.join(distPublicPath, `${slug}.html`), rendered);
    console.log(`Generated category page: /${slug} (${rawProds.length} products)`);
  }

  // 3. Homepage Prerendering (/) -> dist/public/index.html
  console.log('--- Generating Homepage (/) Prerender ---');
  const homeProds = firstCollectionProducts.slice(0, 48);
  const homeProductCardsHtml = homeProds.map((p) => {
    const img = p.images?.[0]?.src || '';
    return `
      <div class="product-card">
        <a href="/products/${encodeURIComponent(p.handle)}" class="product-card-link">
          <div class="product-media">
            ${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(p.title)}" loading="lazy" />` : '<div class="image-fallback">Framecase</div>'}
          </div>
          <div class="product-info">
            <h3>${escapeHtml(p.title)}</h3>
            <p class="product-description">Curated Design</p>
            <div class="product-price"><strong>₹299</strong></div>
          </div>
        </a>
      </div>
    `;
  }).join('\n');

  const homeNewlyLaunchedHtml = homeProds.slice(0, 20).map((p) => {
    const img = p.images?.[0]?.src || '';
    return `
      <a href="/products/${encodeURIComponent(p.handle)}" class="newly-launched-card">
        <div class="newly-launched-card-image">
          ${img ? `<img src="${escapeHtml(img)}" alt="${escapeHtml(p.title)}" loading="lazy" />` : ''}
        </div>
        <div class="newly-launched-card-info">
          <h4>${escapeHtml(p.title)}</h4>
          <span class="newly-launched-card-price">₹299</span>
        </div>
      </a>
    `;
  }).join('\n');

  const homeContent = `
    <section class="hero">
      <div class="hero-backdrop hero-backdrop-one"></div>
      <div class="hero-backdrop hero-backdrop-two"></div>
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Curated for your frame</p>
        <h1>Make it<br /><em>yours.</em></h1>
        <p class="hero-description">Cases with a point of view. Discover designs that bring a little more personality to the everyday.</p>
        <a href="#catalog" class="primary-button">Explore the collection →</a>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="phone phone-one"><div class="camera camera-left"></div><div class="phone-case-art art-check"></div></div>
        <div class="phone phone-two"><div class="camera camera-right"></div><div class="phone-case-art art-sun"></div></div>
        <div class="hero-sticker">YOUR<br /><span>EVERYDAY</span><br />ESSENTIAL</div>
      </div>
      <div class="hero-footnote"><span>01</span><span class="hero-line"></span><span>Explore your next favourite</span></div>
    </section>

    <section class="value-strip" aria-label="Framecase benefits">
      <div><span>🛡️ Made to protect</span></div>
      <div><span>✨ Designs for every mood</span></div>
      <div><span>🚚 Ships across India</span></div>
    </section>

    <section class="collection-section">
      <div class="section-heading">
        <div><p class="eyebrow">Find your frame</p><h2>Shop by mood</h2></div>
        <a href="#catalog" class="text-button">View all collections →</a>
      </div>
      <div class="collection-chips">
        ${navCollections.map(c => `<a href="/${c.slug}" class="collection-chip">${escapeHtml(c.label)}</a>`).join('\n')}
      </div>
    </section>

    <section class="catalog-section" id="catalog">
      <div class="catalog-toolbar">
        <div><p class="eyebrow">The edit</p><h2>All designs</h2><p class="result-count">Curated designs available</p></div>
      </div>
      <div class="product-grid">
        ${homeProductCardsHtml}
      </div>

      <div class="newly-launched-section">
        <div class="newly-launched-header">
          <div><p class="eyebrow">Fresh drops</p><h3 class="newly-launched-title">Newly launched</h3></div>
          <a href="/new-designs" class="text-button">View all newly launched →</a>
        </div>
        <div class="newly-launched-scroll-container">
          ${homeNewlyLaunchedHtml}
        </div>
      </div>
    </section>

    <section class="material-section" aria-labelledby="glass-case-guide">
      <div class="material-intro">
        <p class="eyebrow">The Framecase standard</p>
        <h2 id="glass-case-guide">Made beautiful.<br /><em>Made to protect.</em></h2>
      </div>
      <div class="material-copy">
        <p class="material-lead">Every Framecase design is made as a glossy glass case, so the art stays crisp while your phone gets everyday protection.</p>
        <div class="material-points">
          <div><span>01</span><div><strong>Glossy glass back</strong><p>Our designs are printed onto a high-quality 9H glass back. Clean, polished finish.</p></div></div>
          <div><span>02</span><div><strong>Silicon sides</strong><p>Flexible TPU silicon sides make the case comfortable to hold and cover the phone edge to edge.</p></div></div>
          <div><span>03</span><div><strong>Glass + plastic construction</strong><p>Slim and protective for daily use with drop cushioning.</p></div></div>
        </div>
      </div>
    </section>

    <section class="seo-content-section" aria-labelledby="seo-collection-overview">
      <div class="seo-content-container">
        <div class="seo-content-header">
          <p className="eyebrow">India's Designer Phone Case Destination</p>
          <h2 id="seo-collection-overview">Unique &amp; Attractive Design Phone Cases &amp; Covers at ₹299</h2>
          <p class="seo-content-intro">
            Elevate your smartphone with curated designer phone cases crafted for visual elegance and everyday drop defense. Whether you're looking for aesthetic covers, bold pop-culture art, or sleek minimalism, Framecase brings high-definition glossy glass protection to your fingertips at an honest price.
          </p>
        </div>
        <div class="seo-benefits-grid">
          <div class="seo-benefit-card">
            <h3>Curated Unique Designs</h3>
            <p>Explore hundreds of fresh, attractive phone case designs spanning anime, automotive, retro typography, and nature-inspired motifs.</p>
            <a href="/new-designs" class="seo-cta-link">Browse All Designs →</a>
          </div>
          <div class="seo-benefit-card">
            <h3>Shockproof Drop Protection</h3>
            <p>Built with shock-absorbing TPU silicone bumpers and scratch-resistant gloss backplates for effortless daily durability.</p>
            <a href="/about" class="seo-cta-link">Our Quality &amp; Materials →</a>
          </div>
          <div class="seo-benefit-card">
            <h3>100+ Compatible Devices</h3>
            <p>Precision-cut cases available for Apple iPhone, Samsung Galaxy, OnePlus, Vivo, Oppo, and Realme at uniform ₹299 pricing.</p>
            <a href="#catalog" class="seo-cta-link">Find Your Model →</a>
          </div>
        </div>
        <div class="seo-conversion-bar">
          <div class="seo-conversion-text">
            <strong>Ready to upgrade your daily carry?</strong>
            <span>Over 100+ phone models supported · ₹299 flat pricing · Complimentary shipping over ₹999</span>
          </div>
          <a href="#catalog" class="primary-button">Shop Unique Phone Covers →</a>
        </div>
      </div>
    </section>

    <section class="statement-section">
      <div class="statement-label"><span>Framecase</span><span>Since 2026</span></div>
      <h2>Your phone<br /><em>has a frame.</em></h2>
      <a href="#catalog" class="statement-link">Find yours →</a>
    </section>
  `;

  const renderedHomepage = injectMetadata(baseTemplateHtml, {
    title: 'Framecase - Stylish Unique Design Phone Cases for All',
    description: 'Shop unique design phone cases in India! Attractive, stylish covers for top brands at ₹299. Explore now!',
    canonicalUrl: 'https://framecase.in/',
    bodyContent: homeContent
  });
  fs.writeFileSync(templateHtmlPath, renderedHomepage);
  console.log('Generated homepage prerender in dist/public/index.html (with full visible content, SEO, and structured data)');

  // 4. Products Prerendering
  console.log(`--- Prerendering ${allUniqueProducts.size} Unique Available Products ---`);
  let prodCount = 0;
  for (const [handle, product] of allUniqueProducts.entries()) {
    prodCount++;
    sitemapUrls.push({
      loc: `https://framecase.in/products/${encodeURIComponent(handle)}`,
      changefreq: 'weekly',
      priority: '0.8'
    });

    const prodDir = path.join(distPublicPath, 'products', handle);
    fs.mkdirSync(prodDir, { recursive: true });

    const pTitle = `${product.title} — Unique & Attractive Design Case (₹299) | Framecase`;
    const cleanDesc = (product.body_html || 'A polished glass case with a glossy finish and protective silicon sides.')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);
    const pImg = product.images?.[0]?.src || '';
    const canonical = `https://framecase.in/products/${encodeURIComponent(handle)}`;

    const prodBodyHtml = `
      <section class="product-page">
        <a href="/${product.collectionSlug || ''}" class="back-to-catalog">← Back to designs</a>
        <div class="product-page-layout">
          <div class="product-page-media">
            ${pImg ? `<img src="${escapeHtml(pImg)}" alt="${escapeHtml(product.title)}" />` : '<div class="image-fallback">Framecase</div>'}
          </div>
          <div class="product-page-details">
            <p class="product-collection">${escapeHtml(product.collectionName || 'Curated Collection')}</p>
            <div class="product-page-title-row">
              <h1>${escapeHtml(product.title)}</h1>
            </div>
            <div class="product-page-price">
              <strong>₹299</strong>
              <span>₹449</span>
            </div>
            <div class="product-page-description">
              <p>${escapeHtml(cleanDesc)}</p>
              <p>Engineered with a high-gloss 9H scratch-resistant glass back and flexible TPU silicone bumpers for drop safety across 100+ phone models.</p>
            </div>
            <div class="product-page-material">
              <p>Complimentary shipping on orders over ₹999. Uniform flat pricing at ₹299 across all Apple, Samsung, OnePlus, Vivo, Oppo, and Realme devices.</p>
            </div>
          </div>
        </div>
      </section>
    `;

    const rendered = injectMetadata(baseTemplateHtml, {
      title: pTitle,
      description: cleanDesc,
      canonicalUrl: canonical,
      ogType: 'product',
      ogImage: pImg,
      bodyContent: prodBodyHtml,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: cleanDesc,
        image: pImg,
        url: canonical,
        brand: { '@type': 'Brand', name: 'Framecase' },
        offers: {
          '@type': 'Offer',
          price: '299',
          priceCurrency: 'INR',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          url: canonical
        }
      }
    });

    fs.writeFileSync(path.join(prodDir, 'index.html'), rendered);
  }
  console.log(`Generated ${prodCount} product pages under dist/public/products/:handle/index.html`);

  // 5. Update Sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);
  fs.writeFileSync(path.join(distPublicPath, 'sitemap.xml'), sitemapXml);
  console.log(`Updated sitemap.xml with ${sitemapUrls.length} total URLs.`);

  console.log('--- Prerender Generation Complete Successfully ---');
}

run().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
