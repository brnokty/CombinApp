import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddCombinationScreen from '../screens/AddCombinationScreen'; 


export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddCombination: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Giriş Yap' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Kayıt Ol' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Anasayfa' }} />
      <Stack.Screen name="AddCombination" component={AddCombinationScreen} options={{ title: 'Kombin Ekle' }}/>
    </Stack.Navigator>
  );
};

export default AuthStack;
