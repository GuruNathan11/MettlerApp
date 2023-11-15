import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

const PatientStaff = () => {
  const [patient, setPatient] = useState(null);
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <Text>PatientStaff</Text>
      <View>
        <Dropdown
          data={[
            {label: 'MEMBER-1', value: 1},
            {label: 'MEMBER-2', value: 2},
            {label: 'MEMBER-3', value: 3},
          ]}
          labelField="label"
          valueField="value"
          placeholder="Select Patient"
          value={patient}
          onChange={item => {
            setPatient(item.value);
          }}
        />
      </View>
      <View>
        <Text>Staffs By Their Roles</Text>
      </View>
    </View>
  );
};

export default PatientStaff;
