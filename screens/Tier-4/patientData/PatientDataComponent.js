import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
const PatientDataComponent = ({navigation, patient}) => {
  const menuData = [
    {
      name: 'Allergy',
      color: '#E07F82',
      bg: '#FDF6F8',
      mIcon: require('../../../assets/images/allergy.png'),
      destination: 'Allergy',
    },
    {
      name: 'Patient Problem',
      color: '#3972ED',
      bg: '#E9F1FD',
      mIcon: require('../../../assets/images/problem.png'),
      destination: 'PatientProblem',
    },
    {
      name: 'Patient Vitals',
      color: '#E9A960',
      bg: '#FCF6F0',
      mIcon: require('../../../assets/images/vitals.png'),
      destination: 'PatientVitals',
    },
    {
      name: 'Immunization',
      color: '#6BB4A6',
      bg: '#EBF9EB',
      mIcon: require('../../../assets/images/immunization.png'),
      destination: 'Immunization',
    },
  ];
  return (
    <View style={{backgroundColor: '#fff', width: '90%', height: '90%'}}>
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
                  {/* <Text style={styles.arrow}>＞</Text> */}
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

export default PatientDataComponent;
