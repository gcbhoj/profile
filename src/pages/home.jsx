import { useSelector } from "react-redux";

const Home = () => {
  const { name } = useSelector((state) => state.resume);
  return <div>{name}</div>;
};

export default Home;
