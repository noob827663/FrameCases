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
  imageUrl: string;
  content: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'the-anatomy-of-9h-glass-cases',
    title: 'The Anatomy of 9H Glass Phone Cases: Why Hybrid Protection Wins',
    category: 'Materials & Engineering',
    date: 'February 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Explore how combining 9H scratch-resistant tempered glass with shock-absorbent TPU borders creates the ultimate in-hand experience for modern smartphones.',
    content: [
      'Smartphones have evolved into sleek slabs of precision-machined aluminum, titanium, and glass. Yet for years, phone cases have been stuck in the past — thick matte plastics, silicone sleeves that collect lint, or flimsy covers where designs scrape off within a month.',
      'Enter the 9H tempered glass hybrid case. By bonding an optical-grade 9H tempered glass backplate with flexible shock-absorbing TPU sides, we preserve the tactile, cool touch of your smartphone while providing vital drop cushioning.',
      'Why 9H hardness matters: On the Mohs hardness scale, 9H tempered glass resists scratches from everyday hazards like keys, coins, and desktop grit. Furthermore, because artwork is sublimated beneath the glass rather than printed onto the exterior, the colors will never rub off or yellow over time.',
      'Precision bevels and tactile buttons: Our TPU borders are contoured to offer tactile grip in hands while shielding camera modules and edge screens from face-down falls. It is the perfect harmony between aesthetic beauty and daily protection.'
    ]
  },
  {
    id: '2',
    slug: 'styling-your-tech-everyday-essentials',
    title: 'Style Your Everyday Tech: How to Choose a Case That Fits Your Mood',
    category: 'Style & Trends',
    date: 'February 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Your phone case is the one accessory you look at dozens of times each day. Here is our guide to matching cases with your personal wardrobe and workspace aesthetic.',
    content: [
      'Think about the objects you interact with most frequently: your keys, your wallet, your watch, and your phone. Among all these items, your phone case is the single most visible canvas you carry into meetings, dinners, and daily commutes.',
      'For minimalist workspaces: Monochrome typography, geometric grids, and architectural sketches offer a polished, intentional presence alongside laptops and notebooks.',
      'For bold personalities: Streetwear culture, motorsport icons, and vivid Japanese anime graphics turn your phone into a statement piece that catches eyes across the room.',
      'At ₹299 per case, building a seasonal capsule rotation is easier than ever. Swap from a clean aesthetic design on weekday mornings to high-energy graphics for weekend adventures.'
    ]
  },
  {
    id: '3',
    slug: 'how-to-care-for-glass-phone-cases',
    title: 'How to Keep Your Glossy Glass Phone Case Flawless for Years',
    category: 'Care Guide',
    date: 'January 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Simple maintenance tips to keep the glossy shine fingerprint-free and ensure long-term durability for your Framecase tempered glass cover.',
    content: [
      'One of the greatest joys of owning a tempered glass case is that deep, radiant shine that catches the light like a luxury timepiece. Keeping it in mint condition takes just a few thoughtful habits.',
      '1. Regular gentle cleaning: A simple microfiber cloth (the kind used for eyeglasses or camera lenses) is all you need to wipe away fingerprint smudges and restore high-gloss luster.',
      '2. Avoid harsh chemical cleaners: Never use acetone, bleach, or abrasive scouring pads. A slightly damp cloth with mild soapy water will easily remove stubborn dirt.',
      '3. Proper installation: Slide your phone in top-first, gently seating the volume and power buttons, then press the bottom corners into place. To remove, push gently from the camera cutout corner rather than twisting the frame.'
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
          <div className="blog-article-hero-image">
            <img src={activePost.imageUrl} alt={activePost.title} />
          </div>

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
          Insights on product engineering, contemporary tech aesthetics, and protective case craftsmanship.
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="blog-card"
            onClick={() => {
              setActivePost(post);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="blog-card-image">
              <img src={post.imageUrl} alt={post.title} loading="lazy" />
              <span className="blog-card-badge">{post.category}</span>
            </div>
            <div className="blog-card-info">
              <div className="blog-card-meta">
                <span><Calendar size={13} /> {post.date}</span>
                <span><Clock size={13} /> {post.readTime}</span>
              </div>
              <h3 className="blog-card-title">{post.title}</h3>
              <p className="blog-card-excerpt">{post.excerpt}</p>
              <div className="blog-read-link">
                <BookOpen size={14} /> Read article
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
