import { createSignal } from 'solid-js';

const AILogoChip = (props) => {
  // Larger default size for better readability
  const size = props.size || 80; 
  const color = props.color || '#2563EB'; // Primary blue color
  
  // The exact lines from the image in a circular pattern around the AI chip
  const lines = [
    { angle: 0, length: 1 },       // Right
    { angle: 30, length: 0.8 },    // Top-right diagonal 1
    { angle: 60, length: 0.8 },    // Top-right diagonal 2
    { angle: 90, length: 1 },      // Top
    { angle: 120, length: 0.8 },   // Top-left diagonal 1
    { angle: 150, length: 0.8 },   // Top-left diagonal 2
    { angle: 180, length: 1 },     // Left
    { angle: 210, length: 0.8 },   // Bottom-left diagonal 1
    { angle: 240, length: 0.8 },   // Bottom-left diagonal 2
    { angle: 270, length: 1 },     // Bottom
    { angle: 300, length: 0.8 },   // Bottom-right diagonal 1
    { angle: 330, length: 0.8 },   // Bottom-right diagonal 2
  ];
  
  const renderLine = (angle, length) => {
    // Center point of the SVG
    const cx = 150;
    const cy = 150;
    
    // Square dimensions 
    const squareSize = 80;
    const halfSquare = squareSize / 2;
    
    // Determine start point on square edge based on angle
    let startX, startY;
    const rad = angle * Math.PI / 180;
    
    // Find the intersection of the angle line with the square
    if (angle === 0 || angle === 180) {
      // Horizontal lines
      startX = angle === 0 ? cx + halfSquare : cx - halfSquare;
      startY = cy;
    } else if (angle === 90 || angle === 270) {
      // Vertical lines
      startX = cx;
      startY = angle === 90 ? cy - halfSquare : cy + halfSquare;
    } else {
      // Diagonal lines
      const slope = Math.tan(rad);
      const absSlope = Math.abs(slope);
      
      if (absSlope <= 1) {
        // Intersects with left/right edges
        const xSign = Math.cos(rad) >= 0 ? 1 : -1;
        startX = cx + xSign * halfSquare;
        startY = cy + slope * xSign * halfSquare;
      } else {
        // Intersects with top/bottom edges
        const ySign = Math.sin(rad) >= 0 ? -1 : 1;
        startY = cy + ySign * halfSquare;
        startX = cx + ySign * halfSquare / slope;
      }
    }
    
    // Calculate end point
    const lineLength = 100 * length; // Scale line length
    const endX = cx + Math.cos(rad) * lineLength;
    const endY = cy - Math.sin(rad) * lineLength;
    
    return (
      <g>
        <line 
          x1={startX} 
          y1={startY} 
          x2={endX} 
          y2={endY} 
          stroke={color} 
          stroke-width="3" // Thicker lines for better visibility
        />
        <circle 
          cx={endX} 
          cy={endY} 
          r="4" // Larger endpoint dots
          fill={color} 
        />
      </g>
    );
  };
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 300 300" 
      width={size} 
      height={size}
      class={props.class || ''}
      aria-label="Boston AI Partners logo"
    >
      {/* Circuit lines radiating from center */}
      {lines.map((line) => renderLine(line.angle, line.length))}
      
      {/* Central AI chip square */}
      <rect
        x="110"
        y="110"
        width="80"
        height="80"
        rx="6" // Slightly rounded corners
        ry="6"
        fill={color}
      />
      
      {/* AI text */}
      <text
        x="150"
        y="162" // Adjusted for better vertical centering
        font-family="sans-serif"
        font-weight="bold"
        font-size="42" // Larger text
        text-anchor="middle"
        fill="white"
      >
        AI
      </text>
    </svg>
  );
};

export default AILogoChip;
