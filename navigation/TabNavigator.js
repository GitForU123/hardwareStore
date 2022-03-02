import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import customColor from '../src/assets/colors/customColor';
import AdminHome from '../src/screens/admin/Home';
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
      <Tab.Screen
        name="Sold"
        component={Sold}
        options={{
          tabBarIcon: tabInfo => (
            <MaterialIcons
              name="list"
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
