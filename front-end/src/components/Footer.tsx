import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { footerSections } from '@/data';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      {/* Accent line */}
      <div className="footer__accent" aria-hidden="true" />

      <div className="footer__container container">
        {/* Branding */}
        <div className="footer__brand">
          <Logo variant="light" size="md" />
          <p className="footer__tagline">
            AI-powered bid compliance verification for transparent, accountable and efficient
            government procurement.
          </p>
        </div>

        {/* Link sections */}
        <div className="footer__sections">
          {footerSections.map((section) => (
            <div key={section.title} className="footer__section">
              <h4 className="footer__section-title">{section.title}</h4>
              <ul className="footer__list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} NETRA — National Evaluation & Tender Risk Assessment.
            All rights reserved.
          </p>
          <p className="footer__disclaimer">
            This is a demonstration platform. Not affiliated with any government body.
          </p>
        </div>
      </div>
    </footer>
  );
}
