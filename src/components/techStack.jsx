import {
  SiVite,
  SiReact,
  SiRedux,
  SiBootstrap,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiMysql,
  SiMongodb,
  SiSpringboot,
  SiIonic,
  SiAngular,
  SiPostgresql,
  SiFlask,
  SiTypescript,
  SiApachemaven,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

const techStack = [
  {
    id: 1,
    category: "Client Side",
    rows: [
      {
        id: 1,
        stacks: [
          {
            type: "Framework",
            name: "Vite + React",
            icons: [SiVite, SiReact],
          },
          {
            type: "State Management",
            name: "Redux",
            icons: [SiRedux],
          },
          {
            type: "Styling",
            name: "Bootstrap",
            icons: [SiBootstrap],
          },
        ],
      },
      {
        id: 2,
        stacks: [
          {
            type: "Framework",
            name: "Angular + Ionic",
            icons: [SiAngular, SiIonic],
          },
          {
            type: "State Management",
            name: "Behavior Subject",
            icons: [SiRedux],
          },
          {
            type: "UI Components",
            name: "Ionic Components",
            icons: [SiIonic],
          },
        ],
      },
    ],
  },

  {
    id: 2,
    category: "Server Side API",
    rows: [
      {
        id: 1,
        stacks: [
          {
            type: "Framework",
            name: "Node.js + Express",
            icons: [SiNodedotjs, SiExpress],
          },
          {
            type: "Database ",
            name: "Mongo DB",
            icons: [SiMongodb],
          },
        ],
      },
      {
        id: 2,
        stacks: [
          {
            type: "Framework",
            name: "Spring Boot + Maven",
            icons: [SiSpringboot, SiApachemaven],
          },
          {
            type: "Database",
            name: "My SQL",
            icons: [SiMysql],
          },
        ],
      },
      {
        id: 3,
        stacks: [
          {
            type: "Framework",
            name: "Python + Flask",
            icons: [SiPython, SiFlask],
          },
          {
            type: "Database",
            name: "Mongo DB",
            icons: [SiMongodb],
          },
        ],
      },
    ],
  },

  {
    id: 3,
    category: "Databases",
    rows: [
      {
        id: 1,
        stacks: [
          {
            type: "Relational",
            name: "MySQL + Postgres SQL",
            icons: [SiMysql, SiPostgresql],
          },
          {
            type: "NoSQL",
            name: "MongoDB",
            icons: [SiMongodb],
          },
        ],
      },
    ],
  },

  {
    id: 4,
    category: "Programming Languages",
    rows: [
      {
        id: 1,
        stacks: [
          {
            type: "Frontend",
            name: "JavaScript",
            icons: [SiJavascript],
          },
          {
            type: "Frontend",
            name: "Type Script",
            icons: [SiTypescript],
          },
          {
            type: "Backend",
            name: "Java",
            icons: [FaJava],
          },
          {
            type: "Backend/Data",
            name: "Python",
            icons: [SiPython],
          },
        ],
      },
    ],
  },
];

const TechStack = () => {
  return (
    <div className="container-fluid py-3 tech-stack">
      <div className="row g-4">
        {techStack.map((section) => (
          <div key={section.id} className="col-12 col-md-6 col-lg-4">
            <h6 className="text-center fw-bold category-title">
              {section.category}
            </h6>

            {section.rows.map((row) => (
              <div key={row.id} className="row g-2 mb-3">
                {row.stacks.map((stack) => (
                  <div key={stack.name} className="col-4 tech-item">
                    <div className="tech-icon">
                      {stack.icons.length > 0 &&
                        stack.icons.map((Icon, index) => (
                          <Icon key={index} className="tech-icon-svg" />
                        ))}
                    </div>

                    <small className="tech-name">{stack.name}</small>

                    <small className="stack-type">{stack.type}</small>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
