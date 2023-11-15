import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  useColorScheme,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {GetOrganization, Login2} from '../../redux/apiCalls';
import {styles} from './styles';
import {Button, CheckBox, Loader} from '../../components';
import {Dropdown} from 'react-native-element-dropdown';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const {pending} = useSelector(state => state.user);
  const errorMsg = useSelector(state => state.user.error);
  const OrgData = useSelector(state => state.user.organization);
  const dispatch = useDispatch();
  const [uname, setUname] = useState('');
  const [pwd, setPwd] = useState('');
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [show, setShow] = useState(true);
  const [remember, setRemember] = useState(false);
  const data = OrgData.map(item => ({
    label: item.name,
    value: item.id,
  }));

  const handleLogin = async () => {
    await AsyncStorage.setItem('org', value);
    Login2(
      {username: uname, password: pwd, organization: value},
      dispatch,
      navigation,
    );
    console.log(value);
  };
  useEffect(() => {
    {
      errorMsg &&
        Toast.show(errorMsg, Toast.LONG, {backgroundColor: '#0f3995'});
    }
  }, [errorMsg]);
  const darkMode = useColorScheme() === 'dark';
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.mainContainer,
        darkMode && {backgroundColor: '#000'},
      ]}>
      <Loader
        visible={pending}
        // textContent="Loading"
        color="#0f3995"
        textStyle={{color: '#0f3995'}}
      />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <KeyboardAvoidingView style={styles.topContainer}>
        <ImageBackground
          source={require('../../assets/images/background.png')}
          style={[
            styles.topContainer,
            {paddingTop: StatusBar.currentHeight}, // Add paddingTop to cover StatusBar
          ]}>
          <KeyboardAvoidingView>
            <View style={styles.header}>
              <Image
                source={require('../../assets/images/logoHeader.png')}
                resizeMode="contain"
                style={styles.headerImage}
              />
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </KeyboardAvoidingView>

      <View
        style={[styles.loginContainer, darkMode && {backgroundColor: '#000'}]}>
        <Text style={[styles.helloText, darkMode && {color: '#fff'}]}>
          Hello!
        </Text>
        <Text style={[styles.subText, darkMode && {color: '#fff'}]}>
          Login to your account
        </Text>
        <View style={[styles.inputView, darkMode && {borderColor: '#fff'}]}>
          {/* <Image
            source={require('../../assets/images/profile.png')}
            resizeMode="contain"
            style={[styles.inputIcon, darkMode && {tintColor: '#fff'}]}
          /> */}

          <MCIcon
            name="account-circle-outline"
            size={hp(4)}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Username"
            style={[styles.input, darkMode && {color: '#fff'}]}
            value={uname}
            onChangeText={text => setUname(text)}
          />
        </View>
        <View style={[styles.inputView, darkMode && {borderColor: '#fff'}]}>
          {/* <Image
            source={require('../../assets/images/key.png')}
            resizeMode="contain"
            style={[styles.inputIcon, darkMode && {tintColor: '#fff'}]}
          /> */}
          <MCIcon name="lock-outline" size={hp(4)} style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            secureTextEntry={show}
            style={[styles.input, darkMode && {color: '#fff'}]}
            value={pwd}
            onChangeText={text => setPwd(text)}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShow(!show)}
            activeOpacity={0.8}>
            {/* <Image
              source={require('../../assets/images/eye.png')}
              resizeMode="contain"
              style={[darkMode && {tintColor: '#fff'}]}
            /> */}
            <MCIcon
              name={show ? 'eye-outline' : 'eye-off-outline'}
              size={hp(4)}
            />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.inputView,
            darkMode && {borderColor: '#fff'},
            {padding: 7},
          ]}>
          <Dropdown
            style={[styles.input, {padding: 3}]}
            placeholderStyle={{
              marginLeft: wp(2),
              fontSize: hp(2.5),
              color: '#8d8d8d',
            }}
            selectedTextStyle={{marginLeft: '3%'}}
            iconStyle={{marginRight: '-10%'}}
            data={data}
            maxHeight={300}
            search
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select an Organization' : 'Select...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => {
              setIsFocus(true);
              GetOrganization(dispatch);
            }}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              console.log(item.value);
            }}
            renderLeftIcon={() => (
              <MCIcon
                name="office-building-outline"
                size={hp(4)}
                // style={styles.inputIcon}
              />
            )}
          />
        </View>
        <View style={styles.subLoginContainer}>
          {/* <Text style={darkMode && {color: '#fff'}}>Remember Me</Text> */}
          <CheckBox
            label="Remember Me"
            checked={remember}
            onPress={() => {
              setRemember(!remember);
            }}
          />
          <TouchableOpacity
            style={{marginVertical: '2%'}}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[{fontSize: hp(2)}, darkMode && {color: '#fff'}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnView}
          activeOpacity={0.7}
          onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
