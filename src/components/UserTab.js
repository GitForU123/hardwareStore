import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import useAuth from '../hooks/useAuth';

const UserTab = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userTabWrapper}>
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => navigation.navigate('ProfileDrawer')}>
            <Image style={styles.imageStyle} source={{uri: user.photoURL}} />
          </TouchableOpacity>
          <Text style={styles.textStyle}>Hi,{user.displayName}</Text>
        </View>
      ) : (
        <View style={styles.userTabWrapper}>
          <Image
            style={styles.imageStyle}
            source={require('../assets/images/user.png')}
          />
          <Text style={styles.textStyle}>Hi, User</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  userTabWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
    // alignSelf: 'center',
  },
  textStyle: {
    // alignSelf: 'flex-start',
    marginLeft: 15,
    //borderBottomWidth: 1,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default UserTab;
