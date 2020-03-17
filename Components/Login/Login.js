import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {LoginScreenStyle} from './Styles';
import CookieManager from '@react-native-community/cookies';
const cheerio = require('react-native-cheerio');

export default class Login extends Component {
  constructor() {
    super();
    this.state = {username: '', password: ''};
  }
  login = () => {
    this.sendUserData();
  };
  logout = async () => {
    await fetch('https://mybk.hcmut.edu.vn/stinfo/logout');
    this.loadLoginPage()
      .then(({lt, jsessionid}) => {
        this.setState({lt, jsessionid});
      })
      .catch(console.error);
  };
  sendUserData = async () => {
    const url = 'https://sso.hcmut.edu.vn/cas/login';
    console.log(this.state.jsessionid, this.state.lt);
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Content-Type': 'application/x-www-form-urlencoded',
        Origin: 'https://sso.hcmut.edu.vn',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0',
        'Accept-Encoding': 'gzip, deflate, br',
        Host: 'sso.hcmut.edu.vn',
        Referer: 'https://sso.hcmut.edu.vn/cas/login',
        DNT: '1',
        'Content-Length': '140',
        'Accept-Language': 'en-US,en;q=0.8,vi-VN;q=0.5,vi;q=0.3',
        Cookie: `JSESSIONID=${this.state.jsessionid}`,
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        Pragma: 'no-cache',
        'Upgrade-Insecure-Requests': '1',
      },
      body: `username=${this.state.username}&password=${this.state.password}&lt=${this.state.lt}&execution=e1s1&_eventId=submit&submit=Login`,
    });
    const dataJson = await data.text();
    CookieManager.setFromResponse(
      'sso.hcmut.edu.vn',
      this.getCookie(data.headers),
    ).then();
    if (dataJson.includes('Log In Successful'))
      console.log('Log In Successful');
    else console.log('Log in failed');
  };
  loadLoginPage = async () => {
    const url = 'https://sso.hcmut.edu.vn/cas/login';
    const response = await fetch(url);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const lt = $('input[name=lt]').attr('value');
    const cookie = this.getCookie(response.headers);
    CookieManager.setFromResponse('sso.hcmut.edu.vn', cookie).then();
    const jsessionid = await CookieManager.get(url);
    console.log(jsessionid);
    return {lt: lt, jsessionid: jsessionid['JSESSIONID']};
  };
  fetchStinfo = async () => {
    const s = await fetch('https://mybk.hcmut.edu.vn/stinfo/');
    const n = await s.text();
    console.log(n.includes('Khoa Khoa học'));
  };
  getCookie = function(headers) {
    for (const [name, value] of headers) {
      if (name === 'set-cookie') {
        return value;
      }
    }
  };
  validateInput = input => {
    return true;
  };
  componentDidMount() {
    this.loadLoginPage()
      .then(({lt, jsessionid}) => {
        this.setState({lt, jsessionid});
      })
      .catch(console.error);
  }
  render() {
    return (
      <>
        <View style={LoginScreenStyle.loginContainer}>
          <View style={LoginScreenStyle.logoContainer}>
            <Image
              source={require('./LogoBK.jpg')}
              style={LoginScreenStyle.logo}
            />
            <Text style={LoginScreenStyle.title}>MyBK</Text>
          </View>
          <View style={LoginScreenStyle.loginForm}>
            <View style={LoginScreenStyle.inputContainer}>
              {/* <Image source="" style={LoginScreenStyle.userIcon} /> */}
              <TextInput
                style={LoginScreenStyle.input}
                placeholder="Username"
                selectionColor="#428AF8"
                underlineColorAndroid="#428AF8"
                onChangeText={username => this.setState({username})}
                value={this.state.username}
              />
            </View>
            <View style={LoginScreenStyle.inputContainer}>
              <Image source="" style={LoginScreenStyle.passwordIcon} />
              <TextInput
                secureTextEntry={true}
                style={LoginScreenStyle.input}
                placeholder="Password"
                selectionColor="#428AF8"
                underlineColorAndroid="#428AF8"
                onChangeText={password => this.setState({password})}
                value={this.state.password}
              />
            </View>
            <TouchableOpacity
              style={LoginScreenStyle.loginButton}
              onPress={this.login}>
              <Text style={LoginScreenStyle.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={LoginScreenStyle.footer}>
            <Text>Footer text</Text>
            <Button onPress={this.logout} title="Logout"></Button>
            <Button onPress={this.fetchStinfo} title="Fetch"></Button>
          </View>
        </View>
      </>
    );
  }
}
