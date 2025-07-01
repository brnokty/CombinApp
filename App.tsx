import React, { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import { Provider } from 'react-redux';
import { store } from './src/store';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    'BGR_Font': require('./assets/Fonts/BGR_Font.otf'),
    'LilitaOne-Regular': require('./assets/Fonts/LilitaOne-Regular.ttf'),
    'Lobster-Regular': require('./assets/Fonts/Lobster-Regular.ttf'),
    'Pacifico-Regular': require('./assets/Fonts/Pacifico-Regular.ttf'),
    'PermanentMarker-Regular': require('./assets/Fonts/PermanentMarker-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer onReady={onLayoutRootView}>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
}
