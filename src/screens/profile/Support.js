import React from 'react';
import {Image, Linking, Platform, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const Support = () => {
function dialCall() {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${8866245990}`;
    } else {
      phoneNumber = `telprompt:${8866245990}`;
    }
    Linking.openURL(phoneNumber);
  }

  function openEmail() {
    let emailUrl = '';
    emailUrl = `mailto:${'developer@gmail.com'}`;
    Linking.openURL(emailUrl);
  }

  return (
    <View style={styles.box2}>
        <Image
            style={{width: 300, height: 300, alignSelf:'center'}}
            source={require('../../assets/images/hardware.jpg')}
        />
        <View style={styles.box3}>
          <Text style={styles.box5}>Help Desk: Email</Text>
          <Text style={styles.box4}>developer@gmail.com</Text>
          <Button
            style={styles.box6}
            uppercase={false}
            onPress={() => openEmail()}>
            <Text style={{color: 'white',fontWeight:'600'}}>Click To Mail</Text>
          </Button>
        </View>
        {/* <Text>{cartList.length}</Text> */}
        <View style={styles.box3}>
          <Text style={styles.box5}>Help Desk: Number</Text>
          <Text style={styles.box4}>+91 8866245990</Text>
          <Button
            style={styles.box6}
            uppercase={false}
            onPress={() => dialCall()}>
            <Text style={{color: 'white' }}>Click To Call</Text>
          </Button>
        </View>
    </View>
  )
}

export default Support

const styles = StyleSheet.create({
    heading: {
      padding: 5,
      fontSize: 25,
      color: 'green',
    },
    box1: {
      alignItems: 'center',
      height: '33%',
      justifyContent: 'space-evenly',
    },
    box2: {
    //   marginTop: '5%',
      paddingHorizontal: 30,
      height: '100%',
      backgroundColor: 'white',
    //   justifyContent: 'space-evenly',
    },
    box3: {
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      // elevation: 8,
      // backgroundColor: '#C1C1C1',
      // backgroundColor: COLORS.lightOrange2,
       width: '100%',
      borderWidth:2,
      borderColor:'skyblue',
      // margin: 16,
      padding: 20,
      borderRadius: 10,
      marginTop: 30,
      // marginLeft: 12,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    box4: {
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 15,
      padding: 10,
      color:'black'
    },
    box5: {
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 20,
      // color: 'red',
      padding: 10,
      fontWeight:'600',
      color: 'deepskyblue',
    },
    box6: {
      // backgroundColor: '#FFC72C',
      backgroundColor: 'skyblue',
      alignItems: 'center',
      width: '90%',
      justifyContent: 'center',
      borderRadius: 10,
    },
    box7: {
      paddingHorizontal: 180,
      justifyContent: 'center',
    },
    text: {
      fontSize: 22,
    },
  });