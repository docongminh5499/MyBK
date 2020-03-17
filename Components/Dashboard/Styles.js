import {StyleSheet} from 'react-native';

export const DashboardScreenStyle = StyleSheet.create({
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffff',
  },
  loginForm: {
    flex: 2,
    fontSize: 14,
  },
  logoContainer: {
    flex: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 16,
  },
  logo: {
    height: 150,
    width: 150,
  },
  loginButton: {
    height: 50,
    width: 300,
    borderRadius: 30,
    backgroundColor: '#0795df',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f9f9f9',
    paddingLeft: 8,
  },
  footer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  title: {
    fontSize: 48,
  },

  buttonText: {
    fontSize: 28,
    color: 'white',
  },
});
