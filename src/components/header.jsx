import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchResume } from "../features/resumeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  const splitName = (resume?.name || "").split("");

  return (
    <div
      className="container-fluid border border-2 border-danger mt-3 px-5 py-5 libertinus-math-regular"
      style={{
        height: "250px",
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

          <h4>{resume?.alias}</h4>

          <p>{resume?.primaryEmail}</p>
          <p>{resume?.contact}</p>
        </div>

        {/* Globe */}
        <div className="col-md-4 d-flex justify-content-center align-items-center"></div>
      </div>
    </div>
  );
};

export default Header;
