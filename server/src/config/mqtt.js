const mqtt = require("mqtt");
const { setMode } = require("../services/modeEngine");

const client = mqtt.connect(process.env.MQTT_HOST, {
  clientId: process.env.MQTT_CLIENT_ID
});


client.on("connect", () => {
  console.log("✅ MQTT connected to Mosquitto");

  // 🔥 חובה – subscribe רק אחרי connect
  client.subscribe("irrigation/web/mode/set", () => {
    console.log("📡 Subscribed to irrigation/web/mode/set");
  });
});

client.on("message", (topic, message) => {
  console.log("📩 MQTT MESSAGE:", topic, message.toString());

  if (topic === "irrigation/web/mode/set") {
    try {
      const { mode } = JSON.parse(message.toString());
      setMode(mode); // 🔁 שינוי מצב
    } catch (err) {
      console.error("❌ Invalid MQTT message", err);
    }
  }
});

client.on("error", (err) => {
  console.error("❌ MQTT error:", err);
});

module.exports = client;
