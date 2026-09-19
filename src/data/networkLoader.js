import { REAL_NODES } from './realNodes';
import { REAL_SEGMENTS } from './realSegments';

export function loadNetworkData() {
  const nodesMap = new Map();

  // Initialize nodes
  REAL_NODES.forEach(node => {
    nodesMap.set(node.node_id, {
      ...node,
      segments: [] // Array of connected segments
    });
  });

  // Process segments
  const segmentsWithNodes = REAL_SEGMENTS.map(segment => {
    const source = nodesMap.get(segment.source_node);
    const target = nodesMap.get(segment.target_node);
    
    const enrichedSegment = {
      ...segment,
      sourceNodeObj: source,
      targetNodeObj: target
    };

    // Add segment to source and target nodes
    if (source) {
      source.segments.push(enrichedSegment);
    }
    if (target) {
      target.segments.push(enrichedSegment);
    }

    return enrichedSegment;
  });

  const validSegments = segmentsWithNodes.filter(s => s.sourceNodeObj && s.targetNodeObj);
  const invalidSegments = segmentsWithNodes.filter(s => !s.sourceNodeObj || !s.targetNodeObj);

  return {
    nodes: Array.from(nodesMap.values()),
    segments: validSegments,
    stats: {
      totalNodesLoaded: REAL_NODES.length,
      totalSegmentsLoaded: REAL_SEGMENTS.length,
      validConnections: validSegments.length,
      invalidConnections: invalidSegments.length
    }
  };
}
