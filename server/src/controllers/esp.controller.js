const mqttClient = require("../config/mqtt");
const { getLatestSensors } = require("../services/sensorCache");
const { setMode, getMode } = require("../services/stateMachine");
const {
  pumpOn: pumpOnService,
  pumpOff: pumpOffService,
} = require("../services/pumpService");

// ===== Sensors =====
function getLatestSensorsController(req, res) {
  res.json(getLatestSensors());
}

// ===== Mode =====
function setModeController(req, res) {
  const { mode } = req.body;
  setMode(mode);
  res.json({ message: "Mode updated", mode });
}

// ===== Pump =====
function pumpOnController(req, res) {
  const { duration = 5000, potId = 1 } = req.body;

  pumpOnService(mqttClient, {
    potId,
    mode: getMode(),
    durationMs: duration,
  });

  res.json({ message: "Pump ON sent" });
}

function pumpOffController(req, res) {
  const { potId = 1 } = req.body;

  pumpOffService(mqttClient, {
    potId,
    mode: getMode(),
  });

  res.json({ message: "Pump OFF sent" });
}

module.exports = {
  getLatestSensorsController,
  setModeController,
  pumpOnController,
  pumpOffController,
};
