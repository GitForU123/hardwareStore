import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import customColor from '../assets/colors/customColor';

const SoldItem = ({item}) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemStyle}>
        <Text style={styles.textStyle}>itemGroupId : {item.itemGroupId}</Text>
        <Text style={styles.textStyle}>itemName : {item.itemName}</Text>

        {/* <Text style={styles.textStyle}>
                  OutGoing Date : {item.outGoingDate}
                </Text> */}
        <Text style={styles.textStyle}>Count : {item.count}</Text>
        <Text style={styles.textStyle}>
          Total Price : {Number(item.count) * Number(item.itemPrice)}
        </Text>
      </View>
      <Image
        source={{uri: 'data:image/jpeg;base64,' + item.itemURL}}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  itemWrapper: {
    paddingHorizontal: 10,

    // borderWidth: 1,
    // borderColor: 'steelblue',
    // backgroundColor: 'beige',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: customColor.lightgrey,
    marginBottom: 5,
  },
  itemStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  image: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: 100,
    height: 100,
    borderRadius: 10,
    // marginHorizontal: 5,
  },
  textStyle: {
    fontSize: 16,
    paddingRight: 16,
    alignSelf: 'flex-start',
    marginVertical: 2,
    paddingBottom: 5,
    // marginHorizontal: 5,
  },
});
export default SoldItem;
