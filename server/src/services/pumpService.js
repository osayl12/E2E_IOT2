const mqtt = require("../config/mqtt");

const PUMP_TOPIC = "irrigation/esp32/pump/cmd";

function pumpOn(durationSeconds) {
  mqtt.publish(PUMP_TOPIC, JSON.stringify({
    action: "ON",
    duration: durationSeconds
  }));
}

function pumpOff() {
  mqtt.publish(PUMP_TOPIC, JSON.stringify({
    action: "OFF"
  }));
}

module.exports = {
  pumpOn,
  pumpOff
};
