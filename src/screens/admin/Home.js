import React, {useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getInventoryData} from '../../redux/actions/DBAction';
import database from '@react-native-firebase/database';

const AdminHome = ({navigation}) => {
  const {storeData} = useSelector(state => state.DBReducer);
  const dispatch = useDispatch();
  const fetchData = () => dispatch(getInventoryData());

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View>
      <Text>Admin Home Screen</Text>
      <FlatList
        keyExtractor={item => item.name}
        data={storeData}
        renderItem={({item}) => {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

export default AdminHome;
