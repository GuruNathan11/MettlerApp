import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PatientHeader} from '../../../components';

const VitalDetails = ({navigation, route}) => {
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
        onBack={() => {
          navigation.goBack();
        }}
        patientName={`${item.problemDescription}`}
        patientAge={`${item.dateOfOnset}`}
      />
      {/* <Text>{item.id}</Text> */}
      <ScrollView>
        <Card
          heading="Vital Type :"
          value={item?.bodyTemperature?.vitalMeasurementName}
        />
        <Card heading="Date of Entered :" value={item?.enteredDate} />
        <Card heading="Value :" value={item?.bodyTemperature?.value} />
        <Card heading="Unit:" value={item?.bodyTemperature?.unit} />
        <Card heading="Site :" value={item?.respProvider} />
        <Card heading="Position :" value={item?.service} />
        <Card heading="Method :" value={item?.status} />
        <Card heading="Location :" value={item?.immediacy} />
        <Card heading="Clinic :" value={item?.clinic} />
        <Card heading="Treatment Factors :" value={item?.treatmentFactors} />
      </ScrollView>
    </View>
  );
};

export default VitalDetails;
