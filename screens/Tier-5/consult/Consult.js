// import React from 'react';
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PatientHeader } from '../../../components';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {  getConsultByPatient } from '../../../redux/apiCalls';
const Consult = ({ route }) => {
  const {patient} = route.params;
  const pid = patient?.id;
  const dispatch = useDispatch();
  const consultData = useSelector(state => state.user.consultData);
  const navigation = useNavigation(); 
  const isFocused = useIsFocused(); // Use useIsFocused hook to check screen focus
  useEffect(() => {
    getConsultByPatient(dispatch, pid);
  console.log(patient?.username);
}, [isFocused]);

  return (
    <View style={styles.container}>
      <PatientHeader
        onBack={() => navigation.goBack()}
        patientName={patient?.username}
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
                  navigation.navigate('AddConsult', { patient });
            }}
          >
            <MCIcon name="plus" size={30} color="#020202" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={consultData}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pBtn}
              onPress={() => {
                navigation.navigate('ConsultDetails', { item });
              }}
            >
              <View style={styles.patientView}>
                <Text style={styles.patientName}>{item.id}</Text>
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
