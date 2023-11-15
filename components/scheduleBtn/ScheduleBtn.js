import {View, Text} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const ScheduleBtn = ({icon, size, header, data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
          <MCIcon name={icon} color="#648BE3" size={40}/>
      </View>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{header}</Text>
        <Text style={styles.dataText}>{data}</Text>
      </View>
    </View>
  );
};

export default ScheduleBtn;
