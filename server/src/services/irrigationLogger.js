const pool = require("../config/db");

async function logIrrigation(potId, durationSeconds) {
  const sql = `
    INSERT INTO irrigation_system (date, time, count, pot_id)
    VALUES (CURDATE(), CURTIME(), ?, ?)
  `;
  await pool.execute(sql, [durationSeconds, potId]);
}

module.exports = {
  logIrrigation
};
