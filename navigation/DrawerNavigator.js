import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../src/screens/profile/Profile';
import AdminTabNavigator from './TabNavigator';
import customColor from '../src/assets/colors/customColor';
import CustomDrawerContent from '../src/components/CustomDrawerContent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import {HomeStackNavigator} from './Parentnavigator';

import EditScreen from '../src/screens/profile/EditScreen';


const Drawer = createDrawerNavigator();

export default function CustomDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: customColor.primaryColor,
        },
        headerTintColor: customColor.white,
        headerTitleStyle: {
          color: customColor.white,
        },
        drawerStyle: {
          backgroundColor: 'azure',
          width: 240,
        },
      }}>
      <Drawer.Screen
        name="DrawerHome"
        component={AdminTabNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <MaterialIcons
              name="home"
              color={focused ? customColor.primaryColor : customColor.black}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({focused, size}) => (
            <Feather
              name="user"
              color={focused ? customColor.primaryColor : customColor.black}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
