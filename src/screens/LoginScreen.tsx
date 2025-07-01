// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AuthStack';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice'; // redux'taki action'ı import ediyoruz

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(setUser({
        uid: user.uid,
        email: user.email,
      }));

      Alert.alert('Başarılı', 'Giriş yapıldı!');
      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Giriş Yap" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>Hesabın yok mu? Kayıt Ol</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
    marginTop: -100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 16,
    color: '#007bff',
    textAlign: 'center',
  },
});
