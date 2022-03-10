import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch} from 'react-redux';
import customColor from '../../assets/colors/customColor';
import AddImage from '../../components/AddImage';

import Feather from 'react-native-vector-icons/Feather';
import {addDataToIncomingInventory} from '../../redux/actions/DBAction';
import {firebase} from '@react-native-firebase/firestore';
// import DropDownPicker from 'react-native-dropdown-picker';
import DropDown from 'react-native-paper-dropdown';
import categoryListData from '../../data/categoryListData';
import categoryToGroup from '../../data/categoryToGroup';
const AddItem = ({navigation, route}) => {
  const [itemName, setItemName] = useState('');
  const [itemGroupId, setItemGroupId] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemURL, setItemURL] = useState('');
  const [count, setCount] = useState('');
  const [incomingDate, setIncomingDate] = useState();

  const [showDropDown, setShowDropDown] = useState(false);
  const [showGroupDropDown, setShowGroupDropDown] = useState(false);
  // const [categoryListData, setCategoryListData] = useState([
  //   {
  //     label: 'Stationary',
  //     value: 'Stationary',
  //   },
  //   {
  //     label: 'Mobile',
  //     value: 'Mobile',
  //   },
  //   {
  //     label: 'Electronics',
  //     value: 'Electronics',
  //   },
  // ]);
  // console.log(incomingDate, route.params?.datePicked);
  const dispatch = useDispatch();
  // const addData = data => dispatch(addDataToFireStore(data));
  const addToIncomingInventory = data =>
    dispatch(addDataToIncomingInventory(data));

  // setIncomingDate(route.params?.date);
  // const addDataTo = (collectionName, group, data, itemGroupId) =>
  //   dispatch(addInventoryData(collectionName, group, data, itemGroupId));
  const handleonPress = () => {
    const data = {
      itemCategory,
      itemGroup,

      itemGroupId,
      itemName,
      count,
      itemPrice,
      itemURL,
      // incomingDate: route.params?.datePicked,
      // outGoingDate: route.params?.outGoingDate,
    };

    addToIncomingInventory(data);
    navigation.goBack();
  };

  const checkItemExists = itemId => {
    firebase
      .firestore()
      .collection('IncomingInventory')
      .doc(itemId)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const item = snapshot.data();
          setItemCategory(item.itemCategory);
          setItemGroup(item.itemGroup);
          setItemName(item.itemName);
          setItemPrice(item.itemPrice);
          setItemURL(item.itemURL);
        }
      });
  };

  return (
    <ScrollView>
      <Text style={styles.heading}>Add Item Here</Text>
      <Image
        source={
          itemURL.length === 0
            ? require('../../assets/images/gallery.png')
            : {uri: 'data:image/jpeg;base64,' + itemURL}
        }
        style={styles.imageContainer}
      />
      <View style={styles.dropDownWrapper}>
        <DropDown
          label="ItemCategories"
          mode="outlined"
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={itemCategory}
          setValue={setItemCategory}
          list={categoryListData}
        />
      </View>
      <View style={styles.dropDownWrapper}>
        <DropDown
          label="ItemGroup"
          mode="outlined"
          visible={showGroupDropDown}
          showDropDown={() => setShowGroupDropDown(true)}
          onDismiss={() => setShowGroupDropDown(false)}
          value={itemGroup}
          setValue={setItemGroup}
          list={categoryToGroup[`${itemCategory}`]}
        />
      </View>
      {/* <DropDownPicker
        open={showDropDown}
        setOpen={setShowDropDown}
        value={itemCategory}
        setValue={setItemCategory}
        items={categoryListData}
        setItems={setCategoryListData}
      /> */}
      <TextInput
        style={[styles.input]}
        placeholder="ItemGroupId"
        onChangeText={newText => setItemGroupId(newText)}
        value={itemGroupId}
        onEndEditing={() => checkItemExists(itemGroupId)}
      />
      {/* <TextInput
        style={[styles.input]}
        placeholder="Item Category"
        onChangeText={newText => setItemCategory(newText)}
        value={itemCategory}
      /> */}
      {/* 
      <TextInput
        style={[styles.input]}
        placeholder="Item Group"
        onChangeText={newText => setItemGroup(newText)}
        value={itemGroup}
      /> */}

      <TextInput
        style={[styles.input]}
        placeholder="Item Name"
        onChangeText={newText => setItemName(newText)}
        value={itemName}
      />
      <TextInput
        style={[styles.input]}
        placeholder="Item Count"
        onChangeText={newText => setCount(newText)}
        value={count}
      />
      <AddImage setURL={setItemURL} />
      <TextInput
        style={[styles.input]}
        placeholder="Item Price"
        onChangeText={newText => setItemPrice(newText)}
        value={itemPrice}
      />
      {/* <View style={styles.dateInputWrapper}>
        <TextInput
          style={{flex: 1, backgroundColor: '#fff'}}
          placeholder="Pick Incoming Date format(yyyy-mm-dd)"
          onChangeText={newText => setIncomingDate(newText)}
          value={route.params?.datePicked}
        />
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() => navigation.navigate('Calendar', {screen: 'AddItem'})}>
          <Feather name="calendar" size={25} color={customColor.primaryColor} />
        </TouchableOpacity>
      </View> */}
      {/* <View style={styles.dateInputWrapper}>
        <TextInput
          style={{flex: 1, backgroundColor: '#fff'}}
          placeholder="Pick OutGoing Date  format(yyyy-mm-dd)"
          // onChangeText={newText => setOutGoingDate(newText)}
          value={route.params?.outGoingDate}
        />
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() =>
            navigation.navigate('Calendar', {name: 'fromOutGoing'})
          }>
          <Feather name="calendar" size={25} color={customColor.primaryColor} />
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.button} onPress={() => handleonPress()}>
        <Text style={styles.buttontext}>Add Item</Text>
      </TouchableOpacity>
    </ScrollView>
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
  imageContainer: {
    alignSelf: 'center',
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  dropDownWrapper: {
    padding: 10,
  },
  input: {
    margin: 8,
    padding: 8,

    backgroundColor: '#fff',
    borderColor: customColor.primaryColor,
    borderWidth: 2,
    borderRadius: 4,
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
    width: 304,
    height: 35,

    backgroundColor: customColor.primaryColor,

    borderRadius: 4,
  },
  buttontext: {
    paddingVertical: 5,
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,

    color: '#F2F2F2',
  },

  logoStyle: {
    width: 65,
    height: 88,
    margin: 20,
    alignSelf: 'center',
  },
  dateInputWrapper: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: customColor.primaryColor,
    margin: 8,
  },
  iconStyle: {
    alignSelf: 'center',
    paddingRight: 5,
    // backgroundColor: '#fff',
  },
});
export default AddItem;
