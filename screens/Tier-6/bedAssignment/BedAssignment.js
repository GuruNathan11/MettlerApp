import { View, Text } from 'react-native'
import React from 'react'
import { Bed, PatientHeader } from '../../../components';

const BedAssignment = () => {
  return (
    <>
    <PatientHeader
    patientName={'Patient Bed Assign'}
    />
    <View style={{marginLeft:10, marginTop: 10}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 20}}>Semi Private</Text>
      <View style={{ flexDirection: 'row', gap: 30 }}>
        <View style={{ backgroundColor: '#E9F4F8',width: '45%', padding: 20, flexDirection: 'row', gap: 20}}>
        <Bed bedNum={'101-02'} bgColor='#FFF' />
        <Bed bedNum={'101-02'} bgColor='#FFF'/>
      </View>
      <View style={{ backgroundColor: '#E9F4F8',width: '45%', padding: 20, flexDirection: 'row', gap: 20}}>
        <Bed bedNum={'101-02'} bgColor='#FFF'/>
        <Bed bedNum={'101-02'} bgColor='#F5E7F5' booked/>
      </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 30, marginTop: 20 }}>
        <View style={{ backgroundColor: '#E9F4F8',width: '45%', padding: 20, flexDirection: 'row', gap: 20}}>
        <Bed bedNum={'101-02'} bgColor='#FFF' />
        <Bed bedNum={'101-02'} bgColor='#FFF'/>
      </View>
      <View style={{ backgroundColor: '#E9F4F8',width: '45%', padding: 20, flexDirection: 'row', gap: 20}}>
        <Bed bedNum={'101-02'} bgColor='#DCDFEB' booked/>
        <Bed bedNum={'101-02'} bgColor='#FFF'/>
      </View>
      </View>
      
    </View>
    </>
  )
}

export default BedAssignment;