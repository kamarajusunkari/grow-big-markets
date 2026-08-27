import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [selectedService, setSelectedService] = useState<string>('Web Development');
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
                  marginBottom: '1.5rem',
                }}
              >
                <ShieldCheck size={16} /> Confidential & Non-Disclosure Protected. Direct hotline: +91 9493898990
              </div>

              <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '0.85rem' }}>
                Submit Quote Request <ArrowRight size={16} />
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
              Thank you <strong style={{ color: 'var(--text-primary)' }}>{fullName}</strong>. Our team will review your inquiry for <strong style={{ color: '#ffcc00' }}>{selectedService}</strong> and reach out to you at <strong style={{ color: '#60a5fa' }}>{email}</strong> within 2 hours.
            </p>

            <button onClick={handleReset} className="btn btn-gold" style={{ width: '100%' }}>
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
