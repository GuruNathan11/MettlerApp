import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import {heightPercentageToDP} from 'react-native-responsive-screen';
const CheckBox = ({label, onPress, checked, circled}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}>
      <View
        style={[
          styles.box,
          checked && !circled && {backgroundColor: '#0f3995'},
          circled && {borderRadius: heightPercentageToDP(5)},
        ]}>
        {circled ? (
          <OIcon
            name="dot-fill"
            size={20}
            color={checked ? '#0f3995' : '#FFF'}
          />
        ) : (
          <MCIcon name="check-bold" size={20} color="#FFF" />
        )}
      </View>
      <Text style={styles.txt}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
