import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { fetchResume } from "./features/resumeSlice";
import Home from "./pages/home";
import AboutMe from "./pages/aboutme";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import DefaultBackground from "./backgrounds/defaultBackground";
import Education from "./pages/education";
import WorkExperience from "./pages/workExperience";

const App = () => {
  /**
   * Resume Parsing
   */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);
  return (
    <>
      <DefaultBackground />
      <div
        className="d-flex flex-column"
        style={{
          height: "100vh",
          // overflow: "hidden",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/education" element={<Education />} />
          <Route path="/experience" element={<WorkExperience />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
