import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logout} from '../../redux/apiCalls';
import {styles} from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawer = props => {
  const username = useSelector(state => state.user.userInfo.username);
  const dispatch = useDispatch();
  const handleSignout = async () => {
    const jwt = await AsyncStorage.getItem('jwt');
    Logout({username, jwt}, dispatch, props.navigation);
  };
  const navigateToDashboard = () => {
    props.navigation.navigate('Patients'); // Navigate to the "Patients" screen
    props.navigation.closeDrawer(); // Close the drawer after navigation
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/images/logoHeaderDark.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => props.navigation.closeDrawer()}
            style={styles.closeBtn}
            activeOpacity={0.7}>
            {/* <Text style={styles.closeBtnText}>&lt;☰</Text> */}
            <MCIcon name="menu-open" size={28} />
          </TouchableOpacity>
        </View>
        <View style={styles.drawerItemList}>
        
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.drawerDown}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSignout}
          style={styles.signOutBtn}>
          <Text style={styles.signOutBtnText}>Signout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
