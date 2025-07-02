// src/screens/AddCombinationScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addCombination } from '../store/slices/combinationSlice';
import { RootState } from '../store';
import Ionicons from 'react-native-vector-icons/Ionicons';


const AddCombinationScreen = ({ navigation }) => {
  const [topColor, setTopColor] = useState('#0000ff');
  const [bottomColor, setBottomColor] = useState('#00ff80');
  const [selectedPart, setSelectedPart] = useState<'top' | 'bottom'>('top');

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleSaveCombination = async () => {
  if (!user) {
    Alert.alert('Hata', 'Kullanıcı bilgisi alınamad');
    return;
  }

  const payload = {
    topColor,
    bottomColor,
    createdAt: new Date().toISOString(),
    userId: user.uid,
  };

  try {
    await dispatch(addCombination(payload)).unwrap(); 
    //navigation.goBack(); // 
    navigation.replace('Home');
  } catch (error) {
    Alert.alert('Hata', 'Kombin eklenirken bir sorun oluştu.');
    console.error(error);
  }
};


  const handleColorChange = (color: string) => {
    if (selectedPart === 'top') {
      setTopColor(color);
    } else {
      setBottomColor(color);
    }
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={28} color="#000" />
  </TouchableOpacity>
      <Text style={styles.title}>Yeni Kombin Oluştur</Text>

      <TouchableOpacity onPress={() => setSelectedPart('top')}>
        <Image
          source={require('../../assets/Images/top.png')}
          style={[
            styles.image,
            selectedPart === 'top' && styles.selected,
            { tintColor: topColor },
          ]}
          resizeMode="contain"
        />
        <Image source={require('../../assets/Images/top_back.png')} style={styles.backImage} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelectedPart('bottom')}>
        <Image
          source={require('../../assets/Images/bottom.png')}
          style={[
            styles.image,
            selectedPart === 'bottom' && styles.selected,
            { tintColor: bottomColor },
          ]}
          resizeMode="contain"
        />
        <Image source={require('../../assets/Images/bottom_back.png')} style={styles.backImage} />
      </TouchableOpacity>

      <Text style={styles.label}>Renk Seç</Text>
      <WheelColorPicker
        onColorChange={handleColorChange}
        style={styles.picker}
        initialColor={selectedPart === 'top' ? topColor : bottomColor}
        thumbStyle={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#fff',
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveCombination}>
        <Text style={styles.buttonText}>KOMBİNİ EKLE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCombinationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  backImage: {
    width: 150,
    height: 150,
    marginTop: -166,
    position: 'relative',
  },
  selected: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 12,
  },
  picker: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0af',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton:{
    alignSelf:"flex-start",
  },
});
