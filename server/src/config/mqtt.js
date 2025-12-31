const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_HOST, {
  clientId: process.env.MQTT_CLIENT_ID
});

client.on("connect", () => {
  console.log("✅ MQTT connected to Mosquitto");
});

client.on("error", (err) => {
  console.error("❌ MQTT error:", err);
});

module.exports = client;
