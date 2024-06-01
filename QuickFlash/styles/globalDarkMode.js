import { StyleSheet } from 'react-native';
import { useDarkMode } from '@context/darkmode';

export function GlobalDarkMode(){
    const {isDarkMode} = useDarkMode();

    const styles = StyleSheet.create({
        view:{
            backgroundColor: isDarkMode ? "#414141":"white",
        },
        text:{
            color: isDarkMode ? "white": "black",
        },
        textInput:{
            backgroundColor: isDarkMode ? "#414141":"white",
            color: isDarkMode ? "white" : "black",
        },
    })

    return styles;
}