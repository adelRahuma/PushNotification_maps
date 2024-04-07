import React, { useEffect, useState } from "react";
import { View, Text, Button, Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
export default function NotificationScreen({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      setExpoPushToken(token);
      // Save the token to Firestore
     console.log(token) 
       
      
    });
  }, []);
  const registerForPushNotificationsAsync = async () => {
    let token = null;

    // Set up notification channel for Android
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // Check if the device is capable of receiving push notifications
    if (Device.isDevice) {
      // Request permission for notifications if not granted already
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // Retrieve the push token
      if (finalStatus === "granted") {
        const tokenResponse = await Notifications.getExpoPushTokenAsync({
          projectId: "ea7494cc-1b48-46b9-8d09-59c73179b218",
        });
        token = tokenResponse.data;
        console.log("Push token:", token);
      } else {
        Alert.alert("Failed to get push token for push notification!");
      }
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }

    return token;
  };
  const sendNotification = async () => {
    console.log("Sending push notification...");

    // notification message
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };

  return (
    <View style={{ marginTop: 100, alignItems: "center" }}>
      <Text style={{ marginVertical: 30 }}>Expo RN Push Notifications</Text>
      <Button title="Send push notification" onPress={sendNotification} />
    </View>
  );
}
