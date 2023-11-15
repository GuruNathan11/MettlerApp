import {View, Text} from 'react-native';
import React from 'react';
import {PatientDataTabs, PatientHeader, ShiftTabs} from '../../../components';
import PatientDataComponent from './PatientDataComponent';
import OrdersComponent from './OrdersComponent';

const PatientData = ({navigation, route}) => {
  const {patient} = route.params;
  return (
    <View style={{flex: 1}}>
      <PatientHeader
        onBack={() => navigation.goBack()}
        patientName={patient.username}
        patientAge="24 Yrs"
      />
      <Text
        style={{
          backgroundColor: '#fff',
          padding: 10,
          fontSize: 20,
          color: '#000',
          //   marginLeft: 20,
        }}>
        &nbsp;&nbsp;&nbsp; Patient Data/Orders
      </Text>
      <PatientDataTabs
        FirstRoute={() => {
          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <PatientDataComponent navigation={navigation} patient={patient} />
            </View>
          );
        }}
        SecondRoute={() => {
          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <OrdersComponent navigation={navigation} patient={patient} />
            </View>
          );
        }}
        ThirdRoute={() => {
          return (
            <View>
              <Text>Hello</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PatientData;
