import { StyleSheet } from 'react-native';
import { useDarkMode } from '@context/darkmode';

export function GlobalDarkMode(){
    const {isDarkMode} = useDarkMode();
    // needs to get the value idLargeText from context, so to determine the font size

    const styles = StyleSheet.create({
        view:{
            backgroundColor: isDarkMode ? "#414141":"white",
        },
        text:{
            color: isDarkMode ? "white": "black",
        }
    })

    return styles;
}