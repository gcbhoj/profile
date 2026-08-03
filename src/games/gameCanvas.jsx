import ThreeCanvas from "./ThreeCanvas";

const GameCanvas = ({ children }) => {
  return (
    <div
      className="container-fluid rounded-5"
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <ThreeCanvas>{children}</ThreeCanvas>
    </div>
  );
};

export default GameCanvas;
