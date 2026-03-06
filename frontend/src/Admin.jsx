import { useEffect, useState } from "react";

function Admin() {
  const [flag, setFlag] = useState(false);

  const loadFlag = async () => {
    const res = await fetch("http://localhost:4000/flags");
    const data = await res.json();
    setFlag(data.enable_new_ui);
  };

  const toggle = async () => {
    await fetch("http://localhost:4000/flags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enable_new_ui: !flag,
      }),
    });

    loadFlag();
  };

  useEffect(() => {
    loadFlag();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Feature Control</h1>

      <p>enable_new_ui = {flag ? "true" : "false"}</p>

      <button onClick={toggle}>Toggle Feature</button>
    </div>
  );
}

export default Admin;
