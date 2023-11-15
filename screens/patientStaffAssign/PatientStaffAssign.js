import {View, Text} from 'react-native';
import React from 'react';
import {PSAssignTabs} from '../../components';
import PatientStaff from './PatientStaff';
import StaffPatient from './StaffPatient';

const PatientStaffAssign = () => {
  return (
    <View style={{flex: 1}}>
      <Text>PatientStaffAssign1</Text>
      <PSAssignTabs
        FirstRoute={() => <PatientStaff />}
        SecondRoute={() => <StaffPatient />}
      />
    </View>
  );
};

export default PatientStaffAssign;
