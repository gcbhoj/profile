import { createContext, useContext } from "react";

// 1. Create the context container here
export const ThreeContext = createContext(null);

// 2. Export the custom hook cleanly from this dedicated file
export const useThree = () => {
  const context = useContext(ThreeContext);
  return context;
};
