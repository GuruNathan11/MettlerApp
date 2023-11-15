import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {PatientHeader} from '../../../components';

const ImmunizationDetails = ({navigation, route}) => {
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
        patientName={`${item.immunization} `}
        patientAge={`${item.lotNo}`}
      />
      {/* <Text>{item.id}</Text> */}
      <ScrollView>
        <Card heading="Immunization:" value={item?.immunization} />
        <Card heading="Lot Number :" value={item?.lotNo} />
        <Card heading="Due Date :" value={item?.dueDate} />
        <Card heading="Done Date :" value={item?.doneDate} />
        <Card
          heading="Administration Date :"
          value={item?.administrationDate}
        />
        <Card heading="Administered By :" value={item?.administeredBy} />
        <Card heading="Route :" value={item?.route} />
        <Card heading="Dosage :" value={item?.dosage} />
        <Card heading="Ordered By :" value={item?.orderedBy} />
      </ScrollView>
    </View>
  );
};

export default ImmunizationDetails;
