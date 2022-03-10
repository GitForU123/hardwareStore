import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import React, {useState} from 'react';
import useAuth from '../src/hooks/useAuth';

import ForgotPasswordScreen from '../src/screens/authentication/ForgotPassword';
import LogIn from '../src/screens/authentication/Login';
import Register from '../src/screens/authentication/Register';
import Welcome from '../src/screens/welcome/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminTabNavigator from './TabNavigator';
import ProfileDrawer from './DrawerNavigator';
import AddItem from '../src/screens/admin/AddItem';
import CollectionScreen from '../src/screens/admin/CollectionScreen';
import DatePicker from '../src/components/DatePicker';
import CheckOut from '../src/screens/admin/Checkout';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const ParentNavigator = () => {
  // const {user} = useAuth();
  const [currentUser, setCurrentuser] = useState();

  AsyncStorage.getItem('isUserSignedIn').then(res => {
    setCurrentuser(res);
  });
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: config,
        },
      }}>
      <Stack.Screen name="Welcome" component={Welcome} />

      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{cardStyleInterpolator: forFade}}
      />
      <Stack.Screen
        name="ForgotPassWordScreen"
        component={ForgotPasswordScreen}
        options={{
          presentation: 'transparentModal',
          cardOverlayEnabled: true,
        }}
      />

      <Stack.Screen name="AdminHome" component={AdminTabNavigator} />
      <Stack.Screen name="ProfileDrawer" component={ProfileDrawer} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
      <Stack.Screen
        name="Calendar"
        component={DatePicker}
        options={{
          presentation: 'transparentModal',
          cardOverlayEnabled: true,
        }}
      />
      <Stack.Screen name="CheckOut" component={CheckOut} />
    </Stack.Navigator>
  );
};

export default ParentNavigator;
