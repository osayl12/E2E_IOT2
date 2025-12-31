const { handleSensors } = require("./stateMachine");

function ingestSensorsMessage(payload, mqttClient) {
  let data;
  try {
    data = JSON.parse(payload);
  } catch {
    console.error("❌ Invalid JSON:", payload);
    return;
  }

  // תיקון typo אפשרי
  const light =
    typeof data.light === "number"
      ? data.light
      : typeof data.lighht === "number"
      ? data.lighht
      : 0;

  const snapshot = {
    potId: Number(data.potId ?? 1),
    temperature: Number(data.temperature),
    humidity: Number(data.humidity ?? 0),
    light,
    soil: Number(data.soil),
  };

  console.log("🌡️ Sensors:", snapshot);
  handleSensors(snapshot, mqttClient);
}

module.exports = { ingestSensorsMessage };
