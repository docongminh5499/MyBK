import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import Login from './Components/Login/Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  componentDidMount() {
    setTimeout(() => this.setState({loaded: true}), 2000);
  }

  render() {
    if (!this.state.loaded) {
      return <SplashScreen />;
    }
    return (
      <>
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Login />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
