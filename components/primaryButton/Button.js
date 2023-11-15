import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';

const Button = ({onPress, label, active, cancel, half, disabled}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnView,
        active && {backgroundColor: '#0f3995'},
        cancel && {backgroundColor: '#C9D1E2'},
        half && {width: '30%'},
      ]}
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}>
      <Text style={[styles.btnText, cancel && {color: '#293241'}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
