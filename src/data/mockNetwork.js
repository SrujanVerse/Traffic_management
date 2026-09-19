/**
 * mockNetwork.js
 * ---------------
 * Synthetic road network data used during development.
 *
 * DATA SHAPES — do NOT change these shapes when connecting real data.
 * When nodes.csv and network.csv are available:
 *   1. Parse them in src/data/networkLoader.js (to be created)
 *   2. Map the CSV columns to the same { id, x, y, z } and
 *      { id, source, target, status, type } structures below.
 *   3. Import networkLoader output instead of MOCK_NODES / MOCK_SEGMENTS.
 *
 * COORDINATE SYSTEM
 *   x, y, z are arbitrary 3D scene units (not geographic coordinates).
 *   When connecting real data, normalise lat/lon → scene units in loader.
 */

// ---------------------------------------------------------------------------
// NODE DATA
// Each node represents a road intersection or junction.
// ---------------------------------------------------------------------------
export const MOCK_NODES = [
  // Cluster A – north-west quadrant
  { id: "N01", x: -40, y: 0, z: -40 },
  { id: "N02", x: -20, y: 0, z: -45 },
  { id: "N03", x:   0, y: 0, z: -50 },
  { id: "N04", x:  20, y: 0, z: -45 },
  { id: "N05", x:  40, y: 0, z: -40 },

  // Cluster B – middle row
  { id: "N06", x: -45, y: 0, z: -15 },
  { id: "N07", x: -22, y: 0, z: -18 },
  { id: "N08", x:   0, y: 0, z: -20 },
  { id: "N09", x:  22, y: 0, z: -18 },
  { id: "N10", x:  45, y: 0, z: -15 },

  // Cluster C – centre (main hub)
  { id: "N11", x: -30, y: 0, z:   0 },
  { id: "N12", x: -10, y: 0, z:   5 },
  { id: "N13", x:  10, y: 0, z:   5 },
  { id: "N14", x:  30, y: 0, z:   0 },

  // Cluster D – south row
  { id: "N15", x: -45, y: 0, z:  15 },
  { id: "N16", x: -22, y: 0, z:  18 },
  { id: "N17", x:   0, y: 0, z:  20 },
  { id: "N18", x:  22, y: 0, z:  18 },
  { id: "N19", x:  45, y: 0, z:  15 },

  // Cluster E – south-east quadrant
  { id: "N20", x: -40, y: 0, z:  40 },
  { id: "N21", x: -20, y: 0, z:  45 },
  { id: "N22", x:   0, y: 0, z:  50 },
  { id: "N23", x:  20, y: 0, z:  45 },
  { id: "N24", x:  40, y: 0, z:  40 },
];

// ---------------------------------------------------------------------------
// SEGMENT STATUS VALUES
// Used to colour-code roads.  Keep in sync with Legend component.
// ---------------------------------------------------------------------------
export const SEGMENT_STATUS = {
  NORMAL:   "normal",    // Free flow – green
  MODERATE: "moderate",  // Moderate congestion – yellow
  HIGH:     "high",      // High congestion – orange
  SEVERE:   "severe",    // Severe / incident – red
};

