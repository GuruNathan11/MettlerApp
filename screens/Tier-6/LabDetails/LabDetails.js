import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PatientHeader} from '../../../components';

const LabDetails = ({navigation, route}) => {
  const {item} = route.params;
  var symp = '';
  const Card = ({heading, value}) => {
    return (
      <View style={{margin: '5%'}}>
        <Text style={{color: '#737373', fontSize: 18}}>{heading}</Text>
        <Text style={{color: '#000', fontSize: 18, marginTop: '1%'}}>
          {value}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
    <PatientHeader
      onBack={() => navigation.goBack()}
      patientName={`LabTest Details`}
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
    />
     
      <ScrollView>
       
        <Card heading=" LabTest :" value={item?.LabTest} />
        <Card heading=" Collectiontype :" value={item?.Collectiontype} />
        <Card heading=" Collection Date/Time:" value={item?.collectionDateTime} />
        <Card heading=" CollectionSample :" value={item?.collectionSample} />
        <Card heading=" Specimen:" value={item?.specimen} />
        <Card heading=" Urgency :" value={item?.urgency} />
        <Card heading=" Category :" value={item?.category} />
        <Card heading=" How Often :" value={item?.howOften} />
        <Card heading=" How Long:" value={item?.howLong} />
        <Card heading=" Ordered by :" value={item?.orderedBy} />
        <Card heading=" Entered by :" value={item?.enteredBy} />
       
      </ScrollView>
    </View>
  );
};

export default LabDetails;
