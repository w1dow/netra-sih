import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  Calendar,
  Globe,
  Accessibility,
  Menu,
  X,
  ChevronDown,
  User,
} from 'lucide-react';
import Logo from './Logo';
import { navLinks, currentUser } from '@/data';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className={`navbar ${isHome ? 'navbar--transparent' : 'navbar--solid'}`} role="banner">
      <a href="#main-content" className="sr-only" style={{ position: 'absolute' }}>
        Skip to main content
      </a>
      <div className="navbar__container container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="NETRA Home">
          <Logo variant={isHome ? 'light' : 'dark'} size="md" />
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`navbar__link ${location.pathname === link.href ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" aria-label="Notifications" title="Notifications">
            <Bell size={18} />
            <span className="navbar__badge">3</span>
          </button>
          <button className="navbar__icon-btn" aria-label="Calendar" title="Calendar">
            <Calendar size={18} />
          </button>
          <button className="navbar__icon-btn" aria-label="Language" title="Language selector">
            <Globe size={18} />
          </button>
          <button className="navbar__icon-btn" aria-label="Accessibility options" title="Accessibility">
            <Accessibility size={18} />
          </button>

          {/* Profile */}
          <Link to="/profile" className="navbar__profile" aria-label={`Profile: ${currentUser.name}`} title="Go to profile">
            <div className="navbar__avatar">
              <User size={16} />
            </div>
            <span className="navbar__profile-name">{currentUser.name}</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="navbar__hamburger"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-menu" role="navigation" aria-label="Mobile navigation">
          <nav className="navbar__mobile-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`navbar__mobile-link ${location.pathname === link.href ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/profile"
              className="navbar__mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
