import React from 'react';
import {TranslateYAndOpacity, ScaleAndOpacity} from 'react-native-motion';
import {View, Image, Text} from 'react-native';
import {SplashScreenStyle} from './Styles';
const image = require('./logo.png');

export default class SplashScreen extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={SplashScreenStyle.splashContainer}>
        <View style={SplashScreenStyle.logoContainer}>
          <ScaleAndOpacity animateOnDidMount={true} duration={300}>
            <Image source={image} style={SplashScreenStyle.logo} />
          </ScaleAndOpacity>
          <TranslateYAndOpacity
            animateOnDidMount={true}
            translateYMin={3}
            delay={200}
            duration={300}>
            <Text style={SplashScreenStyle.appName}>MyBK App</Text>
          </TranslateYAndOpacity>
          <TranslateYAndOpacity
            animateOnDidMount={true}
            translateYMin={5}
            delay={450}
            duration={400}>
            <Text style={SplashScreenStyle.slogan}>Do less, know more</Text>
          </TranslateYAndOpacity>
        </View>
        <TranslateYAndOpacity
          animateOnDidMount={true}
          translateYMin={5}
          duration={300}
          delay={700}>
          <Text style={SplashScreenStyle.text1}>Power By</Text>
          <Text style={SplashScreenStyle.text2}>React Native</Text>
        </TranslateYAndOpacity>
      </View>
    );
  }
}
