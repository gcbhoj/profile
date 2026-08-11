import { useSelector } from "react-redux";

const WorkExperience = () => {
  const { workExperience, status, error } = useSelector(
    (state) => state.resume,
  );

  if (status === "loading") {
    return <p>Loading work experience information...</p>;
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
          paddingTop: "5px",
        }}
      >
        Work Experience
      </h3>

      <div
        className="container-fluid "
        style={{
          width: "90%",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 py-5 g-5">
          {workExperience?.map((item, id) => (
            <div className="col" key={id}>
              {/* Card */}
              <div
                className="card h-100 rounded-4 shadow-lg"
                style={{
                  background: "none",
                  color: "white",
                  cursor: "pointer",
                }}
                data-bs-toggle="modal"
                data-bs-target={`#workExperienceModal${id}`}
              >
                {/* Card Header */}
                <div
                  className="card-header border-0"
                  style={{
                    background: "transparent",
                    color: "white",
                    padding: "20px",
                  }}
                >
                  <div className="d-flex align-items-center">
                    {/* LEFT SIDE */}
                    <div className="flex-grow-1">
                      <h4
                        style={{
                          fontSize: "24px",
                          letterSpacing: "1.5px",
                          marginBottom: "8px",
                        }}
                      >
                        {item.title}
                      </h4>

                      <p
                        style={{
                          marginBottom: "0",
                          fontSize: "17px",
                        }}
                      >
                        {item.organization}
                      </p>

                      <p
                        style={{
                          marginBottom: "0",
                          fontSize: "17px",
                        }}
                      >
                        {item.location}
                      </p>
                    </div>

                    {/* RIGHT SIDE */}
                    <div
                      className="text-end"
                      style={{
                        minWidth: "180px",
                      }}
                    >
                      {item.workYears?.map((workYear, index) => (
                        <p
                          key={index}
                          style={{
                            marginBottom: "4px",
                            fontSize: "14px",
                          }}
                        >
                          {workYear.from.month} {workYear.from.year} -{" "}
                          {workYear.to.month} {workYear.to.year}
                        </p>
                      ))}

                      <span
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </div>

                  {/* TYPE */}
                  <div
                    style={{
                      marginTop: "12px",
                      fontSize: "15px",
                      fontStyle: "italic",
                    }}
                  >
                    {item.type}
                  </div>
                </div>
              </div>

              {/* Modal */}
              <div
                className="modal fade"
                id={`workExperienceModal${id}`}
                tabIndex="-1"
                aria-labelledby={`workExperienceModalLabel${id}`}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div
                    className="modal-content"
                    style={{
                      background: "#111",
                      color: "white",
                      borderRadius: "20px",
                    }}
                  >
                    {/* Modal Header */}
                    <div
                      className="modal-header border-0"
                      style={{
                        padding: "25px",
                      }}
                    >
                      <div>
                        <h2
                          className="modal-title"
                          id={`workExperienceModalLabel${id}`}
                        >
                          {item.title}
                        </h2>

                        <p className="mb-1">{item.organization}</p>

                        <p className="mb-0">{item.location}</p>
                      </div>

                      <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                      <div className="mb-4">
                        <h5>Employment Period</h5>

                        {item.workYears?.map((workYear, index) => (
                          <p key={index}>
                            {workYear.from.month} {workYear.from.year} -{" "}
                            {workYear.to.month} {workYear.to.year}
                          </p>
                        ))}
                      </div>

                      <div className="mb-4">
                        <h5>Position</h5>
                        <p>{item.type}</p>
                      </div>

                      <div>
                        <h5>Responsibilities</h5>

                        <ul>
                          {item.jobDescription?.map((jd, index) => (
                            <li key={index}>{jd}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkExperience;
