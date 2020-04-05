import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../SplashScreen/SplashScreen';
import Login from '../Login/Login';
import Home from '../HomePage/Home';
import DetailScreen from '../DetailScreen/DetailScreen';
import {AppContext} from '../../Context/AppContext';
import {MyStorage} from '../../Controller/AsyncStorage';
import {Connect} from '../../Controller/Connect';
const Stack = createStackNavigator();

export default class AppConnector extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    Connect.clearCookies();
    MyStorage.get('logout').then((data) => {
      if (data === true || (Array.isArray(data) && data.length === 0)) {
        this.setLoaded = setTimeout(() => this.context.setLoaded(true), 1200);
      } else {
        this.loginAuto();
      }
    });
  }

  loadLoginPage = async () => {
    const paramsLogin = {lt: 'input[name=lt]'};
    const url = 'https://sso.hcmut.edu.vn/cas/login';
    const data = await Connect.load(url, paramsLogin);
    return data.params.lt.attr('value');
  };

  sendUserData = async (username, password, lt) => {
    const data = await Connect.request('https://sso.hcmut.edu.vn/cas/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `username=${username}&password=${password}&lt=${lt}&execution=e1s1&_eventId=submit&submit=Login`,
    });
    const dataText = await data.text();
    this.login = setTimeout(() => {
      if (dataText.includes('Log In Successful')) {
        this.context.set({loaded: true, login: true});
      } else {
        this.context.setLoaded(true);
      }
    }, 1000);
  };

  catchErrorFunction = (err) => {
    this.error = setTimeout(() => {
      MyStorage.set('logout', true);
      this.context.setLoaded(true);
    }, 1000);
    console.log(err);
  };

  loginAuto = () => {
    this.loadLoginPage()
      .then((lt) =>
        Promise.all([
          MyStorage.get('currentUser'),
          MyStorage.get('currentPassword'),
          lt,
        ]),
      )
      .then((data) => this.sendUserData(...data))
      .catch((err) => this.catchErrorFunction(err));
  };

  componentWillUnmount() {
    this.setLoaded && clearTimeout(this.setLoaded);
    this.login && clearTimeout(this.login);
    this.error && clearTimeout(this.error);
  }

  render() {
    if (!this.context.loaded) {
      return <SplashScreen />;
    } else if (!this.context.login) {
      return <Login />;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="detail"
            component={DetailScreen}
            initialParams={{csrf_token: '', url: ''}}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
