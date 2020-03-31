import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TranslateYAndOpacity, ScaleAndOpacity} from 'react-native-motion';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Connect} from '../../Controller/Connect';
import {LoginScreenStyle} from './Styles';
import {AppContext} from '../../Context/AppContext';
import Notification from '../Notification/Notification';
import {MyStorage} from '../../Controller/AsyncStorage';

export default class Login extends Component {
  static contextType = AppContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      seePassword: true,
      rememberMe: false,
      fetching: false,
      showAutoComplete: false,
      remember: [],
    };
  }

  componentDidMount() {
    Connect.clearCookies();
    MyStorage.get('remember').then(data => {
      this.setState(state => {
        state.remember = data;
        data[0] && (state.username = data[0].username);
        data[0] && (state.password = data[0].password);
        return state;
      });
    });
  }

  rememberFunction = () => {
    MyStorage.get('remember').then(data => {
      const {username, password} = this.state;
      const filter = data.filter(item => {
        return item.username === username && item.password === password;
      });
      if (filter.length === 0) {
        const shiftData = {username, password};
        data.unshift(shiftData);
        MyStorage.set('remember', data.slice(0, 4));
      }
      return;
    });
  };

  loadLoginPage = async () => {
    const paramsLogin = {lt: 'input[name=lt]'};
    const url = 'https://sso.hcmut.edu.vn/cas/login';
    const data = await Connect.load(url, paramsLogin);
    this.setState({
      lt: data.params.lt.attr('value'),
      jsessionid: data.cookies.JSESSIONID,
    });
  };

  sendUserData = async () => {
    const data = await Connect.request('https://sso.hcmut.edu.vn/cas/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `username=${this.state.username}&password=${this.state.password}&lt=${this.state.lt}&execution=e1s1&_eventId=submit&submit=Login`,
    });

    const dataText = await data.text();
    if (dataText.includes('Log In Successful')) {
      MyStorage.set('currentUser', this.state.username);
      MyStorage.set('currentPassword', this.state.password);
      MyStorage.set('logout', false);
      this.state.rememberMe && this.rememberFunction();
      this.context.setLogin(true);
    } else {
      this.setState({fetching: false});
      const message = 'Incorrect username or password';
      this.context.message.set(true, 'Error', message, 'error');
    }
  };

  catchErrorFunction = err => {
    this.setState({fetching: false});
    const {set} = this.context.message;
    if (err.name === 'no-network' || err.name === 'unreachable-network') {
      set(true, 'Network Error', err.message, 'error');
    } else {
      const message = 'Sorry, something went wrong.';
      set(true, 'System Error', message, 'error');
    }
  };

  login = () => {
    this.setState({fetching: true}, () => {
      if (this.state.lt && this.state.jsessionid) {
        this.sendUserData().catch(err => this.catchErrorFunction(err));
      } else {
        this.loadLoginPage()
          .then(() => this.sendUserData())
          .catch(err => this.catchErrorFunction(err));
      }
    });
  };

  toggleSeePassword = () =>
    this.setState({seePassword: !this.state.seePassword});
  toggleRememberMe = () => this.setState({rememberMe: !this.state.rememberMe});

  getLoginButton = () => {
    if (this.state.fetching) {
      return <ActivityIndicator size="large" color="white" />;
    } else {
      return <Text style={LoginScreenStyle.buttonText}>ĐĂNG NHẬP</Text>;
    }
  };

  getAutoCompleteContainer = () => {
    const {showAutoComplete, username, remember} = this.state;
    const data = remember.filter(item => item.username.includes(username));
    if (showAutoComplete && data.length) {
      return (
        <View style={LoginScreenStyle.autoComplete}>
          {data.map(item => this.getAutoCompleteElement(item))}
        </View>
      );
    }
    return null;
  };

  onPressAutoCompleteElement = item => {
    this.setState({
      username: item.username,
      password: item.password,
      showAutoComplete: false,
    });
  };

  getAutoCompleteElement = item => {
    const key = item.name + item.password;
    return (
      <TouchableOpacity
        key={key}
        style={LoginScreenStyle.autoElement}
        onPress={() => this.onPressAutoCompleteElement(item)}>
        <Text style={LoginScreenStyle.autoCompleteText}>{item.username}</Text>
      </TouchableOpacity>
    );
  };

  onUserChangeText = username => {
    if (this.state.showAutoComplete) {
      this.setState({username});
    } else {
      this.setState({username, showAutoComplete: true});
    }
  };

  render() {
    return (
      <View style={LoginScreenStyle.loginContainer}>
        <Notification {...this.context.message} />
        <View style={LoginScreenStyle.logoContainer}>
          <TranslateYAndOpacity animateOnDidMount={true} translateYMin={10}>
            <Text style={LoginScreenStyle.title}>MyBK App</Text>
          </TranslateYAndOpacity>
          <TranslateYAndOpacity
            animateOnDidMount={true}
            translateYMin={5}
            delay={800}>
            <Text style={LoginScreenStyle.slogan}>Welcome back!</Text>
          </TranslateYAndOpacity>
        </View>
        <View style={LoginScreenStyle.loginForm}>
          {this.getAutoCompleteContainer()}
          <TranslateYAndOpacity
            animateOnDidMount={true}
            translateYMin={4}
            delay={300}>
            <View style={LoginScreenStyle.inputContainer}>
              <Icon name="user-alt" style={LoginScreenStyle.inputIcon} />
              <TextInput
                style={LoginScreenStyle.input}
                placeholder="Tên đăng nhập"
                onChangeText={username => this.onUserChangeText(username)}
                value={this.state.username}
                autoCapitalize="none"
                onBlur={() => this.setState({showAutoComplete: false})}
              />
            </View>
          </TranslateYAndOpacity>
          <TranslateYAndOpacity
            animateOnDidMount={true}
            translateYMin={4}
            delay={300}>
            <View style={LoginScreenStyle.inputContainer}>
              <Icon name="lock" style={LoginScreenStyle.inputIcon} />
              <TextInput
                secureTextEntry={this.state.seePassword}
                style={LoginScreenStyle.input}
                placeholder="Mật khẩu"
                onChangeText={password => this.setState({password})}
                value={this.state.password}
              />
              <Icon
                name={this.state.seePassword ? 'eye' : 'eye-slash'}
                onPress={this.toggleSeePassword}
                style={LoginScreenStyle.inputIcon}
              />
            </View>
          </TranslateYAndOpacity>
          <TranslateYAndOpacity
            delay={300}
            animateOnDidMount={true}
            translateYMin={5}>
            <TouchableOpacity
              style={LoginScreenStyle.rememberMe}
              onPress={this.toggleRememberMe}>
              <CheckBox
                tintColors={{true: '#3C50AF', false: '#3C50AF'}}
                value={this.state.rememberMe}
                onChange={this.toggleRememberMe}
              />
              <Text style={LoginScreenStyle.rememberMeText}>Nhớ mật khẩu</Text>
            </TouchableOpacity>
          </TranslateYAndOpacity>
          <ScaleAndOpacity
            style={LoginScreenStyle.loginButton}
            animateOnDidMount={true}
            delay={300}
            duration={400}>
            <TouchableOpacity
              disabled={this.state.fetching}
              style={LoginScreenStyle.loginButton}
              onPress={this.login}>
              {this.getLoginButton()}
            </TouchableOpacity>
          </ScaleAndOpacity>
        </View>
      </View>
    );
  }
}
