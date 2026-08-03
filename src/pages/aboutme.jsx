import { useSelector } from "react-redux";

const AboutMe = () => {
  const { aboutme, status, error } = useSelector((state) => state.resume);

  if (status === "loading") {
    return <p>Loading about information...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card border-0 bg-transparent d-flex align-items-center justify-content-center"
        style={{ width: "100%", maxWidth: "1200px" }}
      >
        <h3
          className="card-title mb-5 text-center"
          style={{
            color: "white",
            fontSize: "36px",
          }}
        >
          About Me
        </h3>

        <p
          className="card-text shadow-lg rounded-5"
          style={{
            width: "75%",
            padding: "24px",
            fontSize: "18px",
            lineHeight: "1.8",
            textAlign: "justify",
            wordSpacing: "3px",
            letterSpacing: "1px",
            color: "white",
          }}
        >
          {aboutme}
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
