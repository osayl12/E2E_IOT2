const mqtt = require("mqtt");
const { ingestSensorsMessage } = require("../services/sensorIngestor");
const { setMode } = require("../services/stateMachine");

const client = mqtt.connect(process.env.MQTT_HOST, {
  clientId: process.env.MQTT_CLIENT_ID,
});

client.on("connect", () => {
  console.log("✅ MQTT connected");

  client.subscribe("irrigation/esp32/sensors");
  client.subscribe("irrigation/web/mode/set");
});

client.on("message", (topic, message) => {
  const payload = message.toString();

  if (topic === "irrigation/esp32/sensors") {
    ingestSensorsMessage(payload, client);
  }

  if (topic === "irrigation/web/mode/set") {
    const { mode } = JSON.parse(payload);
    setMode(mode);
  }
});

module.exports = client;
