const express = require("express");
const router = express.Router();

const {
  getLatestSensorsController,
  setModeController,
  pumpOnController,
  pumpOffController,
} = require("../../controllers/esp.controller");

router.get("/sensors/latest", getLatestSensorsController);
router.post("/mode", setModeController);
router.post("/pump/on", pumpOnController);
router.post("/pump/off", pumpOffController);

module.exports = router;
