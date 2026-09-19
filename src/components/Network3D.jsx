import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport, Text } from '@react-three/drei';
import * as THREE from 'three';
import './Network3D.css';

// ─────────────────────────────────────────────────────────────
// CONSTANTS & SCALING
// ─────────────────────────────────────────────────────────────
// Real dataset grid is approx x: 0-11, y: 0-9
const SCALE = 12;
const OFFSET_X = 5.5 * SCALE;
const OFFSET_Z = 4.5 * SCALE;

function getWorldPos(node) {
  return new THREE.Vector3(
    node.x * SCALE - OFFSET_X,
    0,
    node.y * SCALE - OFFSET_Z
  );
}

const CLASS_RADIUS = {
  arterial: 0.6,
  collector: 0.3,
  local: 0.2
};
const CLASS_COLOR = {
  arterial: '#3b82f6',
  collector: '#22c55e',
  local: '#64748b'
};

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENT: LABEL
// ─────────────────────────────────────────────────────────────
function DistanceLabel({ position, text, threshold, yOffset = 2, fontSize = 1.2 }) {
  const ref = useRef();
  useFrame(({ camera }) => {
    if (ref.current) {
      const dist = camera.position.distanceTo(position);
      ref.current.visible = dist < threshold;
      ref.current.quaternion.copy(camera.quaternion); // billboard
    }
  });
  return (
    <Text 
      ref={ref} 
      position={[position.x, position.y + yOffset, position.z]} 
      fontSize={fontSize} 
      color="white" 
      outlineWidth={0.1} 
      outlineColor="black" 
      anchorY="bottom"
      renderOrder={10}
    >
      {text}
    </Text>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENT: single road segment
// ─────────────────────────────────────────────────────────────
function RoadSegment({ segment, isSelected, onSelect }) {
  const meshRef = useRef();
  
  const sourceNode = segment.sourceNodeObj;
  const targetNode = segment.targetNodeObj;

  const { curve, midPos } = useMemo(() => {
    if (!sourceNode || !targetNode) return { curve: null, midPos: null };
    const start = getWorldPos(sourceNode);
    const end = getWorldPos(targetNode);
    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      0.5,
      (start.z + end.z) / 2
    );
    return { 
      curve: new THREE.QuadraticBezierCurve3(start, mid, end),
      midPos: mid 
    };
  }, [sourceNode, targetNode]);

  if (!curve) return null;

  const radius = CLASS_RADIUS[segment.road_class] || 0.3;
  const baseColor = CLASS_COLOR[segment.road_class] || '#ffffff';

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect({ type: 'segment', data: segment });
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <tubeGeometry args={[curve, 12, isSelected ? radius * 1.5 : radius, 6, false]} />
        <meshStandardMaterial
          color={isSelected ? '#ffffff' : baseColor}
          emissive={isSelected ? baseColor : baseColor}
          emissiveIntensity={isSelected ? 0.8 : 0.2}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      
      {/* Label for Road ID (only shown when zoomed in) */}
      <DistanceLabel position={midPos} text={segment.segment_id} threshold={60} yOffset={1.5} fontSize={1.0} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENT: single node
// ─────────────────────────────────────────────────────────────
function NetworkNode({ node, isSelected, onSelect }) {
  const pos = useMemo(() => getWorldPos(node), [node]);
  
  return (
    <group position={pos}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect({ type: 'node', data: node });
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[isSelected ? 1.5 : 1.0, 16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#ffffff" : "#1d4ed8"}
          emissive={isSelected ? "#1d4ed8" : "#1d4ed8"}
          emissiveIntensity={isSelected ? 0.8 : 0.4}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
      
      {/* Label for Node ID */}
      <DistanceLabel position={new THREE.Vector3(0,0,0)} text={node.node_id} threshold={90} yOffset={1.5} fontSize={1.5} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENT: camera reset
// ─────────────────────────────────────────────────────────────
function CameraResetButton({ controlsRef }) {
  const { camera } = useThree();
  const resetCamera = useCallback(() => {
    camera.position.set(0, 120, 120);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [camera, controlsRef]);

  useMemo(() => {
    window.__trafficResetCamera = resetCamera;
  }, [resetCamera]);

  return null;
}

// ─────────────────────────────────────────────────────────────
// MAIN SCENE
// ─────────────────────────────────────────────────────────────
function SceneContents({ nodes, segments, selectedItem, statusFilter, onSelectItem }) {
  const controlsRef = useRef();

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[40, 60, 40]} intensity={0.8} />
      <pointLight position={[-30, 40, -30]} intensity={0.4} color="#4fc3f7" />
      <pointLight position={[30, 20, 30]} intensity={0.3} color="#818cf8" />

      <gridHelper args={[200, 25, '#0f2a4a', '#0a1e36']} position={[0, -0.5, 0]} />

      {segments.map(seg => (
        <RoadSegment
          key={seg.segment_id}
          segment={seg}
          isSelected={selectedItem?.type === 'segment' && selectedItem.data.segment_id === seg.segment_id}
          onSelect={onSelectItem}
        />
      ))}

      {nodes.map(node => (
        <NetworkNode 
          key={node.node_id} 
          node={node} 
          isSelected={selectedItem?.type === 'node' && selectedItem.data.node_id === node.node_id}
          onSelect={onSelectItem}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.07}
        minDistance={10}
        maxDistance={300}
        maxPolarAngle={Math.PI / 2.1}
      />

      <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
        <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
      </GizmoHelper>

      <CameraResetButton controlsRef={controlsRef} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export default function Network3D({
  nodes = [],
  segments = [],
  selectedItem,
  statusFilter,
  onSelectItem,
}) {
  return (
    <div className="network3d-container">
      <button
        className="network3d-reset-btn"
        onClick={() => window.__trafficResetCamera?.()}
        title="Reset camera to default view"
      >
        ↺ Reset View
      </button>

      <Canvas
        camera={{ position: [0, 120, 120], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#050b14' }}
        onPointerMissed={() => onSelectItem(null)}
      >
        <SceneContents
          nodes={nodes}
          segments={segments}
          selectedItem={selectedItem}
          statusFilter={statusFilter}
          onSelectItem={onSelectItem}
        />
      </Canvas>
    </div>
  );
}
