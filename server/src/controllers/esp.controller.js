const sensorsModel = require("../db/sensors.model");

// POST /api/esp/sensors
async function createSensorAvg(req, res) {
  try {
    const { sensorName, value, potId } = req.body;

    if (!sensorName || typeof value !== "number" || potId <= 0) {
      return res.status(400).json({
        message: "Invalid sensor data"
      });
    }

    const id = await sensorsModel.insertSensorAvg(
      sensorName,
      value,
      potId
    );

    res.status(201).json({
      message: "Sensor data saved",
      id
    });
  } catch (err) {
  console.error("❌ ERROR DETAILS:");
  console.error(err);
  console.error("❌ SQL MESSAGE:", err?.sqlMessage);
  console.error("❌ CODE:", err?.code);

  res.status(500).json({
    error: err.message,
    sqlMessage: err.sqlMessage,
    code: err.code
  });
}

}

// GET /api/esp/sensors/pot/:potId
async function getSensorsByPot(req, res) {
  try {
    const potId = Number(req.params.potId);

    if (!potId) {
      return res.status(400).json({ message: "Invalid potId" });
    }

    const data = await sensorsModel.getSensorsByPotId(potId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createSensorAvg,
  getSensorsByPot
};
