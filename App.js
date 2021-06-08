import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations/Navigation';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import Test from './Components/Test';


export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
    //<Test/>
  );
}
