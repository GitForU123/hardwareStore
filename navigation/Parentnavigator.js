import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AdminHome from '../src/screens/admin/Home';
import ForgotPasswordScreen from '../src/screens/authentication/ForgotPassword';
import LogIn from '../src/screens/authentication/Login';
import Register from '../src/screens/authentication/Register';
import Welcome from '../src/screens/welcome/Welcome';

const Stack = createStackNavigator();
const ParentNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen
        name="ForgotPassWordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default ParentNavigator;
