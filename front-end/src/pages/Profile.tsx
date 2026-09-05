import React from 'react';
import { User as UserIcon, Mail, Phone, Building2 } from 'lucide-react';
import { useCurrentUser } from '../api';
import { LoadingState, ErrorState } from '../components/StateViews';

export default function Profile() {
  const { data: user, loading, error, refetch } = useCurrentUser();

  if (loading) return <LoadingState message="Loading user profile..." />;
  if (error || !user) return <ErrorState error={error || 'User profile not found'} onRetry={refetch} />;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">User Profile</h1>
          <p className="page__description">
            Authorized Account & Bidder Profile Settings
          </p>
        </div>
      </div>

      <div className="page__body">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <UserIcon size={36} />
            )}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p style={{ fontWeight: 600, color: 'var(--color-govt-blue)' }}>{user.designation}</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <Mail size={14} /> {user.email}
            </p>
          </div>
        </div>

        <div className="page__card">
          <h3 className="page__card-title">Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">FULL NAME</div>
              <div className="info-value">{user.name}</div>
            </div>
            <div className="info-item">
              <div className="info-label">OFFICIAL EMAIL</div>
              <div className="info-value">{user.email}</div>
            </div>
            <div className="info-item">
              <div className="info-label">PHONE NUMBER</div>
              <div className="info-value">{user.phone}</div>
            </div>
            <div className="info-item">
              <div className="info-label">SYSTEM ROLE</div>
              <div className="info-value">{user.role}</div>
            </div>
            <div className="info-item">
              <div className="info-label">LOCATION</div>
              <div className="info-value">{user.location || 'New Delhi, India'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
