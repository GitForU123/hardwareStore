import {createContext, useContext} from 'react';
import React, {useState, useEffect} from 'react';
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
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import {firebase} from '@react-native-firebase/firestore';

const AuthContext = createContext({});
const config = {
  scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
  androidClientId:
    '904585426981-06vi140ig2b8qmk4v3nqq3t1vbtr4qe8.apps.googleusercontent.com',
  webClientId:
    '904585426981-06vi140ig2b8qmk4v3nqq3t1vbtr4qe8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState();
  const [data, setData] = useState(null);
  //   const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    GoogleSignin.configure(config);
    // GoogleSignin signedInUser ? setUser(true) : setUser(false);
    auth().onAuthStateChanged(function onAuthStateChanged(user) {
      setUser(user);
      //   setloggedIn(user ? true : false);
      // console.log('userDatafromuseAuth', user);
    });
    // AsyncStorage.getItem('isUserSignedIn')
    //   .then(res => {
    //     setUser(res);
    //     console.log('userIdfromuseAuth', res);
    //   })
    //   .catch(() => {
    //     console.log('error getting auth value');
    //   });
  }, []);
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();

      //   setloggedIn(true);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      auth()
        .signInWithCredential(credential)
        .then(() => {
          ToastAndroid.show('Successfully LoggedIn', ToastAndroid.SHORT);
          //   ToastAndroid.show(user.displayName, ToastAndroid.SHORT);
          //   navigation.navigate('AdminHome');
          //   setloggedIn(true);
          //   setUser(auth().currentUser.uid);
          //   console.log('user signed in');
          //   setUser(true);
          // localStorageAuth(auth().currentUser.uid);
        })
        .catch(error => {
          console.log(`${error.code}`);
          ToastAndroid.show(`${error.code}`, ToastAndroid.SHORT);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Aler.alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
        console.log('some other error happend', error);
      }
    }
  };

  const handleSignOut = async () => {
    await GoogleSignin.revokeAccess();
    //    await GoogleSignin.signOut();

    await GoogleSignin.signOut().then(() => {
      setUser(false);
      console.log('user signed out');
    });
  };

  // const localStorageAuth = async signedInUser => {
  //   await AsyncStorage.setItem('isUserSignedIn', signedInUser)
  //     .then(() => {
  //       console.log('userSignedInVaule', signedInUser);
  //     })
  //     .catch(() => {
  //       console.log('some error happened in storing signin info');
  //     });
  // };
  const getData = getCollection => {
    const unsubscribe = firebase
      .firestore()
      .collection(`IncomingInventory`)
      .onSnapshot(
        snapshot => {
          // console.log('SnapShot', snapshot.docs);
          setData(snapshot.docs.map(doc => doc.data()));
          getCollection(snapshot.docs.map(doc => doc.data()));
          // return data;
        },
        error => {
          console.log('error listening to snapshot', error);
        },
      );
    return unsubscribe;
  };

  return (
    <AuthContext.Provider
      value={{
        handleGoogleSignIn,
        user,
        handleSignOut,
        getData,
        data,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
