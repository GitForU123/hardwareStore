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
  ToastAndroid,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch} from 'react-redux';
import customColor from '../../assets/colors/customColor';
import AddImage from '../../components/AddImage';
import {
  addDataToFireStore,
  addToSoldInventory,
  updateCurrentInventory,
} from '../../redux/actions/DBAction';
import Feather from 'react-native-vector-icons/Feather';
import {firebase} from '@react-native-firebase/firestore';

const CheckOut = ({navigation, route}) => {
  const item = route.params?.item;

  const [itemGroupId, setItemGroupId] = useState(item.itemGroupId);
  const [itemName, setItemName] = useState(item.itemName);
  const [itemPrice, setItemPrice] = useState(item.itemPrice);

  const [count, setCount] = useState('');

  // const [outGoingDate, setOutGoingDate] = useState('');
  const dispatch = useDispatch();
  // const addData = data => dispatch(addDataToFireStore(data));
  // const addToOutGoingInventory = data => dispatch(addToSoldInventory(data));

  // setIncomingDate(route.params?.date);
  // const addDataTo = (collectionName, group, data, itemGroupId) =>
  //   dispatch(addInventoryData(collectionName, group, data, itemGroupId));

  // const updateCurrentInventory = (id, count) => {
  //   const ref = firebase.firestore().collection('IncomingInventory');

  //   ref
  //     .doc(id)
  //     .get()
  //     .then(snapshot => {
  //       const data = snapshot.data();
  //       console.log(data.count, count);
  //       if (Number(data.count) > Number(count)) {
  //         ref.doc(id).update({
  //           count: Number(data.count) - Number(count),
  //         });
  //         navigation.goBack();
  //       } else {
  //         ref
  //           .doc(id)
  //           .delete()
  //           .then(
  //             () => {
  //               console.log(`successfully deleted`);
  //               navigation.goBack();
  //             },
  //             () => {
  //               console.log(`some error happened in deleting item`);
  //             },
  //           );
  //       }
  //     });
  // };
  const handleonPress = () => {
    const data = {
      itemGroupId,
      itemName,
      count,
      itemPrice,
      itemURL: item.itemURL,
      // outGoingDate: route.params?.datePicked,
      // outGoingDate: route.params?.outGoingDate,
    };
    if (Number(item.count) >= Number(count)) {
      // addToOutGoingInventory(data, updateCurrentInventory(itemGroupId, count));
      dispatch(addToSoldInventory(data));
      dispatch(updateCurrentInventory(data.itemGroupId, count));
      navigation.goBack();
    } else {
      ToastAndroid.show(`only ${item.count} item availble`, ToastAndroid.LONG);
      console.log('not enough item in inventory');
    }
  };
  return (
    <View>
      <Text style={styles.heading}>CheckOut Item Here</Text>

      <TextInput
        style={[styles.input]}
        placeholder="ItemGroupId"
        onChangeText={newText => setItemGroupId(newText)}
        value={itemGroupId}
      />

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

      {/* <View style={styles.dateInputWrapper}>
        <TextInput
          style={{flex: 1, backgroundColor: '#fff'}}
          placeholder="Pick OutGoing Date  format(yyyy-mm-dd)"
          // onChangeText={newText => setOutGoingDate(newText)}
          value={route.params?.datePicked}
        />
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={() => navigation.navigate('Calendar', {screen: 'CheckOut'})}>
          <Feather name="calendar" size={25} color={customColor.primaryColor} />
        </TouchableOpacity>
      </View> */}
      <Text>
        Total Price : {`${itemPrice} x ${count}`} =
        {Number(itemPrice) * Number(count)}
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => handleonPress()}>
        <Text style={styles.buttontext}>CheckOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
    color: customColor.primaryColor,
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
export default CheckOut;
