import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, FlatList} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PatientHeader} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getPatientAllVisit} from '../../../redux/apiCalls';

const OverView = ({navigation, route}) => {
  const {patient} = route.params;
  const VisitData = useSelector(state => state.user.patientVisits);
  const dispatch = useDispatch();
  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() =>
        Alert.alert(
          'Mettler Health Care',
          `Admitted by ${item?.visit[0].admit[0].admittech[0].admittingPhysician[0]} on ${item?.visit[0].admit[0].admitDate}`,
        )
      }
      style={{
        flexDirection: 'row',
        // justifyContent: 'space-evenly',
        gap: 70,
        justifyContent:"center",
        borderBottomWidth: 0.5,
        borderBlockColor: '#ddd',
        paddingVertical: 15,
        paddingHorizontal: 10,
        
      }}>
      <Text style={{fontSize: 12, fontWeight: '500',color:"#000"}}>{item?.id}</Text>
      <Text style={{fontSize: 12, fontWeight: '500',color:"#000"}}>
        {item?.visit[0].admit[0].admitDate}
      </Text>
      <Text style={{fontSize: 12, fontWeight: '500',color:"#000"}}>
        {item?.visit[0].admit[0].patientRoom}
      </Text>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPatientAllVisit(dispatch, patient.id);
  }, []);
  return (
    <>
      <PatientHeader
        patientName={patient.username}
        patientAge="24 Yrs"
        onBack={() => navigation.goBack()}
      />
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <View
          style={{
            backgroundColor: '#f8fafb',
            padding: 15,
            paddingVertical: 20,
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            //   marginLeft: 20,
          }}>
          <View>
            <Text style={{fontSize: 20, color: '#000'}}>
              &nbsp;&nbsp;&nbsp; All Visit List
            </Text>
          </View>

          <View style={{flexDirection: 'row', gap: 20, marginHorizontal: '5%'}}>
            <MCIcon name="magnify" size={30} color="#020202" />
          </View>
        </View>
        {VisitData ? (
          <FlatList
            data={VisitData}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        ) : (
          <Text
            style={{
              fontSize: 20,
              color: 'red',
              fontWeight: '400',
              textAlign: 'center',
              marginVertical: 50,
            }}>
            No Visits available
          </Text>
        )}
      </View>
    </>
  );
};

export default OverView;
