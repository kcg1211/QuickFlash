import { StyleSheet } from 'react-native';
import { useFontSize } from '@context/fontsize';

export function GlobalFontSize(){
    const {isLargeText} = useFontSize();

    const styles = StyleSheet.create({
        text:{
            fontSize: isLargeText ? 24: 16,
        }
    })

    return styles;
}