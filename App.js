import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ParentNavigator from './navigation/Parentnavigator';

const App = () => {
  return (
    <NavigationContainer>
      <ParentNavigator />
    </NavigationContainer>
  );
};

export default App;
