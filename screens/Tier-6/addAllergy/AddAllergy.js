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
  getAllergyNames,
  getDropdowns,
  getPatientVisit,
  postAllergy,
} from '../../../redux/apiCalls';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const AddAllergy = ({navigation, route}) => {
  const {patient} = route.params;
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
  const allergyNames = useSelector(state => state.user.allergyNames);
  const natureOfReactions = useSelector(state => state.user.natureOfReactions);
  const symptoms = useSelector(state => state.user.symptoms);
  const [values, setValues] = useState(Array(mappedData?.length).fill(null));
  const [multiSelectValues, setMultiSelectValues] = useState(
    Array(mappedData?.length).fill([]),
  );
  const [isFocusArray, setIsFocusArray] = useState(
    Array(mappedData?.length).fill(false),
  );
  useEffect(() => {
    getPatientVisit(dispatch, patient.id);
    getDropdowns(dispatch, 'allergyName');
    getDropdowns(dispatch, 'natureOfReaction');
    getDropdowns(dispatch, 'symptoms');
  }, []);
  const allergyData = allergyNames.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const natureData = natureOfReactions.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const symptomsData = symptoms.map(item => ({
    label: item.value,
    value: item.id,
  }));

  const mappedData = [
    {
      placeholder: 'Originitaor',
      data: allergyData,
    },
    {
      placeholder: 'Causative Agent',
      data: allergyData,
    },
    {
      placeholder: 'Nature Of Reaction',
      data: natureData,
    },
    {
      placeholder: 'Severity',
      data: [
        {label: 'Normal', value: 'Normal'},
        {label: 'Mild', value: 'Mild'},
        {label: 'Severe', value: 'Severe'},
      ],
    },
    {
      placeholder: 'Symptoms',
      data: symptomsData,
    },
  ];

  const handleSubmit = async () => {
    const rObj = {
      patientId: patient.id,
      causativeAgentName: values[1],
      enteredDate,
      physicianName: values[0],
      allergyType: '',
      symptoms: [values[4]],
      allergySeverity: values[3],
      natureOfReaction: values[2],
      observed: '',
      observedDetails: {
        reactionDateTime: reactDate,
      },
      inactive: false,
      lastVisit: lastVisitId,
      comments: comments,
    };
    if (values.length > 4) {
      postAllergy(dispatch, rObj)
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <CheckBox
          circled
          label="Observed"
          checked={observed}
          onPress={() => {
            setObserved(true);
            setHistorical(false);
          }}
        />
        <CheckBox
          circled
          label="Historical"
          checked={historical}
          onPress={() => {
            setHistorical(true);
            setObserved(false);
          }}
        />
      </View>
      {observed ? (
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
              <Text>
                {date &&
                  `${date?.getDate().toString().padStart(2, '0')}.${parseInt(
                    date?.getMonth() + 1,
                  )
                    .toString()
                    .padStart(
                      2,
                      '0',
                    )}.${date?.getFullYear()} (Origination Date)`}
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
      ) : (
        <Text>Hello</Text>
      )}

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

export default AddAllergy;
