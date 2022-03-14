import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ParentNavigator from './navigation/Parentnavigator';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Store from './src/redux/store/Store';
import {AuthProvider} from './src/hooks/useAuth';
import customColor from './src/assets/colors/customColor';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: customColor.primaryColor,
    accent: 'yellow',
  },
};

const App = () => {
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
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
