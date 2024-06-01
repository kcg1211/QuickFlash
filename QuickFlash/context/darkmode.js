// component for context of the app's theme

import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem("isDarkMode");
        const parsedDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
        setIsDarkMode(parsedDarkMode);
      } catch (error) {
        console.error("Error loading dark mode:", error);
      }
    };
    getDarkMode();
  }, []);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        {children}
    </DarkModeContext.Provider>
  );
}



  