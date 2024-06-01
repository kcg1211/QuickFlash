// component for context of the app's theme

import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FontSizeContext = createContext();

export const useFontSize = () => useContext(FontSizeContext);

export function FontSizeProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    const getFontSize = async () => {
      try {
        const storedFontSize = await AsyncStorage.getItem("isLargeText");
        const parsedFontSize = storedFontSize ? JSON.parse(storedFontSize) : false;
        setIsLargeText(parsedFontSize);
      } catch (error) {
        console.error("Error loading font size:", error);
      }
    };
    getFontSize();
  }, []);

  return (
    <FontSizeContext.Provider value={{ isLargeText, setIsLargeText }}>
        {children}
    </FontSizeContext.Provider>
  );
}



  