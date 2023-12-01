import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Bed, PatientHeader } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getBedConfig } from '../../../redux/apiCalls';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const BedAssignment = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const semiPrivateCount = useSelector(state => state.user.semiPrivateCount);
  const privateCount = useSelector(state => state.user.privateCount);
  const [count, setCount] = useState(semiPrivateCount);
  const [count2, setCount2] = useState(privateCount);

  useEffect(() => {
    getBedConfig(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setCount(semiPrivateCount);
    setCount2(privateCount)
  }, [semiPrivateCount, privateCount]);

  const beds = Array.from({ length: Math.ceil(count?.length / 4) }, (_, index) => (
    <React.Fragment key={index}>
    <View  style={{ flexDirection: 'row', gap: 10 , backgroundColor: '#E9F4F8', padding: 15}}>
      <Bed bedNum={count[index * 4]?.bedNo} bgColor={count[index * 4]?.occupied ? '#DCDFEB' : "#FFF"} booked={count[index * 4]?.occupied} />
      <Bed bedNum={count[index * 4 + 1]?.bedNo} bgColor={count[index * 4 + 1]?.occupied ? '#DCDFEB' : "#FFF"} booked={count[index * 4 + 1]?.occupied} />
    </View>
    <View  style={{ flexDirection: 'row', gap: 10 , backgroundColor: '#E9F4F8', padding: 15}}>
      <Bed bedNum={count[index * 4 + 2]?.bedNo} bgColor={count[index * 4 + 2]?.occupied ? '#DCDFEB' : "#FFF"} booked={count[index * 4 + 2]?.occupied} />
      <Bed bedNum={count[index * 4 + 3]?.bedNo} bgColor={count[index * 4 + 3]?.occupied ? '#DCDFEB' : "#FFF"} booked={count[index * 4 + 3]?.occupied} />
    </View>
    </React.Fragment>
  ));  
  const beds2 = Array.from({ length: count2?.length }, (_, index) => (
    <Bed bedNum={count2[index]?.bedNo} bgColor={count2[index]?.occupied? '#DCDFEB': '#FFF'} booked={count2[index]?.occupied}/>
))
  return (
    <>
      <PatientHeader patientName={'Patient Bed Assign'} onBack={()=> navigation.goBack()}/>
      <ScrollView style={{ marginLeft: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 20 }}>Semi Private</Text>
        {beds.map((bed, index) => (
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
            {bed}
          </View>
        ))}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 20 }}>Private</Text>
        <View  style={{ flexDirection: 'row', backgroundColor: '#F1FCF0', padding: 10}}>
        {beds2.map((bed2, index) => (
          <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
            {bed2}
          </View>
        ))}
        </View>
      </ScrollView>
    </>
  );
};

export default BedAssignment;