// ---------------------------------------------------------------------------
// SEGMENT DATA
// Each segment is a directed road link between two nodes.
// ---------------------------------------------------------------------------
export const MOCK_SEGMENTS = [
  // Horizontal top row
  { id: "S01", source: "N01", target: "N02", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },
  { id: "S02", source: "N02", target: "N03", status: SEGMENT_STATUS.MODERATE, type: "arterial" },
  { id: "S03", source: "N03", target: "N04", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },
  { id: "S04", source: "N04", target: "N05", status: SEGMENT_STATUS.HIGH,     type: "arterial" },

  // Horizontal middle row
  { id: "S05", source: "N06", target: "N07", status: SEGMENT_STATUS.NORMAL,   type: "collector" },
  { id: "S06", source: "N07", target: "N08", status: SEGMENT_STATUS.SEVERE,   type: "collector" },
  { id: "S07", source: "N08", target: "N09", status: SEGMENT_STATUS.HIGH,     type: "collector" },
  { id: "S08", source: "N09", target: "N10", status: SEGMENT_STATUS.MODERATE, type: "collector" },

  // Horizontal centre row
  { id: "S09",  source: "N11", target: "N12", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },
  { id: "S10",  source: "N12", target: "N13", status: SEGMENT_STATUS.MODERATE, type: "arterial" },
  { id: "S11",  source: "N13", target: "N14", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },

  // Horizontal south row
  { id: "S12",  source: "N15", target: "N16", status: SEGMENT_STATUS.HIGH,     type: "collector" },
  { id: "S13",  source: "N16", target: "N17", status: SEGMENT_STATUS.NORMAL,   type: "collector" },
  { id: "S14",  source: "N17", target: "N18", status: SEGMENT_STATUS.MODERATE, type: "collector" },
  { id: "S15",  source: "N18", target: "N19", status: SEGMENT_STATUS.SEVERE,   type: "collector" },

  // Horizontal bottom row
  { id: "S16",  source: "N20", target: "N21", status: SEGMENT_STATUS.NORMAL,   type: "local" },
  { id: "S17",  source: "N21", target: "N22", status: SEGMENT_STATUS.NORMAL,   type: "local" },
  { id: "S18",  source: "N22", target: "N23", status: SEGMENT_STATUS.MODERATE, type: "local" },
  { id: "S19",  source: "N23", target: "N24", status: SEGMENT_STATUS.HIGH,     type: "local" },

  // Vertical left column
  { id: "S20",  source: "N01", target: "N06", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },
  { id: "S21",  source: "N06", target: "N11", status: SEGMENT_STATUS.MODERATE, type: "arterial" },
  { id: "S22",  source: "N11", target: "N15", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },
  { id: "S23",  source: "N15", target: "N20", status: SEGMENT_STATUS.HIGH,     type: "arterial" },

  // Vertical second column
  { id: "S24",  source: "N02", target: "N07", status: SEGMENT_STATUS.SEVERE,   type: "collector" },
  { id: "S25",  source: "N07", target: "N12", status: SEGMENT_STATUS.NORMAL,   type: "collector" },
  { id: "S26",  source: "N12", target: "N16", status: SEGMENT_STATUS.MODERATE, type: "collector" },
  { id: "S27",  source: "N16", target: "N21", status: SEGMENT_STATUS.NORMAL,   type: "collector" },

  // Vertical centre column
  { id: "S28",  source: "N03", target: "N08", status: SEGMENT_STATUS.MODERATE, type: "arterial" },
  { id: "S29",  source: "N08", target: "N17", status: SEGMENT_STATUS.HIGH,     type: "arterial" },
  { id: "S30",  source: "N17", target: "N22", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },

  // Vertical fourth column
  { id: "S31",  source: "N04", target: "N09", status: SEGMENT_STATUS.NORMAL,   type: "collector" },
  { id: "S32",  source: "N09", target: "N13", status: SEGMENT_STATUS.SEVERE,   type: "collector" },
  { id: "S33",  source: "N13", target: "N18", status: SEGMENT_STATUS.MODERATE, type: "collector" },
  { id: "S34",  source: "N18", target: "N23", status: SEGMENT_STATUS.NORMAL,   type: "collector" },

  // Vertical right column
  { id: "S35",  source: "N05", target: "N10", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },
  { id: "S36",  source: "N10", target: "N14", status: SEGMENT_STATUS.MODERATE, type: "arterial" },
  { id: "S37",  source: "N14", target: "N19", status: SEGMENT_STATUS.HIGH,     type: "arterial" },
  { id: "S38",  source: "N19", target: "N24", status: SEGMENT_STATUS.NORMAL,   type: "arterial" },

  // Diagonal connectors (expressway / ring-road stubs)
  { id: "S39",  source: "N01", target: "N07", status: SEGMENT_STATUS.NORMAL,   type: "expressway" },
  { id: "S40",  source: "N05", target: "N09", status: SEGMENT_STATUS.MODERATE, type: "expressway" },
  { id: "S41",  source: "N20", target: "N16", status: SEGMENT_STATUS.HIGH,     type: "expressway" },
  { id: "S42",  source: "N24", target: "N18", status: SEGMENT_STATUS.SEVERE,   type: "expressway" },
];

