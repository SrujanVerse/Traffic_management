import { useEffect, useState } from 'react';
import './TopBar.css';

/**
 * TopBar
 * ------
 * Application header bar: project identity, live clock, system status,
 * and high-level network summary stats.
 *
 * Props:
 *   segmentCount  – total road segments in current network
 *   nodeCount     – total nodes
 *   incidentCount – number of active incidents (placeholder, always 0 for now)
 */
export default function TopBar({ segmentCount = 0, nodeCount = 0, incidentCount = 0 }) {
  const [now, setNow] = useState(new Date());

  // Live clock – updates every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = now.toLocaleTimeString('en-IN', { hour12: false });
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric',
  });

  return (
    <header className="topbar">

      {/* ── Left: Project identity ── */}
      <div className="topbar-left">
        <div className="topbar-badge">
          {/* Traffic network icon (SVG inline – no external deps) */}
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6"  cy="6"  r="2" />
            <circle cx="18" cy="6"  r="2" />
            <circle cx="6"  cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
            <circle cx="12" cy="12" r="2" />
            <line x1="8"  y1="6"  x2="10" y2="12" />
            <line x1="16" y1="6"  x2="14" y2="12" />
            <line x1="8"  y1="18" x2="10" y2="12" />
            <line x1="16" y1="18" x2="14" y2="12" />
          </svg>
        </div>
        <div>
          <div className="topbar-title">Urban Traffic Flow &amp; Incident Intelligence</div>
          <div className="topbar-subtitle">Decision Support System · Traffic Control Authority</div>
        </div>
      </div>

      {/* ── Centre: System status + network stats ── */}
      <div className="topbar-centre">
        <div className="status-pill">
          <div className="status-dot" />
          <span className="status-text">System Online</span>
        </div>

        <div className="topbar-divider" />

        <div className="topbar-stat">
          <span className="topbar-stat-value">{nodeCount}</span>
          <span className="topbar-stat-label">Nodes</span>
        </div>

        <div className="topbar-divider" />

        <div className="topbar-stat">
          <span className="topbar-stat-value">{segmentCount}</span>
          <span className="topbar-stat-label">Segments</span>
        </div>

        <div className="topbar-divider" />

        {/* Incident counter – placeholder, always 0 until incident layer added */}
        <div className="topbar-stat">
          <span className="topbar-stat-value" style={{ color: incidentCount > 0 ? '#f97316' : '#e2e8f0' }}>
            {incidentCount}
          </span>
          <span className="topbar-stat-label">Active Incidents</span>
        </div>
      </div>

      {/* ── Right: Clock + mode indicator ── */}
      <div className="topbar-right">
        <div className="topbar-clock">
          <div className="topbar-time">{timeStr}</div>
          <div className="topbar-date">{dateStr}</div>
        </div>
        <div className="topbar-mode">
          <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="5" cy="5" r="5" />
          </svg>
          Live Monitor
        </div>
      </div>

    </header>
  );
}
