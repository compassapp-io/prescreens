import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { AuthProvider } from './src/provider/Auth';
import { APIProvider } from "./src/provider/API";
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from "./src/screens/Navigator/AppNavigator";

function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {

    return (
      <AuthProvider>
        <APIProvider>
          <AppNavigator />
        </APIProvider>
      </AuthProvider>)
  }
}
function loadResourcesAsync() {
  return Font.loadAsync({
    "roboto-regular": require("./src/assets/fonts/roboto-regular.ttf"),
    "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-SemiBold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    "Raleway-Regular": require("./src/assets/fonts/Raleway-Regular.ttf"),
    "Raleway-Bold": require("./src/assets/fonts/Raleway-Bold.ttf"),
    "Raleway-SemiBold": require("./src/assets/fonts/Raleway-SemiBold.ttf")
  })
}
function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
  SplashScreen.hideAsync();
}

export default App;
