import AboutMe from "../pages/aboutme";
const PageDisplay = () => {
  return (
    <div
      className="container-fluid border border-2 border-primary mt-1 gap-3"
      style={{
        flex: 1,
        overflow: "hidden",
      }}
    >
      <div className="row h-100">
        {/* Left Side - Main Content */}
        <div className="col-md-8 border-end border-2 border-secondary p-3">
          <h4>Page Display</h4>
          <AboutMe />
        </div>

        {/* Right Side */}
        <div className="col-md-4 d-flex flex-column p-3 gap-3">
          {/* Profile Image */}
          <div
            className="border border-2 border-success rounded d-flex justify-content-center align-items-center"
            style={{
              maxHeight: "350px",
              margin: "auto",
            }}
          >
            <img
              src="/profile.jpg"
              alt="Bhoj GC"
              className="img-fluid rounded-circle"
              style={{
                width: "90%",
                height: "90%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Demo Video */}
          <div
            className="border border-2 border-info rounded d-flex justify-content-center align-items-center"
            style={{
              flex: 1,
              minHeight: "200px",
            }}
          >
            <video
              controls
              className="w-100 h-100 rounded"
              style={{
                objectFit: "cover",
              }}
            >
              <source src="/data/demo.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDisplay;
