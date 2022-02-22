import React from 'react';
import {View, Text, Button} from 'react-native';

const Welcome = ({navigation}) => {
  return (
    <View>
      <Text>Welcome Screen</Text>
      <Button
        title="go to register page"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default Welcome;
