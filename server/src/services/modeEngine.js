const { pumpOn } = require("./pumpService");
const { isSafeToIrrigate } = require("./guardService");
const { logIrrigation } = require("./irrigationLogger");

let currentMode = "SOIL"; // ברירת מחדל

function setMode(mode) {
  currentMode = mode;
  console.log("🔁 Mode changed to:", mode);
}

async function handleSensorData(data) {
  const { temperature, soil, light, potId } = data;

  switch (currentMode) {
    case "TEMP":
      if (temperature > 30) {
        pumpOn(180); // 3 דקות
        await logIrrigation(potId, 180);
      }
      break;

    case "SOIL":
      if (soil < 40) {
        pumpOn(120);
        await logIrrigation(potId, 120);
      }
      break;

    case "MANUAL":
      // לא עושה כלום – מחכה לפקודה מה-User
      break;

    case "SHABBAT":
      // מנוהל ע"י scheduler
      break;
  }
}

module.exports = {
  setMode,
  handleSensorData
};
