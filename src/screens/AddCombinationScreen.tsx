import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import WheelColorPicker from 'react-native-wheel-color-picker';
import { getAuth } from 'firebase/auth';


const AddCombinationScreen = ({ navigation }) => {
  const [topColor, setTopColor] = useState('#0000ff');
  const [bottomColor, setBottomColor] = useState('#00ff80');
  const [selectedPart, setSelectedPart] = useState<'top' | 'bottom'>('top');

  const auth = getAuth();

const handleSaveCombination = async () => {
  try {
    navigation.goBack();
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, 'combinations'), {
      topColor: topColor,
      bottomColor: bottomColor,
      createdAt: new Date().toISOString(),
      userId: user.uid, // kullanıcıya ait
    });

    
  } catch (error) {
    console.error('Error saving combination:', error);
  }
};


  const handleColorChange = (color) => {
    if (selectedPart === 'top') {
      setTopColor(color);
    } else {
      setBottomColor(color);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yeni Kombin Oluştur</Text>
      <TouchableOpacity onPress={() => setSelectedPart('top')}>
        <Image
          source={require('../../assets/Images/top.png')}
          style={[styles.image, selectedPart === 'top' && styles.selected, { tintColor: topColor }]}
          resizeMode="contain"
        />
        <Image
                source={require('../../assets/Images/top_back.png')}
                style={[styles.backImage, {}]}
              />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedPart('bottom')}>
        <Image
          source={require('../../assets/Images/bottom.png')}
          style={[styles.image, selectedPart === 'bottom' && styles.selected, { tintColor: bottomColor }]}
          resizeMode="contain"
        />
        <Image
                source={require('../../assets/Images/bottom_back.png')}
                style={[styles.backImage, {}]}
              />
      </TouchableOpacity>

      <Text style={styles.label}>Renk Seç</Text>
      <WheelColorPicker
        onColorChange={handleColorChange}
        style={styles.picker}
        initialColor={selectedPart === 'top' ? topColor : bottomColor}
        thumbStyle={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#fff' }}
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
    marginTop:-166,
    position:"relative"
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
});
