import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import ForgotPasswordScreen from '../src/screens/authentication/ForgotPassword';
import LogIn from '../src/screens/authentication/Login';
import Register from '../src/screens/authentication/Register';
import Welcome from '../src/screens/welcome/Welcome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminTabNavigator from './TabNavigator';

import AddItem from '../src/screens/admin/AddItem';
import CollectionScreen from '../src/screens/admin/CollectionScreen';
import DatePicker from '../src/components/DatePicker';
import CheckOut from '../src/screens/admin/Checkout';
import customColor from '../src/assets/colors/customColor';

import Support from '../src/screens/profile/Support';
import Drawer from './DrawerNavigator';
import CustomDrawerNavigator from './DrawerNavigator';
import AddItemCategoryGroup from '../src/screens/admin/AddCategoryGroup';

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
        headerStyle: {
          backgroundColor: customColor.primaryColor,
        },
        headerTintColor: customColor.white,
        headerTitleStyle: {
          color: customColor.white,
        },

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

      <Stack.Screen name="Drawer" component={CustomDrawerNavigator} />
      <Stack.Screen name="Support" component={Support} />
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
      <Stack.Screen
        name="AddGroup"
        component={AddItemCategoryGroup}
        options={{presentation: 'transparentModal', cardOverlayEnabled: true}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {},
  headerBar: {},
  headerTitle: {},
});

export default ParentNavigator;
