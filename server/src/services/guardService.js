function isSafeToIrrigate(lightValue) {
  // ערך דוגמה – אפשר לשנות
  const LIGHT_THRESHOLD = 2000;
  return lightValue < LIGHT_THRESHOLD;
}

module.exports = {
  isSafeToIrrigate
};
