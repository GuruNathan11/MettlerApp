import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const VitalBtnHorizontal = ({icon, size, title, value}) => {
  return (
    <View style={styles.container}>
      <View style={{marginLeft: 10}}>
        <MCIcon name={icon} size={size} color="#6A6AAA" />
      </View>
      <View>
        <Text>{title}</Text>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

export default VitalBtnHorizontal;
