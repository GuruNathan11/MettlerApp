import {View, Text, SafeAreaView, Image, StatusBar} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {Button, Loader} from '../../components';
import {useSelector} from 'react-redux';

const ResetSuccess = ({navigation}) => {
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
          source={require('../../assets/images/resetSuccess.png')}
          resizeMode="contain"
          style={{width: '40%'}}
        />
        <Text style={{fontSize: 25, fontWeight: '600'}}>Password Reset</Text>
        <Text
          style={{
            marginTop: '3%',
            fontWeight: '300',
            fontSize: 15,
            textAlign: 'center',
          }}>
          Your password has been successfully reset. Click below to log in
          magically.
        </Text>
        <Button
          onPress={() => navigation.navigate('Login')}
          label="Login"
          active
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetSuccess;
