import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const PatientHeader = ({onBack, patientName, patientAge}) => {
  return (
    <View style={styles.header}>
      <Pressable style={{flexDirection: 'row'}} onPress={onBack}>
        <MIcon name="arrow-back" size={30} color="#fff" />
        <View style={{backgroundColor: '#E5ECF6', padding: 5, borderRadius: 15}}>
          <MCIcon name="account" size={30} color="#8d8d8d" />
        </View>
      </Pressable>

      <View style={{marginLeft: '5%'}}>
        <Text style={styles.pName}>{patientName}</Text>
        <Text style={styles.pAge}>{patientAge}</Text>
      </View>
    </View>
  );
};

export default PatientHeader;
