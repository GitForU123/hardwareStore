import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import customColor from '../../assets/colors/customColor';
import useAuth from '../../hooks/useAuth';

const IncomingInventory = () => {
  const {data, getData} = useAuth();
  const [incomingList, setIncomingList] = useState([]);
  console.log(incomingList);
  const filterListOfIncoming = incomingData => {
    if (incomingData) {
      setIncomingList(
        incomingData.filter(item => {
          if (item.incomingDate) {
            const currentDate = new Date();
            const [year, month, day] = item.incomingDate.split('-');
            const itemIncomingDate = new Date(year, Number(month) - 1, day);
            console.log(
              currentDate.getTime(),
              itemIncomingDate.getTime(),
              item.incomingDate,
            );
            if (currentDate.getTime() < itemIncomingDate.getTime()) return item;
          }
        }),
      );
    } else {
      console.log('data not available');
    }
  };
  useEffect(() => {
    const unsubscribe = getData(filterListOfIncoming);
    return unsubscribe;
  }, []);
  if (data) {
    return (
      <View>
        <Text style={styles.heading}>Incoming Inventory</Text>
        <FlatList
          data={incomingList}
          keyExtractor={item => item.itemId}
          renderItem={({item}) => {
            return (
              <View style={styles.itemWrapper}>
                <Image
                  source={{uri: 'data:image/jpeg;base64,' + item.itemURL}}
                  resizeMode="cover"
                  style={styles.image}
                />
                <View style={styles.itemStyle}>
                  <Text style={styles.textStyle}>
                    itemName : {item.itemName}
                  </Text>
                  <Text style={styles.textStyle}>
                    Incoming Date : {item.incomingDate}
                  </Text>
                  <Text style={styles.textStyle}>Count : {item.count}</Text>
                </View>
              </View>
            );
          }}
        />
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
  itemWrapper: {
    paddingHorizontal: 10,

    // borderWidth: 1,
    // borderColor: 'steelblue',
    // backgroundColor: 'beige',
    borderRadius: 10,
    flexDirection: 'row',
  },
  itemStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  image: {
    width: 100,
    height: 150,
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

export default IncomingInventory;
