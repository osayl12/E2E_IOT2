const { pumpOn } = require("./pumpService");
const { guardIrrigation } = require("./guardService");

const MODES = {
  TEMP: "TEMP",
  SOIL: "SOIL",
  MANUAL: "MANUAL",
  SHABBAT: "SHABBAT",
};

let currentMode = MODES.SOIL;

function setMode(mode) {
  if (!Object.values(MODES).includes(mode)) {
    console.warn("❌ Invalid mode:", mode);
    return;
  }
  currentMode = mode;
  console.log("🔁 MODE CHANGED TO:", currentMode);
}

function getMode() {
  return currentMode;
}

function handleSensors(snapshot, mqttClient) {
  const { potId, temperature, soil, light } = snapshot;

  console.log("⚙️ StateMachine | mode:", currentMode);

  // Guard – הגנת אור
  const guard = guardIrrigation({ light });
  if (!guard.allowed) {
    console.log("🛡️ Irrigation blocked:", guard.reason);
    return;
  }

  switch (currentMode) {
    case MODES.TEMP:
      if (temperature > 30) {
        pumpOn(mqttClient, {
          potId,
          mode: currentMode,
          durationMs: 8000,
        });
      }
      break;

    case MODES.SOIL:
      if (soil < 1500) {
        pumpOn(mqttClient, {
          potId,
          mode: currentMode,
          durationMs: 6000,
        });
      }
      break;

    case MODES.MANUAL:
      // מצב ידני – לא אוטומטי
      break;

    case MODES.SHABBAT:
      // רק scheduler מפעיל
      break;
  }
}

module.exports = {
  MODES,
  setMode,
  getMode,
  handleSensors,
};
