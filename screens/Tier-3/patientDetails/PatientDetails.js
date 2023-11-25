import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {
  PatientHeader,
  VitalBtn,
  VitalBtnHorizontal,
  VitalBtnVertical,
} from '../../../components';
import PatientDetails2 from './PatientDetails2';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {getVitalByPatientId} from '../../../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const PatientDetails = ({navigation, route}) => {
  const viewScale = useSharedValue(-500);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: viewScale.value}],
    };
  });
  const {patient} = route.params;
  const dispatch = useDispatch();
  // const date = new Date();
  const VitalsData = useSelector(state => state.user.patientVitals);
  const handleOverview = () => {
    navigation.navigate('Overview', {patient});
  };
  const handleQ15Form = () => {
    navigation.navigate('Q15', {patient});
  };
  const handleAdmitPatient = () => {
    navigation.navigate('AdmitPatient', {patient});
  };
  const handlePatientData = () => {
    navigation.navigate('PatientData', {patient});
  };
  const handleTreatmentPlan = () => {
    navigation.navigate('TreatmentPlan', {patient});
  };
  const handleReports = () => {
    navigation.navigate('Reports', {patient});
  };
  useEffect(() => {
    viewScale.value = withSpring(0, {duration: 9000});
  }, []);
  return (
    // <>
    //   <View style={styles.header}>
    //     <Pressable
    //       style={{flexDirection: 'row'}}
    //       onPress={() => {
    //         navigation.goBack();
    //       }}>
    //       <MIcon name="arrow-back" size={30} color="#fff" />
    //       <View
    //         style={{backgroundColor: '#8218', padding: 5, borderRadius: 15}}>
    //         <MCIcon name="account" size={30} color="#fff" />
    //       </View>
    //     </Pressable>

    //     <View style={{marginLeft: '5%'}}>
    //       <Text style={styles.pName}>{patient.username}</Text>
    //       <Text style={styles.pAge}>24 Yrs </Text>
    //     </View>
    //   </View>
    //   <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
    //     <View style={styles.pDetails}>
    //       <Image
    //         source={require('../../../assets/images/body.png')}
    //         resizeMode="contain"
    //         style={{width: '40%', marginTop: 0}}
    //       />

    //       <View style={styles.pVitals}>
    //         <VitalBtnHorizontal
    //           icon="human-male-height"
    //           size={30}
    //           title="Height"
    //           value={
    //             VitalsData.height
    //               ? `${VitalsData.height.value} (${VitalsData.height.unit})`
    //               : '-' // Provide a default value or message if the property is undefined
    //           }
    //         />
    //         <VitalBtnHorizontal
    //           icon="blood-bag"
    //           size={30}
    //           title="Blood"
    //           value="B +ive"
    //         />
    //         <VitalBtnHorizontal
    //           icon="weight-kilogram"
    //           size={30}
    //           title="Weight"
    //           value={
    //             VitalsData.weight
    //               ? `${VitalsData?.weight.value} (${VitalsData?.weight.unit})`
    //               : '-'
    //           }
    //         />
    //         <VitalBtnHorizontal
    //           icon="calendar-multiselect"
    //           title="DOB"
    //           value="31/02/1996"
    //           size={30}
    //         />
    //         <VitalBtnHorizontal
    //           icon="note-edit-outline"
    //           title="Gulucose"
    //           size={30}
    //           value={
    //             VitalsData.bloodGlucoseLevel
    //               ? `${VitalsData?.bloodGlucoseLevel.value} (${VitalsData?.bloodGlucoseLevel.unit})`
    //               : '-'
    //           }
    //         />
    //       </View>
    //     </View>
    //     <View style={styles.vitalBtn2View}>
    //       <VitalBtnVertical
    //         icon="temperature-celsius"
    //         size={30}
    //         header="Temp"
    //         data={
    //           VitalsData.bodyTemperature
    //             ? VitalsData?.bodyTemperature.value
    //             : '-'
    //         }
    //         bg1="#E1E3FF"
    //         bg2="#B3B6E0"
    //       />
    //       <VitalBtnVertical
    //         icon="blood-bag"
    //         size={30}
    //         header="BP"
    //         data={
    //           VitalsData.bloodPressure
    //             ? `${VitalsData?.bloodPressure.systolicValue}/${VitalsData?.bloodPressure.diastolicValue} ${VitalsData?.bloodPressure.unit}`
    //             : '-'
    //         }
    //         bg1="#D8F1D8"
    //         bg2="#A7DBA7"
    //       />
    //       <VitalBtnVertical
    //         icon="battery-heart-outline"
    //         size={30}
    //         header="Heart Rate"
    //         data={
    //           VitalsData.heartRate
    //             ? `${VitalsData?.heartRate.value} ${VitalsData?.heartRate.unit}`
    //             : '-'
    //         }
    //         bg1="#FAE8DF"
    //         bg2="#F1C0A7"
    //       />
    //     </View>
    //     {/* <View style={styles.q15Btn}> */}
    //     <TouchableOpacity
    //       activeOpacity={0.8}
    //       style={styles.q15Btn}
    //       onPress={() => {
    //         navigation.navigate('Q15', {patient});
    //       }}>
    //       <View
    //         style={{
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           flexDirection: 'row',
    //         }}>
    //         <MCIcon name="clock-edit-outline" size={25} color="#fff" />
    //         <Text
    //           style={{
    //             color: '#fff',
    //             fontSize: 20,
    //             textAlign: 'center',
    //             textAlignVertical: 'top',
    //             marginHorizontal: 5,
    //           }}>
    //           &nbsp;Q15 - Form
    //         </Text>
    //       </View>
    //       <MCIcon name="arrow-right-circle-outline" size={25} color="#fff" />
    //     </TouchableOpacity>
    //     {/* </View> */}

    //     {/* <PatientDetails2 /> */}
    //   </ScrollView>
    // </>
    <>
      {/* <View style={styles.header}>
        <Pressable
          style={{flexDirection: 'row'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <MIcon name="arrow-back" size={30} color="#fff" />
          <View
            style={{backgroundColor: '#8218', padding: 5, borderRadius: 15}}>
            <MCIcon name="account" size={30} color="#fff" />
          </View>
        </Pressable>

        <View style={{marginLeft: '5%'}}>
          <Text style={styles.pName}>{patient.username}</Text>
          <Text style={styles.pAge}>24 Yrs </Text>
        </View>
      </View> */}
      <PatientHeader
        onBack={() => {
          navigation.goBack();
        }}
        patientName={patient.username}
        patientAge="24 Yrs"
      />
      <Animated.ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          height: heightPercentageToDP(80),
        }}
        style={[
          {
            gap: 30,
          },
          animatedStyle,
        ]}>
        <View style={{flexDirection: 'row', gap: 30, marginBottom: 15}}>
          <VitalBtn
            label="OverView"
            img={require('../../../assets/images/overview.png')}
            color="#ff0000"
            onPress={handleOverview}
          />
          <VitalBtn
            label="Q-15 Form"
            img={require('../../../assets/images/q15.png')}
            color="#80d4ff"
            onPress={handleQ15Form}
          />
        </View>
        <View style={{flexDirection: 'row', gap: 30, marginBottom: 15}}>
          <VitalBtn
            label="Patient ADT"
            img={require('../../../assets/images/admitPatient.png')}
            color="#009933"
            onPress={handleAdmitPatient}
          />
          <VitalBtn
            label="Patient Data/Orders"
            img={require('../../../assets/images/patientData.png')}
            color="#80d4ff"
            onPress={handlePatientData}
          />
        </View>
        <View style={{flexDirection: 'row', gap: 30, marginBottom: 15}}>
          <VitalBtn
            label="Treatmen Plan"
            img={require('../../../assets/images/treatmentPlan.png')}
            color="#0f3995"
            onPress={handleTreatmentPlan}
          />
          <VitalBtn
            label="Reports"
            img={require('../../../assets/images/reports.png')}
            color="#80d4ff"
            onPress={handleReports}
          />
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default PatientDetails;
