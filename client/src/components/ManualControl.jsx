import api from "../api/api";

export default function ManualControl({ light }) {
  const handlePumpOn = async () => {
    if (light > 700) {
      const ok = window.confirm(
        "☀️ אור חזק! לא מומלץ להשקות עכשיו. להפעיל בכל זאת?"
      );
      if (!ok) return;
    }

    await api.post("/pump/on", { duration: 5000 });
  };

  return (
    <div>
      <h3>שליטה ידנית</h3>
      <button onClick={handlePumpOn}>🚿 הפעל משאבה</button>
      <button onClick={() => api.post("/pump/off")}>🛑 כבה</button>
    </div>
  );
}
