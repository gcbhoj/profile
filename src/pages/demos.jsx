import { useSelector } from "react-redux";

const Demos = () => {
  const { demos, status, error } = useSelector((state) => state.resume);

  if (status === "loading") {
    return <p>Loading demos...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  const categories = demos?.[0]?.categories ?? [];

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
        Demos
      </h3>

      <div className="container-fluid" style={{ width: "90%" }}>
        {categories.map(
          (category) =>
            category.projects?.length > 0 && (
              <div
                className="card mb-5 rounded-5 py-3"
                key={category.id}
                style={{
                  background: "none",
                  color: "white",
                }}
              >
                <div
                  className="card-header border-0"
                  style={{
                    background: "transparent",
                  }}
                >
                  <h4>{category.title}</h4>
                </div>

                <div className="card-body">
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
                    {category.projects.map((project) => (
                      <div className="col" key={project.id}>
                        <div
                          className="card h-100 rounded-4"
                          style={{
                            background: "transparent",
                            color: "white",
                          }}
                        >
                          <div className="card-header border-0">
                            <h5>{project.title}</h5>
                          </div>

                          <div className="card-body">
                            {project.videoLink && (
                              <div
                                style={{
                                  aspectRatio: "16 / 9",
                                }}
                              >
                                <iframe
                                  src={project.videoLink}
                                  title={project.title}
                                  width="100%"
                                  height="100%"
                                  style={{
                                    border: "none",
                                    borderRadius: "12px",
                                  }}
                                  allowFullScreen
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
        )}
      </div>
    </>
  );
};

export default Demos;
