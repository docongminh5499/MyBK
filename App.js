import 'react-native-gesture-handler';

import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
    this.Stack = createStackNavigator();
  }

  componentDidMount() {
    setTimeout(() => this.setState({loaded: true}), 2000);
  }

  render() {
    if (!this.state.loaded) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        <this.Stack.Navigator headerMode="none">
          <this.Stack.Screen name="login" component={Login} />
          <this.Stack.Screen name="dashboard" component={Dashboard} />
        </this.Stack.Navigator>
      </NavigationContainer>
    );
  }
  /*
   */
}
