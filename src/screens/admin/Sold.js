import {firebase} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import customColor from '../../assets/colors/customColor';
import Header from '../../components/Header';

import SoldItem from '../../components/SoldItem';

import {getSoldInventory} from '../../redux/actions/DBAction';

const Sold = ({navigation}) => {
  const {soldList} = useSelector(state => state.DBReducer);

  const dispatch = useDispatch();
  const getSoldList = () => dispatch(getSoldInventory());
  useEffect(() => {
    getSoldList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header nav={navigation} title="Sold" />

      <View style={styles.listWrapper}>
        <FlatList
          data={soldList}
          keyExtractor={item => item.itemGroupId}
          renderItem={({item}) => {
            return <SoldItem item={item} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
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
