import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { fetchResume } from "./features/resumeSlice";
import Home from "./pages/home";
import AboutMe from "./pages/aboutme";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Education from "./pages/education";
import WorkExperience from "./pages/workExperience";
import Demos from "./pages/demos";

import HomeBackground from "./backgrounds/homeBackground";
import ProfileAssistant from "./components/profileAssistant";

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
      <HomeBackground />
      <Navbar />
      <ProfileAssistant />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/demos" element={<Demos />} />
        <Route path="/education" element={<Education />} />
        <Route path="/experience" element={<WorkExperience />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
