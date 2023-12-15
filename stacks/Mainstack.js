import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import {
  AddAdmit,
  AdminConfiguration,
  AllActiveQ15,
  Available,
  OrganizationDetails,
  PatientManagement,
  PatientStaffAssign,
  Profile,
  Q15StaffConfiguration,
  
} from '../screens';
// import StaffDetails from '../screens/staffDetails/StaffDetails';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import PatientsStacks from './patientsStacks/PatientsStacks';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logout} from '../redux/apiCalls';
import {Button, Header, CustomDrawer} from '../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Mainstack = () => {
  const navigation = useNavigation();
  const [role, setRole] = useState('');
  const errorMsg = useSelector(state => state.user.error);
  useEffect(() => {
    {
      errorMsg &&
        Toast.show(errorMsg, Toast.LONG, {backgroundColor: '#0f3995'});
    }
  }, [errorMsg]);
  const username = useSelector(state => state.user.userInfo.username);
  const jwt = useSelector(state => state.user.userInfo.jwt);
  const dispatch = useDispatch();
  const checkSessionExpiration = async () => {
    const expirationTime = await AsyncStorage.getItem('expireTime');

    if (expirationTime) {
      const currentTime = new Date();
      const expirationDate = new Date(expirationTime);

      if (currentTime > expirationDate) {
        Alert.alert('Mettler Health Care', 'oopss...Session Expired');
        Logout({username, jwt}, dispatch, navigation);
      }
    }
  };
  // useEffect(() => {
  //   const interval = setInterval(checkSessionExpiration, 300000); // Check every 15 mins

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);
  const handleSignout = async () => {
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
  const getRoleAndResetCount = async () => {
    try {
      const role = await AsyncStorage.getItem('role');
      const count = await AsyncStorage.getItem('resetCount');
      setRole(role);
      console.log(role, count);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRoleAndResetCount();
    console.log('Admin Test')
    console.log(role)
  }, []);
  return (
    <>
      {/* {role === 'Staff' ? ( */}
        <Drawer.Navigator
          drawerContent={props => <CustomDrawer {...props} />}
          screenOptions={{
            drawerActiveBackgroundColor: '#2e6aea',
            drawerActiveTintColor: '#fff',
            header: ({navigation}) => <Header navigation={navigation} />,
            drawerLabelStyle: {marginLeft: -15},
          }}>
          <Drawer.Screen
            name="Q-15 Safety Check Routine"
            component={AllActiveQ15}
            options={{
              drawerIcon: ({focused, size, color}) => (
                <MCIcon
                  name="view-dashboard-outline"
                  size={size}
                  color={focused ? '#fff' : '#000'}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              drawerLabel: () => null,
              drawerActiveBackgroundColor: '#fff',
              drawerItemStyle: {opacity: 0, height: 0, margin: 0},
            }}
          />
        </Drawer.Navigator>
    </>
  );
};

export default Mainstack;
