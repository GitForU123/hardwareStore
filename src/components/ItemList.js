import React from 'react';

import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Item from './Item';
import customColor from '../assets/colors/customColor';

const ItemList = ({itemData}) => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={itemData}
          horizontal={true}
          keyExtractor={item => item.itemGroupId}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('CheckOut', {item: item})}>
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
