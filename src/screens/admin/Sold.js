import { firebase } from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import customColor from '../../assets/colors/customColor';
import SoldItem from '../../components/SoldItem';
import useAuth from '../../hooks/useAuth';
import { getSoldInventory } from '../../redux/actions/DBAction';

const Sold = () => {
  // const {data, getData} = useAuth();
  const { soldList } = useSelector(state => state.DBReducer);
  // console.log(soldList);
  // const [outGoingList, setOutGoingList] = useState([]);

  // console.log(outGoingList);
  // const filterListOfOutGoing = incomingData => {
  //   if (incomingData) {
  //     setOutGoingList(
  //       incomingData.filter(item => {
  //         if (item.outGoingDate) {
  //           const currentDate = new Date();
  //           const [year, month, day] = item.outGoingDate.split('-');
  //           const itemOutGoingDate = new Date(year, Number(month) - 1, day);

  //           if (currentDate.getTime() > itemOutGoingDate.getTime()) return item;
  //         }
  //       }),
  //     );
  //   } else {
  //     console.log('data not available');
  //   }
  // };
  const dispatch = useDispatch();
  const getSoldList = () => dispatch(getSoldInventory());
  useEffect(() => {
    // const unsubscribe = getData(filterListOfOutGoing);
    // const unsubscribe = firebase
    //   .firestore()
    //   .collection('SoldInventory')
    //   .onSnapshot(snapshot => {
    //     const dataList = snapshot.docs.map(item => item.data());
    //     setOutGoingList(dataList);
    //   });
    // return unsubscribe;
    getSoldList();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.heading}>Sold Inventory</Text>
        <View style={styles.listWrapper}>
          <FlatList
            data={soldList}
            keyExtractor={item => item.itemGroupId}
            renderItem={({ item }) => {
              return <SoldItem item={item} />;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'

  },
  heading: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
    color: customColor.primaryColor,
  },
  listWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 100,


  },
});

export default Sold;
