import {StyleSheet} from 'react-native';

export const HomeStyle = StyleSheet.create({
  banner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#539FAE',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  info_name: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  info_major: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
  },
  logout: {
    display: 'flex',
    justifyContent: 'center',
  },
  time: {
    width: '100%',
    textAlign: 'right',
    padding: 10,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  footer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#539FAE',
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  footerTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 20,
  },
  footertext: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 3,
    opacity: 0.7,
  },
});

export const ContainerStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  title: {
    paddingBottom: 10,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  titleText: {
    padding: 3,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#539FAE',
  },
  content: {
    paddingTop: 20,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const ItemStyle = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 0,
    margin: '1.5%',
    width: '30%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  text: {
    width: '100%',
    paddingVertical: 10,
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
  },
  icon: {
    height: 48,
    width: 48,
  },
});
