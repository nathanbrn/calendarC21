import AsyncStorage from '@react-native-async-storage/async-storage';

export async function handleDeleteData() {
  try {
    await AsyncStorage.removeItem('@avoidchild:name');
    await AsyncStorage.removeItem('@avoidchild:date');
    await AsyncStorage.removeItem('@avoidchild:infoChecked');
  } catch (error) {
    console.log(error);
  }
}
