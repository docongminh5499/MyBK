import {StyleSheet} from 'react-native';

export const SplashScreenStyle = StyleSheet.create({
  splashContainer: {
    width: '100%',
    height: '100%',
    paddingVertical: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  title: {
    width: 250,
    height: 100,
    resizeMode: 'contain',
  },
  text1: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    color: '#3C50AF',
  },
  text2: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C50AF',
  },
});
