import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../src/screens/profile/Profile';

const Drawer = createDrawerNavigator();

export default function ProfileDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}
