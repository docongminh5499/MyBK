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
    this.state = {
      username: 'phuc.nguyen.k17',
      password: 'Youre=nothing46',
      isLoggedIn: false,
      statusColor: '#428AF8',
    };
  }
  login = () => {
    this.sendUserData();
  };
  logout = async () => {
    try {
      await fetch('https://mybk.hcmut.edu.vn/stinfo/logout');
      await CookieManager.clearAll();
      this.setState({isLoggedIn: false});
      this.loadLoginPage()
        .then(({lt}) => {
          this.setState({lt});
        })
        .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };
  sendUserData = async () => {
    if (this.state.isLoggedIn) {
      console.log('already logged in');
      return null;
    }
    try {
      const url = 'https://sso.hcmut.edu.vn/cas/login';
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
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          Pragma: 'no-cache',
          'Upgrade-Insecure-Requests': '1',
        },
        body: `username=${this.state.username}&password=${this.state.password}&lt=${this.state.lt}&execution=e1s1&_eventId=submit&submit=Login`,
      });
      const htmlString = await data.text();
      const $ = cheerio.load(htmlString);
      const loginStatus = $('#msg').text();
      if (loginStatus.includes('Log In Successful')) {
        this.setState({isLoggedIn: true});
        console.log('log in successful');
        // this.props.navigation.navigate('dashboard');
      } else {
        this.setState({statusColor: 'red'});
        console.log('Log in failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  loadLoginPage = async () => {
    let lt;
    try {
      const url = 'https://sso.hcmut.edu.vn/cas/login';
      const response = await fetch(url);
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const x = $('input[name=lt]');
      console.log(x);
      lt = $('input[name=lt]').attr('value');
      return {lt};
    } catch (error) {
      console.error(error);
    } finally {
      return {lt};
    }
  };
  validateAndSetPassword = password => {
    this.setState({password, statusColor: '#428AF8'});
  };

  validateAndSetUsername = username => {
    this.setState({username, statusColor: '#428AF8'});
  };
  fetchStinfo = async () => {
    const data = await fetch('https://mybk.hcmut.edu.vn/stinfo');
    const htmlString = await data.text();
    const $ = cheerio.load(htmlString);
    const token = $('meta[name=_token]').attr('content');
    const grade = await fetch(
      'https://mybk.hcmut.edu.vn/stinfo/grade/ajax_grade',
      {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': token,
        },
      },
    );
    const gradeData = await grade.json();
    console.log(gradeData);
  };
  componentDidMount() {
    this.loadLoginPage()
      .then(({lt}) => {
        this.setState({lt});
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
                underlineColorAndroid={this.state.statusColor}
                onChangeText={this.validateAndSetUsername}
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
                underlineColorAndroid={this.state.statusColor}
                onChangeText={this.validateAndSetPassword}
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
            <Button onPress={this.logout} title="Logout" />

            <Button onPress={this.fetchStinfo} title="Fetch" />
          </View>
        </View>
      </>
    );
  }
}
