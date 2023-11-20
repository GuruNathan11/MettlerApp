import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PatientHeader } from '../../../components';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getImagingProceture } from '../../../redux/apiCalls';

const ImagingProcedure = ({route}) => {
  const {patient} = route.params;
  const pid = patient?.id;
  const dispatch = useDispatch();
  const ImagingProcedureData = useSelector(state => state.user.ImagingProcedureData);
  const navigation = useNavigation(); // Use useNavigation hook

  useEffect(() => {
    getImagingProceture(dispatch, pid);
  console.log(patient?.username);
}, [dispatch, patient]);

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
            &nbsp;&nbsp;&nbsp; ImagingProcedure
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 20, marginHorizontal: '5%' }}>
          <MCIcon name="magnify" size={30} color="#020202" />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // navigation.navigate('ProcedureDetails', {item});
                 navigation.navigate('AddImagingProcedure', { item });
            }}
          >
            <MCIcon name="plus" size={30} color="#020202" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={ImagingProcedureData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pBtn}
              onPress={() => {
               navigation.navigate('ImagingDetails', { patient });
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

export default ImagingProcedure;
