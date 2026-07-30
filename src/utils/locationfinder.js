export const geoFindMe = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        resolve({
          latitude,
          longitude,
          mapLink: `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,
        });
      },
      () => {
        reject("Unable to retrieve your location");
      },
    );
  });
};
export const getLocationDetails = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
    );
    const data = await response.json();
    const addr = data.address;

    // 1. Get the city or fallback locality
    const city = addr.city || addr.town || addr.village || "";

    // 2. Get the province/state (e.g., "Ontario")
    const province = addr.state || addr.region || "";

    // 3. Get the country (e.g., "Canada")
    const country = addr.country || "";

    // Filter out any missing fields and join them with commas
    const locationParts = [city, province, country].filter(Boolean);

    return locationParts.length > 0
      ? locationParts.join(", ")
      : "Unknown Location";
  } catch (error) {
    console.error("Failed to fetch location details:", error);
    return "Unknown Location";
  }
};
