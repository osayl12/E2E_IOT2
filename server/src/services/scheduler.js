const cron = require("node-cron");
const { pumpOn } = require("./pumpService");

function startScheduler(mqttClient) {
  cron.schedule("0 6,18 * * *", () => {
    console.log("🕯️ SHABBAT irrigation");
    pumpOn(mqttClient, {
      potId: 1,
      mode: "SHABBAT",
      durationMs: 7000,
    });
  });
}

module.exports = { startScheduler };
