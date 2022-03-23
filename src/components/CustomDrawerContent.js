import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';

import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import customColor from '../assets/colors/customColor';
import UserTab from './UserTab';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {getDataFromIncomingInventory} from '../redux/actions/DBAction';

const CustomDrawerContent = props => {
  const {navigation} = props;
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
    fetchData();
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{flex: 1}}>
        <UserTab navigation={navigation} />
      </View>

      <DrawerItemList {...props} />
      <DrawerItem
        label="AddItem"
        onPress={() => navigation.navigate('AddItem')}
        icon={({focused, color, size}) => (
          <Entypo
            color={focused ? customColor.primaryColor : color}
            size={size}
            name="add-to-list"
          />
        )}
      />
      {/* <View>
        {uniqueCollection.map(item => {
          return (
            <Pressable
              style={styles.drawerCategory}
              key={item}
              onPress={() =>
                navigation.navigate('CollectionScreen', {
                  collection: `${item}`,
                })
              }>
              <Text style={styles.drawerText}>{item}</Text>
            </Pressable>
          );
        })}
      </View> */}
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerText}>Collection</Text>
      </View>
      {uniqueCollection.length > 0 &&
        uniqueCollection.map(item => {
          return (
            <DrawerItem
              key={item}
              label={item}
              onPress={() =>
                navigation.navigate('CollectionScreen', {
                  collection: `${item}`,
                })
              }
              style={{
                backgroundColor: 'lightskyblue',
              }}
              inactiveTintColor="black"
            />
          );
        })}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    marginVertical: 5,
  },
  drawerCategory: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: customColor.primaryColor,
  },
});
export default CustomDrawerContent;
