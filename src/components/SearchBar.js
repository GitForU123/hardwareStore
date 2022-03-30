import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';

export default function SearchBar({term, onChangeTerm}) {
  return (
    <View style={styles.backgroundStyle}>
      <EvilIconsIcon name="search" style={styles.iconStyle}></EvilIconsIcon>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        style={styles.inputStyle}
        value={term}
        onChangeText={newTerm => onChangeTerm(newTerm)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: 'lightgrey',
    height: 50,
    borderRadius: 5,
    flexDirection: 'row',
    margin: 10,
  },
  iconStyle: {
    fontSize: 35,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  inputStyle: {
    fontSize: 18,
    flex: 1,

    paddingVertical: 5,
  },
});
