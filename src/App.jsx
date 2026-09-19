import { useState, useMemo } from 'react';
import './App.css';

import TopBar           from './components/TopBar';
import Network3D        from './components/Network3D';
import Legend           from './components/Legend';
import DetailsPanel     from './components/DetailsPanel';
import { loadNetworkData } from './data/networkLoader';

export default function App() {
  // item can be { type: 'node', data: Node } or { type: 'segment', data: Segment } or null
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  const network = useMemo(() => loadNetworkData(), []);

  return (
    <div className="app-root">
      <TopBar
        nodeCount={network.nodes.length}
        segmentCount={network.segments.length}
        incidentCount={0}
      />

      <div className="app-content">
        <div className="network-container">
          <Network3D
            nodes={network.nodes}
            segments={network.segments}
            selectedItem={selectedItem}
            statusFilter={statusFilter}
            onSelectItem={setSelectedItem}
          />

          <Legend
            statusFilter={statusFilter}
            onFilterChange={setStatusFilter}
          />
          
          {/* Debug / Validation UI (Task 10) */}
          <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.7)', color: 'white', padding: '10px', zIndex: 10, fontSize: '12px', borderRadius: '4px', border: '1px solid #444', pointerEvents: 'none' }}>
            <h4 style={{ margin: '0 0 5px 0' }}>Data Validation</h4>
            <div>Nodes loaded: {network.stats.totalNodesLoaded}</div>
            <div>Segments loaded: {network.stats.totalSegmentsLoaded}</div>
            <div style={{ color: network.stats.validConnections > 0 ? '#4ade80' : 'inherit' }}>Valid Connections: {network.stats.validConnections}</div>
            <div style={{ color: network.stats.invalidConnections > 0 ? '#f87171' : 'inherit' }}>Invalid Connections: {network.stats.invalidConnections}</div>
          </div>
        </div>

        <DetailsPanel
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </div>
  );
}
