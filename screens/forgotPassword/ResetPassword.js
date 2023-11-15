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
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {ResetPassword1} from '../../redux/apiCalls';

const ResetPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const {errorMsg, pending} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleResetPassword = () => {
    ResetPassword1(password, cPassword, dispatch, navigation);
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
        <Text style={{fontSize: 25, fontWeight: '600'}}>Set New Password</Text>
        <Text
          style={{
            marginTop: '3%',
            fontWeight: '300',
            fontSize: 15,
            textAlign: 'center',
          }}>
          Your new password must be different to previously used passwords.
        </Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="New Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Confirm New Password"
            value={cPassword}
            onChangeText={text => setCPassword(text)}
            style={styles.input}
          />
        </View>
        <Button onPress={handleResetPassword} label="Reset Password" active />
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

export default ResetPassword;
