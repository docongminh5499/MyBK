import {StyleSheet} from 'react-native';

export const HomeStyle = StyleSheet.create({
  banner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#3C50AF',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  info_name: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Quicksand-Bold',
  },
  info_major: {
    fontSize: 11,
    color: 'white',
    opacity: 0.8,
    fontFamily: 'Quicksand-Medium',
  },
  logout: {
    display: 'flex',
    justifyContent: 'center',
  },
  logoutImg: {
    width: 25,
    height: 25,
  },
  time: {
    width: '100%',
    textAlign: 'right',
    padding: 10,
    opacity: 0.6,
    fontFamily: 'Quicksand-Medium',
  },
  footer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#3C50AF',
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  footerTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    color: 'white',
    paddingBottom: 20,
  },
  footertext: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Quicksand-Medium',
    color: 'white',
    paddingVertical: 3,
    opacity: 0.7,
  },
  loading: {
    flex: 1,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '95%',
    padding: 20,
  },
  modalTitle: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    paddingBottom: 8,
    color: '#3C50AF',
  },
  modalMsg: {
    fontFamily: 'Quicksand-Regular',
    color: 'gray',
  },
  modalButtonWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 40,
  },
  modalButton: {
    paddingLeft: 30,
    paddingVertical: 5,
    fontFamily: 'Quicksand-Bold',
    color: '#3C50AF',
  },
  modalProgress: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
    paddingBottom: 8,
    textAlign: 'center',
    color: '#3C50AF',
  },
  modalLoading: {
    paddingTop: 20,
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
      height: 1,
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
    fontSize: 20,
    textTransform: 'uppercase',
    fontFamily: 'Quicksand-Bold',
    color: '#3C50AF',
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
  containerAnimation: {
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
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    paddingVertical: 10,
    fontSize: 12,
    fontFamily: 'Quicksand-Medium',
    opacity: 0.6,
    textAlign: 'center',
  },
  icon: {
    height: 48,
    width: 48,
  },
});
