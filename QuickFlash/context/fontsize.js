// component for context of the app's theme

import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FontSizeContext = createContext();
// naming of the constant should be self-explanatory. if it is a context for theme, then name it ThemeContext. If it is a context for user, then 
// name it UserContext

export const useFontSize = () => useContext(FontSizeContext);
// custom hook to avoid importing useContext and ThemeContext repeatedly in different files

export function FontSizeProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    const getFontSize = async () => {
      try {
        const storedFontSize = await AsyncStorage.getItem("isLargeText");
        const parsedFontSize = storedFontSize ? JSON.parse(storedFontSize) : false;
        // if there is no storedTheme (null), pardedTheme will return false. Otherwise, the storedTheme will be parsed and parsedTheme will be true
        setIsLargeText(parsedFontSize);
      } catch (error) {
        console.error("Error loading font size:", error);
      }
    };
    getFontSize();
  }, []);
  // this useEffect() is for getting the user's preference on text size when starting the app

  return (
    <FontSizeContext.Provider value={{ isLargeText, setIsLargeText }}>
        {children}
    </FontSizeContext.Provider>
  );
  // value of isLargeText and setIsLargeText will be provided to customer components which is being wrapped by the <ThemeContext> component.
  // In this app's example, it will apply to all tab screens, as how the <ThemeProvider> component is implemented in App.js
}



  