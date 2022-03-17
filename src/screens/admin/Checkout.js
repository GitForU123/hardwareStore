import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch} from 'react-redux';
import customColor from '../../assets/colors/customColor';

import {
  addToSoldInventory,
  updateCurrentInventory,
} from '../../redux/actions/DBAction';
import Header from '../../components/Header';

const CheckOut = ({navigation, route}) => {
  const item = route.params?.item;

  const [itemGroupId, setItemGroupId] = useState(item.itemGroupId);
  const [itemName, setItemName] = useState(item.itemName);
  const [itemPrice, setItemPrice] = useState(item.itemPrice);

  const [count, setCount] = useState('');

  const dispatch = useDispatch();

  const handleonPress = () => {
    const data = {
      itemGroupId,
      itemName,
      count,
      itemPrice,
      itemURL: item.itemURL,
    };
    if (Number(item.count) >= Number(count)) {
      dispatch(addToSoldInventory(data));
      dispatch(updateCurrentInventory(data.itemGroupId, count));
      navigation.goBack();
    } else {
      ToastAndroid.show(`only ${item.count} item availble`, ToastAndroid.LONG);
    }
  };
  return (
    <View>
      <Header nav={navigation} title="CheckOut" />

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
  },
});
export default CheckOut;
