import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PatientHeader} from '../../../components';

const ImagingDetails = ({navigation, route}) => {
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
        <Card heading="Imaging Type :" value={item?.imagingType} />
        <Card heading="Reason for Study :" value={item?.reasonForStudy} />
        <Card heading="Modifiers:" value={item?.modifiers} />
        <Card heading="Date Desired :" value={item?.dateDesired} />
        <Card heading="Urgency:" value={item?.urgency} />
        <Card heading="Transport :" value={item?.transport} />
        <Card heading="Category :" value={item?.category} />
        <Card heading="Submit to :" value={item?.submitTo} />
        <Card heading=" Pre OP scheduled:" value={item?.preOpScheduled} />
        <Card heading=" Exams Over the last 7 Days :" value={item?.examsOver} />
        <Card heading=" Ordered by:" value={item?.orderedBy} />
        <Card heading=" Entered by :" value={item?.enteredBy} />
       
      </ScrollView>
    </View>
  );
};

export default ImagingDetails;
