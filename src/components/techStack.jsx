import {
  SiVite,
  SiReact,
  SiRedux,
  SiBootstrap,
  SiJavascript,
} from "react-icons/si";

const TechStack = () => {
  const stackUsed = [
    {
      id: 1,
      stack: "Vite",
      icon: SiVite,
    },
    {
      id: 2,
      stack: "React",
      icon: SiReact,
    },
    {
      id: 3,
      stack: "Redux",
      icon: SiRedux,
    },
    {
      id: 4,
      stack: "Bootstrap",
      icon: SiBootstrap,
    },
    {
      id: 5,
      stack: "JavaScript",
      icon: SiJavascript,
    },
  ];

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center gap-4"
      style={{ height: "100px" }}
    >
      {stackUsed.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.id} className="d-flex flex-column align-items-center">
            <Icon size={18} color="white" />
            <small style={{color:"white"}}>{item.stack}</small>
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
