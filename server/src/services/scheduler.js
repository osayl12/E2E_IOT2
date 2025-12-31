const cron = require("node-cron");
const { pumpOn } = require("./pumpService");
const { logIrrigation } = require("./irrigationLogger");

// פעמיים ביום – ברירת מחדל
cron.schedule("0 6,18 * * *", async () => {
  pumpOn(120);
  await logIrrigation(1, 120);
});

// קיץ – 3 פעמים ביום
cron.schedule("0 6,12,18 * 6-9 *", async () => {
  pumpOn(180);
  await logIrrigation(1, 180);
});
