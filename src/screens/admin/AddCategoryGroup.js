import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableHighlight,
  Animated,
  Pressable,
  ToastAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import customColor from '../../assets/colors/customColor';
import {useTheme} from '@react-navigation/native';
import {useCardAnimation} from '@react-navigation/stack';
import database from '@react-native-firebase/database';

const AddItemCategoryGroup = ({navigation}) => {
  const [itemCategory, setItemCategory] = useState('');
  const [itemGroup, setItemGroup] = useState('');
  const {colors} = useTheme();
  const {current} = useCardAnimation();

  const handleAdd = () => {
    //check if category exist
    if (itemCategory && itemGroup) {
      database()
        .ref('/group')
        .once('value')
        .then(snapshot => {
          if (snapshot) {
            const childExists = snapshot.child(`${itemCategory}`).exists();
            if (childExists) {
              //true go to that node and update with new group

              database()
                .ref('/group')
                .child(`${itemCategory}`)
                .push({label: `${itemGroup}`, value: `${itemGroup}`});
              navigation.goBack();
            } else {
              //false add new category and group
              //adding to category
              database()
                .ref('/catogory')
                .push({label: `${itemCategory}`, value: `${itemCategory}`});
              // addding to group
              database()
                .ref('/group')
                .child(`${itemCategory}`)
                .push({label: `${itemGroup}`, value: `${itemGroup}`});

              navigation.goBack();
            }
          }
        });
    } else {
      ToastAndroid.show('Please Enter all field', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
        ]}
        onPress={navigation.goBack}
      />
      <Animated.View
        style={{
          padding: 16,
          width: '90%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: colors.card,
          transform: [
            {
              scale: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <Text style={styles.heading}>Add Item Category n Group</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={text => setItemCategory(text)}
            value={itemCategory}
            placeholder="Item Category"></TextInput>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={text => setItemGroup(text)}
            value={itemGroup}
            placeholder="Item Group"></TextInput>
        </View>

        <TouchableHighlight style={styles.button} onPress={() => handleAdd()}>
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    paddingVertical: 15,
  },
  content: {
    fontSize: 15,
    fontFamily: 'Montserrat-Medium',
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: customColor.primaryColor,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: customColor.white,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: customColor.blue,
    margin: 8,
  },
  input: {
    flex: 1,
    fontSize: 18,
    padding: 5,
  },
  iconStyle: {
    fontSize: 25,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  button: {
    margin: 10,
    backgroundColor: 'steelblue',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Montserrat-ExtraLight',
    fontWeight: '800',
    color: 'white',
  },
});

export default AddItemCategoryGroup;
