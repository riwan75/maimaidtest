import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screen
import MainTab from './MainTab';
import Update from './Update';
import List from './List';

const Stack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="MainTab">
    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="Update" component={Update} />
    <Stack.Screen name="List" component={List} />
  </Stack.Navigator>
);
export default RootStackScreen;
