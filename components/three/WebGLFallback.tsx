export default function WebGLFallback({
  label = true,
}: {
  label?: boolean;
}) {
  return (
    <div className="webgl-fallback" aria-hidden="true">
      <div className="webgl-fallback__stage">
        <svg
          viewBox="0 0 400 400"
          className="webgl-fallback__svg"
          role="presentation"
        >
          <defs>
            <radialGradient id="fb-sheen" cx="34%" cy="28%" r="78%">
              <stop offset="0%" stopColor="#3a3b32" />
              <stop offset="42%" stopColor="#161612" />
              <stop offset="100%" stopColor="#050505" />
            </radialGradient>
            <linearGradient id="fb-rim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d9ff3f" stopOpacity="0.9" />
              <stop offset="46%" stopColor="#d9ff3f" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ff4b22" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#fb-sheen)" />
          <circle
            cx="200"
            cy="200"
            r="149"
            fill="none"
            stroke="url(#fb-rim)"
            strokeWidth="1.2"
          />
          {[128, 112, 96, 78, 58, 40].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="#f2eee3"
              strokeOpacity="0.08"
            />
          ))}
          <circle cx="200" cy="200" r="30" fill="#080807" />
          <circle
            cx="200"
            cy="200"
            r="30"
            fill="none"
            stroke="#d9ff3f"
            strokeOpacity="0.4"
          />
          <circle cx="200" cy="200" r="3" fill="#d9ff3f" />
          <circle
            cx="200"
            cy="200"
            r="186"
            fill="none"
            stroke="#f2eee3"
            strokeOpacity="0.1"
            strokeDasharray="1 10"
          />
        </svg>
      </div>
      {label ? (
        <span className="webgl-fallback__label">
          Static signal — WebGL unavailable
        </span>
      ) : null}
    </div>
  );
}
