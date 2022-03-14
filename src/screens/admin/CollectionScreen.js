import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ItemList from '../../components/ItemList';
import { firebase } from '@react-native-firebase/firestore';
import customColor from '../../assets/colors/customColor';
import useAuth from '../../hooks/useAuth';
import { getDataFromIncomingInventory } from '../../redux/actions/DBAction';
const CollectionScreen = ({ route }) => {
  const { collection } = route?.params;
  // const [data, setData] = useState([]);
  // const {data, getData} = useAuth();
  const { storeData } = useSelector(state => state.DBReducer);
  const [uniqueCollection, setUniqueCollection] = useState([]);

  // console.log('storeDataFromCollection', storeData);

  // console.log(storeData.map(item => item.itemGroupId));
  // console.log('collectionNameReceived', collection);
  // const getCollectionData = () => {
  //   // const docRef = firebase.firestore().collection('Inventory').doc();

  //   // console.log('docRef', docRef.path());
  //   // console.log('ListSnapShotData', listData);
  //   // dispatch({type: GET_LIST, payload: listData});
  //   // console.log('Data', data);
  //   // console.log('collection', uniqueCollection);
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

  // const {data, storeData} = useSelector(state => state.DBReducer);

  const dispatch = useDispatch();

  const fetchDataList = () =>
    dispatch(getDataFromIncomingInventory(filterList));
  const filterList = comingData => {
    if (comingData) {
      const set = new Set();
      for (let item of comingData) {
        // console.log('Category', );
        if (item.itemCategory === `${collection}`) {
          set.add(item.itemGroup);
        }
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

  useEffect(() => {
    // fetchList(collection);
    fetchDataList();
    // setData(getCollectionData(collection));
    // const unsubscribe = getData(filterList);
    // console.log(unsubscribe);
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  return (
    <ScrollView style={styles.itemWrapper}>

      <Text style={styles.heading}>Items</Text>
      <View>
        {uniqueCollection.map(item => {
          return (
            <View key={item}>
              <Text style={styles.titleHeader}>{item}</Text>
              <ItemList
                itemData={storeData.filter(data => {
                  return (
                    data.itemCategory === collection && data.itemGroup === item
                  );
                })}
              />
            </View>
          );
        })}
      </View>

    </ScrollView>
  );
  // } else {
  //   return (
  //     <View>
  //       <Text>FetchingData...</Text>
  //     </View>
  //   );
  // }
};

const styles = StyleSheet.create({
  itemWrapper: {

    backgroundColor: "#EEE8AA",



  },
  itemStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 5,
    color: customColor.primaryColor,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'steelblue',
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default CollectionScreen;
