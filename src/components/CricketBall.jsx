export default function CricketBall({ className = "w-10 h-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#8B2E1F" />
      <circle cx="32" cy="32" r="30" fill="url(#ballShine)" />
      <path
        d="M32 3 A29 29 0 0 1 32 61"
        stroke="#F4F7FB"
        strokeWidth="1.6"
        fill="none"
        strokeDasharray="3,3.4"
      />
      <path
        d="M32 3 A29 29 0 0 0 32 61"
        stroke="#F4F7FB"
        strokeWidth="1.6"
        fill="none"
        strokeDasharray="3,3.4"
      />
      <defs>
        <radialGradient id="ballShine" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#B14631" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#8B2E1F" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
