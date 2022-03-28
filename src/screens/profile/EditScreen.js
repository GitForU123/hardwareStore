import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import customColor from '../../assets/colors/customColor';
import Header from '../../components/Header';


export default function EditScreen({route, navigation}) {
  const [result, setResult] = useState([]);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [loading, setLoading] = useState(false);
//   const [phonenum, setPhonenum] = useState(route.params.phone);
//   // const [firstname, setFirstname] = useState(route.params.fname);
//   // const [lastname, setLastname] = useState(route.params.lname);
//   const [nameuser, setNameuser] = useState(route.params.name);
//   const [cityuser, setCityuser] = useState(route.params.city);
//   const [addressuser, setAddressuser] = useState(route.params.address);
//   console.log('params', route.params.phone);
//   console.log('params', route.params.name);
//   console.log('params', route.params.city);
//   console.log('params', route.params.address);
//   console.log('name', nameuser);

  const [phonenum, setPhonenum] = useState('');
  // const [firstname, setFirstname] = useState(route.params.fname);
  // const [lastname, setLastname] = useState(route.params.lname);
  const [nameuser, setNameuser] = useState('');
  const [cityuser, setCityuser] = useState();
  const [addressuser, setAddressuser] = useState();
//   console.log('params', route.params.phone);
//   console.log('params', route.params.name);
//   console.log('params', route.params.city);
//   console.log('params', route.params.address);
//   console.log('name', nameuser);

  useEffect(() => {
    console.log('edit profile screen');
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
  }, []);

//   useEffect(() => {
//     console.log('editscreen');
//     const getdetails = async () => {
//       setLoading(true);
//       const querySnap = await firestore()
//         .collection('users')
//         .where('uid', '==', auth().currentUser.uid)
//         .get();
//       let res = querySnap.docs.map(docSnap => docSnap.data());
//       setResult(res[0]);
//       setLoading(false);
//       console.log('res ', res);
//       console.log('result after set', result);
//       console.log('result after set at edit sc', result);
//     };
//     getdetails();
//   }, []);

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);
      console.log('url', url);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  function phonenumbervalidation() {
    var phoneno = /^[6-9]\d{9}$/;
    if (phonenum.length < 10) {
      Alert.alert('Phone number should be greater than ten digit');
    } else if (!phoneno.test(phonenum)) {
      Alert.alert('Enter Only Numeric Value');
    } else {
      console.log('in else', phonenum);
      setResult({...result, phone: phonenum});
    }
  }
  function nameValidation() {
    var regName = /^[ a-zA-Z\-\’]+$/;
    if (!regName.test(nameuser)) {
      Alert.alert('Enter Only Alphabatic Value');
    } else {
      console.log('in else', nameuser);
      setResult({...result, username: nameuser});
    }
  }

  function cityValidation() {
    var regName = /^[ a-zA-Z\-\’]+$/;
    if (!regName.test(cityuser)) {
      Alert.alert('Enter Only Alphabatic Value');
    } else {
      console.log('in else', cityuser);
      setResult({...result, city: cityuser});
    }
  }

  function addressValidation() {
    var regName = /^[ a-zA-Z\-\’]+$/;
    if (!regName.test(addressuser)) {
      Alert.alert('Enter Only Alphabatic Value');
    } else {
      console.log('in else', addressuser);
      setResult({...result, address: addressuser});
    }
  }

  const CustomButton = ({ text, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainerStyle}>
          <Text style={styles.buttonText}> {text} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  // function lnameValidation() {
  //   var regName = /^[ a-zA-Z\-\’]+$/;
  //   if (!regName.test(lastname)) {
  //     Alert.alert('Enter Only Alphabatic Value');
  //   } else {
  //     console.log('in else', lastname);
  //     setResult({...result, lname: lastname});
  //   }
  // }

  const handleUpdate = async () => {
    if(!nameuser || !phonenum || !addressuser || !cityuser ){
        return Alert.alert('Please fill all the fields')
    }
    console.log('in update');
    // let imgUrl = await uploadImage();
    // console.log('return imgurl edit', imgUrl);

    // if (imgUrl == null && result.image) {
    //   imgUrl = result.image;
    //   console.log('if imgurl', imgUrl);
    //   console.log('if result image', result.image);
    // }
    console.log('if outside', result.imgUrl);
    console.log('if outside img', result.image);
    console.log('if outside city', result.city);
    console.log('if outside name', result.name);
    console.log('if outside address', result.address);
    firestore()
      .collection('users')
      .doc(result.id)
      .update({
        username: result.username,
        phone: result.phone,
        city: result.city,
        address: result.address,
        // image: imgUrl,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('Profile'),
            },
          ],
          {cancelable: true},
        );
      });
  };
  const chooseUploadType = () => {
    Alert.alert(
      'Choose Upload Type',
      'Select one of the following to upload image',
      [
        {
          text: 'Open camera',
          onPress: () => takePhotoFromCamera(),
          // marginHorizontal: 5
        },
        {
          text: 'Choose from gallery',
          onPress: () => choosePhotoFromLibrary(),
        },
      ],
      {cancelable: true},
    );
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      this.bs.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      this.bs.current.snapTo(1);
    });
  };

  return (  
    <View style={{flex: 1}}>
      {loading ? (
        <View style={styles.containeract}>
          {/* <CustomActivityIndicator animating={loading} /> */}
          <Text style={styles.loadingTextStyle}>
            Fetching Profile Details ...
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {/* <Header
            headerTitle="Edit Profile"
            onPress={() => navigation.navigate('Profileuser')}
          /> */}
          {/* <View style={{ flex: 1, paddingTop: '30%' }}>
            <View style={styles.box1}>
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  borderWidth: 2,
                  borderColor: 'black',
                  paddingTop: 5,
                }}
                source={{
                  uri: image
                    ? image
                    : result
                      ? result.image ||
                      'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                      : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                }}
              />
              <TouchableOpacity
                style={styles.buttonContainerStyle1}
                onPress={() => chooseUploadType()}>
                <Text style={styles.buttonText}>Pick an Image</Text>
              </TouchableOpacity>
            </View> */}
          <Header nav={navigation} title="Edit Profile" />
          <View style={{alignItems: 'center', margin: 50}}>
            <TouchableOpacity onPress={() => chooseUploadType()}>
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 40,
                }}>
                <ImageBackground
                  source={{
                    uri: image
                      ? image
                      : result
                      ? result.image ||
                        'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                      : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                  }}
                  style={{height: 100, width: 100}}
                  imageStyle={{
                    borderRadius: 10,
                    // borderColor: appTheme.COLORS.primary,
                    borderColor: customColor.steelblue,
                    borderRadius: 10,
                    borderWidth: 2,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.action}>
            <Icon
              name="account"
              size={40}
            //   color={appTheme.COLORS.primary}
            //   color={red}
              style={{padding: 10}}
              //   color="green"
            />
            <TextInput
            //   placeholderTextColor="#666666"
              placeholder="Name"
              // autoCorrect={false}
              style={{fontSize: 20}}
              onChangeText={setNameuser}
              onEndEditing={nameValidation}
              value={nameuser}
            />
          </View>

          {/* <View style={styles.action}> */}
          {/* <Icon */}
          {/* name="account" */}
          {/* size={40} */}
          {/* color={appTheme.COLORS.primary} */}
          {/* style={{padding: 10}} */}
          {/* //   color="green" */}
          {/* /> */}
          {/* <FontAwesome name="user-o" size={20} color={'orange'}/> */}
          {/* <TextInput */}
          {/* // placeholderTextColor="#666666" */}
          {/* // autoCorrect={false} */}
          {/* style={{fontSize: 20}} */}
          {/* onChangeText={setLastname} */}
          {/* onEndEditing={lnameValidation} */}
          {/* value={lastname} */}
          {/* /> */}
          {/* </View> */}

          <View style={styles.action}>
            <Icon
              name="phone"
              size={40}
            //   color={appTheme.COLORS.primary}
            //   color={red}
              style={{padding: 10}}
              //   color="green"
            />
            <TextInput
              placeholder="Phone"
              keyboardType='numeric'
              // placeholderTextColor="#666666"
              // autoCorrect={false}
              style={{fontSize: 20}}
              onChangeText={setPhonenum}
              value={phonenum}
              onEndEditing={phonenumbervalidation}
            //   color="red"
            />
          </View>
          <View style={styles.action}>
            <Icon
              name="map-marker-radius"
              size={40}
            //   color={appTheme.COLORS.primary}
              style={{padding: 10}}
              //   color="green"
            />
            <TextInput
              placeholder="City"
              // placeholderTextColor="#666666"
              // autoCorrect={false}
              style={{fontSize: 20}}
              onChangeText={setCityuser}
              value={cityuser}
              onEndEditing={cityValidation}
            />
          </View>
          <View style={styles.action}>
            <Icon
              name="map-marker-radius"
              size={40}
            //   color={appTheme.COLORS.primary}
              style={{padding: 10}}
              //   color="green"
            />
            <TextInput
              placeholder="Address"
              // placeholderTextColor="#666666"
              // autoCorrect={false}
              style={{fontSize: 20}}
              onChangeText={setAddressuser}
              value={addressuser}
              onEndEditing={addressValidation}
            />
          </View>

          {/* <View style={styles.box1a}>
              <TextInput
                style={styles.inputWrap}
                label="First Name"
                mode="outlined"
                value={firstname}
                onChangeText={setFirstname}
                onEndEditing={nameValidation}
              />
              <TextInput
                style={styles.inputWrap}
                label="Last Name"
                mode="outlined"
                value={lastname}
                onChangeText={setLastname}
                onEndEditing={lnameValidation}
              />
            </View> */}
          {/* <View style={styles.box2}>
              <TextInput
                style={styles.inputWrap}
                label="Contact Number"
                mode="outlined"
                maxLength={10}
                value={phonenum}
                onChangeText={setPhonenum}
                onEndEditing={phonenumbervalidation}
              />
            </View> */}
          {/* <View
              style={{
                padding: '5%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor:'red'
              }}>
              
            </View> */}
          <View style={{marginHorizontal: '5%',  marginTop: '22%'}}>
              <CustomButton onPress={() => handleUpdate()} text="Submit" />
              {/* <Button onPress={() => handleUpdate()} color='red' text="Submit" /> */}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containeract: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  loadingTextStyle: {
    fontSize: 20,
    color: 'black',
  },

  buttonContainerStyle: {
    justifyContent: 'center',
    // backgroundColor: appTheme.COLORS.primary,
    backgroundColor: customColor.steelblue,
    marginVertical: 10,
    marginBottom: 25,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
    width:'93%',
    // marginLeft:16,
    // marginRight:16,
    alignSelf:'center',
   
  },
 
  buttonText: {
    fontSize: 20,
    //color: 'black',
    color: 'white',
  },
});
