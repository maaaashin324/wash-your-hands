// eslint-disable-next-line
export const measureMeters = (lat1, lon1, lat2, lon2): number => {
  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
  const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 1000; // meters
};

export const findMovement = (locations): boolean => {
  const [firstLocation] = locations;
  const lastLocation = locations[locations.index - 1];
  if (lastLocation.speed > 50) {
    return false;
  }
  const meters = measureMeters(
    firstLocation.latitude,
    firstLocation.longitude,
    lastLocation.latitude,
    lastLocation.longitude
  );
  if (meters < 500) {
    return false;
  }
  return true;
};
