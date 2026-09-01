import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Calendar, User, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '../constants';
import { useNotifications, useCurrentUser } from '../api';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: notifications } = useNotifications();
  const { data: user } = useCurrentUser();

  const unreadCount = notifications ? notifications.filter((n) => !n.read).length : 0;

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__brand" onClick={() => setMobileMenuOpen(false)}>
          <Logo size="md" />
        </Link>

        {/* Desktop Links */}
        <nav className="navbar__nav" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <Link to="/calendar" className="navbar__action-btn" title="Events & Deadlines">
            <Calendar size={19} />
          </Link>

          <Link to="/notifications" className="navbar__action-btn navbar__action-btn--badge" title="Notifications">
            <Bell size={19} />
            {unreadCount > 0 && <span className="navbar__badge">{unreadCount}</span>}
          </Link>

          <Link to={user ? '/profile' : '/login'} className="navbar__profile-btn">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="navbar__avatar-img" />
            ) : (
              <div className="navbar__avatar-fallback">
                <User size={16} />
              </div>
            )}
            <span className="navbar__user-name">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
          </Link>

          <button
            className="navbar__toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-drawer">
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
          </nav>
        </div>
      )}
    </header>
  );
}
