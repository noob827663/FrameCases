import { ArrowLeft, FileText, CheckCircle2, Shield, HelpCircle, Mail, Instagram, MapPin, Globe } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="content-page-shell">
      <div className="content-page-header">
        <button type="button" className="back-to-catalog" onClick={onBack}>
          <ArrowLeft size={16} /> Back to shop
        </button>
        <p className="eyebrow">Legal & Agreements</p>
        <h1 className="content-page-title">Terms of Service</h1>
        <p className="content-page-subtitle">
          Please read these terms carefully before using our website. By visiting our website, browsing our products or placing an order, you agree to follow these Terms of Service.
        </p>
      </div>

      <div className="about-grid">
        <section className="about-card">
          <div className="about-card-icon"><Shield size={24} /></div>
          <h3>Affordable & Stylish Covers</h3>
          <p>
            FrameCase offers stylish, trendy and affordable mobile phone cases and accessories with transparent pricing in Indian Rupees (INR).
          </p>
        </section>

        <section className="about-card">
          <div className="about-card-icon"><CheckCircle2 size={24} /></div>
          <h3>Exact Phone Compatibility</h3>
          <p>
            Customers are responsible for selecting the correct phone model before checkout to ensure exact camera, button, and dimension fit.
          </p>
        </section>

        <section className="about-card">
          <div className="about-card-icon"><FileText size={24} /></div>
          <h3>Customer Support & Quality</h3>
          <p>
            Damaged, defective or incorrect products are handled promptly through our dedicated support channels in accordance with our return guidelines.
          </p>
        </section>
      </div>

      <div className="about-details-section">
        <div className="about-details-block">
          <h2>1. Introduction</h2>
          <p>
            Welcome to FrameCase!
          </p>
          <p>
            These Terms of Service govern your access to and use of the FrameCase website, including all purchases, services and other activities carried out through our platform.
          </p>
          <p>
            FrameCase is an online store offering stylish, trendy and affordable mobile phone cases and accessories. By visiting our website, browsing our products or placing an order, you agree to follow these Terms of Service.
          </p>
          <p>
            Please read these terms carefully before using our website. If you do not agree with any part of these terms, please discontinue using our website.
          </p>

          <h2>2. Use of Our Website</h2>
          <p>
            By accessing or using the FrameCase website, you agree to use our services responsibly and in accordance with these Terms of Service.
          </p>
          <p>You agree that:</p>
          <p>
            • The information you provide during checkout is accurate, complete and up to date.<br />
            • You will use our website only for lawful purposes.<br />
            • You will not misuse, damage or interfere with the functionality of our website.<br />
            • You will not attempt unauthorized access to our website, servers or systems.<br />
            • You will not use our website to engage in fraudulent activities or place orders using false information.
          </p>
          <p>
            We reserve the right to restrict access, refuse service or cancel orders if we identify fraudulent, suspicious or unauthorized activities.
          </p>

          <h2>3. Products and Product Information</h2>
          <p>
            FrameCase makes reasonable efforts to display accurate product descriptions, images, colours and other details.
          </p>
          <p>However, please understand that:</p>
          <p>
            • Actual product colours may vary slightly depending on your device’s screen settings and display quality.<br />
            • Product images are provided for reference and may differ slightly from the actual product.<br />
            • Minor variations in design, printing, finishing or appearance may occur.<br />
            • Product availability may change without prior notice.
          </p>
          <p>
            We aim to keep all product information accurate and updated. However, we cannot guarantee that every description or image will always be completely error-free.
          </p>

          <h2>4. Product Compatibility</h2>
          <p>
            Customers are responsible for selecting the correct phone model before placing an order.
          </p>
          <p>
            Different smartphone models may have different dimensions, camera placements, button positions and specifications, even if their names are similar.
          </p>
          <p>
            FrameCase is not responsible for compatibility issues resulting from selecting an incorrect phone model during checkout.
          </p>
          <p>
            We recommend checking your smartphone’s exact model name before purchasing a phone case.
          </p>
          <p>
            If you are unsure about compatibility, you can contact our customer support team before placing your order.
          </p>

          <h2>5. Pricing and Payments</h2>
          <p>
            All product prices displayed on our website are in Indian Rupees (INR), unless otherwise mentioned.
          </p>
          <p>
            We reserve the right to update product prices, discounts, offers and promotional campaigns at any time without prior notice.
          </p>
          <p>
            However, changes in prices will not normally affect orders that have already been confirmed.
          </p>
          <p>We may offer different payment options, including:</p>
          <p>
            • UPI payments.<br />
            • Debit and credit cards.<br />
            • Net banking.<br />
            • Other payment methods made available during checkout.
          </p>
          <p>
            All payments must be completed through the payment options provided on our website.
          </p>
          <p>
            FrameCase does not store complete debit card or credit card details on its servers. Payment processing may be handled by third-party payment service providers.
          </p>
          <p>
            We are not responsible for temporary payment gateway interruptions or technical issues caused by external payment providers.
          </p>

          <h2>6. Order Placement and Confirmation</h2>
          <p>
            When you place an order on FrameCase, you are making a purchase request for the selected products.
          </p>
          <p>
            After receiving your order, we may send an order confirmation through email, SMS or other available communication channels.
          </p>
          <p>
            Please note that an order confirmation does not always guarantee acceptance of the order.
          </p>
          <p>We reserve the right to cancel or reject an order in situations such as:</p>
          <p>
            • Incorrect product pricing or listing information.<br />
            • Product unavailability.<br />
            • Payment verification failure.<br />
            • Suspected fraudulent transactions.<br />
            • Incorrect or incomplete customer information.<br />
            • Technical errors affecting the ordering process.
          </p>
          <p>
            If an order is cancelled after successful payment, the amount paid will be refunded through the applicable refund process.
          </p>

          <h2>7. Shipping and Delivery</h2>
          <p>
            FrameCase aims to deliver products to customers across available serviceable locations in India.
          </p>
          <p>
            Orders are processed and shipped using available courier and logistics partners.
          </p>
          <p>Delivery timelines displayed on our website are estimates and may vary depending on:</p>
          <p>
            • Customer location.<br />
            • Courier partner availability.<br />
            • Weather conditions.<br />
            • Public holidays.<br />
            • Transportation delays.<br />
            • Other circumstances beyond our control.
          </p>
          <p>
            Once an order has been handed over to the courier partner, tracking information may be shared with the customer whenever available.
          </p>
          <p>
            Customers are responsible for providing accurate shipping details, including their full name, address, PIN code, email address and contact number.
          </p>
          <p>
            FrameCase will not be responsible for delivery problems caused by incorrect or incomplete shipping information provided by customers.
          </p>
          <p>
            For additional information, please refer to our Shipping Policy.
          </p>

          <h2>8. Order Cancellation</h2>
          <p>
            Customers may request order cancellation before the order has been dispatched.
          </p>
          <p>
            However, cancellation requests cannot be guaranteed once the order has been processed, packed or handed over to the courier partner.
          </p>
          <p>
            To request cancellation, customers should contact us as soon as possible using the contact details available on our website.
          </p>
          <p>
            If an eligible cancellation is approved after payment, the refund will be processed according to our Refund Policy.
          </p>

          <h2>9. Returns, Replacements and Refunds</h2>
          <p>
            Customer satisfaction is important to FrameCase.
          </p>
          <p>
            If you receive a damaged, defective or incorrect product, you may contact us to request assistance.
          </p>
          <p>
            All return, replacement and refund requests will be handled according to our Return and Refund Policy.
          </p>
          <p>Customers may be required to provide:</p>
          <p>
            • Order ID or order confirmation.<br />
            • Clear photographs or videos showing the issue.<br />
            • A brief description of the problem.<br />
            • Any additional information reasonably required to verify the claim.
          </p>
          <p>
            Returns or replacements may be subject to inspection and verification.
          </p>
          <p>
            FrameCase reserves the right to reject claims that are found to be fraudulent or do not meet the applicable return policy conditions.
          </p>
          <p>
            Nothing in these terms limits any consumer rights available under applicable Indian law.
          </p>
          <p>
            Please refer to our Return and Refund Policy for complete details.
          </p>

          <h2>10. Customer Responsibilities</h2>
          <p>
            Customers are responsible for ensuring that all information submitted during the ordering process is correct.
          </p>
          <p>This includes:</p>
          <p>
            • Correct product selection.<br />
            • Accurate phone model selection.<br />
            • Complete delivery address.<br />
            • Valid contact number.<br />
            • Correct email address.<br />
            • Accurate payment information.
          </p>
          <p>
            Customers should also ensure that someone is available to receive the delivery at the provided address.
          </p>
          <p>
            FrameCase will not be responsible for issues resulting from incorrect information supplied by customers.
          </p>

          <h2>11. Promotions, Discounts and Offers</h2>
          <p>
            FrameCase may introduce promotional offers, discount codes, seasonal sales or special deals from time to time.
          </p>
          <p>
            All promotions are subject to their respective conditions.
          </p>
          <p>
            We reserve the right to modify, suspend or discontinue promotional offers at any time.
          </p>
          <p>
            Discount codes may have specific validity periods, usage limits or product restrictions.
          </p>
          <p>
            Unless specifically mentioned, promotional offers cannot be exchanged for cash or combined with other discounts.
          </p>

          <h2>12. Intellectual Property</h2>
          <p>
            All content available on the FrameCase website, including but not limited to:
          </p>
          <p>
            • Website design and layout.<br />
            • Logos and brand identity.<br />
            • Text and product descriptions.<br />
            • Graphics and visual elements.<br />
            • Original photographs.<br />
            • Website content and other materials.
          </p>
          <p>
            is owned by FrameCase or used with appropriate permission, where applicable.
          </p>
          <p>
            You may not copy, reproduce, distribute, modify, publish or commercially use any website content without prior written permission.
          </p>
          <p>
            Unauthorized use of our intellectual property may result in appropriate legal action.
          </p>
          <p>
            Product designs, artwork and other materials belonging to their respective owners remain the property of those owners.
          </p>

          <h2>13. Third-Party Services and Links</h2>
          <p>
            Our website may contain links to third-party websites or use external services, including:
          </p>
          <p>
            • Payment gateways.<br />
            • Shipping and courier services.<br />
            • Analytics providers.<br />
            • Social media platforms.<br />
            • Other service providers.
          </p>
          <p>
            These third-party services operate independently and may have their own terms, privacy policies and conditions.
          </p>
          <p>
            FrameCase does not control the content, policies or operations of external websites.
          </p>
          <p>
            Customers are encouraged to review the applicable terms and privacy policies before using third-party services.
          </p>

          <h2>14. Website Availability and Security</h2>
          <p>
            We make reasonable efforts to keep the FrameCase website accessible, secure and functioning properly.
          </p>
          <p>
            However, we cannot guarantee uninterrupted website availability.
          </p>
          <p>Temporary interruptions may occur due to:</p>
          <p>
            • Website maintenance.<br />
            • Server issues.<br />
            • Technical errors.<br />
            • Internet connectivity problems.<br />
            • Security updates.<br />
            • Third-party service interruptions.
          </p>
          <p>
            We reserve the right to modify, suspend or discontinue any part of our website or services when necessary.
          </p>
          <p>
            We will make reasonable efforts to address technical problems and restore normal functionality.
          </p>

          <h2>15. Limitation of Liability</h2>
          <p>
            FrameCase makes reasonable efforts to provide a reliable shopping experience and accurate product information.
          </p>
          <p>
            However, to the extent permitted by applicable law, FrameCase shall not be liable for indirect or incidental losses arising from:
          </p>
          <p>
            • Temporary website downtime.<br />
            • Delays caused by courier partners.<br />
            • Third-party service interruptions.<br />
            • Incorrect information provided by customers.<br />
            • Unauthorized use of customer accounts due to compromised customer credentials.
          </p>
          <p>
            Nothing in this section excludes or limits liability where such exclusion or limitation is prohibited under applicable law, including liability relating to defective products, misleading representations or statutory consumer rights.
          </p>

          <h2>16. Indemnification</h2>
          <p>
            You agree not to misuse the FrameCase website or engage in activities that violate these Terms of Service or applicable laws.
          </p>
          <p>
            To the extent permitted by applicable law, you may be responsible for losses, claims or expenses arising directly from your unlawful activities, fraudulent conduct or violation of these terms.
          </p>
          <p>
            This section does not apply to the extent that a claim arises from the negligence, misconduct or legal violation of FrameCase.
          </p>

          <h2>17. Privacy and Personal Information</h2>
          <p>
            We respect the privacy of our customers.
          </p>
          <p>
            When you use our website or place an order, certain information may be collected, including:
          </p>
          <p>
            • Name.<br />
            • Email address.<br />
            • Contact number.<br />
            • Shipping and billing address.<br />
            • Order details.<br />
            • Payment transaction information.
          </p>
          <p>This information may be used for:</p>
          <p>
            • Processing and delivering orders.<br />
            • Sending order confirmations and updates.<br />
            • Providing customer support.<br />
            • Processing returns and refunds.<br />
            • Improving our website and services.<br />
            • Preventing fraudulent activities.<br />
            • Meeting applicable legal requirements.
          </p>
          <p>
            We do not sell customers’ personal information to third parties.
          </p>
          <p>
            Certain information may be shared with trusted service providers, such as payment processors and courier partners, when necessary to provide our services.
          </p>
          <p>
            For more information, please read our Privacy Policy.
          </p>

          <h2>18. Changes to These Terms</h2>
          <p>
            FrameCase reserves the right to update, modify or replace these Terms of Service whenever necessary.
          </p>
          <p>
            Any changes will be published on this page along with an updated revision date.
          </p>
          <p>
            Customers are encouraged to review this page periodically to stay informed about our latest terms and conditions.
          </p>
          <p>
            Continued use of our website after changes are published constitutes acceptance of the updated terms, to the extent permitted by applicable law.
          </p>

          <h2>19. Governing Law and Jurisdiction</h2>
          <p>
            These Terms of Service shall be governed by and interpreted in accordance with the laws of India.
          </p>
          <p>
            Any disputes arising in connection with the use of our website, products or services shall be handled in accordance with applicable Indian laws.
          </p>
          <p>
            Nothing in these terms affects the right of consumers to seek remedies before appropriate consumer dispute redressal authorities under applicable Indian consumer protection laws.
          </p>

          <h2>20. Contact Information</h2>
          <p>
            If you have any questions, concerns or complaints regarding these Terms of Service, products or orders, you can contact us through the following channels:
          </p>
          <p>
            <strong>Business Name:</strong> FrameCase<br />
            <strong>Location:</strong> Goa, India<br />
            <strong>Website:</strong> <a href="https://framecase.in" target="_blank" rel="noreferrer">www.framecase.in</a><br />
            <strong>Email:</strong> <a href="mailto:nkeepson@gmail.com">nkeepson@gmail.com</a>
          </p>
          <p>
            We will make reasonable efforts to respond to customer enquiries and resolve issues as quickly as possible.
          </p>

          <div style={{ marginTop: '36px', padding: '24px', background: 'var(--cream)', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 800 }}>Thank you for choosing FrameCase!</h3>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#475451' }}>
              We appreciate your trust and support. Our goal is to provide stylish, affordable products and a smooth shopping experience for every customer.
            </p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
              FrameCase – Style Your Phone, Your Way.
            </p>
          </div>
        </div>

        <div className="contact-box">
          <h3>Contact & Support</h3>
          <p>Our team is available every day to assist with orders, device fit questions, and policy inquiries.</p>
          <div className="contact-links">
            <div className="contact-item">
              <MapPin size={18} />
              <span>Goa, India</span>
            </div>
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
            <a href="https://framecase.in" className="contact-item">
              <Globe size={18} />
              <span>www.framecase.in</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
