import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../config/navigation";
import { toggleMobileMenu, closeMobileMenu } from "../features/layoutSlice";

const Navbar = () => {
  const { alias } = useSelector((state) => state.resume);

  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand fw-bold"
          to="/"
          onClick={dispatch(closeMobileMenu())}
          style={{ color: "white" }}
        >
          {alias}
        </NavLink>

        <button
          className="navbar-toggler bg-body"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#portfolioNavbar"
          onClick={() => dispatch(toggleMobileMenu())}
        >
          <span
            className="navbar-toggler-icon"
            style={{ color: "white" }}
          ></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end me-5"
          id="portfolioNavbar"
        >
          <ul className="navbar-nav">
            {navigationItems.map((item) => (
              <li
                key={item.id}
                className="nav-item mx-2"
                style={{
                  fontSize: "18px",
                }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  style={{ color: "white" }}
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
