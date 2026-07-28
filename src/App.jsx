import Counter from "./components/counter";
import Footer from "./components/footer";
import Header from "./components/header";
import ThemeManager from "./features/themeManager";

const App = () => {
  return (
    <div>
      <ThemeManager />
      <Header />
      <Counter />
      <Footer />
    </div>
  );
};

export default App;
