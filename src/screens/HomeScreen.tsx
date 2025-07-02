import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCombinations } from '../store/slices/combinationSlice';
import { RootState } from '../store';
import { getAuth, signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const CombinationCard = ({ topColor, bottomColor }: { topColor: string; bottomColor: string }) => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../../assets/Images/top.png')}
        style={[styles.image, { tintColor: topColor }]}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/Images/top_back.png')}
        style={styles.backImage}
      />
      <Image
        source={require('../../assets/Images/bottom.png')}
        style={[styles.image, { tintColor: bottomColor }]}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/Images/bottom_back.png')}
        style={styles.backImage}
      />
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { combinations } = useSelector((state: RootState) => state.combinations);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchCombinations(user.uid));
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login' as never);
    } catch (error: any) {
      Alert.alert('Çıkış Hatası', error.message);
    }
  };

  const renderItem = ({ item }: any) => {
  if (item?.isAddButton) {
    return (
      <TouchableOpacity
        style={styles.addButtonCard}
        onPress={() => navigation.navigate('AddCombination' as never)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    );
  }

  if (item?.topColor && item?.bottomColor) {
    return <CombinationCard topColor={item.topColor} bottomColor={item.bottomColor} />;
  }

  return null;
};


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={[{ isAddButton: true }, ...combinations]}
        keyExtractor={(_, index) => index.toString()}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 0,
  },
  logoutButton: {
    padding: 8,
  },
  list: {
    alignItems: "flex-start",
    alignSelf:"center",
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
    marginTop: -70,
    position: 'relative',
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
