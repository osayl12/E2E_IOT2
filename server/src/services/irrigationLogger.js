// server/src/services/irrigationLogger.js

const db = require("../config/db");

/**
 * רישום התחלת השקיה לבסיס הנתונים
 * נשמר בטבלת irrigation_system
 *
 * @param {Object} params
 * @param {number} params.potId - מזהה עציץ
 * @param {number} params.durationMs - משך השקיה במילישניות
 */
async function logIrrigationStart({ potId, durationMs }) {
  const now = new Date();

  // תאריך בפורמט YYYY-MM-DD
  const date = now.toISOString().split("T")[0];

  // שעה בפורמט HH:MM:SS
  const time = now.toTimeString().split(" ")[0];

  // count = משך השקיה בשניות (INT)
  const count = Math.floor(durationMs / 1000);

  try {
    await db.execute(
      `
      INSERT INTO irrigation_system (date, time, count, pot_id)
      VALUES (?, ?, ?, ?)
      `,
      [date, time, count, potId]
    );

    console.log("💾 Irrigation logged to DB:", {
      potId,
      date,
      time,
      count,
    });
  } catch (err) {
    console.error("❌ Failed to log irrigation:", err.message);
  }
}


async function logIrrigationStop({ potId }) {
  console.log("🛑 Irrigation stopped for pot:", potId);
}

module.exports = {
  logIrrigationStart,
  logIrrigationStop,
};
