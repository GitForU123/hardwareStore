import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import customColor from '../assets/colors/customColor';



const LoadingSpinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size={50} color={customColor.primaryColor} style={styles.spinner} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  
});

export default LoadingSpinner;
