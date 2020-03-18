import React from 'react';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import Login from './Components/Login/Login';
import Home from './Components/HomePage/Home';

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
        <Home />
      </>
    );
  }
}
