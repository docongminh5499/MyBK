import React, {Component} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {LoginScreenStyle} from './Styles';
export default class Login extends Component {
  login() {
    console.log('logged in');
  }
  validateInput(input) {
    return true;
  }
  render() {
    return (
      <View style={LoginScreenStyle.loginContainer}>
        <View style={LoginScreenStyle.logoContainer}>
          <Image
            source={require('./LogoBK.jpg')}
            style={LoginScreenStyle.logo}
          />
          <Text style={LoginScreenStyle.title}>MyBK</Text>
        </View>
        <View style={LoginScreenStyle.loginForm}>
          <View style={LoginScreenStyle.inputContainer}>
            <Image source="" style={LoginScreenStyle.userIcon} />
            <TextInput
              style={LoginScreenStyle.input}
              placeholder="Username"
              selectionColor="#428AF8"
              underlineColorAndroid="#428AF8"
            />
          </View>

          <View style={LoginScreenStyle.inputContainer}>
            <Image source="" style={LoginScreenStyle.passwordIcon} />
            <TextInput
              secureTextEntry={true}
              style={LoginScreenStyle.input}
              placeholder="Password"
              selectionColor="#428AF8"
              underlineColorAndroid="#428AF8"
            />
          </View>
          <TouchableOpacity
            style={LoginScreenStyle.loginButton}
            onPress={this.login}>
            <Text style={LoginScreenStyle.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={LoginScreenStyle.footer}>
          <Text>Footer text</Text>
        </View>
      </View>
    );
  }
}
