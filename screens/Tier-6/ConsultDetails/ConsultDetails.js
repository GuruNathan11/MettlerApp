import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PatientHeader} from '../../../components';


const ConsultDetails = ({navigation, route}) => {
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
        // patientName={`${item.problemDescription}`}
        // patientAge={`${item.dateOfOnset}`}
      />
     
      <ScrollView>
        <Card
          heading="Problem Description :"
          value={item?.problemDescription}
        />
        <Card heading="Service/Speciality :" value={item?.speciality} />
        <Card heading="Urgency :" value={item?.urgency} />
        <Card heading="Attention :" value={item?.serviceProblem} />
        <Card heading="Earliest appropriate date :" value={item?.appropriateDate} />
        <Card heading="Place of consultation :" value={item?.placeOfConsultation} />
        <Card heading="Provisional diagnosis :" value={item?.provisionalDiagnosis} />
        <Card heading="Ordered by :" value={item?.orderedBy} />
        <Card heading="Entered by :" value={item?.enteredBy} />
        {/* <Card heading="Treatment Factors :" value={item?.treatmentFactors[0]} /> */}
      </ScrollView>
    </View>
  );
};

export default ConsultDetails;
