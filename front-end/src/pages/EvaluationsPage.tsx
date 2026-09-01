import React from 'react';
import { BarChart3, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import './Pages.css';

const evaluations = [
  { tender: 'GEM/2026/PROC/01842', title: 'Smart Surveillance Systems', bidders: 12, completed: 8, status: 'In Progress', compliance: '87%' },
  { tender: 'GEM/2026/PROC/01856', title: 'NH-48 Extension', bidders: 6, completed: 6, status: 'Completed', compliance: '94%' },
  { tender: 'GEM/2026/PROC/01873', title: 'Modular ICU Equipment', bidders: 15, completed: 15, status: 'Completed', compliance: '91%' },
  { tender: 'GEM/2026/PROC/01901', title: 'Armoured Vehicle Maintenance', bidders: 4, completed: 2, status: 'In Progress', compliance: '78%' },
  { tender: 'GEM/2026/PROC/01915', title: 'Solar Power Plant 50MW', bidders: 9, completed: 0, status: 'Pending', compliance: '—' },
];

export default function EvaluationsPage() {
  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Bid Evaluations</h1>
          <p className="page__description">
            Track the progress and results of bid evaluations across all active tenders.
          </p>
        </div>
      </div>
      <div className="page__body">
        <div className="page__stats-grid">
          <div className="page__stat-card">
            <div className="page__stat-value">8,932</div>
            <div className="page__stat-label">Total Evaluations</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value">342</div>
            <div className="page__stat-label">In Progress</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value">96.4%</div>
            <div className="page__stat-label">Avg Compliance</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value">2.3 hrs</div>
            <div className="page__stat-label">Avg Review Time</div>
          </div>
        </div>

        <div className="page__card">
          <h2 className="page__card-title">Recent Evaluations</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--font-size-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left' }}>
                  {['Tender ID', 'Title', 'Bidders', 'Evaluated', 'Compliance', 'Status'].map(h => (
                    <th key={h} style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontSize: 'var(--font-size-xs)', letterSpacing: '0.04em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {evaluations.map((ev, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-border-light)', transition: 'background 0.15s' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-light-bg)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', fontFamily: 'monospace', fontSize: 'var(--font-size-xs)', color: 'var(--color-govt-blue)' }}>{ev.tender}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 500 }}>{ev.title}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-secondary)' }}>{ev.bidders}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-secondary)' }}>{ev.completed}/{ev.bidders}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)', fontWeight: 600, color: 'var(--color-deep-navy)' }}>{ev.compliance}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-4)' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '2px 8px', borderRadius: 'var(--radius-sm)',
                        fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
                        background: ev.status === 'Completed' ? 'var(--color-green-bg)' : ev.status === 'In Progress' ? 'var(--color-amber-bg)' : 'var(--color-light-bg)',
                        color: ev.status === 'Completed' ? 'var(--color-green)' : ev.status === 'In Progress' ? 'var(--color-amber)' : 'var(--color-text-secondary)',
                      }}>
                        {ev.status === 'Completed' ? <CheckCircle size={12} /> : ev.status === 'In Progress' ? <Clock size={12} /> : <AlertCircle size={12} />}
                        {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
