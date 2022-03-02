import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Button,
} from 'react-native';
import auth, {firebase} from '@react-native-firebase/auth';
import useAuth from '../../hooks/useAuth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({navigation}) => {
  // const [logged, setLogged] = useState(false);
  const {user} = useAuth();
  // console.log(user);

  useEffect(() => {
    // auth().onAuthStateChanged(function onAuthStateChanged(user) {
    //   console.log('userDAtafromwelcom', user);
    //   handleScreenTransition(user);
    // });
  }, []);

  // const handleScreenTransition = user => {
  setTimeout(function () {
    // const isSignedIn = GoogleSignin.isSignedIn();
    let currentUser;
    AsyncStorage.getItem('isUserSignedIn').then(res => {
      currentUser = res;
    });
    console.log('useridfromWelcome', user);
    if (currentUser) {
      navigation.replace('AdminHome');
    } else {
      navigation.replace('Register');


      // setLogged(true);
    }
  }, 2000);
  // };

  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <ImageBackground
          source={{
            uri: 'https://img.etimg.com/thumb/msid-75214721,width-1200,height-900/industry/services/retail/future-group-negotiates-rents-for-its-1700-stores.jpg',
          }}
          style={styles.imageBackground}></ImageBackground>
        {/* <Button
              title='Login'
              buttonContainerStyle={{
              paddingVertical: 18,
              borderRadius: 20,
            }}
            onPress={() => navigation.navigate('LogIn')}
          /> */}
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <StatusBar barStyle="light-content" />

      {/* Header  */}
      {renderHeader()}
    </View>
  );
};

export const styles = StyleSheet.create({
  imageContainer: {
    height: '100%',
    width: '80%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  headingText: {
    width: '80%',
    color: 'white',
    lineHeight: 45,
  },
  description: {
    marginTop: 12,
    width: '70%',
    color: 'grey',
  },
});

export default WelcomeScreen;
