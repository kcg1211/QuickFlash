// component for context of the app's theme

import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DarkModeContext = createContext();
// naming of the constant should be self-explanatory. if it is a context for theme, then name it ThemeContext. If it is a context for user, then 
// name it UserContext

export const useDarkMode = () => useContext(DarkModeContext);
// custom hook to avoid importing useContext and ThemeContext repeatedly in different files

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getDarkMode = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem("isDarkMode");
        const parsedDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : false;
        // if there is no storedTheme (null), pardedTheme will return false. Otherwise, the storedTheme will be parsed and parsedTheme will be true
        setIsDarkMode(parsedDarkMode);
      } catch (error) {
        console.error("Error loading dark mode:", error);
      }
    };
    getDarkMode();
  }, []);
  // this useEffect() is for getting the user's preference on text size when starting the app

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        {children}
    </DarkModeContext.Provider>
  );
  // value of isLargeText and setIsLargeText will be provided to customer components which is being wrapped by the <ThemeContext> component.
  // In this app's example, it will apply to all tab screens, as how the <ThemeProvider> component is implemented in App.js
}



  