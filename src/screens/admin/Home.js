import React, {useEffect, useState} from 'react';
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
import {
  getCollectionList,
  getInventoryData,
  getInventoryList,
} from '../../redux/actions/DBAction';
import database from '@react-native-firebase/database';

import customColor from '../../assets/colors/customColor';
import UserTab from '../../components/UserTab';
import ItemList from '../../components/ItemList';
import {firebase, doc, setDocs} from '@react-native-firebase/firestore';
import useAuth from '../../hooks/useAuth';
import MenuItem from '../../components/MenuItem';
import {ActivityIndicator} from 'react-native';

const AdminHome = ({navigation}) => {
  // const {storeData} = useSelector(state => state.DBReducer);
  // const [data, setData] = useState([]);
  const {data, getData} = useAuth();
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
  // const dispatch = useDispatch();
  // const fetchData = () => dispatch(getInventoryData());
  const filterList = comingData => {
    if (comingData) {
      const set = new Set();
      for (let item of comingData) {
        set.add(item.itemCategory);
      }
      let arr = [];
      set.forEach(value => {
        console.log(value);
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
    const unsubscribe = getData(filterList);
    return unsubscribe;
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
  }, []);

  // const handleOut = () => {
  //   handleSignOut();
  //   navigation.replace('Register');
  // };
  if (data) {
    return (
      <View>
        <Text style={styles.heading}>Admin Home Screen</Text>
        <UserTab />
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
  } else {
    return (
      <View>
        <Text>Fetching...</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
    // backgroundColor: 'black',
    // borderWidth: 2,
    borderColor: 'red',
    flexWrap: 'wrap',
  },
  buttonStyles: {
    backgroundColor: 'black',

    height: 40,

    borderRadius: 3,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default AdminHome;
