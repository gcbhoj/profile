import { useSelector } from "react-redux";

const Education = () => {
  const { education, status, error } = useSelector((state) => state.resume);

  if (status === "loading") {
    return <p>Loading education information...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h3
        style={{
          fontSize: "36px",
          marginTop: "10px",
          marginLeft: "20px",
          letterSpacing: "1.75px",
        }}
      >
        Education
      </h3>

      <div
        id="educationCarousel"
        className="carousel carousel-appear"
        data-bs-ride="carousel"
        data-bs-interval="10000"
        style={{
          width: "75%",
          height: "55%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "transparent",
        }}
      >
        {/* Carousel slides */}
        <div className="carousel-inner h-100">
          {education?.map((item, id) => (
            <div
              key={id}
              className={`carousel-item h-100 ${id === 0 ? "active" : ""}`}
            >
              <div
                className="card h-100 rounded-5 shadow-lg"
                style={{ background: "none" }}
              >
                <h3
                  className="card-heading mt-5 ms-5"
                  style={{
                    color: "white",
                    letterSpacing: "1.75px",
                    wordSpacing: "2px",
                  }}
                >
                  {item.type}
                </h3>
                <h4
                  className="card-subheading mt-1 ms-5"
                  style={{
                    color: "white",
                    letterSpacing: "1.75px",
                    wordSpacing: "2px",
                  }}
                >
                  {item.faculty}
                </h4>
                <h4
                  className="d-flex justify-content-center"
                  style={{
                    color: "white",
                    letterSpacing: "1.75px",
                    wordSpacing: "2px",
                  }}
                >
                  {item.year}
                </h4>
                <hr className="border w-50 mx-auto" />
                <div
                  className="card-body d-flex flex-column justify-content-center align-items-center"
                  style={{ border: "none" }}
                >
                  <a
                    className="card-subheading institution-link"
                    style={{
                      color: "white",
                      letterSpacing: "1.75px",
                      wordSpacing: "2px",
                      fontStyle: "italic",
                      cursor: "pointer",
                    }}
                    href={item.institutionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.institution}
                  </a>
                  {item.affiliation && (
                    <a
                      className="institution-link"
                      style={{
                        color: "white",
                        letterSpacing: "1.75px",
                        wordSpacing: "2px",
                        fontStyle: "italic",
                        cursor: "pointer",
                      }}
                      href={item.institutionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Affiliated To: {item.affiliation}
                    </a>
                  )}
                  <p
                    style={{
                      color: "white",
                      letterSpacing: "1.75px",
                      wordSpacing: "2px",
                    }}
                  >
                    {item.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous button */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#educationCarousel"
          data-bs-slide="prev"
          style={{
            width: "8%",
          }}
        >
          <span
            className="carousel-control-prev-icon"
            style={{
              backgroundColor: "black",
              borderRadius: "50%",
              padding: "20px",
            }}
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        {/* Next button */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#educationCarousel"
          data-bs-slide="next"
          style={{
            width: "8%",
          }}
        >
          <span
            className="carousel-control-next-icon"
            style={{
              backgroundColor: "black",
              borderRadius: "50%",
              padding: "20px",
            }}
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Education;
