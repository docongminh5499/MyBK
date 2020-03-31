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
    marginBottom: 30,
  },
  appName: {
    width: '100%',
    textAlign: 'center',
    fontSize: 36,
    color: '#3C50AF',
    fontFamily: 'Quicksand-Bold',
  },
  slogan: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: '#3C50AF',
    fontFamily: 'Quicksand-SemiBold',
  },
  text1: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    color: '#3C50AF',
    fontFamily: 'Quicksand-Medium',
  },
  text2: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
    color: '#3C50AF',
  },
});
