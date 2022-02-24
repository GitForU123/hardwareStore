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
  Animated,
  Pressable,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import customColor from '../../assets/colors/customColor';
import Header from '../../components/Header';
import auth from '@react-native-firebase/auth';
import {useTheme} from '@react-navigation/native';
import {useCardAnimation} from '@react-navigation/stack';

export default function ForgotPasswordScreen({navigation}) {
  const [emailAddress, setEmailAddress] = useState('');
  const {colors} = useTheme();
  const {current} = useCardAnimation();
  const sendLink = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Check your mail and Reset Your Password');
        navigation.goBack();
      })
      .catch(() => {
        console.log('ErrorForResetLink', err);
        ToastAndroid.show('Something wrong with email', ToastAndroid.LONG);
      });
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          padding: 16,
          width: '90%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: colors.card,
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        {/* <ImageBackground
          style={{flex: 1}}
          source={require('../../../src/assets/images/background.png')}> */}
        {/* <Header nav={navigation} title="Password Reset" /> */}
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
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: customColor.white,
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
    color: customColor.primaryColor,
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
