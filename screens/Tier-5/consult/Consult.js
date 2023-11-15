import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { PatientHeader } from '../../../components';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

const Consult = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation();

 
  const boneMarrowBiopsyData = [
    '2-Way Mental Health',
    '2-Way Mental Health',
    '2-Way Mental Health',
    '2-Way Mental Health',
    '2-Way Mental Health',
    '2-Way Mental Health',
  ];

  return (
    <View style={styles.container}>
      <PatientHeader
        onBack={() => navigation.goBack()}
        patientName={item?.username}
        patientAge="24 Yrs"
      />
      <View
        style={{
          backgroundColor: '#f8fafb',
          padding: 15,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <View>
          <Text style={{ fontSize: 20, color: '#000' }}>
            &nbsp;&nbsp;&nbsp; Consult
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 20, marginHorizontal: '5%' }}>
          <MCIcon name="magnify" size={30} color="#020202" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // navigation.navigate('ProcedureDetails', {item});
                  navigation.navigate('AddConsult', { item });
            }}
          >
            <MCIcon name="plus" size={30} color="#020202" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={boneMarrowBiopsyData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pBtn}
              onPress={() => {
                navigation.navigate('ConsultDetails', { item});
              }}
            >
              <View style={styles.patientView}>
                <Text style={styles.patientName}>{item}</Text>
                <View style={styles.arrowView}>
                  <MIcon name="arrow-forward-ios" size={35} color="#8d8d8d" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Consult;
