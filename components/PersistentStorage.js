import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
        alert('Failed to save the data to the storage')
    }
  }

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value
      }
    } catch(e) {
        alert('Failed to GET data from storage using key: ' + key)
    }
  }