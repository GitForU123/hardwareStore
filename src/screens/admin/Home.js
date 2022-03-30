import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDataFromIncomingInventory} from '../../redux/actions/DBAction';

import customColor from '../../assets/colors/customColor';

import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../../components/SearchBar';
import ItemList from '../../components/ItemList';

const AdminHome = ({navigation}) => {
  const [uniqueCollection, setUniqueCollection] = useState([]);
  const {storeData} = useSelector(state => state.DBReducer);
  const [searchText, setSearchText] = useState();
  const [filteredItems, setFilteredItems] = useState([]);

  const dispatch = useDispatch();
  const fetchData = () => dispatch(getDataFromIncomingInventory(filterList));
  const filterList = comingData => {
    if (comingData) {
      const set = new Set();
      for (let item of comingData) {
        set.add(item.itemCategory);
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
  const searchItems = searchField => {
    setSearchText(searchField);
    setFilteredItems(
      storeData.filter(
        item =>
          item.itemCategory === searchField ||
          item.itemGroup === searchField ||
          item.itemName === searchField ||
          item.itemGroupId === searchField,
      ),
    );
    // console.log(filteredItems);
  };
  useEffect(() => {
    fetchData();
    // const listener = navigation.addListener('focus', () => {
    //   fetchData();
    // });
    // return () => listener.remove();
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        term={searchText}
        onChangeTerm={newTerm => searchItems(newTerm)}
      />
      {searchText ? (
        filteredItems.length > 0 ? (
          <ScrollView style={{backgroundColor: 'white'}}>
            {filteredItems.map(item => {
              return (
                <View key={item.itemGroupId}>
                  <Text style={styles.titleHeader}>{item.itemGroup}</Text>
                  <ItemList
                    itemData={filteredItems.filter(
                      data => data.itemGroup === item.itemGroup,
                    )}
                  />
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={styles.placeHolderTextStyle}>
            <Text style={styles.heading}>No Items Available</Text>
          </View>
        )
      ) : (
        <View style={styles.placeHolderTextStyle}>
          <Text style={styles.heading}>Searched Item Will Appear Here!</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddItem')}
        style={styles.buttonStyles}>
        <Icon
          name="plus"
          size={35}
          color={customColor.white}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customColor.white,
    flex: 1,
  },
  placeHolderTextStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
    color: customColor.primaryColor,
  },
  titleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'steelblue',
    marginLeft: 15,
    marginBottom: 5,
  },
  menuWrapper: {
    marginTop: 30,

    flexDirection: 'row',
    justifyContent: 'center',

    borderColor: 'red',
    flexWrap: 'wrap',
  },

  button: {
    margin: 10,
    backgroundColor: customColor.primaryColor,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    alignSelf: 'center',
    marginVertical: 5,
  },
  buttonStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: customColor.primaryColor,
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 50,
    height: 50,
    borderRadius: 40,
    marginRight: 15,
    alignSelf: 'flex-end',
  },
  iconStyle: {
    alignSelf: 'center',
  },
});

export default AdminHome;
