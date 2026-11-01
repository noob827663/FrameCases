import { Sparkles, Shield, Heart, Mail, Instagram, ArrowLeft, Palette, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="content-page-shell">
      <div className="content-page-header">
        <button type="button" className="back-to-catalog" onClick={onBack}>
          <ArrowLeft size={16} /> Back to shop
        </button>
        <p className="eyebrow">The Framecase Story</p>
        <h1 className="content-page-title">Cases with a point of view.</h1>
        <p className="content-page-subtitle">
          Engineered with mirror-gloss 9H tempered glass and striking visual artwork, Framecase transforms everyday smartphones into eye-catching designer essentials.
        </p>
      </div>

      <div className="about-grid">
        <section className="about-card">
          <div className="about-card-icon"><Palette size={24} /></div>
          <h3>Unique & Attractive Designs</h3>
          <p>
            We don’t do generic patterns. Every case design is an exclusive aesthetic piece—from high-energy motorsport and supercar graphics to nostalgic retro Japanese collages, expressive typography, celestial astrology, and modern minimalist art.
          </p>
        </section>

        <section className="about-card">
          <div className="about-card-icon"><Shield size={24} /></div>
          <h3>High-Gloss 9H Tempered Glass</h3>
          <p>
            Unlike printed matte plastics that fade, yellow, or scratch, our artwork is sealed beneath a scratch-resistant 9H optical tempered glass plate. The result is a luminous, high-definition gloss finish that stays pristine year after year.
          </p>
        </section>

        <section className="about-card">
          <div className="about-card-icon"><Sparkles size={24} /></div>
          <h3>Protective Shockproof TPU Bumpers</h3>
          <p>
            Beneath the stunning glass back lies a flexible, impact-absorbing TPU silicon bumper with tactile button covers, reinforced drop corners, and a raised 1.2mm camera rim designed to protect your device during everyday drops.
          </p>
        </section>
      </div>

      <div className="about-details-section">
        <div className="about-details-block">
          <h2>Crafted To Stand Out</h2>
          <p>
            Your smartphone is the most personal tech item you own. It rests on your desk in meetings, joins you at dinners, and accompanies every journey. We founded Framecase because standard phone cases are either bulky and uninspired or cheap and fragile.
          </p>
          <p>
            By fusing luxury glass aesthetics with reliable everyday impact defense, we deliver phone cases that feel incredible in hand and turn heads wherever you go. All cases are offered at an accessible price of ₹299 with support for over 100+ phone models across iPhone, Samsung, OnePlus, Vivo, Oppo, Realme, and Pixel.
          </p>
          <div className="about-highlights-list">
            <div><CheckCircle2 size={16} /> <span>Ultra-vibrant, non-fading sub-surface graphics</span></div>
            <div><CheckCircle2 size={16} /> <span>Cool-to-the-touch premium glass tactile experience</span></div>
            <div><CheckCircle2 size={16} /> <span>Reinforced impact corners with responsive tactile buttons</span></div>
            <div><CheckCircle2 size={16} /> <span>Precision camera cutouts with 1.2mm raised protective lips</span></div>
          </div>
        </div>

        <div className="contact-box">
          <h3>Contact & Support</h3>
          <p>Have questions about your phone model, order status, or design suggestions? We are here to help!</p>
          <div className="contact-links">
            <a href="mailto:nkeepson@gmail.com" className="contact-item">
              <Mail size={18} />
              <span>nkeepson@gmail.com</span>
            </a>
            <a
              href="https://www.instagram.com/framecase.in?srtk=YWYzZDk4a3N2bWVl&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <Instagram size={18} />
              <span>@framecase.in on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
