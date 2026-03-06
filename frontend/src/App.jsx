import { useEffect, useState } from "react";

function App() {
  const [flag, setFlag] = useState(false);

  const loadFlag = async () => {
    const res = await fetch("http://localhost:4000/flags");
    const data = await res.json();
    setFlag(data.enable_new_ui);
  };

  useEffect(() => {
    loadFlag();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Feature Flag Demo</h1>

      {flag ? (
        <div style={{ background: "lightgreen", padding: 20 }}>
          🚀 New UI Enabled
        </div>
      ) : (
        <div style={{ background: "lightgray", padding: 20 }}>Old UI</div>
      )}
    </div>
  );
}

export default App;
