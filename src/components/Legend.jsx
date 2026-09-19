import './Legend.css';

/**
 * Legend
 * ------
 * Floating overlay panel (bottom-left of the 3D canvas) showing:
 *  • Traffic status colour coding
 *  • Road type line thickness guide
 *
 * Props:
 *   statusFilter   – currently active status filter (null = all)
 *   onFilterChange – callback(status | null) when user clicks a status
 */

// Status items match SEGMENT_STATUS keys in mockNetwork.js
const STATUS_ITEMS = [
  { key: 'normal',   label: 'Free Flow',   color: '#22c55e' },
  { key: 'moderate', label: 'Moderate',    color: '#eab308' },
  { key: 'high',     label: 'High Congestion', color: '#f97316' },
  { key: 'severe',   label: 'Severe / Incident', color: '#ef4444' },
];

const TYPE_ITEMS = [
  { key: 'expressway', label: 'Expressway', thickness: 4, color: '#7dd3fc' },
  { key: 'arterial',   label: 'Arterial',   thickness: 3, color: '#94a3b8' },
  { key: 'collector',  label: 'Collector',  thickness: 2, color: '#64748b' },
  { key: 'local',      label: 'Local',      thickness: 1, color: '#475569' },
];

export default function Legend({ statusFilter = null, onFilterChange }) {
  const handleClick = (key) => {
    if (!onFilterChange) return;
    // Toggle off if already selected
    onFilterChange(statusFilter === key ? null : key);
  };

  return (
    <div className="legend">
      <div className="legend-title">Traffic Status</div>
      <div className="legend-items">
        {STATUS_ITEMS.map(({ key, label, color }) => (
          <div
            key={key}
            className="legend-item"
            onClick={() => handleClick(key)}
            title={statusFilter === key ? 'Click to clear filter' : `Filter: ${label}`}
            style={{ opacity: statusFilter && statusFilter !== key ? 0.4 : 1 }}
          >
            <div className="legend-swatch" style={{ background: color }} />
            <span className="legend-label">{label}</span>
          </div>
        ))}
      </div>

      <div className="legend-section-divider" />

      <div className="legend-title" style={{ marginBottom: 8 }}>Road Type</div>
      <div className="legend-items">
        {TYPE_ITEMS.map(({ key, label, thickness, color }) => (
          <div key={key} className="legend-type-item">
            <div className="legend-type-line" style={{ background: color, height: `${thickness}px` }} />
            <span className="legend-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
