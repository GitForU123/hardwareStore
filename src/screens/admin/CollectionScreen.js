import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import ItemList from '../../components/ItemList';
import customColor from '../../assets/colors/customColor';
import {getDataFromIncomingInventory} from '../../redux/actions/DBAction';
import Header from '../../components/Header';
const CollectionScreen = ({route, navigation}) => {
  const {collection} = route?.params;

  const {storeData} = useSelector(state => state.DBReducer);
  const [uniqueCollection, setUniqueCollection] = useState([]);

  const dispatch = useDispatch();

  const fetchDataList = () =>
    dispatch(getDataFromIncomingInventory(filterList));
  const filterList = comingData => {
    if (comingData) {
      const set = new Set();
      for (let item of comingData) {
        if (item.itemCategory === `${collection}`) {
          set.add(item.itemGroup);
        }
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
    fetchDataList();
  }, []);

  return (
    <ScrollView>
      <Header nav={navigation} title="Collection" />

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
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 5,
    color: customColor.primaryColor,
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'steelblue',
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default CollectionScreen;
