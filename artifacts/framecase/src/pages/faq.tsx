import { useState } from 'react';
import { ArrowLeft, ChevronDown, Mail, Instagram, HelpCircle } from 'lucide-react';

interface FaqPageProps {
  onBack: () => void;
}

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: 'Product & Materials',
    question: 'What materials are Framecase phone cases made of?',
    answer: 'Every Framecase design features a hybrid dual-layer construction: a premium 9H tempered glass back where the artwork is printed in high-definition beneath the glass, and flexible shockproof TPU (silicon) sides that wrap completely around the edges of your device to absorb drop impacts.',
  },
  {
    category: 'Product & Materials',
    question: 'Will the design peel off or fade over time?',
    answer: 'No! Because our designs are printed underneath the 9H tempered glass layer rather than on top of plastic, the artwork is completely shielded from keys, coins, oils, and everyday friction. The colours remain bright, deep, and scratch-free.',
  },
  {
    category: 'Product & Materials',
    question: 'Is the glass back fragile?',
    answer: '9H tempered glass is engineered for superior scratch resistance and everyday durability. It handles daily surface contact effortlessly. However, because it is genuine tempered glass, high-velocity drops onto rough concrete or sharp angles may crack the glass while shielding your smartphone.',
  },
  {
    category: 'Compatibility',
    question: 'Which phone brands and models do you support?',
    answer: 'We support hundreds of devices across Apple iPhone (from iPhone 11 up to latest iPhone 16 Pro Max), Samsung (S series, A series, Z Fold/Flip), OnePlus, Vivo, Oppo, Realme, Xiaomi, and Google Pixel. You can choose your exact brand and model on each design page.',
  },
  {
    category: 'Compatibility',
    question: 'Do Framecase cases support wireless charging?',
    answer: 'Yes, our glass cases maintain a slim profile that is fully compatible with standard Qi wireless chargers without needing to remove the case.',
  },
  {
    category: 'Pricing & Orders',
    question: 'What is the price of a Framecase?',
    answer: 'All our designer glass cases are currently offered at an accessible price of ₹299 (regularly ₹499/₹599) with complimentary delivery on qualifying orders across India.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'Where do you ship and how long does it take?',
    answer: 'We ship to all pin codes across India. Orders are typically processed and dispatched within 24–48 business hours. Delivery usually takes 3 to 6 business days depending on your location.',
  },
  {
    category: 'Shipping & Delivery',
    question: 'How do I track my order?',
    answer: 'Once your order has been dispatched, a tracking ID and shipping confirmation will be shared with you via email and SMS so you can monitor your parcel in real-time.',
  },
  {
    category: 'Returns & Support',
    question: 'What if I receive a damaged or incorrect case?',
    answer: 'We take utmost care in packaging our glass cases. In the rare event your case arrives damaged or with an incorrect model fit, reach out to us at nkeepson@gmail.com or via Instagram within 48 hours of delivery with a photo/video, and we will arrange a prompt replacement.',
  },
  {
    category: 'Returns & Support',
    question: 'How can I reach customer support?',
    answer: 'You can email our customer support team directly at nkeepson@gmail.com or send a direct message to our official Instagram page @framecase.in. We respond within 24 hours.',
  },
];

export function FaqPage({ onBack }: FaqPageProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Product & Materials', 'Compatibility', 'Shipping & Delivery', 'Pricing & Orders', 'Returns & Support'];

  const filteredFaqs = selectedCategory === 'All'
    ? faqs
    : faqs.filter((item) => item.category === selectedCategory);

  return (
    <div className="content-page-shell">
      <div className="content-page-header">
        <button type="button" className="back-to-catalog" onClick={onBack}>
          <ArrowLeft size={16} /> Back to shop
        </button>
        <p className="eyebrow">Help & Guidance</p>
        <h1 className="content-page-title">Frequently Asked Questions</h1>
        <p className="content-page-subtitle">
          Everything you need to know about Framecase glass phone covers, materials, shipping, and device compatibility.
        </p>
      </div>

      <div className="faq-category-filters">
        {categories.map((cat) => (
          <button
            type="button"
            key={cat}
            className={`faq-cat-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question-btn"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <div className="faq-question-text">
                  <span className="faq-badge">{faq.category}</span>
                  <h3>{faq.question}</h3>
                </div>
                <ChevronDown className={`faq-chevron ${isOpen ? 'rotate' : ''}`} size={18} />
              </button>
              {isOpen && (
                <div className="faq-answer-panel">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="faq-support-box">
        <div className="faq-support-icon"><HelpCircle size={24} /></div>
        <div className="faq-support-copy">
          <h3>Still have questions?</h3>
          <p>Our team is available every day to assist with orders and compatibility.</p>
        </div>
        <div className="faq-support-actions">
          <a href="mailto:nkeepson@gmail.com" className="secondary-button">
            <Mail size={16} /> Email Us
          </a>
          <a
            href="https://www.instagram.com/framecase.in?srtk=YWYzZDk4a3N2bWVl&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            className="secondary-button"
          >
            <Instagram size={16} /> DM on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
