import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../lib/utils';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState<string>('Performance Marketing (Google & Meta PPC)');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 130,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffcc00', '#3b82f6', '#60a5fa', '#ffffff'],
    });
    setIsSubmitted(true);
    const msg = `Hi Grow Big Marketers, I submitted a project quote request.\n\nService: ${selectedService}\nName: ${fullName}\nCompany: ${company || 'N/A'}\nEmail: ${email}\nPhone: ${phone}\nProject Goals: ${details || 'N/A'}`;
    openWhatsApp(msg);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleReset}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '2.5rem' }}>
        {/* Close button */}
        <button
          onClick={handleReset}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {!isSubmitted ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>
                <Sparkles size={14} /> Start Your Project With Grow Big
              </span>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                Get a Custom <span style={{ color: '#ffcc00' }}>Project Quote</span>
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Tell us about your business goals and we will prepare a tailored proposal & technology roadmap.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Select Service Needed *</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="form-select"
                >
                  <option value="Performance Marketing (Google & Meta PPC)">Performance Marketing (Google & Meta PPC)</option>
                  <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                  <option value="Social Media Marketing & Reels">Social Media Marketing & Reels</option>
                  <option value="Conversion Rate Optimization (CRO)">Conversion Rate Optimization (CRO)</option>
                  <option value="Lead Generation & Funnels">Lead Generation & Sales Funnels</option>
                  <option value="Brand Strategy & Content Marketing">Brand Strategy & Content Marketing</option>
                  <option value="Local Google Business & Maps SEO">Local Google Business & Maps SEO</option>
                  <option value="E-Commerce Performance Ads">E-Commerce Performance Ads & Scale</option>
                  <option value="Influencer Marketing Campaigns">Influencer Marketing Campaigns</option>
                  <option value="Full-Funnel Digital Growth Audit">Full-Funnel Digital Growth Audit</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Smith"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Global Inc."
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9493898990"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Details / Goals</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Tell us a little bit about your project timeline, requirements, or goals..."
                  className="form-textarea"
                />
              </div>

              <div
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.825rem',
                  color: '#60a5fa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <ShieldCheck size={16} /> Confidential & Non-Disclosure Protected. Direct hotline: {WHATSAPP_DISPLAY_PHONE}
              </div>

              {/* Instant WhatsApp Action Pill */}
              <button
                type="button"
                onClick={() =>
                  openWhatsApp(
                    `Hi Grow Big Marketers, I would like to inquire directly on WhatsApp about ${selectedService}.`
                  )
                }
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#25D366',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.925rem',
                  cursor: 'pointer',
                  marginBottom: '0.85rem',
                  boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.175.2-.351.225-.652.075-.3-.15-1.267-.467-2.414-1.489-.893-.797-1.496-1.782-1.671-2.083-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.232-.244-.586-.492-.506-.676-.516l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.91 1.228 3.111.15.201 2.119 3.236 5.133 4.54.717.311 1.277.497 1.714.636.721.229 1.377.197 1.896.12.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.126-.275-.201-.576-.351zM12.04 2C6.517 2 2.028 6.488 2.028 12.012c0 1.792.47 3.535 1.365 5.068L2 22l5.05-1.326c1.477.807 3.14 1.233 4.989 1.233 5.522 0 10.012-4.488 10.012-10.012 0-2.67-1.04-5.18-2.929-7.07A9.95 9.95 0 0 0 12.04 2z" />
                </svg>
                <span>Chat Directly on WhatsApp ({WHATSAPP_DISPLAY_PHONE})</span>
              </button>

              <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '0.85rem' }}>
                Submit & Connect via WhatsApp <ArrowRight size={16} />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(255, 204, 0, 0.2)',
                border: '2px solid #ffcc00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
              }}
            >
              <CheckCircle2 size={40} color="#ffcc00" />
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Project Request Submitted!
            </h3>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Thank you <strong style={{ color: 'var(--text-primary)' }}>{fullName}</strong>. Our team will review your inquiry for <strong style={{ color: '#ffcc00' }}>{selectedService}</strong> and respond to you immediately on WhatsApp at <strong style={{ color: '#25D366' }}>{phone || WHATSAPP_DISPLAY_PHONE}</strong>.
            </p>

            <button
              onClick={() => openWhatsApp(`Hi Grow Big Marketers, I submitted a project request for ${selectedService}.`)}
              style={{
                width: '100%',
                padding: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                marginBottom: '0.85rem',
              }}
            >
              Open WhatsApp Chat Now
            </button>

            <button onClick={handleReset} className="btn btn-gold" style={{ width: '100%' }}>
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
