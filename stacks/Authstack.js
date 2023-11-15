import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ForgotPassword,
  ForgotSecretKey,
  Login,
  OtpInput,
  OtpSuccess,
  ResetPassword,
  ResetSecretKeySuccess,
  ResetSuccess,
  SecretKey,
} from '../screens';

const Stack = createNativeStackNavigator();

const Authstack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SecretKey" component={SecretKey} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpSuccess" component={OtpSuccess} />
      <Stack.Screen name="OtpInput" component={OtpInput} />
      <Stack.Screen name="ForgotSecretKey" component={ForgotSecretKey} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ResetSuccess" component={ResetSuccess} />
      <Stack.Screen
        name="ResetSecretKeySuccess"
        component={ResetSecretKeySuccess}
      />
    </Stack.Navigator>
  );
};

export default Authstack;
