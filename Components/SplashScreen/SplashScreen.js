import React from 'react';
import {View, Image, Text} from 'react-native';
import {SplashScreenStyle} from './Styles';

const image = require('./logo.png');
const title = require('./title.png');

const SplashScreen = () => (
  <View style={SplashScreenStyle.splashContainer}>
    <View style={SplashScreenStyle.logoContainer}>
      <Image source={image} style={SplashScreenStyle.logo} />
      <Image source={title} style={SplashScreenStyle.title} />
    </View>
    <Text style={SplashScreenStyle.text1}>Power By</Text>
    <Text style={SplashScreenStyle.text2}>React Native</Text>
  </View>
);

export default SplashScreen;
