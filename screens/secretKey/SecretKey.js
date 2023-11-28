import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast';
import {Logout, SecretKeyVerify} from '../../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {Loader, OtpBox} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SecretKey = ({navigation}) => {
  const [enteredOtp, setEnteredOtp] = useState('');
  const [length, setlength] = useState('');
  const {pending} = useSelector(state => state.user);
  const retrive = useSelector(state => state.user.retrive);
  const errorMsg = useSelector(state => state.user.error);
  const dispatch = useDispatch();
  const handleSecretKey = async () => {
    const jwt = await AsyncStorage.getItem('jwt');
    SecretKeyVerify({secretKey: enteredOtp, jwt}, dispatch);
  };
  const handleSignout = async () => {
    const jwt = await AsyncStorage.getItem('jwt');
    const username = await AsyncStorage.getItem('username');
    Alert.alert('MettlerHealthCare', 'Are You sure to Sign out ?', [
      {
        text: 'OK',
        style: 'destructive',
        onPress: () => {
          Logout({username, jwt}, dispatch, navigation);
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };
  useEffect(() => {
    {
      errorMsg &&
        Toast.show(errorMsg, Toast.LONG, {backgroundColor: '#0f3995'});
    }
  }, [errorMsg]);
  const handleOtpChange = otp => {
    setEnteredOtp(otp);
  };
  const handleForgetNavigate = () => {
    try {
      navigation.navigate('ForgotSecretKey');
    } catch (error) {
      Alert.alert('Mettler Health Care', 'Stay tuned we are working');
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1, marginTop: '5%'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <Loader
        visible={pending}
        //  textContent="Loading"
      />
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logoHeaderDark.png')}
          resizeMode="contain"
          style={styles.headerImage}
        />
      </View>
      <View style={styles.secretKeyContainer}>
        <Image
          source={require('../../assets/images/secretKey.png')}
          resizeMode="contain"
        />
        <Text style={styles.subText}>Enter Your Passcode</Text>

        <OtpBox length={6} onOtpChange={handleOtpChange} secureTextEntry={enteredOtp.length < 6}/>
        <TouchableOpacity
          style={styles.btnView}
          activeOpacity={1.5}
          onPress={handleSecretKey}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        {retrive ? (
          <TouchableOpacity style={styles.btnLink} onPress={handleSignout}>
            <Text style={styles.btnLinkText}>Logout </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btnLink}
            onPress={handleForgetNavigate}>
            <Text style={styles.btnLinkText}>Forgot Passcode?</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity style={styles.btnLink} onPress={handleForgetNavigate}>
          <Text style={styles.btnLinkText}>Forgot Passcode?</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default SecretKey;
