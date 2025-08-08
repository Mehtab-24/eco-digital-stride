// src/utils/carbonEstimator.js

export function estimateCarbonFootprint(inputs) {
  const EMISSION_FACTOR = 475; // gCO2e per kWh

  const {
    streamingHours = 0,
    mobileHours = 0,
    laptopHours = 0,
    cloudGB = 0,
    emailsPerDay = 0,
  } = inputs;

  // Assumed energy usage per unit
  const energyUse = {
    streaming: 0.77,
    mobile: 0.02,
    laptop: 0.08,
    cloud: 0.005,
    email: 0.00005,
  };

  // Calculate energy consumption in kWh
  const totalEnergy =
    (streamingHours * energyUse.streaming) +
    (mobileHours * energyUse.mobile) +
    (laptopHours * energyUse.laptop) +
    (cloudGB * energyUse.cloud) +
    (emailsPerDay * energyUse.email);

  // Convert to grams of CO2
  const carbonEmission = totalEnergy * EMISSION_FACTOR;

  return Math.round(carbonEmission); // in grams
}
