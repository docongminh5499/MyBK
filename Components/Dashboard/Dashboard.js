import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {DashboardScreenStyle} from './Styles';
import CookieManager from '@react-native-community/cookies';
export default class Dashboard extends Component {
  componentDidMount() {
    CookieManager.get('sso.hcmut.edu.vn').then(s => console.log(s));
  }
  fetchStinfo = async () => {
    const s = await fetch('https://mybk.hcmut.edu.vn/stinfo/');
    const n = await s.text();
    console.log(n.includes('Khoa Khoa học'));
  };
  logOut = async () => {
    await fetch('https://mybk.hcmut.edu.vn/stinfo/logout');
    await CookieManager.clearAll();
    this.props.navigation.navigate('login');
  };
  render() {
    return (
      <View style={DashboardScreenStyle.loginContainer}>
        <Text>ABDDS</Text>
        <Button title="Logout" onPress={this.logOut} />

        <Button title="fetch" onPress={this.fetchStinfo} />
      </View>
    );
  }
}
