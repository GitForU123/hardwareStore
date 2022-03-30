import handleSignOut from '../../hooks/useAuth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import {useFocusEffect} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {TabActions, useFocusEffect} from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';
import Header from '../../components/Header';
import customColor from '../../assets/colors/customColor';

export default function Profile({navigation, props}) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [coins, setCoins] = useState(0);
  const [number, setNumber] = useState(0);
  const [username, setUsername] = useState('Hello');
  const {user} = useAuth();
  const [count, setCount] = useState();

  const handleOut = () => {
    // handleSignOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'Register'}],
    });
  };

  // useFocusEffect(() => {
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
      };
      getdetails();
    }, []),
  );

  useEffect(() => {
    var RandomNumber = Math.floor(Math.random() * 100) + 10;
    setNumber(RandomNumber);
    console.log('number', number);
    console.log('result in useeefec', result);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading ? (
        <View style={styles.containeract}>
          <ActivityIndicator animating={loading} />
          <Text style={styles.loadingTextStyle}>Fetching Details ...</Text>
        </View>
      ) : (
        <>
          <View style={styles.userInfoSection}>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 15,
                alignItems: 'center',
              }}>
              <Image
                source={{
                  // uri: result
                  //   ? result.image || user?.photoURL
                  //   : 'https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Cutout.png',
                  uri: result?.image ? result.image : user?.photoURL,
                }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 15,
                  borderWidth: 2,

                  borderColor: customColor.primaryColor,
                  borderColor: customColor.steelblue,

                  borderColor: customColor.steelblue,

                  // left: 3,
                  top: 10,
                }}
                // size={80}
              />
              <View style={{}}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}>
                  {/* {result.name} */}
                  {result?.username ? result.username : user?.displayName}
                </Title>
                <Caption style={styles.caption}>
                  @
                  {result?.username
                    ? result?.username?.slice(0, 5)
                    : user?.displayName?.slice(0, 5)}
                  {number}
                </Caption>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={21} />
              <Text style={{color: '#777777', marginLeft: 20, fontSize: 14}}>
                {/* {result.address + ', ' + result.city} */}
                {/* Whitefield, Bangalore */}
                {result?.city
                  ? result.city + ' ' + result.address
                  : 'New Delhi'}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#777777" size={21} />
              <Text style={{color: '#777777', marginLeft: 20, fontSize: 14}}>
                {/* {result.phone} */}
                {/* 9999888827 */}
                {result?.phone ? result.phone : '1800 251 364'}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#777777" size={21} />
              <Text style={{color: '#777777', marginLeft: 20, fontSize: 14}}>
                {/* {result.email} */}
                {user?.email}
              </Text>
            </View>
          </View>

          <View style={styles.infoBoxWrapperSingleLine}></View>

          {/* <View style={styles.infoBoxWrapper}>
            <View
              style={[
                styles.infoBox,
                {
                  borderRightColor:  'gray',
                  borderRightWidth: 2,
                },
              ]}>
              <Title>{count}</Title> */}
          {/* <Title>Num</Title> */}
          {/* <Caption>Total categories</Caption>
            </View>
            <View style={styles.infoBox}> */}
          {/* <Title>{coins}</Title> */}
          {/* <Title>88</Title>
              <Caption>Sold</Caption>
            </View>
          </View>  */}

          <View style={styles.menuWrapper}>
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Sold');
                // Alert.alert('Go to inventory', 'Navigate to inventory')
              }}>
              <View style={styles.menuItem}>
                <Icon name="store" size={25} />
                <Text style={styles.menuItemText}>Your Inventory</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                navigation.goBack();
                // Alert.alert('Dashboard', 'Pressed')
              }}>
              <View style={styles.menuItem}>
                <Icon
                  name="home"
                  //   color={red}
                  size={25}
                />
                <Text style={styles.menuItemText}>Dashboard</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => {
                navigation.navigate('Support');
                // Alert.alert('Contact Us', 'Navigate to support page')
              }}>
              <View style={styles.menuItem}>
                <Icon name="phone" size={25} />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableRipple>

            {/* Edit profile */}
            {!user.displayName && (
              <TouchableRipple
                //   onPress={() => {
                //     navigation.navigate('Edit', {
                //       phone: result.phone,
                //       name: result.name,
                //       city: result.city,
                //       address: result.address,
                //     });
                //   }}
                onPress={() => {
                  // Alert.alert('Edit Profile', 'We can edit name, phone num')
                  navigation.navigate('EditScreen');
                }}>
                <View style={styles.menuItem}>
                  <Icon
                    name="account-edit"
                    //   color={red}
                    size={25}
                  />
                  <Text style={styles.menuItemText}>Edit Profile</Text>
                </View>
              </TouchableRipple>
            )}
            {/* <TouchableRipple
            //   onPress={() => {
            //     navigation.navigate('Address', {
            //       phone: result.phone,
            //       name: result.name,
            //       city: result.city,
            //       address: result.address,
            //     });
            //   }}
                 onPress={() => {
                    Alert.alert('Update Address', 'We can update address here')
                 }}>
              <View style={styles.menuItem}>
                <Icon
                  name="map-marker"
                //   color={red}
                  size={25}
                />
                <Text style={styles.menuItemText}>Update Address</Text>
              </View>
            </TouchableRipple> */}
            <TouchableRipple
              onPress={() => {
                handleOut();
                // auth().signOut();
                // setTimeout(() => {
                //   NativeModules.DevSettings.reload();
                // }, 1000);
              }}>
              <View style={styles.menuItem}>
                <Icon name="logout" size={25} />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containeract: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTextStyle: {
    fontSize: 20,
    color: 'black',
  },
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    // fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    marginLeft: '8.5%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapperSingleLine: {
    // borderBottomColor: 'gray',
    // borderBottomWidth: 2,
    borderTopColor: 'gray',
    borderTopWidth: 2,
    flexDirection: 'row',
    // height: 100,
  },
  infoBoxWrapper: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    borderTopColor: 'gray',
    borderTopWidth: 2,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
