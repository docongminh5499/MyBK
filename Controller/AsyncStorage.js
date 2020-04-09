import AsyncStorage from '@react-native-community/async-storage';
import {Key} from './CredentialKey';

class Storage {
  constructor() {
    this.key = Key.Storage;
  }

  transformName(name) {
    return `mybkapp-@${this.key}-${name}`;
  }

  async get(key) {
    try {
      const transformedKey = this.transformName(key);
      const data = await AsyncStorage.getItem(transformedKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.log(`GET ERROR: ${key} item.`);
      return false;
    }
  }

  async set(key, value) {
    try {
      const transformedKey = this.transformName(key);
      const transformedVal = JSON.stringify(value);
      AsyncStorage.setItem(transformedKey, transformedVal);
    } catch (error) {
      console.log(`SET ERROR: ${key} item.`);
    }
  }

  async clear(...keys) {
    try {
      const transformedKey = keys.map(key => this.transformName(key));
      if (transformedKey.length) {
        AsyncStorage.multiRemove(transformedKey);
      } else {
        const storedKey = await AsyncStorage.getAllKeys();
        const appKey = storedKey.filter(key => key.includes('mybkapp'));
        AsyncStorage.multiRemove(appKey);
      }
    } catch (error) {
      console.log('CLEAR ERROR.');
    }
  }
}

export const MyStorage = new Storage();
