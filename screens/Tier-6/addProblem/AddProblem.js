import {View, FlatList, Alert, TextInput, Pressable, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, CheckBox, PatientHeader} from '../../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDropdowns,
  getPatientVisit,
  postProblem,
} from '../../../redux/apiCalls';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const AddProblem = ({navigation, route}) => {
  const {patient} = route.params;
  const pid = patient?.id;
  const dispatch = useDispatch();
  const lastVisitId = useSelector(state => state.user.lastVisitId);
  const username = useSelector(state => state.user.userInfo.username);
  const [observed, setObserved] = useState(true);
  const [historical, setHistorical] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [enteredDate, setEnteredDate] = useState(null);
  const [reactDate, setReactDate] = useState(null);
  const [comments, setComments] = useState(null);
  const problemCategory = useSelector(state => state.user.problemCategory);
  const problemImmediacy = useSelector(state => state.user.problemImmediacy);
  const location = useSelector(state => state.user.location);
  const treatmentFactors = useSelector(state => state.user.treatmentFactors);
  const problemDescription = useSelector(
    state => state.user.problemDescription,
  );
  
  const [values, setValues] = useState(Array(mappedData?.length).fill(null));
  const [multiSelectValues, setMultiSelectValues] = useState(
    Array(mappedData?.length).fill([]),
  );
  const [isFocusArray, setIsFocusArray] = useState(
    Array(mappedData?.length).fill(false),
  );
  useEffect(() => {
    getPatientVisit(dispatch, pid);
    getDropdowns(dispatch, 'problemCategory');
    getDropdowns(dispatch, 'immediacy');
    getDropdowns(dispatch, 'ProblemDescription');
    getDropdowns(dispatch, 'location');
    getDropdowns(dispatch, 'TreatmentFactors');
    
  }, []);

  const categoryData = problemCategory.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const immediacyData = problemImmediacy.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const descriptionData = problemDescription.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const locationData =location.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const treatmentFactorsData =treatmentFactors.map(item => ({
    label: item.value,
    value: item.id,
  }));
 
  const mappedData = [
    {
      placeholder: 'Problem Category',
      data: categoryData,
    },
    {
      placeholder: 'Immediacy',
      data: immediacyData,
    },
    // {
    //   placeholder: 'Origination Date',
    //   data: [{label: '20230928', value: '20230928'}],
    // },
    // {
    //   placeholder: 'Reaction Date/Time',
    //   data: [{label: '20230928', value: '20230928'}],
    // },
    {
      placeholder: 'Problem Description',
      data: descriptionData,
    },
    {
      placeholder: 'Location',
     data: locationData,
    },
    {
      placeholder: 'Resp Provider',
      data: [
        {label: 'Chest Pain', value: 'Chest Pain'},
        {label: 'Rash', value: 'Rash'},
      ],
    },
    {
      placeholder: 'Clinic',
      data: [
        {label: 'Chest Pain', value: 'Chest Pain'},
        {label: 'Rash', value: 'Rash'},
      ],
    },
    {
      placeholder: 'Treatment Factors',
      data:treatmentFactorsData,
    },
  ];

  const handleSubmit = async () => {
    const rObj = {
      patientId: pid,
      immediacy: values[1],
      dateOfOnset: enteredDate,
      problemCategory: values[0],
      treatmentFactors: [values[6]],
      clinic: values[5],
      inactive: true,
      respProvider: values[4],
      locationOfProblem: values[3],
      problemDescription: values[2],
      lastUpdateDate: reactDate,
      lastVisit: lastVisitId,
      comments: comments,
    };
    if (values.length > 4) {
      postProblem(dispatch, rObj)
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
        onBack={() => navigation.goBack()}
        patientAge="24 Yrs"
        patientName={patient.username}
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
        <View style={styles.inputView}>
          <Pressable
            onPress={() => setOpen(true)}
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>
              {date &&
                `${date?.getDate().toString().padStart(2, '0')}.${parseInt(
                  date?.getMonth() + 1,
                )
                  .toString()
                  .padStart(2, '0')}.${date?.getFullYear()} (Date of Onset)`}
            </Text>
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
                  .padStart(2, '0')}.${date1?.getFullYear()} (Last Update)`}
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
            placeholder="Add Comment"
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

export default AddProblem;
