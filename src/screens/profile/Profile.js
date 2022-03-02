import React from 'react';
import {View, Text, Button} from 'react-native';
import handleSignOut from '../../hooks/useAuth';

export default function Profile({navigation}) {
  const handleOut = () => {
    // handleSignOut();
    navigation.reset({
      index: 0,
      routes: [{name: 'LogIn'}],
    });
  };
  return (
    <View style={{paddingTop: 40}}>
      <Text>Profile Screen</Text>
      <Button title="signout" onPress={() => handleOut()} />
    </View>
  );
}
