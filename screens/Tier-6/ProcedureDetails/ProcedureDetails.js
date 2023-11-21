import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PatientHeader} from '../../../components';

const ProcedureDetails = ({navigation, route}) => {
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
      patientName={`Procedure Details`}
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
        <Card
          heading="Problem Description :"
          value={item?.problemDescription}
        />
        <Card heading="Procedure :" value={item?.procedure} />
        <Card heading="Urgency :" value={item?.urgency} />
        <Card heading="Service to problem this procedure:" value={item?.serviceProblem} />
        <Card heading="Earliest appropriate :" value={item?.respProvider} />
        <Card heading="Place of consultation :" value={item?.consultation} />
        <Card heading="Provisional diagnosis :" value={item?.provisionalDiagnosis} />
        <Card heading="Ordered by :" value={item?.orderedBy} />
        <Card heading="Entered by :" value={item?.enteredBy} />
        {/* <Card heading="Treatment Factors :" value={item?.treatmentFactors[0]} /> */}
      </ScrollView>
    </View>
  );
};

export default ProcedureDetails;
