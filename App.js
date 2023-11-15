import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import myStore from './redux/myStore';
import Authstack from './stacks/Authstack';
import Mainstack from './stacks/Mainstack';
import {RetriveLogin} from './redux/apiCalls';
import {SecretKey} from './screens';
import {Alert, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  const mainStack = useSelector(state => state.user.mainStack);
  const retrive = useSelector(state => state.user.retrive);
  const dispatch = useDispatch();
  useEffect(() => {
    RetriveLogin(dispatch);
  }, []);
  // useEffect(()=>[
  //   // Alert.alert('loops')
  // ],[]) 
  useEffect(() => {
    if (Platform.OS === 'android') {
      const splashTimeout = setTimeout(() => {
        // Hide the splash screen
        SplashScreen.hide();
      }, 1500); // 1500 milliseconds (1.5 seconds)
      return () => clearTimeout(splashTimeout);
    }
  }, []);
  return (
    <NavigationContainer>
      {mainStack ? <Mainstack /> : retrive ? <SecretKey /> : <Authstack />}
    </NavigationContainer>
  );
};

export default App;

export const ReduxProvider = () => {
  return (
    <Provider store={myStore}>
      <App />
    </Provider>
  );
};
