const ProfileAssistant = () => {
  return (
    <div
      className="container-fluid border border-2"
      style={{
        height: "120px",
        width: "100%",
      }}
    >
      <div
        className="d-flex justify-content-end"
        style={{
          height: "100%",
        }}
      >
        <img
          src="/robo.png"
          alt="Profile Assistant"
          style={{
            height: "calc(100% - 20px)",
            width: "100px",
            objectFit: "contain",
            margin: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default ProfileAssistant;
