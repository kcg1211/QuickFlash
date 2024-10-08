import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { FontSizeProvider } from "@context/fontsize";
import { DarkModeProvider } from "@context/darkmode";
import * as SplashScreen from 'expo-splash-screen';

import CardScreen from "@screens/CardScreen";
import SettingsScreen from "@screens/SettingsScreen";
import AddCardScreen from "@screens/AddCardScreen";
import AccountScreen from "@screens/AccountScreen";
import AboutScreen from "@screens/AboutScreen";


SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 2000);

const Tab = createBottomTabNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <FontSizeProvider>
      <DarkModeProvider>
        {/* ThemeContext context is applied to all tabs */}
        <Tab.Navigator
          screenOptions={({route}) => {
            return {
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                // let iconColor;
                if (route.name === "Cards"){
                  iconName = "cards"
                  iconColor = focused ? "#509CD5" : color;
                }
                else if (route.name === "Add Cards"){
                  iconName = "card-plus"
                  iconColor = focused ? "#509CD5" : color;
                }
                else if (route.name === "Account"){
                  iconName = "account"
                  iconColor = focused ? "#509CD5" : color;
                }
                else if (route.name === "Settings"){
                  iconName = "cog"
                  iconColor = focused ? "#509CD5" : color;
                }
                else if (route.name === "About"){
                  iconName = "information"
                  iconColor = focused ? "#509CD5" : color;
                }
                return <MaterialCommunityIcons name={iconName} size={size} color={iconColor} />;
              },
              tabBarLabel: ({ focused, color }) => {
                let label;
                if (route.name === "Cards") {
                  label = "Cards";
                } 
                else if (route.name === "Add Cards") {
                  label = "Add Cards";
                }
                else if (route.name === "Account") {
                  label = "Account";
                }
                else if (route.name === "Settings") {
                  label = "Settings";
                }
                else if (route.name === "About") {
                  label = "About";
                }
                return <Text style={[{ color: focused ? "#509CD5" : color }, styles.text]}>{label}</Text>;
              },
              tabBarStyle: {
                height: 85,
                paddingHorizontal: 5,
                paddingTop: 10,
                // backgroundColor: 'rgba(34,36,40,1)',
                position: 'absolute',
                borderTopWidth: 0
              },
              headerStyle: {
                // backgroundColor: 'rgba(34,36,40,1)',  
              },
              headerTitleStyle: {
                // color: "white",
              }
            }
          }}
          // use screenOptions to render the tab icons
          >
          <Tab.Screen name="Cards" component={CardScreen} />
          <Tab.Screen name="Add Cards" component={AddCardScreen} />
          <Tab.Screen name="Account" component={AccountScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </DarkModeProvider>
      </FontSizeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 13
  }
})



