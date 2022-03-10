import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import customColor from '../src/assets/colors/customColor';
import AdminHome from '../src/screens/admin/Home';
import IncomingInventory from '../src/screens/admin/IncomingInventory';
import Sold from '../src/screens/admin/Sold';

const Tab = createBottomTabNavigator();
const AdminTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={AdminHome}
        options={{
          headerShown: false,
          tabBarIcon: tabInfo => (
            <MaterialIcons
              name="home"
              color={
                tabInfo.focused ? customColor.primaryColor : customColor.black
              }
              size={tabInfo.size}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Incoming"
        component={IncomingInventory}
        options={{
          tabBarIcon: tabInfo => (
            <MaterialIcons
              name="inventory"
              color={
                tabInfo.focused ? customColor.primaryColor : customColor.black
              }
              size={tabInfo.size}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Sold"
        component={Sold}
        options={{
          tabBarIcon: tabInfo => (
            <MaterialIcons
              name="shopping-cart"
              color={
                tabInfo.focused ? customColor.primaryColor : customColor.black
              }
              size={tabInfo.size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const tabBarOptions = {
  showLabel: false,
  headerShown: false,
  activeTintColor: '#9381ff',
  style: {
    height: '10%',
  },
};
export default AdminTabNavigator;
