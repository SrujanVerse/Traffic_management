import './RoadDetailsPanel.css'; // Let's keep reusing the same CSS file for now

export default function DetailsPanel({ item, onClose }) {
  if (!item) {
    return (
      <aside className="rdp">
        <div className="rdp-empty">
          <div className="rdp-empty-title">No Item Selected</div>
          <div className="rdp-empty-hint">
            Click any road segment or node in the 3D view to inspect its details.
          </div>
        </div>
      </aside>
    );
  }

  const { type, data } = item;

  if (type === 'node') {
    return (
      <aside className="rdp">
        <div className="rdp-header">
          <div className="rdp-header-left">
            <div className="rdp-segment-id">Node: {data.node_id}</div>
          </div>
          <button className="rdp-close" onClick={onClose} title="Deselect">✕</button>
        </div>
        <div className="rdp-body">
          <div>
            <div className="rdp-section-title">Coordinates</div>
            <div style={{ fontSize: '13px', color: '#1e293b' }}>
              Grid: ({data.x}, {data.y}) <br/>
              Geo: {data.lat.toFixed(4)}, {data.lon.toFixed(4)}
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <div className="rdp-section-title">Connected Segments ({data.segments.length})</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px' }}>
              {data.segments.map(seg => (
                <li key={seg.segment_id} style={{ marginBottom: '4px', background: '#f1f5f9', color: '#1e293b', padding: '4px', borderRadius: '4px' }}>
                  {seg.segment_id} : {seg.source_node} → {seg.target_node}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    );
  }

  if (type === 'segment') {
    return (
      <aside className="rdp">
        <div className="rdp-header">
          <div className="rdp-header-left">
            <div className="rdp-segment-id">Road: {data.segment_id}</div>
            <div className="rdp-segment-type">{data.road_class}</div>
          </div>
          <button className="rdp-close" onClick={onClose} title="Deselect">✕</button>
        </div>
        <div className="rdp-body">
          <div>
            <div className="rdp-section-title">Connection</div>
            <div className="rdp-connection">
              <div className="rdp-node-chip">{data.source_node}</div>
              <div className="rdp-arrow">→</div>
              <div className="rdp-node-chip">{data.target_node}</div>
            </div>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <div className="rdp-section-title">Road Attributes</div>
            <div className="rdp-metrics">
              <div className="rdp-metric">
                <div className="rdp-metric-label">Lanes</div>
                <div className="rdp-metric-value">{data.lanes}</div>
              </div>
              <div className="rdp-metric">
                <div className="rdp-metric-label">Length</div>
                <div className="rdp-metric-value">{data.length_km}<span className="rdp-metric-unit">km</span></div>
              </div>
              <div className="rdp-metric">
                <div className="rdp-metric-label">Speed Limit</div>
                <div className="rdp-metric-value">{data.free_flow_speed_kmh}<span className="rdp-metric-unit">km/h</span></div>
              </div>
              <div className="rdp-metric">
                <div className="rdp-metric-label">Capacity</div>
                <div className="rdp-metric-value">{data.capacity_vph}<span className="rdp-metric-unit">vph</span></div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return null;
}
