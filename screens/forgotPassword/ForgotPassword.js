import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Button, Loader} from '../../components';
import {ForgotPassword1} from '../../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {errorMsg, pending} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleForgotpassword = async () => {
    ForgotPassword1(email, dispatch, navigation);
    await AsyncStorage.setItem('email', email);
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
          Forgot Your Password
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
        <Button
          onPress={handleForgotpassword}
          label="Send OTP"
          disabled={email.length < 11}
          active={email.length > 10}
        />
        <TouchableOpacity
          style={styles.link}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>&lt;-- Back to Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
