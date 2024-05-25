import { StyleSheet } from 'react-native';
import { useFontSize } from '@context/fontsize';

export function GlobalFontSize(){
    const {isLargeText} = useFontSize();
    // needs to get the value idLargeText from context, so to determine the font size

    const styles = StyleSheet.create({
        text:{
            fontSize: isLargeText ? 24: 16,
        }
    })

    return styles;
}