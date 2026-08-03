const WebExperience = () => {
  const progWorkExp = [
    {
      id: 1,
      type: "Co-Op Work Term",
      term: "3 Terms",
    },
    {
      id: 2,
      type: "Production Coordinator",
      term: "1 Year",
    },
    {
      id: 3,
      type: "Team Lead",
      term: "2 Years",
    },
  ];

  return (
    <div className="container-fluid py-3">
      <div className="row g-4">
        {progWorkExp.map((experience) => (
          <div key={experience.id} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow h-100 border rounded-5" style={{
                    background: "none",
                    color:"white"
            }}>
              <div className="card-body text-center">
                <h5 className="card-title">{experience.type}</h5>

                <p className="card-text">{experience.term}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebExperience;