// ---------------------------------------------------------------------------
// MOCK TRAFFIC METRICS per segment (demo / placeholder values)
// Replace with real dataset values when available.
// ---------------------------------------------------------------------------
export const MOCK_METRICS = {
  S01: { speed: 62, flow: 480, queue: 0,  delay: 0.2  },
  S02: { speed: 44, flow: 620, queue: 2,  delay: 1.1  },
  S03: { speed: 58, flow: 510, queue: 0,  delay: 0.3  },
  S04: { speed: 31, flow: 790, queue: 8,  delay: 3.4  },
  S05: { speed: 55, flow: 390, queue: 0,  delay: 0.1  },
  S06: { speed: 12, flow: 920, queue: 24, delay: 8.7  },
  S07: { speed: 28, flow: 870, queue: 12, delay: 5.2  },
  S08: { speed: 40, flow: 640, queue: 3,  delay: 1.5  },
  S09: { speed: 68, flow: 350, queue: 0,  delay: 0.1  },
  S10: { speed: 46, flow: 580, queue: 1,  delay: 0.9  },
  S11: { speed: 60, flow: 430, queue: 0,  delay: 0.2  },
  S12: { speed: 25, flow: 810, queue: 15, delay: 6.1  },
  S13: { speed: 55, flow: 470, queue: 0,  delay: 0.2  },
  S14: { speed: 42, flow: 600, queue: 2,  delay: 1.3  },
  S15: { speed: 10, flow: 950, queue: 30, delay: 10.4 },
  S16: { speed: 65, flow: 280, queue: 0,  delay: 0.1  },
  S17: { speed: 62, flow: 310, queue: 0,  delay: 0.1  },
  S18: { speed: 43, flow: 560, queue: 2,  delay: 1.2  },
  S19: { speed: 30, flow: 750, queue: 9,  delay: 3.8  },
  S20: { speed: 70, flow: 320, queue: 0,  delay: 0.1  },
  S21: { speed: 44, flow: 590, queue: 2,  delay: 1.0  },
  S22: { speed: 61, flow: 400, queue: 0,  delay: 0.2  },
  S23: { speed: 28, flow: 800, queue: 10, delay: 4.5  },
  S24: { speed: 11, flow: 940, queue: 22, delay: 9.1  },
  S25: { speed: 66, flow: 360, queue: 0,  delay: 0.1  },
  S26: { speed: 41, flow: 620, queue: 2,  delay: 1.4  },
  S27: { speed: 63, flow: 410, queue: 0,  delay: 0.2  },
  S28: { speed: 43, flow: 650, queue: 2,  delay: 1.2  },
  S29: { speed: 29, flow: 820, queue: 11, delay: 4.8  },
  S30: { speed: 64, flow: 380, queue: 0,  delay: 0.2  },
  S31: { speed: 67, flow: 330, queue: 0,  delay: 0.1  },
  S32: { speed: 13, flow: 910, queue: 21, delay: 8.3  },
  S33: { speed: 40, flow: 630, queue: 3,  delay: 1.6  },
  S34: { speed: 62, flow: 400, queue: 0,  delay: 0.2  },
  S35: { speed: 69, flow: 300, queue: 0,  delay: 0.1  },
  S36: { speed: 42, flow: 610, queue: 2,  delay: 1.3  },
  S37: { speed: 27, flow: 840, queue: 13, delay: 5.6  },
  S38: { speed: 65, flow: 350, queue: 0,  delay: 0.1  },
  S39: { speed: 71, flow: 280, queue: 0,  delay: 0.1  },
  S40: { speed: 45, flow: 570, queue: 1,  delay: 0.8  },
  S41: { speed: 30, flow: 760, queue: 10, delay: 4.1  },
  S42: { speed: 9,  flow: 970, queue: 33, delay: 11.2 },
};
