import React from 'react';
import type {Node} from 'react';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './src/screen/RootStackScreen';

// Screen

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;
