const db = require("../config/db");

async function logIrrigationStart({ potId, durationMs }) {
  const now = new Date();

  const date = now.toISOString().split("T")[0];
  const time = now.toTimeString().split(" ")[0];
  const count = Math.floor(durationMs / 1000);

  try {
    await db.execute(
      `
      INSERT INTO irrigation_system (date, time, count, pot_id)
      VALUES (?, ?, ?, ?)
      `,
      [date, time, count, potId]
    );

    console.log("💾 Irrigation logged to DB", {
      potId,
      date,
      time,
      count,
    });
  } catch (err) {
    // 👇 דילוג זמני – לא מפיל את המערכת
    console.warn(
      "⚠️ Irrigation NOT saved (temporary skip):",
      err.code
    );
  }
}

module.exports = { logIrrigationStart };
