import { useNavigate } from "react-router-dom";
import TicTacToe from "../games/tic-tac-toe";

const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 1,
      gameName: "Tic-Tac-Toe",
      thumbnail: "/tic-tac-toe.png",
      component: TicTacToe,
      path: "/games/tic-tac-toe",
    },
    {
      id: 2,
      gameName: "Snake & Ladder",
      thumbnail: "/snakes-and-ladders.png",
      component: TicTacToe,
      path: "/games/snake-ladder",
    },
  ];

  return (
    <div className="container py-4">
      <div className="row g-4">
        {games.map((game) => (
          <div key={game.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div
              className="card h-100 shadow-sm"
              style={{
                cursor: "pointer",
              }}
              onClick={() => navigate(game.path)}
            >
              <img
                src={game.thumbnail}
                alt={game.gameName}
                className="card-img-top"
                style={{
                  height: "180px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{game.gameName}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
