import { useSelector } from "react-redux";
import ProfileImage from "../UI/profileImage";
import TechStack from "../components/techStack";

const Home = () => {
  const { name, primaryEmail, contact } = useSelector((state) => state.resume);

  return (
    <div
      className="container-fluid d-flex flex-column"
      style={{
        height: "78vh",
      }}
    >
      {/* Main Content */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          flex: 1,
        }}
      >
        <div
          className="rounded-5 shadow-lg d-flex align-items-center"
          style={{
            width: "80%",
            height: "60%",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          {/* Name and Email */}
          <div
            className="d-flex flex-column justify-content-center"
            style={{
              flex: 1,
              gap: "5px",
            }}
          >
            <h3
              style={{
                fontSize: "32px",
                margin: "2px",
                textShadow: "2px 2px 5px gray",
              }}
            >
              {name || "Loading..."}
            </h3>

            <a
              href={`mailto:${primaryEmail}`}
              className="email-link"
              style={{
                fontSize: "24px",
                margin: "2px",
                textShadow: "2px 2px 5px gray",
              }}
            >
              {primaryEmail || "Loading..."}
            </a>

            <h5
              style={{
                fontSize: "24px",
                margin: "2px",
                textShadow: "2px 2px 5px gray",
              }}
            >
              {contact || "Loading..."}
            </h5>
          </div>

          {/* Profile Image */}
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "250px",
            }}
          >
            <ProfileImage />
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="pb-3">
        <TechStack />
      </div>
    </div>
  );
};

export default Home;
