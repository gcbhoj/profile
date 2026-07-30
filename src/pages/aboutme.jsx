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
    <div className="container-fluid p-3">
      <h3>About Me</h3>

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.8",
          textAlign: "justify",
          wordSpacing: "3px",
          letterSpacing:"1px"
        }}
      >
        {aboutme}
      </p>
    </div>
  );
};

export default AboutMe;
