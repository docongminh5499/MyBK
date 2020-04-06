import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScaleAndOpacity} from 'react-native-motion';
import Notification from '../Notification/Notification';
import {Connect} from '../../Controller/Connect';
import {CreateFunction} from './CreateFrunction';
import {AppContext} from '../../Context/AppContext';
import {DetailScreenStyle} from './Styles';

export default class DetailScreen extends PureComponent {
  static contextType = AppContext;
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      data: '' /* ajax data */,
      getData: '' /* data from get request */,
      error: '',
      clicked: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const {ajaxUrl, getUrl} = this.props.route.params;
    const {csrf_token} = this.context;
    this.loading(ajaxUrl, getUrl, csrf_token);
  }

  catchErrorHanding = (err) => {
    this._isMounted &&
      this.setState({error: 'Đã xảy ra lỗi'}, () => {
        const {set} = this.context.message;
        if (err.name === 'no-network' || err.name === 'unreachable-network') {
          set(true, 'Network Error', err.message, 'error');
        } else {
          const message = 'Sorry, something went wrong.';
          set(true, 'System Error', message, 'error');
        }
      });
  };

  loading = async (ajaxUrl, getUrl, csrf_token) => {
    try {
      if ((!ajaxUrl && !getUrl) || csrf_token === '') {
        throw new Error();
      }
      const [ajaxData, getData] = await Promise.all([
        Connect.request(ajaxUrl, {
          method: 'POST',
          headers: {'X-CSRF-TOKEN': csrf_token},
          body: {_token: csrf_token},
        }),
        Connect.request(getUrl, {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': csrf_token,
            'X-Requested-With': 'XMLHttpRequest',
          },
        }),
      ]);
      const [ajaxDataText, getDataText] = await Promise.all([
        ajaxData.text(),
        getData ? getData.text() : '',
      ]);
      this._isMounted &&
        this.setState({data: ajaxDataText, getData: getDataText});
    } catch (err) {
      this.catchErrorHanding(err);
    }
  };

  tryAgainButton = () => {
    const {ajaxUrl, getUrl} = this.props.route.params;
    const {csrf_token} = this.context;
    this._isMounted &&
      this.setState({error: ''}, () => {
        this.context.message.set(false);
        this.loading(ajaxUrl, getUrl, csrf_token);
      });
  };

  errorSection = () => {
    if (this.state.error) {
      return (
        <View style={DetailScreenStyle.errorContainer}>
          <Text style={DetailScreenStyle.error}>{this.state.error}</Text>
          <TouchableOpacity
            style={DetailScreenStyle.tryButton}
            onPress={this.tryAgainButton}>
            <Text style={DetailScreenStyle.tryText}>THỬ LẠI</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  dataSection = () => {
    const {error, data, getData, clicked} = this.state;
    const {key} = this.props.route.params;

    if (!error && (data || getData) && !clicked) {
      return CreateFunction(data, getData, key);
    } else if (!error && !data && !getData && !clicked) {
      return (
        <View style={DetailScreenStyle.loadingContainer}>
          <ActivityIndicator size="large" color="#3C50AF" />
          <Text style={DetailScreenStyle.loading}>Đang lấy dữ liệu...</Text>
        </View>
      );
    }
    return null;
  };

  backButtonClick = () => {
    !this.state.clicked &&
      this.setState({clicked: true}, () => this.props.navigation.goBack());
    return;
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {title} = this.props.route.params;
    return (
      <View style={DetailScreenStyle.container}>
        <View style={DetailScreenStyle.header}>
          <Text style={DetailScreenStyle.title}>{title}</Text>
          <TouchableOpacity
            style={DetailScreenStyle.iconCloseWrapper}
            onPress={this.backButtonClick}>
            <Icon name="closecircle" style={DetailScreenStyle.iconClose} />
          </TouchableOpacity>
        </View>
        <ScaleAndOpacity
          scaleMin={1}
          animateOnDidMount={true}
          style={DetailScreenStyle.contentContainer}>
          <Notification {...this.context.message} />
          {this.errorSection()}
          {this.dataSection()}
        </ScaleAndOpacity>
      </View>
    );
  }
}
