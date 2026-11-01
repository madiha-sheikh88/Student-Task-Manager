import "./Background.css";

const NODES = [
  { top: "15%", left: "10%", delay: "0s" },
  { top: "28%", left: "72%", delay: "0.8s" },
  { top: "42%", left: "35%", delay: "1.6s" },
  { top: "58%", left: "88%", delay: "0.4s" },
  { top: "70%", left: "20%", delay: "2.2s" },
  { top: "82%", left: "60%", delay: "1.2s" },
];

function Background() {
  return (
    <div className="bg-circuit" aria-hidden="true">
      <div className="grid-overlay" />
      {NODES.map((n, i) => (
        <span
          key={i}
          className="node"
          style={{ top: n.top, left: n.left, animationDelay: n.delay }}
        />
      ))}
    </div>
  );
}

export default Background;