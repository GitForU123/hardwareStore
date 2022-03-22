import React from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import customColor from '../../src/assets/colors/customColor';

const Header = props => {
  const {nav, title} = props;

  // const handleNavigation = () => {
  //   switch (title) {
  //     case 'Register':
  //     case 'Home':
  //       BackHandler.exitApp();
  //       break;
  //     default:
  //       nav.goBack();
  //   }
  // };

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.iconWrapper}>
        {title === 'Register' || title === 'Home' ? null : (
          <MaterialIcons
            name="arrow-back"
            onPress={() => nav.goBack()}
            size={29}
            style={styles.iconStyle}
          />
        )}
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.emptyWrapper}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    backgroundColor: customColor.primaryColor,
    height: 50,
    marginBottom: 10,
  },
  iconWrapper: {
    flex: 1,

    justifyContent: 'center',
  },
  titleWrapper: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrapper: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Monsterrat-Bold',
    fontSize: 20,
    color: customColor.white,
    alignSelf: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
  iconStyle: {
    color: customColor.white,
    paddingLeft: 10,
    // height: 10,
    // width: 29,
    // top: 41,
    // left: 57,
    // paddingVertical: 8,
    // paddingHorizontal: 20,
  },
});

export default Header;
