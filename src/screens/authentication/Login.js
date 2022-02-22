import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import customColor from '../../../src/assets/colors/customColor';
import Feather from 'react-native-vector-icons/Feather';
import {StackActions} from '@react-navigation/native';

const LogIn = ({navigation}) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  function handleSignIn() {
    auth()
      .signInWithEmailAndPassword(emailAddress, password)
      .then(() => {
        ToastAndroid.show('Successfully LoggedIn', ToastAndroid.SHORT);
        // navigation.navigate('AdminHome');
        // navigation.replace('AdminHome');
        // navigation.dispatch(StackActions.replace('AdminHome'));
        navigation.reset({
          index: 0,
          routes: [{name: 'AdminHome'}],
        });
      })
      .catch(error => {
        console.log(`${error.code}`);
        ToastAndroid.show(`${error.code}`, ToastAndroid.SHORT);
      });
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/images/background.png')}>
        <Text style={styles.heading}>Sign In Here</Text>
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
        <View style={styles.inputWrapper}>
          <Feather name="lock" style={styles.iconStyle} />
          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
            textContentType="password"
            placeholder="Min Password length 6"
            secureTextEntry={isPasswordShow ? false : true}></TextInput>
          <Feather
            name={isPasswordShow ? 'eye' : 'eye-off'}
            style={styles.iconStyle}
            onPress={() => setIsPasswordShow(!isPasswordShow)}
          />
        </View>
        <TouchableHighlight
          onPress={() => navigation.navigate('ForgotPassWordScreen')}
          style={styles.forgotPasswordWrapper}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => handleSignIn()}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.button, styles.buttonCancel]}
          onPress={() => {
            navigation.goBack();
          }}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableHighlight>
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // match parent
    justifyContent: 'flex-start',
    backgroundColor: 'coral',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
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
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
  },
  buttonCancel: {
    backgroundColor: 'grey',
  },
  googleButton: {width: 192, height: 48, alignSelf: 'center', marginTop: 10},
  forgotPasswordWrapper: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginRight: 10,
  },
  forgotPasswordText: {
    color: customColor.white,
  },
});

export default LogIn;
