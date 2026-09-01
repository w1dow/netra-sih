import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  Calendar,
  Globe,
  Accessibility,
  Menu,
  X,
  User,
  LogIn,
} from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '@/data';
import { useCurrentUser, useUnreadCount } from '@/hooks';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const { data: user } = useCurrentUser();
  const { data: unreadCount = 0 } = useUnreadCount();

  const userName = user?.name || 'Rajesh Kumar';

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
          <Link to="/notifications" className="navbar__icon-btn" aria-label="Notifications" title="Notifications">
            <Bell size={18} />
            {(unreadCount ?? 0) > 0 && <span className="navbar__badge">{unreadCount}</span>}
          </Link>
          <Link to="/calendar" className="navbar__icon-btn" aria-label="Calendar" title="Procurement Calendar">
            <Calendar size={18} />
          </Link>
          <button className="navbar__icon-btn" aria-label="Language" title="Language selector">
            <Globe size={18} />
          </button>
          <button className="navbar__icon-btn" aria-label="Accessibility options" title="Accessibility">
            <Accessibility size={18} />
          </button>

          {/* Login / Profile */}
          <Link to="/profile" className="navbar__profile" aria-label={`Profile: ${userName}`} title="Go to profile">
            <div className="navbar__avatar">
              <User size={16} />
            </div>
            <span className="navbar__profile-name">{userName}</span>
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
              to="/notifications"
              className="navbar__mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Notifications ({unreadCount})
            </Link>
            <Link
              to="/calendar"
              className="navbar__mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calendar Schedule
            </Link>
            <Link
              to="/profile"
              className="navbar__mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Profile
            </Link>
            <Link
              to="/login"
              className="navbar__mobile-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In (Express Auth)
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
