import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Modal,
} from 'react-native';
import {ScaleAndOpacity, TranslateYAndOpacity} from 'react-native-motion';
import {icon, createDateString} from './Helper';
import {HomeStyle} from './Style';
import Container from './Container';
import {Connect} from '../../Controller/Connect';
import {AppContext} from '../../Context/AppContext';
import {MyStorage} from '../../Controller/AsyncStorage';
const logout = require('./icon/logout.png');

export default class Home extends PureComponent {
  static contextType = AppContext;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      csrf_token: '',
      date: '',
      name: '',
      major: '',
      avatar: ' ',
      modal: false,
      logging_out: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadingBaseInfo()
      .then(() => this.loadingBaseInfo())
      .catch((err) => console.log(err.message));
  }

  formatString = (text) => {
    return text
      .split(' ')
      .filter((e) => e)
      .map((e) => e.trim())
      .join(' ');
  };

  loadingBaseInfo = async () => {
    const response = await Connect.load('https://mybk.hcmut.edu.vn/stinfo/', {
      name: 'div[class=top-avatar2]',
      csrf_token: 'meta[name=_token]',
      img: 'div[class=top-avatar1]',
    });
    const imgSrc = response.params.img.children('img').attr('src');
    const csrf_token = response.params.csrf_token.attr('content');
    this.context.setCsrfToken(csrf_token);
    this._isMounted &&
      this.setState({
        csrf_token,
        name: this.formatString(response.params.name.children('div').text()),
        major: this.formatString(response.params.name.children('p').text()),
        avatar: `https://mybk.hcmut.edu.vn/stinfo/${imgSrc}`,
        date: createDateString(),
      });
  };

  logout = () => {
    this.setState({logging_out: true}, () => {
      Connect.request('https://mybk.hcmut.edu.vn/stinfo/logout')
        .then(() => Connect.clearCookies())
        .then(() => {
          this.context.set({csrf_token: '', login: false});
          MyStorage.set('logout', true);
        })
        .catch((err) => {
          Connect.clearCookies();
          this.context.set({csrf_token: '', login: false});
          MyStorage.set('logout', true);
          console.log(err.message);
        });
    });
  };

  bannerContent = () => {
    const {avatar, name, major} = this.state;
    if (this.state.name && this.state.major) {
      return (
        <React.Fragment>
          <ScaleAndOpacity animateOnDidMount={true}>
            <Image source={{uri: avatar}} style={HomeStyle.avatar} />
          </ScaleAndOpacity>
          <ScaleAndOpacity style={HomeStyle.info} animateOnDidMount={true}>
            <Text style={HomeStyle.info_name}>{name}</Text>
            <Text style={HomeStyle.info_major}>{major}</Text>
          </ScaleAndOpacity>
        </React.Fragment>
      );
    }
    return (
      <View style={HomeStyle.loading}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  };

  setStatusModal = (val) => this._isMounted && this.setState({modal: val});

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {date, modal, logging_out} = this.state;
    return (
      <SafeAreaView>
        <Modal visible={modal} transparent={true}>
          <View style={HomeStyle.modalContainer}>
            <View style={HomeStyle.modal}>
              {logging_out ? (
                <React.Fragment>
                  <Text style={HomeStyle.modalProgress}>Signing out...</Text>
                  <View style={HomeStyle.modalLoading}>
                    <ActivityIndicator size="large" color="gray" />
                  </View>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Text style={HomeStyle.modalTitle}>Logout confirm</Text>
                  <Text style={HomeStyle.modalMsg}>Do you want to logout?</Text>
                  <View style={HomeStyle.modalButtonWrapper}>
                    <TouchableOpacity onPress={this.logout}>
                      <Text style={HomeStyle.modalButton}>LOG OUT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setStatusModal(false)}>
                      <Text style={HomeStyle.modalButton}>CANCEL</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )}
            </View>
          </View>
        </Modal>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}>
          <TranslateYAndOpacity animateOnDidMount={true} translateYMin={0}>
            <View style={HomeStyle.banner}>
              {this.bannerContent()}
              <TouchableOpacity
                style={HomeStyle.logout}
                onPress={() => this.setStatusModal(true)}>
                <Image source={logout} style={HomeStyle.logoutImg} />
              </TouchableOpacity>
            </View>
          </TranslateYAndOpacity>

          <ScaleAndOpacity duration={500} isHidden={!date}>
            <Text style={HomeStyle.time}>{date}</Text>
          </ScaleAndOpacity>

          <View>
            {icon.map((element, index) => (
              <Container
                delay={500 * index}
                key={element.title}
                title={element.title}
                item={element.item}
                navigation={this.props.navigation}
              />
            ))}
          </View>
          <View style={HomeStyle.footer}>
            <Text style={HomeStyle.footerTitle}>MyBK App</Text>
            <Text style={HomeStyle.footertext}>Copyright &copy; - 2020</Text>
            <Text style={HomeStyle.footertext}>Nguyễn Vũ Hoàng Phúc</Text>
            <Text style={HomeStyle.footertext}>Đỗ Công Minh</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
