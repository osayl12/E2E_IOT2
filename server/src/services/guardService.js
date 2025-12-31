const LIGHT_THRESHOLD = 700;

function guardIrrigation({ light }) {
  if (light > LIGHT_THRESHOLD) {
    return { allowed: false, reason: "STRONG_LIGHT" };
  }
  return { allowed: true };
}

module.exports = { guardIrrigation };
