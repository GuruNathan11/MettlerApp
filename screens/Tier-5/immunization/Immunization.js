import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PatientHeader} from '../../../components';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import {getAllergyByPatient, getImmunization} from '../../../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Immunization = ({route}) => {
  const {patient} = route.params;
  const pid = patient.id;
  const dispatch = useDispatch();
  const immunizationData = useSelector(state => state.user.immunizationData);

  const navigation = useNavigation(); // Use useNavigation hook
  const isFocused = useIsFocused(); // Use useIsFocused hook to check screen focus

  useEffect(() => {
    if (isFocused) {
      getImmunization(dispatch, pid);
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <PatientHeader
        onBack={() => navigation.goBack()}
        patientName={patient.username}
        patientAge="24 Yrs"
      />
      <View
        style={{
          backgroundColor: '#f8fafb',
          padding: 15,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          //   marginLeft: 20,
        }}>
        <View>
          <Text style={{fontSize: 20, color: '#000'}}>
            &nbsp;&nbsp;&nbsp; Immunization
          </Text>
        </View>

        <View style={{flexDirection: 'row', gap: 20, marginHorizontal: '5%'}}>
          <MCIcon name="magnify" size={30} color="#020202" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate('AddImmunization', {patient});
            }}>
            <MCIcon name="plus" size={30} color="#020202" />
          </TouchableOpacity>
        </View>
      </View>
      {immunizationData ? (
        <View style={styles.flatList}>
          <FlatList
            data={immunizationData}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.pBtn}
                onPress={() => {
                  // setAId(item.id);
                  navigation.navigate('ImmunizationDetails', {item});
                }}>
                <View style={styles.patientView}>
                  <View style={styles.nameView}>
                    <Text style={styles.patientName}>{item.immunization}</Text>
                    <Text style={styles.patientUname}>{item.doneDate}</Text>
                  </View>
                  <View
                    style={[
                      styles.orgView,
                      item.dueDate
                        ? {borderColor: 'red'}
                        : {borderColor: 'green'},
                    ]}>
                    <Text
                      style={[
                        styles.orgName,
                        item.dueDate? {color: 'red'} : {color: 'green'},
                      ]}>
                      {item.dueDate ? 'Due Now' : 'Due Now'}
                    </Text>
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
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: '2%',
          }}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            We don't have any Immunization data for this patient
          </Text>
        </View>
      )}
    </View>
  );
};

export default Immunization;
