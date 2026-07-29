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
