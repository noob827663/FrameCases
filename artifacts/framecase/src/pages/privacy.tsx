import { ArrowLeft, Lock, Eye, ShieldCheck, Mail, Instagram, MapPin, Globe, Calendar } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="content-page-shell">
      <div className="content-page-header">
        <button type="button" className="back-to-catalog" onClick={onBack}>
          <ArrowLeft size={16} /> Back to shop
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '12px', fontFamily: 'DM Mono, monospace', marginTop: '12px' }}>
          <Calendar size={14} /> Last Updated: 4 November 2026
        </div>
        <h1 className="content-page-title">Privacy Policy</h1>
        <p className="content-page-subtitle">
          Your privacy is important to us. This Privacy Policy explains how FrameCase collects, uses, stores, processes and protects your personal information when you visit our website, browse our products or place an order.
        </p>
      </div>

      <div className="about-grid">
        <section className="about-card">
          <div className="about-card-icon"><Lock size={24} /></div>
          <h3>Responsible Data Handling</h3>
          <p>
            We are committed to handling your personal information responsibly and taking reasonable technical steps to protect it against unauthorized access.
          </p>
        </section>

        <section className="about-card">
          <div className="about-card-icon"><Eye size={24} /></div>
          <h3>We Never Sell Your Data</h3>
          <p>
            FrameCase does not sell customers’ personal information to third parties. Data is shared only with trusted delivery and payment partners to fulfill orders.
          </p>
        </section>

        <section className="about-card">
          <div className="about-card-icon"><ShieldCheck size={24} /></div>
          <h3>Customer Privacy Rights</h3>
          <p>
            You have the right to access, correct, or request deletion of your personal data by reaching out to our support team at any time.
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
            Your privacy is important to us. This Privacy Policy explains how FrameCase collects, uses, stores, processes and protects your personal information when you visit our website, browse our products or place an order.
          </p>
          <p>
            FrameCase is an online store offering stylish, trendy and affordable mobile phone cases and accessories.
          </p>
          <p>
            By accessing or using our website, you acknowledge that your information may be collected and processed as described in this Privacy Policy.
          </p>
          <p>
            We are committed to handling your personal information responsibly and taking reasonable steps to protect it.
          </p>
          <p>
            Please read this Privacy Policy carefully to understand our practices.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            When you visit or use our website, we may collect different types of information depending on how you interact with our services.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '18px 0 8px' }}>A. Personal Information</h3>
          <p>When you place an order or contact us, we may collect:</p>
          <p>
            • Full name.<br />
            • Email address.<br />
            • Mobile number.<br />
            • Shipping address.<br />
            • Billing address, where applicable.<br />
            • PIN code.<br />
            • Order details and purchase history.
          </p>
          <p>
            This information is primarily used to process orders, arrange deliveries and provide customer support.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '18px 0 8px' }}>B. Payment Information</h3>
          <p>
            When you make a purchase, payment-related information may be processed through third-party payment service providers.
          </p>
          <p>
            Depending on the payment method, this may include transaction IDs, payment status and other necessary transaction details.
          </p>
          <p>
            FrameCase does not intentionally store complete debit card or credit card details on its own servers. Such information is generally handled by the respective payment gateway.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '18px 0 8px' }}>C. Technical Information</h3>
          <p>
            When you visit our website, certain technical information may be automatically collected, including:
          </p>
          <p>
            • IP address.<br />
            • Browser type and version.<br />
            • Device information.<br />
            • Operating system.<br />
            • Website usage information.<br />
            • Pages visited.<br />
            • Date and time of website visits.<br />
            • Referring website or source.
          </p>
          <p>
            This information helps us understand website performance, identify technical issues and improve the shopping experience.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>
            We collect and use customer information for legitimate business purposes, including:
          </p>
          <p>
            <strong>Order Processing:</strong><br />
            • Confirming and processing customer orders.<br />
            • Verifying payment transactions.<br />
            • Preparing products for dispatch.<br />
            • Managing order cancellations and returns.
          </p>
          <p>
            <strong>Shipping and Delivery:</strong><br />
            • Sharing necessary delivery information with courier partners.<br />
            • Generating shipping labels.<br />
            • Providing tracking information.<br />
            • Coordinating successful deliveries.
          </p>
          <p>
            <strong>Customer Support:</strong><br />
            • Responding to customer enquiries.<br />
            • Resolving complaints.<br />
            • Assisting with damaged, defective or incorrect products.<br />
            • Providing updates regarding orders.
          </p>
          <p>
            <strong>Website Improvement:</strong><br />
            • Understanding customer preferences.<br />
            • Improving website functionality.<br />
            • Monitoring website performance.<br />
            • Identifying and fixing technical issues.
          </p>
          <p>
            <strong>Marketing and Communication:</strong><br />
            • Sending promotional messages, offers and product updates where permitted.<br />
            • Informing customers about new collections.<br />
            • Sharing important business announcements.<br />
            <em>You may opt out of promotional communications at any time.</em>
          </p>
          <p>
            <strong>Security and Fraud Prevention:</strong><br />
            • Detecting suspicious transactions.<br />
            • Preventing unauthorized activities.<br />
            • Protecting our website and customers.<br />
            • Meeting applicable legal obligations.
          </p>

          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            Our website may use cookies and similar technologies to improve your browsing experience. Cookies are small files stored on your device when you visit a website.
          </p>
          <p>We may use cookies for the following purposes:</p>
          <p>
            • Remembering website preferences.<br />
            • Maintaining shopping cart information.<br />
            • Understanding website traffic.<br />
            • Improving website performance.<br />
            • Measuring marketing and advertising effectiveness.<br />
            • Providing a better browsing experience.
          </p>
          <p>
            You can manage or disable cookies through your browser settings. However, disabling certain cookies may affect some website features, including shopping cart functionality and checkout.
          </p>
          <p>
            Third-party services integrated into our website may also use their own cookies or tracking technologies according to their respective privacy policies.
          </p>

          <h2>5. Sharing of Personal Information</h2>
          <p>
            FrameCase does not sell customers’ personal information to third parties.
          </p>
          <p>
            However, we may share certain information with trusted third-party service providers when necessary to operate our business and fulfil customer orders. These may include:
          </p>
          <p>
            <strong>A. Payment Gateway Providers:</strong> Payment information may be shared with payment processors to complete transactions, verify payments and process refunds.<br />
            <strong>B. Courier and Delivery Partners:</strong> We share customer name, contact number, shipping address, PIN code, and order details to arrange product delivery.<br />
            <strong>C. Website Hosting and Technical Service Providers:</strong> Our website relies on secure infrastructure and technical services to maintain website functionality and security.<br />
            <strong>D. Analytics and Advertising Services:</strong> To understand website traffic, improve marketing campaigns and measure performance according to their privacy policies.<br />
            <strong>E. Legal Authorities:</strong> When required by applicable law, legal proceedings, government authorities or valid legal requests.
          </p>
          <p>
            We aim to share only the information reasonably necessary for the relevant purpose.
          </p>

          <h2>6. Data Storage and Security</h2>
          <p>
            We take reasonable technical and organizational measures to protect customer information against unauthorized access, misuse, alteration, disclosure or destruction.
          </p>
          <p>Depending on the systems we use, security measures may include:</p>
          <p>
            • Secure website connections (HTTPS).<br />
            • Restricted access to customer information.<br />
            • Secure payment processing through payment providers.<br />
            • Appropriate server and database security measures.<br />
            • Monitoring for suspicious activities.
          </p>
          <p>
            However, no method of electronic storage or internet transmission can be guaranteed to be completely secure. While we make reasonable efforts to protect your information, we cannot guarantee absolute security.
          </p>

          <h2>7. Data Retention</h2>
          <p>
            We retain personal information only for as long as reasonably necessary to fulfil the purposes described in this Privacy Policy.
          </p>
          <p>For example:</p>
          <p>
            • Order information may be retained for order management and customer support.<br />
            • Transaction records may be retained for accounting and legal requirements.<br />
            • Customer communication records may be retained to resolve complaints or enquiries.<br />
            • Technical information may be retained for security and analytical purposes.
          </p>
          <p>
            When personal information is no longer required, we will take reasonable steps to delete it or anonymize it, subject to applicable legal retention requirements.
          </p>

          <h2>8. Customer Privacy Rights</h2>
          <p>
            Depending on applicable laws, customers may have certain rights regarding their personal information:
          </p>
          <p>
            <strong>Right to Access:</strong> You may request information about the personal data we process about you.<br />
            <strong>Right to Correction:</strong> You may request correction of inaccurate or incomplete personal information.<br />
            <strong>Right to Erasure:</strong> You may request deletion of personal information when it is no longer required for its intended purpose, subject to applicable legal requirements.<br />
            <strong>Right to Withdraw Consent:</strong> Where processing is based on your consent, you may withdraw that consent.<br />
            <strong>Right to Raise a Complaint:</strong> You may contact us if you have concerns about how your personal information is handled.
          </p>
          <p>
            To exercise these rights, please contact us using the details provided in the Contact Information section. We may need to verify your identity before processing certain requests.
          </p>

          <h2>9. Third-Party Websites and Services</h2>
          <p>
            Our website may contain links to external websites, applications or services, including payment gateways, courier tracking pages, Instagram and other social media platforms.
          </p>
          <p>
            FrameCase does not control the privacy practices, content or security policies of these third-party services. When you visit an external website, its own privacy policy and terms of service will apply. We recommend reviewing their policies before sharing personal information.
          </p>

          <h2>10. Marketing Communications</h2>
          <p>
            FrameCase may occasionally send promotional communications regarding new phone case designs, special discounts, limited-time offers, seasonal promotions, and new product launches in accordance with applicable consent and communication requirements.
          </p>
          <p>
            If you no longer wish to receive promotional messages, you may unsubscribe using the available unsubscribe option or contact us directly. Opting out of promotional communications will not prevent essential transactional messages (such as order confirmations and delivery updates).
          </p>

          <h2>11. Children’s Privacy</h2>
          <p>
            We do not intentionally collect personal information for purposes unrelated to providing our services. We take reasonable steps to handle personal information responsibly and in accordance with applicable privacy laws.
          </p>
          <p>
            If you believe that personal information has been collected or processed improperly, you may contact us to request assistance.
          </p>

          <h2>12. International Data Processing</h2>
          <p>
            Some third-party service providers used by our website may operate servers or infrastructure outside India. As a result, certain information may be processed or stored in other countries, depending on the services being used. Where applicable, such processing will be subject to relevant data protection requirements and safeguards.
          </p>

          <h2>13. Changes to This Privacy Policy</h2>
          <p>
            FrameCase reserves the right to update or modify this Privacy Policy whenever necessary to reflect changes in business operations, new features, third-party updates, or regulatory improvements.
          </p>
          <p>
            Any updates will be published on this page along with a revised Last Updated date. We encourage customers to review this page periodically.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            If you have questions, concerns, complaints or requests regarding this Privacy Policy or the handling of your personal information, you can contact us through the following channels:
          </p>
          <p>
            <strong>Business Name:</strong> FrameCase<br />
            <strong>Location:</strong> Goa, India<br />
            <strong>Website:</strong> <a href="https://framecase.in" target="_blank" rel="noreferrer">www.framecase.in</a><br />
            <strong>Email:</strong> <a href="mailto:nkeepson@gmail.com">nkeepson@gmail.com</a>
          </p>
          <p>
            We will make reasonable efforts to review and respond to privacy-related requests within the applicable timelines.
          </p>

          <div style={{ marginTop: '36px', padding: '24px', background: 'var(--cream)', borderRadius: '12px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 800 }}>Your Privacy Matters to Us</h3>
            <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#475451' }}>
              At FrameCase, we value the trust you place in our business. We are committed to handling your information responsibly and providing a safe, convenient and reliable online shopping experience.
            </p>
            <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#475451' }}>
              Thank you for shopping with FrameCase!
            </p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
              FrameCase – Style Your Phone, Your Way.
            </p>
          </div>
        </div>

        <div className="contact-box">
          <h3>Privacy Inquiries</h3>
          <p>Have questions about your data or how our privacy practices work? Feel free to reach out to our team.</p>
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
