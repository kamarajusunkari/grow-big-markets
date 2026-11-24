import React from 'react';
import { WHATSAPP_DISPLAY_PHONE, openWhatsApp } from '../lib/utils';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp('Hi Grow Big Marketers, I would like to chat with your team on WhatsApp.');
  };

  return (
    <div
      className="floating-whatsapp-root"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 990,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        className="floating-whatsapp-btn"
        aria-label={`Chat on WhatsApp with Grow Big Marketers at ${WHATSAPP_DISPLAY_PHONE}`}
        title={`WhatsApp: ${WHATSAPP_DISPLAY_PHONE}`}
      >
        <span className="floating-whatsapp-pulse" aria-hidden="true" />
        <span className="floating-whatsapp-icon">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.951 1.18-.175.2-.351.225-.652.075-.3-.15-1.267-.467-2.414-1.489-.893-.797-1.496-1.782-1.671-2.083-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.3-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.926-2.232-.244-.586-.492-.506-.676-.516l-.576-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.91 1.228 3.111.15.201 2.119 3.236 5.133 4.54.717.311 1.277.497 1.714.636.721.229 1.377.197 1.896.12.578-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.126-.275-.201-.576-.351zM12.04 2C6.517 2 2.028 6.488 2.028 12.012c0 1.792.47 3.535 1.365 5.068L2 22l5.05-1.326c1.477.807 3.14 1.233 4.989 1.233 5.522 0 10.012-4.488 10.012-10.012 0-2.67-1.04-5.18-2.929-7.07A9.95 9.95 0 0 0 12.04 2z" />
          </svg>
        </span>
        <span className="floating-whatsapp-label">
          <span className="floating-whatsapp-headline">Chat on WhatsApp</span>
          <span className="floating-whatsapp-number">{WHATSAPP_DISPLAY_PHONE}</span>
        </span>
      </button>

      <style>{`
        .floating-whatsapp-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #25D366;
          color: #ffffff;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          padding: 8px 18px 8px 12px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(37, 211, 102, 0.45), 0 4px 12px rgba(0, 0, 0, 0.12);
          transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          text-decoration: none;
        }

        .floating-whatsapp-btn:hover {
          transform: translateY(-3px) scale(1.03);
          background: #20bd5a;
          box-shadow: 0 16px 36px rgba(37, 211, 102, 0.55), 0 6px 16px rgba(0, 0, 0, 0.16);
        }

        .floating-whatsapp-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 9999px;
          border: 2px solid #25D366;
          opacity: 0.7;
          animation: waPulse 2.4s infinite cubic-bezier(0.24, 0, 0.38, 1);
          pointer-events: none;
        }

        @keyframes waPulse {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.15);
            opacity: 0;
          }
          100% {
            transform: scale(1.15);
            opacity: 0;
          }
        }

        .floating-whatsapp-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: #ffffff;
          color: #25D366;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .floating-whatsapp-label {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.15;
          text-align: left;
        }

        .floating-whatsapp-headline {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #ffffff;
        }

        .floating-whatsapp-number {
          font-size: 11px;
          font-weight: 600;
          opacity: 0.92;
          color: #ffffff;
          font-family: 'IBM Plex Mono', monospace;
        }

        @media (max-width: 768px) {
          .floating-whatsapp-root {
            bottom: 20px !important;
            right: 16px !important;
          }

          .floating-whatsapp-btn {
            padding: 8px !important;
            gap: 0 !important;
            border-radius: 50% !important;
            width: 54px !important;
            height: 54px !important;
            justify-content: center !important;
          }

          .floating-whatsapp-label {
            display: none !important;
          }

          .floating-whatsapp-icon {
            width: 36px !important;
            height: 36px !important;
          }
        }
      `}</style>
    </div>
  );
};
