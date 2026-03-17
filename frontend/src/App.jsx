import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [flag, setFlag] = useState(false);

  const loadFlag = async () => {
    try {
      const res = await fetch("http://localhost:4000/flags");
      const data = await res.json();
      setFlag(data.enable_new_ui);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    loadFlag();
    const interval = setInterval(loadFlag, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1 className="title">System Experience</h1>

      <div className={`card ${flag ? "card-new" : "card-old"}`}>
        <div className="icon">{flag ? "🚀" : "🏠"}</div>
        <div className="content">
          <h2>{flag ? "Premium Experience" : "Standard View"}</h2>
          <p>
            {flag
              ? "Welcome to the future of UI design."
              : "Currently viewing the legacy version."}
          </p>
        </div>
        {flag && <button className="btn-glow">Explore Now</button>}
      </div>
    </div>
  );
}

export default App;
