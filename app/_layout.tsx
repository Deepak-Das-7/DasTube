import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  // return <Stack/> 
  return (
    <>
    <StatusBar hidden={true}/>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown:false }} />
    </Stack>
    </>
  );
}
