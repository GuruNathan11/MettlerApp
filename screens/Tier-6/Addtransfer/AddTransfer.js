import {View, Text, Pressable, FlatList,TextInput, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import {styles} from './styles';
import { PatientHeader, CheckBox, Button} from '../../../components';
import DatePicker from 'react-native-date-picker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import {
       getPatientVisit,
    //    postAdmit,
       getDropdowns,
    } from '../../../redux/apiCalls';
import {Dropdown, MultiSelect}from 'react-native-element-dropdown';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const AddTransfer = ({navigation, route}) => {
  const {patient} = route.params;
  const dispatch = useDispatch();
  const lastVisitId = useSelector(state => state.user.lastVisitId);
  const username = useSelector(state => state.user.userInfo.username);
  const [reactDate, setReactDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [observed, setObserved] = useState(true);
  const [historical, setHistorical] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [comments, setComments] = useState(null);
  const [enteredDate, setEnteredDate] = useState(null);
  const [values, setValues] = useState(Array(mappedData?.length).fill(null));
  const Urgency = useSelector(state => state.user.location);
  
  const [isFocusArray, setIsFocusArray] = useState(
    Array(mappedData?.length).fill(false),
  );
  useEffect(() => {
    getPatientVisit(dispatch, patient.id);
    getDropdowns(dispatch, 'Urgency');
  }, []);
  const UrgencyData = Urgency.map(item => ({
    label: item.value,
    value: item.id,
  }));

  const mappedData = [
    {
      placeholder: 'Type of Transfer',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
      placeholder: 'Ward Location',
        data: UrgencyData,
    },
    {
      placeholder: 'Room Bed',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
      placeholder: 'Facility treating speciality IEN',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
      placeholder: 'Attending physician IEN',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
  ];
  
  const handleSubmit = async () => {
    const rObj = {
      pid: patient?.id,
      admissionType: values[0],
      attendingPhysician: values[1],
      primaryPhysician: values[2],
      facilityTreatingSpeciality: values[3],
      sourcefAdmission: values[4],
      wardLocation: values[5],
      // bedId: '105-01',
      admissionDate: reactDate,
      // trackingDevice: false,
      briefDescription: values[6],
      comments: comments,
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
    <View style={styles.container}>
      <PatientHeader
        onBack={() => {
          navigation.goBack();
        }}
        patientName="Transfer a Patient"
        patientAge="24 Yrs"
      />
        <ScrollView
        // style={{ flex: 1 }}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            width: wp(100),
            alignItems: 'center',
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
              onPress={() => setOpen1(true)}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>
                      Date 
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
            <TextInput
              style={styles.input}
              placeholder="Brief Description"
              value={comments}
              onChangeText={text => {
                setComments(text);
              }}
            />
          </View>
     </ScrollView>
    <View
        style={{
          flexDirection: 'row',
          gap: 20,
          marginHorizontal: '3%',
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

export default AddTransfer;
