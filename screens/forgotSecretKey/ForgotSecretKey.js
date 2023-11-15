import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Button, Loader} from '../../components';
import {ResetSecretKey1} from '../../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';

const ForgotSecretKey = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {errorMsg, pending} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleForgotSecretKey = () => {
    ResetSecretKey1(email, dispatch, navigation);
  };
  useEffect(() => {
    {
      errorMsg &&
        Toast.show(errorMsg, Toast.LONG, {backgroundColor: '#0f3995'});
    }
  }, [errorMsg]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Loader
        visible={pending}
        textContent="Loading"
        color="#0f3995"
        textStyle={{color: '#0f3995'}}
      />
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/logoHeaderDark.png')}
          resizeMode="contain"
          style={{width: '70%'}}
        />
        <Image
          source={require('../../assets/images/forgot.png')}
          resizeMode="contain"
          style={{width: '40%'}}
        />
        <Text style={{fontSize: 25, fontWeight: '600'}}>
          Forgot Your SecretKey
        </Text>
        <Text style={{marginTop: '3%', fontWeight: '300', fontSize: 15}}>
          We’ll help you reset it and get back on track.
        </Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter Registered E-mail address"
            style={styles.input}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <Button onPress={handleForgotSecretKey} label="Send SecretKey" active />
      </View>
    </SafeAreaView>
  );
};

export default ForgotSecretKey;
