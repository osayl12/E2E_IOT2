import api from "../api/api";

export default function ModeSelector() {
  const setMode = async (mode) => {
    await api.post("/mode", { mode });
  };

  return (
    <div>
      <h3>בחר מצב עבודה</h3>
      <button onClick={() => setMode("TEMP")}>🌡️ TEMP</button>
      <button onClick={() => setMode("SOIL")}>🌱 SOIL</button>
      <button onClick={() => setMode("MANUAL")}>✋ MANUAL</button>
      <button onClick={() => setMode("SHABBAT")}>🕯️ SHABBAT</button>
    </div>
  );
}
