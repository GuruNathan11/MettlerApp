import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const BedAssignStacks = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen />
      <Stack.Screen />
      <Stack.Screen />
    </Stack.Navigator>
  );
};

export default BedAssignStacks;
