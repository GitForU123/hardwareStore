import {createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import React from 'react';
import AdminHome from '../src/screens/admin/Home';
import ForgotPasswordScreen from '../src/screens/authentication/ForgotPassword';
import LogIn from '../src/screens/authentication/Login';
import Register from '../src/screens/authentication/Register';
import Welcome from '../src/screens/welcome/Welcome';

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
  return (
    <Stack.Navigator
      initialRouteName="Register"
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
      <Stack.Screen name="AdminHome" component={AdminHome} />
      <Stack.Screen
        name="ForgotPassWordScreen"
        component={ForgotPasswordScreen}
        options={{presentation: 'transparentModal', cardOverlayEnabled: true}}
      />
    </Stack.Navigator>
  );
};

export default ParentNavigator;
