import { useSelector } from "react-redux";
import ProfileImage from "../UI/profileImage";
import TechStack from "../components/techStack";
import HomeBackground from "../backgrounds/homeBackground";
import WebExperience from "../components/webExperience";

const Home = () => {
  const { name, primaryEmail } = useSelector((state) => state.resume);

  return (
    <>
      <HomeBackground />

      <div
        className="container-fluid d-flex flex-column"
        style={{
          height: "78vh",
          position: "relative",
          zIndex: 1,
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
            className="d-flex align-items-center"
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
                  color: "white",
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
                  color: "white",
                }}
              >
                {primaryEmail || "Loading..."}
              </a>
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
        <div>
          <WebExperience />
        </div>

        {/* Tech Stack */}
        <div
          style={{
            position: "relative",
          }}
        >
          <TechStack />
        </div>
      </div>
    </>
  );
};

export default Home;
