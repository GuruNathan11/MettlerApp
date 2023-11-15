import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Button, Loader} from '../../components';
import {useSelector} from 'react-redux';

const OtpSuccess = ({navigation}) => {
  const {pending} = useSelector(state => state.user);

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
          source={require('../../assets/images/otpSent.png')}
          resizeMode="contain"
          style={{width: '40%'}}
        />
        <Text style={{fontSize: 25, fontWeight: '600'}}>Check Your E-mail</Text>
        <Text style={{marginTop: '3%', fontWeight: '300', fontSize: 15}}>
          We sent OTP to you a email to reset password.
        </Text>
        <Button
          onPress={() => navigation.navigate('OtpInput')}
          label="OTP"
          active
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

export default OtpSuccess;
