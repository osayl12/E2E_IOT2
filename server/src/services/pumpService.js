const { logIrrigationStart, logIrrigationStop } = require("./irrigationLogger");

const PUMP_TOPIC = "irrigation/esp32/pump/cmd";

function pumpOn(mqttClient, { potId, mode, durationMs }) {
  mqttClient.publish(
    PUMP_TOPIC,
    JSON.stringify({ action: "ON", duration: durationMs })
  );

  logIrrigationStart({ potId, mode, durationMs });
  console.log("🚿 Pump ON", { potId, mode, durationMs });
}

function pumpOff(mqttClient, { potId, mode }) {
  mqttClient.publish(PUMP_TOPIC, JSON.stringify({ action: "OFF" }));
  logIrrigationStop({ potId, mode });
  console.log("🛑 Pump OFF", { potId, mode });
}

module.exports = { pumpOn, pumpOff };
