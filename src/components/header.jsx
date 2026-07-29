import { useSelector } from "react-redux";

const Header = () => {
  const { name, alias, primaryEmail, contact } = useSelector(
    (state) => state.resume,
  );

  const splitName = (name || "").split("");

  return (
    <div
      className="container-fluid border border-2 border-danger mt-3 px-5 py-2 libertinus-math-regular"
      style={{
        height: "200px",
        borderRadius: "15px",
        boxShadow: "5px -10px 5px gray",
      }}
    >
      <div className="row h-100">
        {/* Name and Contact */}
        <div className="col-md-8 d-flex flex-column justify-content-center">
          <h2>
            {splitName.map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </h2>

          <h4>{alias}</h4>

          <p>{primaryEmail}</p>
          <p>{contact}</p>
        </div>

        {/* Globe */}
        <div className="col-md-4 d-flex justify-content-center align-items-center"></div>
      </div>
    </div>
  );
};

export default Header;
