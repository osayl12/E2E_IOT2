const pool = require("../config/db");

async function insertSensorAvg(sensorName, value, potId) {
  const sql = `
    INSERT INTO sensors (SensorName, Val_avg, date, Pot_id)
    VALUES (?, ?, CURDATE(), ?)
  `;

  const [result] = await pool.execute(sql, [
    sensorName,
    value,
    potId
  ]);

  return result.insertId;
}

async function getSensorsByPotId(potId) {
  const sql = `
    SELECT *
    FROM sensors
    WHERE Pot_id = ?
    ORDER BY date DESC
  `;

  const [rows] = await pool.execute(sql, [potId]);
  return rows;
}

module.exports = {
  insertSensorAvg,
  getSensorsByPotId
};
