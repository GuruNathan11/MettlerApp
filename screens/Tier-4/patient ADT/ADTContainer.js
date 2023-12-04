// ADTContainer.js
import { View, Text, Image, StyleSheet } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {useIsFocused, useNavigation} from '@react-navigation/native';

const ADTContainer = ({ date, label, labelText, profileImageSource,  backgroundColor ,bg }) => {
  
  
  
  const getLabelStyle = () => {

    const admitPatient = useSelector(state => state.user.admitPatient);
    switch (label) {
      case 'Admit':
        return styles.admitLabel;
      case 'Transfer':
        return styles.transferLabel;
      case 'Discharge':
        return styles.dischargeLabel;
      default:
        return styles.customLabel;
    }
  };

   
  

  return (
    <View style={[styles.container, { backgroundColor }]}>
    <View style={styles.leftContent}>
      <Text style={styles.dateText}>{date}</Text>
      <View style={[styles.labelBox,{ backgroundColor:bg}]}>
        <Text style={getLabelStyle()}>{label}</Text>
      </View>
    </View>
    <View style={styles.rightContent}>
      <Image style={styles.profileImage} source={profileImageSource} />
      <Text style={styles.labelText}>{labelText}</Text>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
container: {
  width: '95%',
  height: 75,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomWidth: 1,
  marginHorizontal: 15,
},
leftContent: {
  alignItems: 'flex-start',
},
rightContent: {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 10,
},
labelText: {
  color: '#000000',
  fontFamily: 'Poppins-Regular',
  fontSize: 14,
  lineHeight: 18.2,
  letterSpacing: 0.01,
},
dateText: {
  color: '#000000',
  fontFamily: 'Poppins-Regular',
  fontSize: 14,
  lineHeight: 18.2,
  letterSpacing: 0.01,
},
labelBox: {
  width: 91,
  height: 29,
  borderRadius: 3,
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
customLabel: {
  color: '#FF8C00',
  fontFamily: 'Inter-SemiBold',
  fontSize: 12,
  lineHeight: 14.52,
  textAlign: 'center',
},
admitLabel: {
  color: '#3972ED', // Blue color for Admit
  fontFamily: 'Inter-SemiBold',
  fontSize: 12,
  lineHeight: 14.52,
  textAlign: 'center',
},
transferLabel: {
  color: '#000000', // Black color for Transfer
  fontFamily: 'Inter-SemiBold',
  fontSize: 12,
  lineHeight: 14.52,
  textAlign: 'center',
},
dischargeLabel: {
  color: '#008000', // Green color for Discharge
  fontFamily: 'Inter-SemiBold',
  fontSize: 12,
  lineHeight: 14.52,
  textAlign: 'center',
},
profileImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 10,
},
});

export default ADTContainer;
