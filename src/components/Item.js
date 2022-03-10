import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Item = ({item}) => {
  // console.log('item', item);
  return (
    <View style={styles.itemWrapper}>
      <View style={{flexDirection: 'column', flexWrap: 'wrap'}}>
        <Image
          source={{uri: 'data:image/jpeg;base64,' + item.itemURL}}
          resizeMode="cover"
          style={styles.image}
        />

        <Text style={styles.title}>Name : {item.itemName}</Text>
        <Text style={styles.title}> Price : {item.itemPrice} Rs</Text>
        <Text style={styles.title}>Count : {item?.count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    height: 250,
    width: 150,
    // borderWidth: 1,
    // borderColor: 'steelblue',
    // backgroundColor: 'beige',
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    // marginHorizontal: 5,
  },
  title: {
    fontSize: 14,
    paddingRight: 16,
    alignSelf: 'flex-start',
    marginVertical: 2,
    // marginHorizontal: 5,
  },
});
export default Item;
