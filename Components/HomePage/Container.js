import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ContainerStyle, ItemStyle} from './Style';

const Item = ({
  name = 'My name',
  icon = require('./icon/diemtrungbinh.png'),
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={ItemStyle.container}>
      <Image source={icon} style={ItemStyle.icon} />
      <Text style={ItemStyle.text}>{name}</Text>
    </TouchableOpacity>
  );
};

export default class Container extends Component {
  static defaultProps = {
    title: 'My title',
    item: [],
  };

  render() {
    return (
      <View style={ContainerStyle.container}>
        <View style={ContainerStyle.title}>
          <Text style={ContainerStyle.titleText}>{this.props.title}</Text>
        </View>
        <View style={ContainerStyle.content}>
          {this.props.item.map(item => (
            <Item name={item.name} key={item.name} icon={item.icon} />
          ))}
        </View>
      </View>
    );
  }
}
