import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = ({navigation}) => {
  return (
    <>
      {Platform.OS === 'ios' && <View style={styles.statusBar} />}
      <StatusBar barStyle="light-content" backgroundColor="#0f3995" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.menuBtn}
          activeOpacity={0.7}
          onPress={() => navigation.openDrawer()}>
          {/* <Text style={styles.menuBtnText}>☰</Text> */}
          <MCIcon name="menu" size={27} color="#fff" />
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/logoHeader.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.profileBtn}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={require('../../assets/images/avatar.png')}
            resizeMode="contain"
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Header;
