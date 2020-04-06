import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScaleAndOpacity, TranslateYAndOpacity} from 'react-native-motion';
import {ContainerStyle, ItemStyle} from './Style';

class Item extends PureComponent {
  static defaultProps = {
    name: 'My name',
    icon: require('./icon/diemtrungbinh.png'),
    url: '',
    navigation: {},
    animationDelay: 0,
  };

  render() {
    const {navigation} = this.props;
    const {ajaxUrl, getUrl, name, icon, key} = this.props.item;
    const params = {ajaxUrl, getUrl, key, title: name};

    return (
      <ScaleAndOpacity
        duration={300}
        delay={this.props.animationDelay}
        animateOnDidMount={true}
        style={ItemStyle.containerAnimation}>
        <TouchableOpacity
          style={ItemStyle.container}
          activeOpacity={0.5}
          onPress={() => navigation.push('detail', params)}>
          <Image source={icon} style={ItemStyle.icon} />
          <Text style={ItemStyle.text}>{name}</Text>
        </TouchableOpacity>
      </ScaleAndOpacity>
    );
  }
}

export default class Container extends PureComponent {
  static defaultProps = {
    title: 'My title',
    item: [],
    delay: 0,
  };

  render() {
    return (
      <ScaleAndOpacity
        style={ContainerStyle.container}
        delay={this.props.delay}
        animateOnDidMount={true}
        scaleMin={1}>
        <View style={ContainerStyle.title}>
          <TranslateYAndOpacity
            delay={this.props.delay}
            animateOnDidMount={true}
            translateYMin={10}
            duration={300}>
            <Text style={ContainerStyle.titleText}>{this.props.title}</Text>
          </TranslateYAndOpacity>
        </View>

        <View style={ContainerStyle.content}>
          {this.props.item.map((item, index) => (
            <Item
              animationDelay={this.props.delay + 300 + 100 * index}
              key={item.name}
              item={item}
              navigation={this.props.navigation}
            />
          ))}
        </View>
      </ScaleAndOpacity>
    );
  }
}
