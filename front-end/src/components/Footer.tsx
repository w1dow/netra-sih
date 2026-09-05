import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { footerSections } from '../constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <Logo size="md" />
            <p className="footer__tagline">
              National Evaluation & Tender Audit Platform — Empowering transparent, AI-driven public procurement for government agencies and enterprise bidders.
            </p>

            <div className="footer__compliance-notice">
              <span className="footer__badge">GOVERNMENT STANDARD</span>
              <span>Compliant with GFR 2017 & GeM Guidelines</span>
            </div>
          </div>

          {footerSections.map((sec) => (
            <div key={sec.title} className="footer__col">
              <h4 className="footer__col-title">{sec.title}</h4>
              <ul className="footer__list">
                {sec.links.map((link) => (
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

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} NETRA Platform. All rights reserved.</p>
          <div className="footer__bottom-links">
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Express JS & MySQL Backend</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
