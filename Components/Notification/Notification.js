import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScaleAndOpacity} from 'react-native-motion';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NotificationStyle} from './Styles';

export default class Notification extends PureComponent {
  static defaultProps = {
    status: false,
    title: 'My title',
    content: 'My Content',
    type: 'info',
    set: () => {},
  };

  onPressClose = () => {
    this.props.set(false);
    this.timeOut && clearTimeout(this.timeOut);
  };

  closeMessageAuto = () => {
    const {set, status} = this.props;
    status && set(false);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.status === false && this.props.status === true) {
      this.timeOut = setTimeout(this.closeMessageAuto, 3000);
    }
  }

  componentWillUnmount() {
    this.onPressClose();
  }

  render() {
    const {title, content, type, status} = this.props;
    // if (!status) {  return null; }
    return (
      <View style={NotificationStyle.container}>
        <ScaleAndOpacity isHidden={!status} duration={150}>
          <View style={[NotificationStyle.message, NotificationStyle[type]]}>
            <View style={NotificationStyle.contentWrapper}>
              <Text style={NotificationStyle.title}>{title}</Text>
              <Text style={NotificationStyle.content}>{content}</Text>
            </View>
            <TouchableOpacity onPress={this.onPressClose}>
              <Icon name="close" style={NotificationStyle.rightIcon} />
            </TouchableOpacity>
          </View>
        </ScaleAndOpacity>
      </View>
    );
  }
}
