/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import store from './store';
import { Provider as ReduxProvider } from 'react-redux';
import UserList from './UserList';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';



  return (
    <ReduxProvider store={store}>
       <SafeAreaView>
    <UserList/>
     </SafeAreaView>
    </ReduxProvider>
   
  );
};


export default App;
