import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {useDispatch} from 'react-redux';
import customColor from '../../assets/colors/customColor';
import AddImage from '../../components/AddImage';

import {addDataToIncomingInventory} from '../../redux/actions/DBAction';
import {firebase} from '@react-native-firebase/firestore';
import DropDown from 'react-native-paper-dropdown';
import {useTheme, TextInput as PaperTextInput} from 'react-native-paper';
import Header from '../../components/Header';
import database from '@react-native-firebase/database';

const AddItem = ({navigation, route, theme}) => {
  const [itemName, setItemName] = useState('');
  const [itemGroupId, setItemGroupId] = useState('');
  const [itemCategory, setItemCategory] = useState('default');
  const [itemGroup, setItemGroup] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemURL, setItemURL] = useState('');
  const [count, setCount] = useState('');

  const [showDropDown, setShowDropDown] = useState(false);
  const [showGroupDropDown, setShowGroupDropDown] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);
  const [categoryToGroupArray, setCategoryToGroupArray] = useState({
    default: [],
  });

  const dispatch = useDispatch();
  const addToIncomingInventory = data =>
    dispatch(addDataToIncomingInventory(data));

  const handleonPress = () => {
    const data = {
      itemCategory,
      itemGroup,

      itemGroupId,
      itemName,
      count,
      itemPrice,
      itemURL,
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

  const groupRef = database().ref('group');
  const onGroupChange = snapshot => {
    const data = snapshot.val();
   

    setCategoryToGroupArray(data);
  };

  const categoryRef = database().ref('catogory');
  const onValueChange = snapshot => {
    const data = snapshot.val();

    const items = Object.values(data);

    setCategoryArray(items);
  };

  useEffect(() => {
    categoryRef.on('value', onValueChange);
    groupRef.on('value', onGroupChange);

    return () => {
      categoryRef.off('value', onValueChange);
      groupRef.off('value', onGroupChange);
    }; // clean up code after componentWillUnmount
  }, []);

  const paperTheme = useTheme();
 
  return (
    <ScrollView>
      <Header nav={navigation} title="Add Item" />

      <Image
        source={
          itemURL.length === 0
            ? require('../../assets/images/gallery.png')
            : {uri: 'data:image/jpeg;base64,' + itemURL}
        }
        style={styles.imageContainer}
      />
      <PaperTextInput
        mode="outlined"
        label="Group ID"
        onChangeText={newText => setItemGroupId(newText)}
        value={itemGroupId}
        theme={paperTheme}
        style={styles.paperInput}
        onEndEditing={() => checkItemExists(itemGroupId)}
      />

      <View style={styles.dropDownWrapper}>
        <DropDown
          label="Categories"
          mode="outlined"
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={itemCategory}
          setValue={setItemCategory}
          list={categoryArray}
        />
      </View>
      <View style={styles.dropDownWrapper}>
        <DropDown
          label="Group"
          mode="outlined"
          visible={showGroupDropDown}
          showDropDown={() => setShowGroupDropDown(true)}
          onDismiss={() => setShowGroupDropDown(false)}
          value={itemGroup}
          setValue={setItemGroup}
          list={categoryToGroupArray[`${itemCategory}`]}
          theme={paperTheme}
        />
      </View>

      <PaperTextInput
        mode="outlined"
        label="Name"
        value={itemName}
        onChangeText={text => setItemName(text)}
        theme={paperTheme}
        style={styles.paperInput}
      />

      <PaperTextInput
        mode="outlined"
        label="Count"
        onChangeText={newText => setCount(newText)}
        value={count}
        theme={paperTheme}
        style={styles.paperInput}
      />

      <AddImage setURL={setItemURL} />
      <PaperTextInput
        mode="outlined"
        label="Price"
        onChangeText={newText => setItemPrice(newText)}
        value={itemPrice}
        theme={paperTheme}
        style={styles.paperInput}
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
  dropDownWrapper: {
    padding: 10,
  },
  paperInput: {
    backgroundColor: customColor.white,
    borderColor: customColor.primaryColor,
    marginHorizontal: 10,
    marginBottom: 5,
    fontSize: 16,
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
    textAlign: 'center',
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
export default AddItem;
