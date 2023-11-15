import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Button, Loader, OtpBox} from '../../components';
import {VerifyOtp} from '../../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
const OtpInput = ({navigation}) => {
  const {errorMsg, pending} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleVerifyOtp = () => {
    VerifyOtp(enteredOtp, dispatch, navigation);
  };
  useEffect(() => {
    {
      errorMsg &&
        Toast.show(errorMsg, Toast.LONG, {backgroundColor: '#0f3995'});
    }
  }, [errorMsg]);
  const [enteredOtp, setEnteredOtp] = useState('');

  const handleOtpChange = otp => {
    setEnteredOtp(otp);
  };
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
          source={require('../../assets/images/otpEnter.png')}
          resizeMode="contain"
          style={{width: '40%'}}
        />
        <Text style={{fontSize: 25, fontWeight: '600'}}>
          Please Enter Your OTP
        </Text>
        <Text style={{marginTop: '3%', fontWeight: '300', fontSize: 15}}>
          to Reset Password.
        </Text>
        <OtpBox length={6} onOtpChange={handleOtpChange} />
        <Button onPress={handleVerifyOtp} label="Submit" active />
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

export default OtpInput;
