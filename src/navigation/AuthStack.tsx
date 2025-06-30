import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import AddCombinationScreen from '../screens/AddCombinationScreen'; 
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';



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
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'CombinApp',
    headerTitleStyle: {
      fontFamily: 'Pacifico-Regular',  
      fontSize: 25,
      color: '#333',
    },
    headerLeft: () => (
      <Image
        source={require('../../assets/Images/icon.png')}
        style={{ width: 50, height: 50, marginLeft: -5 }}
        resizeMode="contain"
      />
    ),
  }}
/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'CombinApp',
    headerTitleStyle: {
      fontFamily: 'Pacifico-Regular',  
      fontSize: 25,
      color: '#333',
    },
    headerLeft: () => (
      <Image
        source={require('../../assets/Images/icon.png')}
        style={{ width: 50, height: 50, marginLeft: -5 }}
        resizeMode="contain"
      />
    ),
  }}
/>
      <Stack.Screen name="Home" component={HomeScreen} options={{
    title: 'CombinApp',
    headerTitleStyle: {
      fontFamily: 'Pacifico-Regular',  
      fontSize: 25,
      color: '#333',
    },
    headerLeft: () => (
      <Image
        source={require('../../assets/Images/icon.png')}
        style={{ width: 50, height: 50, marginLeft: -5 }}
        resizeMode="contain"
      />
    ),
  }}
/>
      <Stack.Screen name="AddCombination" component={AddCombinationScreen} options={{ title: 'CombinApp',
    headerTitleStyle: {
      fontFamily: 'Pacifico-Regular',  
      fontSize: 25,
      color: '#333',
    },
    headerLeft: () => (
      <Image
        source={require('../../assets/Images/icon.png')}
        style={{ width: 50, height: 50, marginLeft: -5 }}
        resizeMode="contain"
      />
    ),
  }}
/>
    </Stack.Navigator>
  );
};

export default AuthStack;
