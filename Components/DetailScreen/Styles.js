import {StyleSheet} from 'react-native';

export const DetailScreenStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3C50AF',
    paddingVertical: 20,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontFamily: 'Quicksand-Bold',
    marginHorizontal: 40,
  },
  iconCloseWrapper: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 30,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClose: {
    color: 'white',
    fontSize: 24,
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 22,
    fontFamily: 'Quicksand-Bold',
    color: '#3C50AF',
    marginBottom: 30,
    width: '100%',
    textAlign: 'center',
  },
  tryButton: {
    backgroundColor: '#3C50AF',
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
  },
  tryText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loading: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    color: '#3C50AF',
  },
});

export const CreateFunctionStyle = StyleSheet.create({
  tkb_wrapper: {
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  ten_hoc_ky: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
  },
  tkb_ngay_cn: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Quicksand-Medium',
    paddingBottom: 10,
  },
  tkb_table_style: {
    borderWidth: 1,
    borderColor: 'white',
  },
  tkb_head_style: {
    backgroundColor: '#3C50AF',
  },
  tkb_head_text: {
    color: 'white',
    fontFamily: 'Quicksand-Bold',
    padding: 10,
    textAlign: 'center',
  },
  tkb_body_text: {
    fontFamily: 'Quicksand-Medium',
    padding: 10,
    textAlign: 'center',
    opacity: 0.6,
  },
  tkb_even_row: {
    backgroundColor: 'rgba(60, 80, 175, 0.1)',
  },
  lt_table_head: {
    flexDirection: 'row',
  },
  ngay_cn_bd: {
    fontSize: 12,
    color: '#3C50AF',
    fontFamily: 'Quicksand-Medium',
    marginTop: 10,
    paddingTop: 10,
    width: '100%',
    textAlign: 'center',
  },
  summary_bd: {
    marginTop: 10,
    paddingTop: 10,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    paddingHorizontal: 8,
  },
  text_summary_bd: {
    fontFamily: 'Quicksand-Medium',
    paddingVertical: 4,
    opacity: 0.6,
    fontSize: 13,
  },
  bd_info_text: {
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Quicksand-Bold',
    paddingBottom: 7,
    fontSize: 13,
    color: '#3C50AF',
  },
});
