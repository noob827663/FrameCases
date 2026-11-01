import { Sparkles, Shield, Heart, Mail, Instagram, ArrowLeft } from 'lucide-react';

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
        <p className="eyebrow">Our Philosophy</p>
        <h1 className="content-page-title">Cases with a point of view.</h1>
        <p className="content-page-subtitle">
          At Framecase, we believe the device you carry everyday deserves more than an afterthought. It deserves a frame.
        </p>
      </div>

      <div className="about-grid">
        <section className="about-card">
          <div className="about-card-icon"><Shield size={24} /></div>
          <h3>The 9H Glass Standard</h3>
          <p>
            Unlike conventional printed plastic covers that scratch, peel, and discolor within weeks, every Framecase design is sealed beneath a high-grade 9H tempered glass back. The art remains vibrant, glossy, and as crisp as day one.
          </p>
        </section>

        <section className="about-card">
          <div className="about-card-icon"><Sparkles size={24} /></div>
          <h3>Form Meets Impact Protection</h3>
          <p>
            Around the glass back lies a shock-absorbing, tactile TPU bumper with precise cutouts and responsive tactile buttons. Designed for everyday defense against drops, bumps, and scratches while keeping a slim in-hand profile.
          </p>
        </section>

        <section className="about-card">
          <div className="about-card-icon"><Heart size={24} /></div>
          <h3>Curated for Every Mood</h3>
          <p>
            From minimalist aesthetics and typography to automotive culture and spiritual motifs, our collections reflect modern personal expression. We drop fresh designs weekly so your device never looks ordinary.
          </p>
        </section>
      </div>

      <div className="about-details-section">
        <div className="about-details-block">
          <h2>Crafted For Everyday Life</h2>
          <p>
            Founded with the belief that design and protection don't have to be mutually exclusive, Framecase combines precision manufacturing with contemporary artistic sensibilities. Each case undergoes rigorous quality inspection before dispatch to ensure zero bubbles, clean edges, and flawless print fidelity.
          </p>
          <p>
            We ship all across India with dedicated support ready to help you find the exact fit for your phone model—whether you're holding the latest iPhone, a flagship Samsung Galaxy, OnePlus, or popular devices from Vivo, Oppo, and Realme.
          </p>
        </div>

        <div className="contact-box">
          <h3>Get In Touch</h3>
          <p>Have a question about a phone model, order inquiry, or collaboration?</p>
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
