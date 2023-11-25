import {View, Text, Pressable} from 'react-native';
import React, { useEffect, useState } from 'react';
import {styles} from './styles';
import {Button, PatientHeader} from '../../../components';
import DatePicker from 'react-native-date-picker';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPatientVisit } from '../../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';

const AddAdmit = ({navigation, route}) => {
  const {patient} = route.params;
  const dispatch = useDispatch();

  const [reactDate, setReactDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [values, setValues] = useState(Array(mappedData?.length).fill(null));
  
  const [isFocusArray, setIsFocusArray] = useState(
    Array(mappedData?.length).fill(false),
  );
  useEffect(() => {
    getPatientVisit(dispatch, patient.id);
  }, []);

  const mappedData = [
    {
      placeholder: 'Admission Type',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
      placeholder: 'Attending Phyician',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
      placeholder: 'Facility Treating Speciality',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
      placeholder: 'Ward Location',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
      placeholder: 'Bed Number',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
        placeholder: 'Bed Number',
        data: [
          {label: 'Normal', value: 'Normal'},
          {label: 'Mild', value: 'Mild'},
          {label: 'Severe', value: 'Severe'},
        ],
      },
      {
        placeholder: 'Brief Description',
        data: [
          {label: 'Normal', value: 'Normal'},
          {label: 'Mild', value: 'Mild'},
          {label: 'Severe', value: 'Severe'},
        ],
      },
      {
        placeholder: 'Source of admission',
        data: [
          {label: 'Normal', value: 'Normal'},
          {label: 'Mild', value: 'Mild'},
          {label: 'Severe', value: 'Severe'},
        ],
      }, 
      {
        placeholder: 'Primary',
        data: [
          {label: 'Normal', value: 'Normal'},
          {label: 'Mild', value: 'Mild'},
          {label: 'Severe', value: 'Severe'},
        ],
      }, 
  ];

  const handleSubmit = async () => {
    const rObj = {
      id: '',
      pid: patient?.id,
      admissionType: values[1],
      attendingPhysician,
      primaryPhysician: '',
      facilityTreatingSpeciality: [values[4]],
      sourcefAdmission: values[3],
      wardLocation: values[2],
      bedId: '105-01',
      admissionDate: reactDate,
      trackingDevice: false,
      briefDescription: 'comments',
    };
    if (values.length > 4) {
      postAdmit(dispatch, rObj)
        .then(() => {
          setValues(Array(mappedData?.length).fill(null));
          setComments(null);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      Alert.alert('METTLER HEALTH CARE', 'Select all fields');
    }
  };
  return (
    <View>
      <PatientHeader
        onBack={() => {
          navigation.goBack();
        }}
        patientName="Admit Patient"
        patientAge="24 Yrs"
      />
 <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            width: wp(100),
            alignItems: 'center',
            // flex: 1,
            //   justifyContent: 'center',
          }}>
          <FlatList
            scrollEnabled={false}
            data={mappedData}
            renderItem={({item, index}) => (
              <View style={styles.inputView}>
                <Dropdown
                  // mode='modal'
                  style={[
                    styles.input,
                    {padding: 3},
                    isFocusArray[index] && {borderColor: '#0f3995'},
                  ]}
                  placeholderStyle={{
                    marginLeft: wp(2),
                    fontSize: hp(2.5),
                    color: '#8d8d8d',
                  }}
                  selectedTextStyle={{marginLeft: '3%'}}
                  iconStyle={{marginRight: '-10%'}}
                  data={item.data}
                  maxHeight={300}
                  search
                  labelField="label"
                  valueField="value"
                  placeholder={item.placeholder}
                  searchPlaceholder="Search..."
                  value={values[index]} // Use values[index] for the initial value
                  onFocus={() => {
                    setIsFocusArray(prevState =>
                      prevState.map((isFocused, i) =>
                        i === index ? true : isFocused,
                      ),
                    );
                    // GetOrganization(dispatch);
                  }}
                  onBlur={() => {
                    setIsFocusArray(prevState =>
                      prevState.map((isFocused, i) =>
                        i === index ? false : isFocused,
                      ),
                    );
                  }}
                  onChange={selectedItem => {
                    // Create a copy of the current values array
                    const newValues = [...values];
                    // Update the value for the current index
                    newValues[index] = selectedItem.value;
                    // Set the updated values state
                    setValues(newValues);
                    console.log(values);
                  }}
                />
              </View>
            )}
          />
          <View style={[styles.inputView]}>
            <Pressable
              onPress={() => setOpen(true)}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>

              <MCIcon name="calendar-edit" size={30} color="#8d8d8d" />
            </Pressable>
            <DatePicker
              modal
              mode="date"
              textColor="#0f3995"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setEnteredDate(
                  `${date?.getFullYear()}${parseInt(date?.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}${date
                    ?.getDate()
                    .toString()
                    .padStart(2, '0')}`,
                );
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View style={[styles.inputView]}>
            <Pressable
              onPress={() => setOpen1(true)}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>
                {date1 &&
                  `${date1?.getDate().toString().padStart(2, '0')}.${parseInt(
                    date1?.getMonth() + 1,
                  )
                    .toString()
                    .padStart(
                      2,
                      '0',
                    )}.${date1?.getFullYear()} (Reaction Date/Time)`}
              </Text>
              <MCIcon name="calendar-edit" size={30} color="#8d8d8d" />
            </Pressable>
            <DatePicker
              modal
              mode="datetime"
              textColor="#0f3995"
              open={open1}
              date={date1}
              onConfirm={date1 => {
                setOpen1(false);
                setDate1(date1);
                setReactDate(
                  `${date1?.getFullYear()}${parseInt(date1?.getMonth() + 1)
                    .toString()
                    .padStart(2, '0')}${date1
                    ?.getDate()
                    .toString()
                    .padStart(2, '0')}`,
                );
              }}
              onCancel={() => {
                setOpen1(false);
              }}
            />
          </View>
          <View style={[styles.inputView]}>
          
            
          </View>
        </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          marginRight: '3%',
          marginBottom: '8%',
          justifyContent: 'flex-end',
        }}>
        <Button
          active
          cancel
          half
          label="Cancel"
          onPress={() => navigation.goBack()}
        />
        <Button active half label="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddAdmit;
