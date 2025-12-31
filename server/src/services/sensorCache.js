let latestSensors = {
  temperature: null,
  humidity: null,
  light: null,
  soil: null,
};

function setLatestSensors(snapshot) {
  latestSensors = snapshot;
}

function getLatestSensors() {
  return latestSensors;
}

module.exports = {
  setLatestSensors,
  getLatestSensors,
};
