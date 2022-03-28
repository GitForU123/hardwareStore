
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import useAuth from '../hooks/useAuth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';

const UserTab = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [result, setResult] = useState([]);
  const image = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"

  // useEffect(() => {
  //   console.log('user tab screen');
  //   const getdetails = async () => {
  //     // setLoading(true);
  //     const querySnap = await firestore()
  //       .collection('users')
  //       .where('uid', '==', auth().currentUser.uid)
  //       .get();
  //     let res = querySnap.docs.map(docSnap => docSnap.data());
  //     setResult(res[0]);
  //     // setLoading(false);
  //     console.log('res ', res);
  //     console.log('result after set', result);
  //     console.log('result after set at user tab screen', result);
  //   };
  //   getdetails();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
    console.log('user tab screen');
    const getdetails = async () => {
      // setLoading(true);
      const querySnap = await firestore()
        .collection('users')
        .where('uid', '==', auth().currentUser.uid)
        .get();
      let res = querySnap.docs.map(docSnap => docSnap.data());
      setResult(res[0]);
      // setLoading(false);
      console.log('res ', res);
      console.log('result after set', result);
      console.log('result after set at user tab screen', result);
    };
    getdetails();
  }, [])
  );

  return (
    <View style={styles.container}>
      {user.displayName ? (
        <View style={styles.userTabWrapper}>
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => navigation.navigate('ProfileDrawer')}>
            <Image style={styles.imageStyle} source={{uri: user.photoURL}} />
          </TouchableOpacity>
          <Text style={styles.textStyle}>Hi,{user.displayName}</Text>
        </View>
      ) : (
        <View style={styles.userTabWrapper}>
          <Image
            style={styles.imageStyle}
            // source={require('../assets/images/user.png')}
            source={{uri: result?.image ? result?.image : image}}
          />
          {/* <Text style={styles.textStyle}>Hi, {result.username?result.username:"User"}</Text> */}
          <Text style={styles.textStyle}>Hi {result?.username}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  userTabWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    // alignSelf: 'center',
  },
  textStyle: {
    // alignSelf: 'flex-start',
    marginLeft: 15,
    //borderBottomWidth: 1,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default UserTab;