import './RoadDetailsPanel.css';
import { MOCK_METRICS } from '../data/mockNetwork';

/**
 * RoadDetailsPanel
 * ----------------
 * Right-side contextual panel shown when a road segment is selected.
 * Displays segment ID, status, type, connection nodes, and traffic metrics.
 *
 * Props:
 *   segment  – the selected segment object { id, source, target, status, type }
 *              or null when nothing is selected
 *   onClose  – callback to deselect the current segment
 *
 * DATA NOTE:
 *   Traffic metrics are read from MOCK_METRICS (mockNetwork.js).
 *   When real data is connected, replace MOCK_METRICS with API/CSV values
 *   passed in through props or a data context.
 */

// Colour map for status badges – keep in sync with statusColor in Network3D
const STATUS_STYLE = {
  normal:   { background: 'rgba(34,197,94,0.15)',  color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)'  },
  moderate: { background: 'rgba(234,179,8,0.15)',  color: '#eab308', border: '1px solid rgba(234,179,8,0.3)'  },
  high:     { background: 'rgba(249,115,22,0.15)', color: '#f97316', border: '1px solid rgba(249,115,22,0.3)' },
  severe:   { background: 'rgba(239,68,68,0.15)',  color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)'  },
};

const STATUS_LABEL = {
  normal:   'Free Flow',
  moderate: 'Moderate',
  high:     'High Congestion',
  severe:   'Severe / Incident',
};

export default function RoadDetailsPanel({ segment, onClose }) {
  // ── Empty state ──────────────────────────────────────────────
  if (!segment) {
    return (
      <aside className="rdp">
        <div className="rdp-empty">
          <div className="rdp-empty-icon">
            {/* Road / segment icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l6-6 4 4 8-8" />
              <circle cx="3"  cy="17" r="1.5" fill="#334155" stroke="none" />
              <circle cx="21" cy="7"  r="1.5" fill="#334155" stroke="none" />
            </svg>
          </div>
          <div className="rdp-empty-title">No Segment Selected</div>
          <div className="rdp-empty-hint">
            Click any road segment in the 3D view to inspect its traffic metrics.
          </div>
        </div>
      </aside>
    );
  }

  // ── Populated state ──────────────────────────────────────────
  const metrics  = MOCK_METRICS[segment.id] || { speed: '—', flow: '—', queue: '—', delay: '—' };
  const badgeStyle = STATUS_STYLE[segment.status] || STATUS_STYLE.normal;

  return (
    <aside className="rdp">

      {/* Header */}
      <div className="rdp-header">
        <div className="rdp-header-left">
          <div className="rdp-segment-id">{segment.id}</div>
          <div className="rdp-segment-type">{segment.type} road</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="rdp-status-badge" style={badgeStyle}>
            {STATUS_LABEL[segment.status] || segment.status}
          </div>
          <button className="rdp-close" onClick={onClose} title="Deselect segment">✕</button>
        </div>
      </div>

      {/* Body */}
      <div className="rdp-body">

        {/* Connection */}
        <div>
          <div className="rdp-section-title">Connection</div>
          <div className="rdp-connection">
            <div className="rdp-node-chip">{segment.source}</div>
            <div className="rdp-arrow">→</div>
            <div className="rdp-node-chip">{segment.target}</div>
          </div>
        </div>

        {/* Traffic metrics */}
        <div>
          <div className="rdp-section-title">Traffic Metrics</div>
          <div className="rdp-metrics">

            <div className="rdp-metric">
              <div className="rdp-metric-label">Speed</div>
              <div className="rdp-metric-value">
                {metrics.speed}<span className="rdp-metric-unit">km/h</span>
              </div>
            </div>

            <div className="rdp-metric">
              <div className="rdp-metric-label">Flow</div>
              <div className="rdp-metric-value">
                {metrics.flow}<span className="rdp-metric-unit">veh/h</span>
              </div>
            </div>

            <div className="rdp-metric">
              <div className="rdp-metric-label">Queue</div>
              <div className="rdp-metric-value">
                {metrics.queue}<span className="rdp-metric-unit">veh</span>
              </div>
            </div>

            <div className="rdp-metric">
              <div className="rdp-metric-label">Delay</div>
              <div className="rdp-metric-value">
                {metrics.delay}<span className="rdp-metric-unit">min</span>
              </div>
            </div>

          </div>
        </div>

        {/* Placeholder sections – to be filled in later stages */}
        <div>
          <div className="rdp-section-title">Forecast</div>
          <div style={{
            padding: '10px 12px', background: 'rgba(30,58,95,0.1)',
            border: '1px dashed #1e3a5f', borderRadius: 6,
            fontSize: 11, color: '#334155', textAlign: 'center'
          }}>
            AI forecast — available in Stage 2
          </div>
        </div>

        <div>
          <div className="rdp-section-title">Recommendations</div>
          <div style={{
            padding: '10px 12px', background: 'rgba(30,58,95,0.1)',
            border: '1px dashed #1e3a5f', borderRadius: 6,
            fontSize: 11, color: '#334155', textAlign: 'center'
          }}>
            Signal & routing recommendations — Stage 3
          </div>
        </div>

        {/* Demo data disclaimer */}
        <div className="rdp-demo-note">
          ⚠ DEMO DATA — All metrics above are synthetic placeholders.
          Real values will be loaded from the provided dataset in Stage 2.
        </div>

      </div>
    </aside>
  );
}
