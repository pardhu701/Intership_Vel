// utils/distance.js
export const cityCoordinates = {
  Hyderabad: { lat: 17.385, lon: 78.4867 },
  Mumbai: { lat: 19.076, lon: 72.8777 },
  Delhi: { lat: 28.6139, lon: 77.209 },
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Kolkata: { lat: 22.5726, lon: 88.3639 },
  Bengaluru: { lat: 12.9716, lon: 77.5946 },
  Pune: { lat: 18.5204, lon: 73.8567 },
  Jaipur: { lat: 26.9124, lon: 75.7873 },
};

export function calculateDistance(city) {
  const R = 6371; // Radius of Earth (km)
  const hyderabad = cityCoordinates["Hyderabad"];
  const target = cityCoordinates[city];
  if (!target) return 0;
  const dLat = (target.lat - hyderabad.lat) * (Math.PI / 180);
  const dLon = (target.lon - hyderabad.lon) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(hyderabad.lat * Math.PI / 180) *
      Math.cos(target.lat * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
}
