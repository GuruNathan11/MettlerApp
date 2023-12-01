
import { PatientHeader } from '../../../components';

import React from 'react';
import { View, Text } from 'react-native';
import ADTContainer from './ADTContainer'; // Adjust the path accordingly

const PatientADT = ({ navigation, route }) => {
  const { patient } = route.params;

  return (
    <View style={{ flex: 1 }}>
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
        }}>
        &nbsp;&nbsp;&nbsp; Patient ADT
      </Text>

      {/* Reuse the container with different props */}
      <ADTContainer
        date="July 24, 10:30 PM"
        label="Pre Admit"
        labelText="Dr. Linda Blair, OP"
        profileImageSource={require('../../../assets/images/avatar.png')}
      />
       <ADTContainer
        date="July 24, 10:30 PM"
        label="Admit"
        labelText="Dr. Linda Blair, OP"
        profileImageSource={require('../../../assets/images/avatar.png')}
        borderColor="#3972ED" // Blue color
      />
       <ADTContainer
        date="July 24, 10:30 PM"
        label="Transfer"
        labelText="Dr. Linda Blair, OP"
        profileImageSource={require('../../../assets/images/avatar.png')}
      />
       <ADTContainer
        date="July 24, 10:30 PM"
        label="Discharge"
        labelText="Dr. Linda Blair, OP"
        profileImageSource={require('../../../assets/images/avatar.png')}
      />
      {/* Repeat this block with different props as needed */}
      {/* <PatientADTContainer ... /> */}
      {/* <PatientADTContainer ... /> */}
      {/* <PatientADTContainer ... /> */}
    </View>
  );
};

export default PatientADT;
