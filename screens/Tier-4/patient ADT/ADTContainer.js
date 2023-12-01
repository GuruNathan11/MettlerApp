// PatientADTContainer.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ADTContainer = ({ date, label, labelText, profileImageSource }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.dateText}>{date}</Text>
        <View style={styles.preAdmitBox}>
          <Text style={styles.customLabel}>{label}</Text>
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
    borderBottomColor: '#CCC',
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
  customLabel: {
    color: '#FF8C00',
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    lineHeight: 14.52,
    textAlign: 'center',
  },
  preAdmitBox: {
    width: 91,
    height: 29,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#FF8C00', // Orange color
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ADTContainer;
