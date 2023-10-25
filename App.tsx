/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './src/routes';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              translucent
              barStyle={'dark-content'}
              backgroundColor={'transparent'}
            />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
