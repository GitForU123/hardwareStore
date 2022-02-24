import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ParentNavigator from './navigation/Parentnavigator';
import {Provider} from 'react-redux';
import Store from './src/redux/store/Store';

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <ParentNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
