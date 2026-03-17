import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [flags, setFlags] = useState({
    enable_new_ui: false,
    show_promo_banner: false,
    enable_dark_mode: false,
  });

  const loadFlags = async () => {
    try {
      const res = await fetch("http://localhost:4000/flags");
      const data = await res.json();
      setFlags(data);
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    loadFlags();
    const interval = setInterval(loadFlags, 2000); // เช็คค่าใหม่ทุก 2 วินาที
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`container ${flags.enable_dark_mode ? "dark-theme" : ""}`}>
      {/* Feature ใหม่: Dynamic Promo Banner */}
      {flags.show_promo_banner && (
        <div className="promo-banner">
          🔥 Exclusive Deal: รับส่วนลดพิเศษสำหรับคุณเท่านั้น! 🔥
        </div>
      )}

      <h1 className="title">System Experience</h1>

      <div className={`card ${flags.enable_new_ui ? "card-new" : "card-old"}`}>
        <div className="icon">{flags.enable_new_ui ? "🚀" : "🏠"}</div>
        <div className="content">
          <h2>
            {flags.enable_new_ui ? "Premium Experience" : "Standard View"}
          </h2>
          <p>
            {flags.enable_new_ui
              ? "สัมผัสประสบการณ์ UI แห่งอนาคตที่เราตั้งใจออกแบบมาเพื่อคุณ"
              : "นี่คือหน้าตาเวอร์ชันมาตรฐานที่คุณคุ้นเคย"}
          </p>
        </div>
        {flags.enable_new_ui && (
          <button className="btn-glow">Explore Now</button>
        )}
      </div>
    </div>
  );
}

export default App;
