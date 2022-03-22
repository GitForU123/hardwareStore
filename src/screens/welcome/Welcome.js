import React from 'react';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import customColor from '../../assets/colors/customColor';

const WelcomeScreen = ({navigation}) => {
  setTimeout(function () {
    navigation.replace('Register');
  }, 2000);

  function renderHeader() {
    return (
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.textStyle}>WELCOME</Text>
          <Text style={styles.textStyle}>TO</Text>
          <Text style={styles.textStyle}>MYHARDWARE</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/splash.jpg')}
            style={styles.imageBackground}></Image>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar barStyle="light-content" />

      {/* Header  */}
      {renderHeader()}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customColor.white,
  },
  imageContainer: {
    height: '50%',
    width: '80%',
    marginTop: 20,
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: customColor.primaryColor,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
  },
  textWrapper: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: customColor.primaryColor,
  },
});

export default WelcomeScreen;
