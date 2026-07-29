import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../config/navigation";

const Navbar = () => {
  const { alias } = useSelector((state) => state.resume);

  return (
    <nav className="navbar navbar-expand-lg bg-body border shadow-sm px-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          {alias}
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#portfolioNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="portfolioNavbar"
        >
          <ul className="navbar-nav">
            {navigationItems.map((item) => (
              <li key={item.id} className="nav-item mx-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
