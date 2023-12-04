import { PatientHeader } from '../../../components';
import { View, Text, TouchableOpacity } from 'react-native';
import ADTContainer from './ADTContainer'; 
import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect} from 'react';
import {getAdmit} from '../../../redux/apiCalls';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

const PatientADT = ({ navigation, route }) => {
  const { patient } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); 
  const pid = patient.id;
  const admitPatient = useSelector(state => state.user.admitPatient);
  useEffect(() => {
    if (isFocused) {
      // Check if the screen is in focus
      getAdmit(dispatch, pid);
    }
  }, [isFocused]);
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
      <FlatList
          data={admitPatient}
          keyExtractor={(item) => item.id.toString()} // Assuming 'id' is a unique identifier for each procedure
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
              
            <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.pBtn}
              onPress={() => {
                // console.log(patient)
              //  navigation.navigate('ImagingDetails', { item });
              }}
            >
              
              <ADTContainer
        //  date={item}
        bg={item.status==="Admitted"?"yellow":item.status==="Transfered"?"green":"#000"}
        label={item.status}
        labelText={patient.username}
        profileImageSource={require('../../../assets/images/avatar.png')}
      />
              {/* <View style={styles.patientView}> */}
                {/* <Text style={styles.patientName}>{item.status}</Text>
                <View style={styles.arrowView}>
                  <MIcon name="arrow-forward-ios" size={35} color="#8d8d8d" />
                </View>
              </View> */}
            </TouchableOpacity>
          )}
        />
      
       {/* <ADTContainer
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
       <ADTContainer
        date="July 24, 10:30 PM"
        label="Pre Admit"
        labelText="Dr. Linda Blair, OP"
        profileImageSource={require('../../../assets/images/avatar.png')}
      /> */}
      {/* Repeat this block with different props as needed */}
      {/* <PatientADTContainer ... /> */}
      {/* <PatientADTContainer ... /> */}
      {/* <PatientADTContainer ... /> */}
    </View>
  );
};

export default PatientADT;