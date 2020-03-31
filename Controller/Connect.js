import CookieManager from '@react-native-community/cookies';
import * as Cheerio from 'react-native-cheerio';
import NetInfo from '@react-native-community/netinfo';

function MyError(name, message) {
  this.name = name || 'Custom error';
  this.message = message || 'Error thrown';
}

class ConnectController {
  // Function test the network
  async networkStatus() {
    const network = await NetInfo.fetch();
    if (!network.isConnected) {
      throw new MyError('no-network', 'There is no network.');
    } else if (!network.isInternetReachable) {
      throw new MyError(
        'unreachable-network',
        'Something went wrong with the network.',
      );
    }
    return network;
  }

  async request(url, option) {
    //Test the network first
    await this.networkStatus();
    // If successful connect to network
    const response = await fetch(url, option);
    if (response.status >= 400) {
      throw new MyError('error-server', "Can't send request to server.");
    }
    return response;
  }

  async load(url, nameParams) {
    const response = await this.request(url);
    const [responseText, cookies] = await Promise.all([
      response.text(),
      CookieManager.get(url),
    ]);
    let valueParams = {};
    if (nameParams) {
      const $ = Cheerio.load(responseText);
      for (const name in nameParams) {
        const query = nameParams[name];
        valueParams[name] = $(query);
      }
    }
    return {responseText, cookies, params: valueParams};
  }

  async clearCookies() {
    return CookieManager.clearAll();
  }
}

export const Connect = new ConnectController();
