import { useState, useEffect } from "react";
import { geoFindMe } from "../utils/locationfinder";

const Location = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const findLocation = async () => {
      try {
        const data = await geoFindMe();

        setLocation(data);
        setError("");
      } catch (err) {
        setError(err);
      }
    };

    findLocation();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}

      {!location && !error && <p>Detecting location...</p>}

      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>

          <p>Longitude: {location.longitude}</p>

          <a href={location.mapLink} target="_blank" rel="noopener noreferrer">
            View Location
          </a>
        </div>
      )}
    </div>
  );
};

export default Location;
