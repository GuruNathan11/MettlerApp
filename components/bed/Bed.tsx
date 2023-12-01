import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { styles } from './styles'
interface BedProps{
    bedNum: number,
    bgColor: string,
    booked: boolean
}
const Bed = (props: BedProps) => {
    const { bedNum, bgColor, booked } = props
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: bgColor}]} activeOpacity={0.7} disabled={booked} onPress={() => { Alert.alert('Vacant') }}> 
      <View style={styles.bedHead}></View>
      <Text style={styles.bedNum}>{bedNum}</Text>
    </TouchableOpacity>
  )
}

export default Bed