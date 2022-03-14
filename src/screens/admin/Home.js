import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCollectionList,
  getDataFromIncomingInventory,
  getInventoryData,
  getInventoryList,
} from '../../redux/actions/DBAction';
import database from '@react-native-firebase/database';

import customColor from '../../assets/colors/customColor';
import UserTab from '../../components/UserTab';
import ItemList from '../../components/ItemList';
import { firebase, doc, setDocs } from '@react-native-firebase/firestore';
import useAuth from '../../hooks/useAuth';
import MenuItem from '../../components/MenuItem';
import { ActivityIndicator } from 'react-native';
import Header from '../../components/Header';

const AdminHome = ({ navigation }) => {
  // const {storeData} = useSelector(state => state.DBReducer);
  // const [data, setData] = useState([]);
  // const {data, getData} = useAuth();

  const [uniqueCollection, setUniqueCollection] = useState([]);
  // const {getListData, collectionData} = useAuth();
  // console.log(collectionData);
  // console.log('StoreData', storeData);
  // console.log('ListData', collectionList);
  // console.log('DATA', storeData);
  // const handleLoader = () => {
  //   setTimeout(() => {
  //     setLoading(true);

  //     // navigation.navigate('Home1')
  //   }, 1000);

  //   setLoading(false);
  // };
  // const getCategoryCollection = () => {
  //   firebase
  //     .firestore()
  //     .collection('Inventory')
  //     .get()
  //     .then(snapshot => {
  //       // console.log('collectedSnap', snapshot);
  //       const collectionData = snapshot.docs.map(item => item.data());
  //       setData(collectionData);
  //       filterList(collectionData);
  //     });
  // };
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
        // console.log(value);
        arr.push(value);
      });
      setUniqueCollection(arr);
    } else {
      // filterList(data);
      console.log('data not availble');
    }
  };
  // const fetchData = () => {
  //   dispatch(getInventoryList());

  // };

  // const onResult = querySnap => {
  //   console.log('querySnapResult', querySnap);
  //   const size = querySnap.size;
  //   console.log('querySnapData', size);
  // };
  // const onError = () => {
  //   console.log('some Error on querySnap');
  // };
  useEffect(() => {
    // const unsubscribe = getData(filterList);
    // return () => {
    //   unsubscribe();
    // };
    const listener = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => listener.remove();
    // fetchData('Stationary', 'Pen');
    // handleLoader();
    // fetchData(filterListCallback);
    // getCategoryCollection();
    // getListData('Stationary', 'Pen');
    // fetchData('Stationary', 'Pen');
    // fetchList();
    // firebase
    //   .firestore()
    //   .collection('Items')
    //   .get()
    //   .then(onResult, onError);
  }, [navigation]);

  // const handleOut = () => {
  //   handleSignOut();
  //   navigation.replace('Register');

  // };
  // if (storeData.length) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Dashboard </Text>
      <UserTab />
      <TouchableOpacity
        onPress={() => navigation.navigate('AddItem')}
        style={styles.buttonStyles}>
        <Icon name="plus" size={35} color="brown" />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('AddItem')}
        style={styles.buttonStyles}>
        <Text style={styles.buttonText}>GO TO ADDITEM</Text>
      </TouchableOpacity> */}
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
  // } else {
  //   return (
  //     <View>
  //       <Text>Fetching...</Text>
  //     </View>
  //   );
  // }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customColor.white,
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
    color: customColor.primaryColor,
  },
  menuWrapper: {
    marginTop: 30,

    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'black',
    // borderWidth: 2,
    borderColor: 'red',
    flexWrap: 'wrap',
  },
  buttonStyles: {

    position: "absolute",
    bottom: 0,
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 15,
    alignSelf: "flex-end",






  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default AdminHome;
