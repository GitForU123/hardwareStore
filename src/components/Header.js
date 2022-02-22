import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import customColor from '../../src/assets/colors/customColor';

const Header = props => {
  const {nav, title} = props;
  return (
    <View style={styles.headerWrapper}>
      <MaterialIcons
        name="arrow-back"
        onPress={() => nav.goBack()}
        size={29}
        color={customColor.white}
        style={styles.iconStyle}
      />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    backgroundColor: customColor.primaryColor,
    height: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Monsterrat-Bold',
    fontSize: 20,
    color: customColor.white,
    alignSelf: 'center',
  },
  iconStyle: {
    // color: customColor.white,
    // height: 10,
    // width: 29,
    // top: 41,
    // left: 57,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
});

export default Header;
