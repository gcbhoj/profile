import { useState, useEffect } from "react";
import { IoCloudyNight, IoSunny } from "react-icons/io5";

const ThemeManager = () => {
  // Read saved theme on initial render
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Update Bootstrap theme and save it
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <div className="container-fluid mt-2 d-flex justify-content-end">
      <button
        className="btn btn-outline-secondary"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <IoCloudyNight size={20} />
        ) : (
          <IoSunny size={20} />
        )}
      </button>
    </div>
  );
};

export default ThemeManager;
