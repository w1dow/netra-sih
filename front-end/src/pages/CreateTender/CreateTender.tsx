import React from 'react';
import { FilePlus, Save, X } from 'lucide-react';
import '../Pages.css';

export default function CreateTenderPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Tender creation functionality will be connected to the backend in a future update.');
  };

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Create New Tender</h1>
          <p className="page__description">
            Publish a new government procurement tender for bidder participation.
          </p>
        </div>
      </div>
      <div className="page__body">
        <form onSubmit={handleSubmit}>
          <div className="page__card">
            <h2 className="page__card-title">Tender Details</h2>

            <div className="form-group">
              <label className="form-label" htmlFor="tender-title">Tender Title</label>
              <input id="tender-title" className="form-input" type="text" placeholder="e.g. Supply and Installation of Smart Surveillance Systems" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="tender-dept">Department</label>
                <select id="tender-dept" className="form-select">
                  <option value="">Select Department</option>
                  <option>Ministry of Electronics & IT</option>
                  <option>Ministry of Defence</option>
                  <option>Ministry of Health & Family Welfare</option>
                  <option>Ministry of Road Transport & Highways</option>
                  <option>Ministry of Railways</option>
                  <option>Ministry of New & Renewable Energy</option>
                  <option>Ministry of Education</option>
                  <option>Ministry of Housing & Urban Affairs</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="tender-category">Category</label>
                <select id="tender-category" className="form-select">
                  <option value="">Select Category</option>
                  <option>Infrastructure</option>
                  <option>IT & Electronics</option>
                  <option>Healthcare</option>
                  <option>Defence & Security</option>
                  <option>Transportation</option>
                  <option>Education</option>
                  <option>Energy</option>
                  <option>Public Works</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="tender-location">Location</label>
                <input id="tender-location" className="form-input" type="text" placeholder="e.g. New Delhi" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="tender-value">Estimated Value (₹)</label>
                <input id="tender-value" className="form-input" type="text" placeholder="e.g. 2,40,00,000" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="tender-deadline">Bid Deadline</label>
                <input id="tender-deadline" className="form-input" type="datetime-local" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="tender-id">Tender ID</label>
                <input id="tender-id" className="form-input" type="text" placeholder="Auto-generated" disabled style={{ opacity: 0.5 }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="tender-desc">Description</label>
              <textarea id="tender-desc" className="form-textarea" placeholder="Provide a detailed description of the procurement requirement..." />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn--primary">
                <Save size={16} />
                Publish Tender
              </button>
              <button type="button" className="btn btn--secondary" onClick={() => window.history.back()}>
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
