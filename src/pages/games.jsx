import { useNavigate } from "react-router-dom";
import { GameList } from "../config/gameList";

const Games = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <div className="row g-4 ">
        {GameList.map((game) => (
          <div key={game.id} className="col-md-4">
            <div
              className="card rounded-5 overflow-hidden border"
              style={{
                background: "none",
                color: "white",
              }}
            >
              <img
                src={game.thumbnail}
                alt={game.name}
                className="card-img-top"
                style={{
                  objectFit: "contain",
                  background: "rgba(255,255,255,0.05)",
                }}
              />

              <div className="card-body d-flex justify-content-center align-items-center">
                <h5
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/games/${game.id}`)}
                >
                  {game.name}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
