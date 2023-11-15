import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PatientHeader} from '../../../components';

const AllergyDetails = ({navigation, route}) => {
  const {item} = route.params;
  var symp = '';
  for (let i = 0; i < item?.symptoms.length; i++) {
    if (i === 0) {
      symp += item?.symptoms[i];
    } else {
      symp += ',' + item?.symptoms[i];
    }
  }
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
        patientName={`${item.causativeAgentName} Allergy`}
        patientAge={`${item.enteredDate}`}
      />
      {/* <Text>{item.id}</Text> */}
      <ScrollView>
        <Card heading="Causative Agent :" value={item?.causativeAgentName} />
        <Card
          heading="Reaction Date and Time :"
          value={item?.observedDetails?.reactionDateTime}
        />
        <Card heading="Severity :" value={item?.allergySeverity} />
        <Card heading="Originator :" value={item?.physicianName} />
        <Card heading="Entered Date :" value={item?.enteredDate} />
        <Card heading="Nature Of Reaction :" value={item?.natureOfReaction} />
        <Card heading="Comments :" value={item?.comments} />
        <Card heading="Symptoms :" value={symp} />
      </ScrollView>
    </View>
  );
};

export default AllergyDetails;
