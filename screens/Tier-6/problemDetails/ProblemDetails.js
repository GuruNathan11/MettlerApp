import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PatientHeader} from '../../../components';

const ProblemDetails = ({navigation, route}) => {
  const {item} = route.params;
  var symp = '';
  //   for (let i = 0; i < item?.symptoms.length; i++) {
  //     if (i === 0) {
  //       symp += item?.symptoms[i];
  //     } else {
  //       symp += ',' + item?.symptoms[i];
  //     }
  //   }
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
          heading="Problem Description :"
          value={item?.problemDescription}
        />
        <Card heading="Date of Onset :" value={item?.dateOfOnset} />
        <Card heading="Last Update :" value={item?.updatedDate} />
        <Card heading="Location:" value={item?.locationOfProblem} />
        <Card heading="Resp Provider :" value={item?.respProvider} />
        <Card heading="Service :" value={item?.service} />
        <Card heading="Status :" value={item?.status} />
        <Card heading="Immediacy :" value={item?.immediacy} />
        <Card heading="Clinic :" value={item?.clinic} />
        <Card heading="Comments :" value={item?.comments} />
        <Card heading="Treatment Factors :" value={item?.treatmentFactors[0]} />
      </ScrollView>
    </View>
  );
};

export default ProblemDetails;
