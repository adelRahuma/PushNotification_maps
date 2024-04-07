import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./Screens/MapScreen";
import NotificationScreen from "./Screens/NotificationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NotificationScreen">
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{ title: "Notifications" }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ title: "Map" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
