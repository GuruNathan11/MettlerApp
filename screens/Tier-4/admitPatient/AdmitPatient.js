// import { View, Text } from 'react-native'
// import React from 'react'

// const AdmitPatient = () => {
//   return (
//     <View>
//       <Text>AdmitPatient</Text>
//     </View>
//   )
// }

// export default AdmitPatient

import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import { PatientHeader } from '../../../components';

const AdmitPatient = ({navigation, route}) => {
  const {patient} = route.params;
  const menuData = [
    {
      name: 'Patient ADT',
        // color: 'green',
      //   bg: '#FDF6F8',
      mIcon: require('../../../assets/images/procedure.png'),
      destination: '',
    },
    {
      name: 'Admit',
      //   color: '#3972ED',
      //   bg: '#E9F1FD',
      mIcon: require('../../../assets/images/plus.png'),
      destination: 'AddAdmit',
    },
    {
      name: 'Bed Assignment',
        // color: '#3972ED',
      //   bg: '#FCF6F0',
      mIcon: require('../../../assets/images/plus.png'),
      destination: '',
    },
    {
      name: 'Transfer',
      //   color: '#6BB4A6',
      //   bg: '#EBF9EB',
      mIcon: require('../../../assets/images/plus2.png'),
      destination: '',
    },
    {
      name: 'Discharge',
      //   color: '#6BB4A6',
      //   bg: '#EBF9EB',
      mIcon: require('../../../assets/images/plus2.png'),
      destination: '',
    },
  ];
  return (
    <View style={{backgroundColor: '#fff', width: '100%', height: '100%'}}>
      <PatientHeader
        onBack={() => {
          navigation.goBack();
        }}
        patientName={patient?.username}
        patientAge="24 Yrs"
      />
      <View style={styles.flatList}>
        <FlatList
          data={menuData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pBtn}
              onPress={() => navigation.navigate(item.destination, {patient})}>
              <View style={styles.patientView}>

                <Image source={item.mIcon} style={{width: 60, height: 60}} />
                <View style={styles.nameView}>
                  <Text style={styles.patientName}>{item.name}</Text>
                </View>
                <View style={styles.arrowView}>
                  <MIcon name="arrow-forward-ios" size={25} color="#8d8d8d" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default AdmitPatient;
