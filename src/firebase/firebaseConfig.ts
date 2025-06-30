// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBinklBHTTpt0LRJuR_E4Upm-9RTiZIpv8',
  authDomain: 'combinapp-brn.firebaseapp.com',
  projectId: 'combinapp-brn',
  storageBucket: 'combinapp-brn.appspot.com',
  messagingSenderId: '325704514499',
  appId: '1:325704514499:android:6c8ee53f945b2b15809b76',
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
