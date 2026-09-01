import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import '../Pages.css';

const categories = [
  { name: 'IT & Electronics', rate: 97, color: 'var(--color-green)' },
  { name: 'Infrastructure', rate: 94, color: 'var(--color-green)' },
  { name: 'Healthcare', rate: 91, color: 'var(--color-green)' },
  { name: 'Defence & Security', rate: 88, color: 'var(--color-amber)' },
  { name: 'Energy', rate: 95, color: 'var(--color-green)' },
  { name: 'Transportation', rate: 92, color: 'var(--color-green)' },
];

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const volumes = [65,72,58,84,91,78,95,88,102,96,110,108];

export default function AnalyticsPage() {
  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-inner">
          <h1 className="page__title">Procurement Analytics</h1>
          <p className="page__description">
            Monitor procurement performance, compliance trends, and key operational metrics.
          </p>
        </div>
      </div>
      <div className="page__body">
        <div className="page__stats-grid">
          <div className="page__stat-card">
            <div className="page__stat-value" style={{color:'var(--color-green)',display:'flex',alignItems:'center',justifyContent:'center',gap:'4px'}}><TrendingUp size={20}/>18.3%</div>
            <div className="page__stat-label">Tender Volume Growth</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value">₹4,280 Cr</div>
            <div className="page__stat-label">Total Procurement Value</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value" style={{color:'var(--color-green)',display:'flex',alignItems:'center',justifyContent:'center',gap:'4px'}}><TrendingDown size={20}/>42%</div>
            <div className="page__stat-label">Manual Review Reduction</div>
          </div>
          <div className="page__stat-card">
            <div className="page__stat-value">3.2 days</div>
            <div className="page__stat-label">Avg Processing Time</div>
          </div>
        </div>

        <div className="page__card">
          <h2 className="page__card-title">Compliance by Category</h2>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--space-4)',marginTop:'var(--space-4)'}}>
            {categories.map(item=>(
              <div key={item.name}>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'var(--font-size-sm)',marginBottom:'var(--space-1)'}}>
                  <span style={{fontWeight:500}}>{item.name}</span>
                  <span style={{fontWeight:700,color:item.color}}>{item.rate}%</span>
                </div>
                <div style={{height:'8px',background:'var(--color-light-bg)',borderRadius:'var(--radius-full)',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${item.rate}%`,background:item.color,borderRadius:'var(--radius-full)'}}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="page__card">
          <h2 className="page__card-title">Monthly Tender Volume</h2>
          <div style={{display:'flex',alignItems:'flex-end',gap:'var(--space-2)',height:'200px',marginTop:'var(--space-4)',paddingBottom:'var(--space-4)',borderBottom:'1px solid var(--color-border)'}}>
            {volumes.map((val,i)=>(
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'var(--space-1)'}}>
                <div style={{width:'100%',maxWidth:'40px',height:`${(val/110)*160}px`,background:i===11?'var(--color-saffron)':'var(--color-govt-blue)',borderRadius:'var(--radius-sm) var(--radius-sm) 0 0',opacity:i===11?1:0.7}}/>
                <span style={{fontSize:'10px',color:'var(--color-text-light)'}}>{months[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
