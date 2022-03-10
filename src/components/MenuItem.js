import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import customColor from '../assets/colors/customColor';

const MenuItem = ({title}) => {
  const navigation = useNavigation();
  const imageSrcHandler = title => {
    console.log('title', title);
    switch (title) {
      case 'Electronics':
        return require('../assets/images/Electronics.png');

      case 'Mobile':
        return require('../assets/images/Mobile.png');

      default:
        return require('../assets/images/Electronics.png');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonStyles}
        onPress={() =>
          navigation.navigate('CollectionScreen', {
            collection: `${title}`,
          })
        }>
        <Image source={imageSrcHandler(title)} style={styles.imageStyle} />
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customColor.primaryColor,
    // borderWidth: 1,
    // borderColor: 'yellow',
    margin: 5,
    paddingHorizontal: 10,
    // width: '40%',
    height: 120,
    borderRadius: 5,
    // borderBottomColor: customColor.lightgrey,
    // borderRightColor: customColor.lightgrey,
    borderWidth: 2,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: 'red',
    shadowRadius: 4,
    shadowOpacity: 1,
    // width: 100,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imageStyle: {
    height: 80,
    width: 100,
    marginTop: 5,
  },
  buttonStyles: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  buttonText: {
    color: customColor.white,
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default MenuItem;
