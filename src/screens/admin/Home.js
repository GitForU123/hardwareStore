import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {getDataFromIncomingInventory} from '../../redux/actions/DBAction';

import customColor from '../../assets/colors/customColor';
import UserTab from '../../components/UserTab';

import MenuItem from '../../components/MenuItem';

import Header from '../../components/Header';

const AdminHome = ({navigation}) => {
  const [uniqueCollection, setUniqueCollection] = useState([]);

  const dispatch = useDispatch();
  const fetchData = () => dispatch(getDataFromIncomingInventory(filterList));
  const filterList = comingData => {
    if (comingData) {
      const set = new Set();
      for (let item of comingData) {
        set.add(item.itemCategory);
      }
      let arr = [];
      set.forEach(value => {
        arr.push(value);
      });
      setUniqueCollection(arr);
    } else {
      console.log('data not availble');
    }
  };

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => listener.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Header title="Home" nav={navigation} />

      <UserTab navigation={navigation} />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddItem')}
        style={styles.buttonStyles}>
        <Text style={styles.buttonText}>GO TO ADDITEM</Text>
      </TouchableOpacity>
      <View style={styles.menuWrapper}>
        {uniqueCollection.map(item => {
          return (
            <View key={item}>
              <MenuItem title={item} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customColor.white,
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
    color: customColor.primaryColor,
  },
  menuWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',

    borderColor: 'red',
    flexWrap: 'wrap',
  },
  buttonStyles: {
    backgroundColor: 'black',

    height: 40,

    borderRadius: 3,
    marginHorizontal: 20,
    paddingBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default AdminHome;
