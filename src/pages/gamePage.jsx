import { useParams } from "react-router-dom";
import GameCanvas from "../games/gameCanvas";
import { GameList } from "../config/gameList";

const GamePage = () => {
  const { gameId } = useParams();

  const game = GameList.find((g) => g.id === gameId);

  if (!game) {
    return <h2>Game Not Found</h2>;
  }

  const GameComponent = game.component;

  return (
    // Explicitly add key={gameId} to lock layout recreation
    <GameCanvas key={gameId}>
      <GameComponent />
    </GameCanvas>
  );
};

export default GamePage;
