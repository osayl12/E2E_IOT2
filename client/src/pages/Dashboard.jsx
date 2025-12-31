import { useEffect, useState } from "react";
import api from "../api/api";
import SensorCard from "../components/SensorCard";
import ModeSelector from "../components/ModeSelector";
import ManualControl from "../components/ManualControl";

export default function Dashboard() {
  const [sensors, setSensors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/sensors/latest");
      setSensors(res.data);
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>🌿 Smart Irrigation Dashboard</h2>

      <ModeSelector />

      <div style={{ display: "flex" }}>
        <SensorCard label="🌡️ Temperature" value={sensors.temperature} unit="°C" />
        <SensorCard label="💧 Humidity" value={sensors.humidity} unit="%" />
        <SensorCard label="☀️ Light" value={sensors.light} unit="" />
        <SensorCard label="🌱 Soil" value={sensors.soil} unit="" />
      </div>

      <ManualControl light={sensors.light} />
    </div>
  );
}
