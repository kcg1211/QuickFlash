import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ImageBackground } from "react-native";
import backgroundImg from '@assets/QFbackground.png'

export default function GlobalLayout({ children }) {

  return (
    <ImageBackground source={backgroundImg} style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeArea}>
          <StatusBar style="auto"/>
            <View style={styles.container}>
                {children}
            </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1, 
  },
  container: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
  },
});
