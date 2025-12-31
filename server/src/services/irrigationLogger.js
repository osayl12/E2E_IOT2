function logIrrigationStart({ potId, mode, durationMs }) {
  console.log("📝 irrigation.start", {
    potId,
    mode,
    durationMs,
    time: new Date().toISOString(),
  });
}

function logIrrigationStop({ potId, mode }) {
  console.log("📝 irrigation.stop", {
    potId,
    mode,
    time: new Date().toISOString(),
  });
}

module.exports = { logIrrigationStart, logIrrigationStop };
