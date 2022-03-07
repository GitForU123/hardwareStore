import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImagePickerIOS,
  Button,
  PermissionsAndroid,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {firebase} from '@react-native-firebase/firestore';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import customColor from '../assets/colors/customColor';

const AddImage = ({setURL}) => {
  const [itemURL, setItemURL] = useState('');
  const launchImageGallery = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: true,
      includeExtra: true,
    };

    launchImageLibrary(options, response => {
      // console.log(response)
      if (response.didCancel === true) {
        console.log('No Image Selected');
      } else if (response.assets) {
        // console.log(response.assets[0].uri)
        setURL(response.assets[0].base64);
        // console.log(itemURL)
      }
    });
  };
  const requestCameraPermission = async () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(
      checkResult => {
        console.log(`check result : ${checkResult}`);
      },
    );
    try {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then(result => {
        if (
          result['android.permission.CAMERA'] === 'granted' &&
          result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
          console.log('Camera permission given');
          // const handlelaunchCamera = () =>{
          //     console.log("launch Camera clicked")

          let options = {
            mediaType: 'photo',
            includeBase64: true,
            includeExtra: true,
            cameraType: 'back',
            quality: 0.2,
            saveToPhotos: true,
          };
          launchCamera(options, res => {
            // console.log('Response = ', res);

            if (res.didCancel) {
              console.log('User cancelled image picker');
            } else if (res.error) {
              console.log('ImagePicker Error: ', res.error);
            } else {
              // console.log(res);
              setURL(res.assets[0].base64);
            }
          });

          // }
        } else {
          console.log('Camera permission denied');
        }
      });
    } catch (err) {
      console.warn(err);
    }
  };

  // showing toast
  const showToast = () => {
    ToastAndroid.show('Fruit Successfully Added to store', ToastAndroid.SHORT);
  };

  //   const handleSave = navigation => {
  //     if (fruitName.length !== 0 && itemURL.length !== 0) {
  //       // here add data to firestore
  //       firebase.firestore().collection('Fruits').add({
  //         fruit: fruitName,
  //         fruitUrI: itemURL,
  //       });
  //       showToast();
  //       setFruitName('');
  //       setItemURL('');
  //       navigation.navigate('FruitList');
  //     } else {
  //       ToastAndroid.show('Not all valid field selected', ToastAndroid.LONG);
  //     }
  //   };

  return (
    <View style={styles.container}>
      <Text>Upload Image : </Text>

      <Feather
        name="image"
        size={30}
        color={customColor.primaryColor}
        style={styles.iconStyle}
        onPress={() => launchImageGallery()}
      />

      <Feather
        name="camera"
        size={30}
        style={styles.iconStyle}
        color={customColor.primaryColor}
        onPress={() => requestCameraPermission()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
  },
  iconStyle: {
    alignSelf: 'center',
    marginLeft: 5,
  },
});
export default AddImage;
