const router = require("express").Router();
const {
  createSensorAvg,
  getSensorsByPot
} = require("../../controllers/esp.controller");

// ESP → send sensor data
router.post("/sensors", createSensorAvg);

// ESP / debug → get sensors by pot
router.get("/sensors/pot/:potId", getSensorsByPot);

module.exports = router;
