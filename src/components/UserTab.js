import { useNavigation } from '@react-navigation/native';
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
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userTabWrapper}>
          <Text style={styles.textStyle}>Hi,{user.displayName}</Text>
          <TouchableOpacity
            style={styles.imageStyle}
            onPress={() => navigation.navigate('ProfileDrawer')}
            >
            <Image style={styles.imageStyle} source={{ uri: user.photoURL }} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userTabWrapper}>
          <Text style={styles.textStyle}>Hi, User</Text>

          <Image
            style={styles.imageStyle}
            source={require('../assets/images/user.png')}
          />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 15,
  },
  textStyle: {
    alignSelf: 'center',
    marginLeft: 15,
    //borderBottomWidth: 1,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
});
export default UserTab;

