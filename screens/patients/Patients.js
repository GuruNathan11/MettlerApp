import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {DashboardCard} from '../../components';

const Patients = ({navigation}) => {
  const navigateTo = destination => {
    navigation.navigate(destination);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MIcon name="people-outline" size={30} />
        <Text style={styles.headerText}> Patients</Text>
      </View>
      <View style={styles.row}>
        <DashboardCard
          fullWidthed
          title="Q-15"
          data="Q-15 Patient Check"
          outerBg="#faecdb"
          innerBg="#efdac0"
          txtColor="#925d1e"
          onPress={() => navigateTo('AllActiveQ15')}
        />
      </View>
      <View style={styles.row}>
        <DashboardCard
          title="My Patients"
          data="007"
          outerBg="#EBF9EB"
          innerBg="#D3F2D3"
          txtColor="#6C9E6C"
          onPress={() => navigateTo('AssignedPatients')}
        />
        <DashboardCard
          title="All Patients"
          data="008"
          outerBg="#E6E1F9"
          innerBg="#D1CBEA"
          txtColor="#6B5F9E"
          onPress={() => navigateTo('AllPatients')}
        />
      </View>
      <View style={styles.row}>
        <DashboardCard
          title="Current Patients"
          data="009"
          outerBg="#EDF1FA"
          innerBg="#D9E2F5"
          txtColor="#617DBB"
          onPress={() => navigateTo('CurrentPatients')}
        />
        <DashboardCard
          title="Today Admitted"
          data="010"
          outerBg="#FAECDB"
          innerBg="#EFDAC0"
          txtColor="#925d1e"
          onPress={() => navigateTo('TodayAdmitted')}
        />
      </View>
      <View style={styles.meterView}>
        <Text style={styles.topText}>Bed Availability</Text>
        <Image
          source={require('../../assets/images/meter.png')}
          resizeMode="contain"
          style={styles.meter}
        />
        <Image
          source={require('../../assets/images/meterNeedle.png')}
          resizeMode="contain"
          style={styles.needle}
        />
      </View>
    </ScrollView>
  );
};

export default Patients;
