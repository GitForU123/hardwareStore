import React, {useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getInventoryData} from '../../redux/actions/DBAction';
import database from '@react-native-firebase/database';

import customColor from '../../assets/colors/customColor';
import UserTab from '../../components/UserTab';

const AdminHome = ({navigation}) => {
  const {storeData} = useSelector(state => state.DBReducer);
  const dispatch = useDispatch();
  const fetchData = () => dispatch(getInventoryData());

  useEffect(() => {
    fetchData();
  }, []);
  // const handleOut = () => {
  //   handleSignOut();
  //   navigation.replace('Register');
  // };
  return (
    <View>
      <Text style={styles.heading}>Admin Home Screen</Text>
      <UserTab navigation={navigation} />
      {/* <FlatList
        keyExtractor={item => item.name}
        data={storeData}
        renderItem={({item}) => {
          return <Text>{item.name}</Text>;
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
    color: customColor.primaryColor,
  },
});

export default AdminHome;
