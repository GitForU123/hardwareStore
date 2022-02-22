import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import customColor from '../../assets/colors/customColor';
import Header from '../../components/Header';
import auth from '@react-native-firebase/auth';

export default function ForgotPasswordScreen({navigation}) {
  const [emailAddress, setEmailAddress] = useState('');
  const sendLink = email => {
    auth().sendPasswordResetEmail(email);
    Alert.alert('Check your mail and Reset Your Password');
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../../src/assets/images/background.png')}>
        <Header nav={navigation} title="Password Reset" />
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.content}>
          Enter your email , so that we can help you to recover your password.
        </Text>

        <View style={styles.inputWrapper}>
          <Feather name="mail" style={styles.iconStyle} />
          <TextInput
            style={styles.input}
            onChangeText={text => setEmailAddress(text)}
            value={emailAddress}
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="Email Address "></TextInput>
        </View>

        <TouchableHighlight
          style={styles.button}
          onPress={() => sendLink(emailAddress)}>
          <Text style={styles.buttonText}>Send Email</Text>
        </TouchableHighlight>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColor.white,
  },

  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
  },
  content: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: customColor.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: customColor.white,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: customColor.blue,
    margin: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 5,
  },
  iconStyle: {
    fontSize: 25,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  button: {
    margin: 10,
    backgroundColor: 'steelblue',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: '800',
    color: 'white',
  },
});
