import React, {useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PatientHeader} from '../../../components';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getProcedurePatient} from '../../../redux/apiCalls'; // Assuming this is the correct import path

// const Procedure = ({ route }) => {
// const navigation = useNavigation();
// const dispatch = useDispatch();
// const {patient} = route.params;
// const pid = patient.id;
// const ProcedureData = useSelector(state => state.user.ProcedureData);

// useEffect(() => {
//   getProcedurePatient(dispatch, pid);
//   console.log(patient?.id);
// }, [dispatch, patient]);
const Procedure = ({route}) => {
  const {patient} = route.params;
  const pid = patient?.id;
  const dispatch = useDispatch();
  const ProcedureData = useSelector(state => state.user.ProcedureData);
  const navigation = useNavigation(); // Use useNavigation hook
  const isFocused = useIsFocused(); // Use useIsFocused hook to check screen focus

  useEffect(() => {
    getProcedurePatient(dispatch, pid);
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
        }}>
        <View>
          <Text style={{fontSize: 20, color: '#000'}}>
            &nbsp;&nbsp;&nbsp; Procedure
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 20, marginHorizontal: '5%'}}>
          <MCIcon name="magnify" size={30} color="#020202" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('AddProcedure', {patient});
            }}>
            <MCIcon name="plus" size={30} color="#020202" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={ProcedureData}
          keyExtractor={item => item.id.toString()} // Assuming 'id' is a unique identifier for each procedure
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pBtn}
              onPress={() => {
                navigation.navigate('ProcedureDetails', {item});
              }}>
              <View style={styles.patientView}>
                <Text style={styles.patientName}>{item.procedure}</Text>
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

export default Procedure;
