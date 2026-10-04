const Wheel = ({ cx }) => (
  <g className="wheel" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
    <circle cx={cx} cy="108" r="26" fill="#15151c" stroke="#555" strokeWidth="3" />
    <path
      d={`M${cx} 86v44M${cx - 22} 108h44M${cx - 16} 92l32 32M${cx + 16} 92l-32 32`}
      stroke="#999"
      strokeWidth="3"
    />
  </g>
);

export default function Car() {
  return (
    <svg viewBox="0 0 400 140" role="img" aria-label="Car" className="block h-auto w-full">
      <path
        d="M20 95 L40 70 Q50 60 70 58 L130 55 L160 28 Q170 20 185 20 L260 20 Q275 20 285 30 L315 55 L360 62 Q385 66 385 90 L385 105 L20 105 Z"
        fill="#c6ff3d"
      />
      <path d="M150 55 L172 32 L205 32 L205 55 Z M215 55 L215 32 L258 32 L290 55 Z" fill="#0b0b0f" opacity=".85" />
      <Wheel cx={95} />
      <Wheel cx={310} />
    </svg>
  );
}
