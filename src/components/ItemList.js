import React from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Item from './Item';

const ItemList = ({ itemData }) => {
  const navigation = useNavigation();
  // console.log('itemList', itemData);
  return (
    <>
      <View style={styles.container}>
        {/* <View>
        <Item item={itemData} />
      </View> */}

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={itemData}
          horizontal={true}
          keyExtractor={item => item.itemGroupId}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('CheckOut', { item: item })}>
                <Item item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,


  },
});

export default ItemList;
