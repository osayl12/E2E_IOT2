const router = require("express").Router();

router.use("/api/esp", require("./esp/esp.routes"));

module.exports = router;
