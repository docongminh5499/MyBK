import {StyleSheet} from 'react-native';

export const NotificationStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    top: 5,
    left: 0,
  },
  message: {
    margin: 10,
    padding: 7,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    paddingBottom: 3,
    fontSize: 18,
    color: 'white',
    fontFamily: 'Quicksand-Bold',
  },
  content: {
    color: 'white',
    fontFamily: 'Quicksand-Medium',
    fontSize: 13,
    paddingBottom: 3,
  },
  rightIcon: {
    color: 'white',
    fontSize: 20,
  },
  error: {
    backgroundColor: '#DE3E44',
  },
  success: {
    backgroundColor: '#1BA345',
  },
  warning: {
    backgroundColor: '#FEC001',
  },
  info: {
    backgroundColor: '#0E9DB2',
  },
});
