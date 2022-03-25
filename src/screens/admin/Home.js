import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {getDataFromIncomingInventory} from '../../redux/actions/DBAction';

import customColor from '../../assets/colors/customColor';
import UserTab from '../../components/UserTab';

import MenuItem from '../../components/MenuItem';

import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';


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
    // const listener = navigation.addListener('focus', () => {
    //   fetchData();
    // });
    // return () => listener.remove();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Header title="Home" nav={navigation} /> */}

      {/* <UserTab navigation={navigation} /> */}
      <Text style={styles.heading}>Add Your Item Here!</Text>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddItem')}
          style={styles.button}>
          <Text style={styles.buttonText}>GO TO ADDITEM</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.menuWrapper}>
        {uniqueCollection.map(item => {
          return (
            <View key={item}>
              <MenuItem title={item} />
            </View>
          );
        })}
      </View> */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddItem')}
        style={styles.buttonStyles}>
        <Icon
          name="plus"
          size={35}
          color={customColor.white}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
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
    fontSize: 25,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
    color: customColor.primaryColor,
  },
  menuWrapper: {
    marginTop: 30,

    flexDirection: 'row',
    justifyContent: 'center',

    borderColor: 'red',
    flexWrap: 'wrap',
  },

  button: {
    margin: 10,
    backgroundColor: customColor.primaryColor,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 5,
  },
  buttonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: customColor.primaryColor,
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  iconStyle: {
    alignSelf: 'center',
  },
});

export default AdminHome;
