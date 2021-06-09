import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigations/Navigation';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import Test from './Components/Test';
import {persistStore} from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';

export default function App() {
  let persistor = persistStore(Store);
  return (
    <Provider store={Store}>
      <PersistGate persistor = {persistor}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      </PersistGate>
    </Provider>
    //<Test/>
  );
}
