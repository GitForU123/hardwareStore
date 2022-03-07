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
import {useDispatch} from 'react-redux';
import customColor from '../../assets/colors/customColor';
import AddImage from '../../components/AddImage';
import {addDataToFireStore} from '../../redux/actions/DBAction';

const AddItem = ({navigation}) => {
  const [itemName, setItemName] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemURL, setItemURL] = useState('');

  const dispatch = useDispatch();
  const addData = data => dispatch(addDataToFireStore(data));
  // const addDataTo = (collectionName, group, data, itemId) =>
  //   dispatch(addInventoryData(collectionName, group, data, itemId));
  const handleonPress = () => {
    const data = {
      itemCategory,
      itemGroup,
      itemPrice,
      itemId,
      itemName,
      itemURL,
    };
    addData(data);
    navigation.goBack();
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
      <TextInput
        style={[styles.input]}
        placeholder="Item Category"
        onChangeText={newText => setItemCategory(newText)}
        value={itemCategory}
      />

      <TextInput
        style={[styles.input]}
        placeholder="Item Group"
        onChangeText={newText => setItemGroup(newText)}
        value={itemGroup}
      />
      <TextInput
        style={[styles.input]}
        placeholder="Item Id"
        onChangeText={newText => setItemId(newText)}
        value={itemId}
      />

      <TextInput
        style={[styles.input]}
        placeholder="Item Name"
        onChangeText={newText => setItemName(newText)}
        value={itemName}
      />
      <AddImage setURL={setItemURL} />
      <TextInput
        style={[styles.input]}
        placeholder="Item Price"
        onChangeText={newText => setItemPrice(newText)}
        value={itemPrice}
      />

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
});
export default AddItem;
