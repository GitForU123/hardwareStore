import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import customColor from '../assets/colors/customColor';

const SoldItem = ({item}) => {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemStyle}>
        <Text style={styles.textStyle}>itemGroupId : {item.itemGroupId}</Text>
        <Text style={styles.textStyle}>itemName : {item.itemName}</Text>

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
    backgroundColor: 'lightskyblue',

    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: customColor.lightgrey,
    marginBottom: 10,
  },
  itemStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  image: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingRight: 16,
    alignSelf: 'flex-start',
    marginVertical: 2,
    paddingBottom: 5,
  },
});
export default SoldItem;
