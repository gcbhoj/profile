import { useDispatch } from "react-redux";
import Footer from "./components/footer";
import Header from "./components/header";
import PageDisplay from "./components/pageDisplay";
import ThemeManager from "./features/themeManager";
import { useEffect } from "react";
import { fetchResume } from "./features/resumeSlice";

const App = () => {
  /**
   * Resume Parsing
   */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);
  return (
    <div
      className="d-flex flex-column"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <ThemeManager />
      <Header />
      <PageDisplay />
      <Footer />
    </div>
  );
};

export default App;
