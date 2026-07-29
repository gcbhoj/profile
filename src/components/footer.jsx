import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const { github, linkedin } = useSelector((state) => state.resume);

  const profiles = [
    {
      id: 1,
      name: "GitHub",
      icon: FaGithub,
      link: github,
    },
    {
      id: 2,
      name: "LinkedIn",
      icon: FaLinkedin,
      link: linkedin,
    },
  ];

  return (
    <footer
      className="fixed-bottom shadow-sm"
      style={{
        height: "100px",
      }}
    >
      <div className="container-fluid h-100 d-flex flex-column justify-content-center">
        {/* Social Profiles */}
        <div className="d-flex justify-content-center align-items-center gap-4 mb-2">
          {profiles.map((profile) => {
            const Icon = profile.icon;

            return (
              <a
                key={profile.id}
                href={profile.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-body"
                title={profile.name}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        {/* Footer Text */}
        <div className="text-center text-secondary">
          <small>@BhojGC Updated July 2026</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
