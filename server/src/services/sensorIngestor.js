const { handleSensors } = require("./stateMachine");
const { setLatestSensors } = require("./sensorCache");

function ingestSensorsMessage(payload, mqttClient) {
  let data;

  try {
    data = JSON.parse(payload);
  } catch {
    console.error("❌ Invalid JSON from ESP:", payload);
    return;
  }

  const light =
    typeof data.light === "number"
      ? data.light
      : typeof data.lighht === "number"
      ? data.lighht
      : 0;

  const snapshot = {
    potId: Number(data.potId ?? 1),
    temperature: Number(data.temperature ?? data.temperatuure),
    humidity: Number(data.humidity ?? 0),
    light,
    soil: Number(data.soil),
  };

  console.log("🌡️ Sensors snapshot:", snapshot);

  // ✅ cache ל-WEB
  setLatestSensors(snapshot);

  // ✅ לוגיקה
  handleSensors(snapshot, mqttClient);
}

module.exports = { ingestSensorsMessage };
