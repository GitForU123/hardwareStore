import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import customColor from '../assets/colors/customColor';

const MenuItem = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonStyles}
        onPress={() =>
          navigation.navigate('CollectionScreen', {
            collection: `${title}`,
          })
        }>
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
    height: 40,
    // alignItems: 'center',
    // justifyContent: 'center',
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
