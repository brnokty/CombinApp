import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection,getDocs, query, where, onSnapshot } from 'firebase/firestore';

const CombinationCard = ({ topColor, bottomColor }) => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../../assets/Images/top.png')}
        style={[styles.image, { tintColor: topColor }]}
        resizeMode="contain" 
      />
      <Image
        source={require('../../assets/Images/top_back.png')}
        style={[styles.backImage, {}]}
      />
       
      <Image
        source={require('../../assets/Images/bottom.png')}
        style={[styles.image, { tintColor: bottomColor }]}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/Images/bottom_back.png')}
        style={[styles.backImage, {}]}
      />
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [combinations, setCombinations] = useState([]);

  const fetchCombinations = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'combinations'));
      const data = snapshot.docs.map(doc => doc.data());
      setCombinations(data);
    } catch (error) {
      console.error('Error fetching combinations:', error);
    }
  };

  useEffect(() => {
  const user = getAuth().currentUser;
  if (!user) return;

  const q = query(
    collection(db, 'combinations'),
    where('userId', '==', user.uid)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const userCombinations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCombinations(userCombinations);
  });

  return () => unsubscribe();
}, []);

  const renderItem = ({ item }) => {
    if (item.isAddButton) {
      return (
        <TouchableOpacity
          style={styles.addButtonCard}
          onPress={() => navigation.navigate('AddCombination')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <CombinationCard
        topColor={item.topColor}
        bottomColor={item.bottomColor}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ isAddButton: true }, ...combinations]}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    width: 120,
    height: 150,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    marginVertical: -10,
  },
  backImage: {
    width: 80,
    height: 80,
    marginTop:-70,
    position:"relative"
  },
  addButtonCard: {
    width: 120,
    height: 150,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    fontSize: 48,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});