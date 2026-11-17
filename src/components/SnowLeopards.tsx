export default function SnowLeopards() {
  return (
    <div className="paw-prints" aria-hidden="true">
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="paw-print"
          style={{
            left: `${8 + i * 9}%`,
            bottom: `${10 + Math.sin(i * 1.1) * 12}%`,
            animationDelay: `${i * 0.5}s`,
            fontSize: `${0.8 + Math.random() * 0.4}rem`,
            transform: `rotate(${-20 + Math.random() * 40}deg)`,
          }}
        >
          🐾
        </span>
      ))}
    </div>
  )
}
