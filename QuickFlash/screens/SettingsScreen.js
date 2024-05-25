import { Text, Switch, View, StyleSheet } from "react-native";
import { useState } from "react";
import GlobalLayout from "@components/Layout";

import { useFontSize } from '@context/fontsize';
import { GlobalFontSize } from '@styles/globalFontSize';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const {isLargeText, setIsLargeText} = useFontSize();
  // acquiring the values from the context by the custom hook, then the values are being changed by the logic of the switch below
  // another way of writing this line of code would be --> const [isLargeText, setIsLargeText] = useContext(ThemeContext);,
  // if the custom hook useTheme() is not defined. But useContext and ThemeContext will ahve to be imported

  const globalFontSize = GlobalFontSize();

  return (
    <GlobalLayout>
      <View style={styles.view}>
        <Switch
            value={isLargeText}
            onValueChange={async () => {
                await AsyncStorage.setItem("isLargeText", JSON.stringify(!isLargeText));
                // when value is changed, the new value of isLargeText is stored by AsyncStorage, then it's set as the new value of isLargeText
                setIsLargeText(!isLargeText);
            }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            // trackColor prop: set the color of the switch track when the switch is in the on and off positions
        />
        <Text style={globalFontSize.text}>Large Text</Text>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
});







 