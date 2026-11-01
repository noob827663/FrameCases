import { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Sparkles, BookOpen } from 'lucide-react';

interface BlogPageProps {
  onBack: () => void;
  onExploreDesigns: () => void;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'unique-and-attractive-designs',
    title: 'Unique & Attractive Designs: Why Framecase Cases Turn Heads Everywhere',
    category: 'Design & Aesthetics',
    date: 'February 2026',
    readTime: '4 min read',
    excerpt: 'From hyper-detailed automotive culture and retro Japanese street collages to bold typography and dreamy anime portraits, discover how our design curation redefines phone aesthetics.',
    content: [
      'Your phone case is the single most visible accessory you carry every single day. Most cases on the market force you to choose between boring single-color silicone shells or mass-produced plastic covers with generic prints that look dull under sunlight.',
      'At Framecase, every single artwork is crafted to make a bold personal statement. We curate distinct aesthetics across multiple moods: high-octane motorsport and supercar tributes with razor-sharp vector line art, retro Japanese manga collages, mystical astrology and evil eye emblems, and clean typographic statements.',
      'What makes these designs look so strikingly attractive is the depth created by our 9H tempered glass layer. Because the graphic is embedded underneath high-clarity optical glass rather than printed directly onto raw plastic, light refracts through the surface, giving the artwork a radiant, high-contrast, museum-grade gloss finish that catches eyes from across the room.',
      'Whether you want a refined aesthetic case that pairs effortlessly with a minimalist desk setup or an electrifying graphic that sparks conversations, our curated edit offers designs you won’t find on standard store shelves.'
    ]
  },
  {
    id: '2',
    slug: 'the-anatomy-of-9h-glass-cases',
    title: 'The Anatomy of 9H Tempered Glass: Real Protection Meets Flawless Gloss',
    category: 'Materials & Engineering',
    date: 'February 2026',
    readTime: '4 min read',
    excerpt: 'How our dual-layer architecture combines a 9H scratch-proof tempered glass back with shock-absorbing TPU silicon bumpers for complete everyday defense.',
    content: [
      'Smartphones are precision-engineered devices with cool glass backs and aerospace-grade metal rails. Slapping a cheap rubber case onto a premium flagship ruins the in-hand tactile experience. Framecase was engineered to restore that cool, ultra-smooth premium feel.',
      '1. 9H Scratch Resistance: On the Mohs hardness scale, 9H tempered glass easily withstands daily friction from keys, coins, grit, and tabletop contact without leaving unsightly scratches.',
      '2. Sealed Sub-Surface Artwork: Since the print is permanently sealed behind the tempered glass plate, the vibrant colors and sharp details are 100% immune to fading, peeling, or hand oil discoloration.',
      '3. Shock-Absorbing TPU Frame: Encasing the perimeter of the glass is a flexible, impact-absorbing TPU bumper. Featuring reinforced corner cushions and a 1.2mm raised front bezel, it protects your phone’s display and expensive camera array from direct surface contact on accidental drops.',
      '4. Tactile Precision Buttons: Enjoy crisp, satisfying button clicks with exact cutouts for speakers, microphones, and charging ports across over 100+ supported smartphone models.'
    ]
  },
  {
    id: '3',
    slug: 'accessible-designer-cases-299',
    title: 'Designer Glass Cases at ₹299: Premium Quality Without the Luxury Markup',
    category: 'Brand Ethos',
    date: 'February 2026',
    readTime: '3 min read',
    excerpt: 'Why we believe premium design should be accessible to everyone, with uniform ₹299 pricing and reliable delivery across all Indian pin codes.',
    content: [
      'High-end designer phone covers often command steep prices exceeding ₹1,000 to ₹2,000, while cheap plastic alternatives break or yellow within weeks. We founded Framecase to eliminate this compromise.',
      'By streamlining direct-to-consumer fulfillment and specializing exclusively in 9H tempered glass hybrid cases, every design in our catalog is offered at a uniform final price of ₹299.',
      'This makes it easy to curate your own rotation of phone cases: pick an aesthetic typography case for your weekday corporate hustle, an anime illustration for creative sessions, and a bold supercar design for weekend drives.',
      'We support hundreds of devices across iPhone, Samsung Galaxy, OnePlus, Vivo, Oppo, Realme, and Google Pixel with fast dispatch and nationwide tracking.'
    ]
  }
];

export function BlogPage({ onBack, onExploreDesigns }: BlogPageProps) {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  if (activePost) {
    return (
      <div className="content-page-shell">
        <div className="content-page-header">
          <button type="button" className="back-to-catalog" onClick={() => setActivePost(null)}>
            <ArrowLeft size={16} /> Back to all articles
          </button>
          <div className="blog-meta-badge">
            <span>{activePost.category}</span> · <span>{activePost.date}</span> · <span>{activePost.readTime}</span>
          </div>
          <h1 className="content-page-title">{activePost.title}</h1>
        </div>

        <div className="blog-article-body">
          <div className="blog-article-content">
            {activePost.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="blog-article-footer">
            <button type="button" className="primary-button" onClick={onExploreDesigns}>
              Explore Framecase Designs <Sparkles size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page-shell">
      <div className="content-page-header">
        <button type="button" className="back-to-catalog" onClick={onBack}>
          <ArrowLeft size={16} /> Back to shop
        </button>
        <p className="eyebrow">The Framecase Journal</p>
        <h1 className="content-page-title">Stories, Guides & Design</h1>
        <p className="content-page-subtitle">
          In-depth guides on our unique phone case designs, 9H tempered glass construction, and protective craftsmanship.
        </p>
      </div>

      <div className="blog-grid no-images">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="blog-card text-only"
            onClick={() => {
              setActivePost(post);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="blog-card-info">
              <div className="blog-card-meta">
                <span className="blog-badge-tag">{post.category}</span>
                <span><Calendar size={13} /> {post.date}</span>
                <span><Clock size={13} /> {post.readTime}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-read-link">
                <BookOpen size={14} /> Read full guide
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
