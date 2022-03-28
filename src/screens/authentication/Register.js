import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import customColor from '../../../src/assets/colors/customColor';
import auth from '@react-native-firebase/auth';
import Header from '../../components/Header';
import OverlayLoadingSpinner from '../../components/OverlayLoadingSpinner';

const Register = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [password, setPassword] = useState('');

  const [phone, setPhone] = useState();
  const [city, setCity] = useState('Please update address');
  const [address, setAddress] = useState(' ');

  const [loading, setLoading] = useState(false);


  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const validateData = (userName, userEmail, userPassword) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!userName && !userEmail && !userPassword) {
      ToastAndroid.show('Please fill all the details', ToastAndroid.LONG);
      console.log('both email and password empty');
      return false;
    } else if (reg.test(userEmail) && userPassword.length >= 6) {
      console.log('valid mail and password length greater than 6');
      return true;
    } else {
      ToastAndroid.show('Please put valid data', ToastAndroid.LONG);
      return false;
    }
  };
  const handleRegister = async () => {
    if (validateData(username, userEmail, password)) {

      await auth()
        .createUserWithEmailAndPassword(userEmail, password)
        .then(async() => {
          ToastAndroid.show('Sucessfully Registerd', ToastAndroid.SHORT);
          const usersData = await firestore()
            .collection('users')
            .add({username, userEmail});
            await firestore().collection('users').doc(usersData.id).set({
              id: usersData.id,
              username, 
              userEmail,
              phone, 
              city,
              address,
              image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png", 
              uid: auth().currentUser?.uid,
            });  
          // navigation.navigate('LogIn');
          navigation.replace('LogIn');

        })
        .catch(error => {
          console.log(`errorcode : ${error.code} and error : ${error}`);
          setLoading(false);
          ToastAndroid.show(`${error}`, ToastAndroid.LONG);
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Header nav={navigation} title="Register" />
        <Text style={styles.heading}>Create Your Account</Text>
        <View style={styles.inputWrapper}>
          <Feather name="user" style={styles.iconStyle} />
          <TextInput
            style={styles.inputs}
            onChangeText={text => setUserName(text)}
            value={username}
            placeholder="Enter Your Name"
          />
          </View>
          <View style={styles.inputWrapper}>
            <Feather name="mail" style={styles.iconStyle} />
            <TextInput
              style={styles.inputs}
              onChangeText={text => setuserEmail(text)}
              value={userEmail}
              keyboardType="email-address"
              placeholder="Enter Your  Email "
            />
          </View>

          <View style={styles.inputWrapper}>
            <Feather name="phone" style={styles.iconStyle} />
            <TextInput
              style={styles.inputs}
              onChangeText={text => setPhone(text)}
              value={phone}
              keyboardType="numeric"
              placeholder="Enter Your  Phone Number"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Feather name="lock" style={styles.iconStyle} />
            <TextInput
              style={styles.inputs}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Enter Your Password"
              secureTextEntry={isPasswordShow ? false : true}
            />
            <Feather
              name={isPasswordShow ? 'eye' : 'eye-off'}
              style={styles.iconStyle}
              onPress={() => setIsPasswordShow(!isPasswordShow)}
            />
          </View>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => handleRegister()}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyles}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.accountWrapper}>
        <Text>Already have a account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
          <Text style={styles.textButton}>LogIn</Text>
        </TouchableOpacity>
      </View>
      {loading && <OverlayLoadingSpinner />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderColor: customColor.primaryColor,
    margin: 8,
  },
  inputs: {
    flex: 1,
    fontSize: 18,
    padding: 5,
  },
  iconStyle: {
    fontSize: 25,
    marginHorizontal: 10,
    alignSelf: 'center',
  },

  buttonRow: {
    flexDirection: 'row',

    height: 50,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyles: {
    backgroundColor: customColor.primaryColor,
    height: 40,

    borderRadius: 4,

    paddingHorizontal: 20,
    marginHorizontal: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,

    paddingVertical: 8,
    alignSelf: 'center',
  },
  accountWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textButton: {
    paddingLeft: 5,
    color: customColor.primaryColor,
  },
});

export default Register;
