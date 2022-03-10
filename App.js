import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ParentNavigator from './navigation/Parentnavigator';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import Store from './src/redux/store/Store';
import {AuthProvider} from './src/hooks/useAuth';

const App = () => {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <NavigationContainer>
          <AuthProvider>
            <ParentNavigator />
          </AuthProvider>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
