import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Circle} from 'react-native-progress';
import customColor from '../assets/colors/customColor';

const ProgressBar = () => {
  return (
    <View>
      <Circle
        size={80}
        borderWidth={4}
        indeterminate={true}
        color={customColor.primaryColor}
        endAngle={0.7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProgressBar;
