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
import {getDropdowns, getPatientVisit, labTest,} from '../../../redux/apiCalls';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const AddTest3 = ({navigation, route}) => {
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
  const Urgency = useSelector(state => state.user.Urgency);
  const CollectionSample = useSelector(state => state.user.CollectionSample);
  const LabTest = useSelector(state => state.user.LabTest);
  const HowOften = useSelector(state => state.user.HowOften);
  const Speicmen = useSelector(state => state.user.Speicmen);
  const [values, setValues] = useState(Array(mappedData?.length).fill(null));
  const [multiSelectValues, setMultiSelectValues] = useState(
    Array(mappedData?.length).fill([]),
  );
  const [isFocusArray, setIsFocusArray] = useState(
    Array(mappedData?.length).fill(false),
  );
  useEffect(() => {
    getPatientVisit(dispatch, patient.id);
    getDropdowns(dispatch, 'Urgency');
    getDropdowns(dispatch, 'LabTest');
    getDropdowns(dispatch, 'CollectionSample');
    getDropdowns(dispatch, 'Speicmen');
    getDropdowns(dispatch, 'HowOften');
  }, []);
  const UrgencyData = Urgency.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const LabTestData = LabTest.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const CollectionSampleData = CollectionSample.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const SpeicmenData = Speicmen.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const HowOftenData = HowOften.map(item => ({
    label: item.value,
    value: item.id,
  }));


  const mappedData = [
    {
      placeholder: 'Lab Test',
      data: LabTestData,
    },
    {
      placeholder: 'Collection Type',
      data: UrgencyData,
    },
    {
      placeholder: 'Collection Sample',
      data:  CollectionSampleData,
    },
    {
      placeholder: 'Specimen',
      data: SpeicmenData,
    },
    {
      placeholder: 'Urgency',
      data: UrgencyData,
    },
    {
      placeholder: 'How Often',
      data:  HowOftenData,
    },
    {
      placeholder: 'How Long',
      data: [
        {label: 'l', value: 'l'},
        {label: 'd', value: 'd'},
        {label: 'e', value: 'e'},
      ],
    },
      {
        placeholder: 'Ordered by',
        data: [
          {label: 'l', value: 'l'},
          {label: 'd', value: 'd'},
          {label: 'e', value: 'e'},
        ],
      },
      {
        placeholder: 'Entered by',
        data: [
          {label: 'l', value: 'l'},
          {label: 'd', value: 'd'},
          {label: 'e', value: 'e'},
        ],
      },
  ];

  const handleSubmit = async () => {
        const rObj = {
          pid: patient?.id,
          collectionType: values[0],
          collectionDateTime: values[1],
          collectionSample: values[2],
          specimen:values[3],
          urgency: values[4],
          howOften: values[5],
          howLong: values[6],
          orderedBy: values[7],
          enteredBy: values[8],
          comments: comments,
        };
        if (values.length > 4) {
            labTest(dispatch, rObj)
            .then(() => {
              setValues(Array(mappedData?.length).fill(null));
              setComments(null);
            })
            .catch((error) => {
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
               <Text style={{ fontSize: 20}}>
                {date &&
                  `${date?.getDate().toString().padStart(2, '0')}.${parseInt(
                    date?.getMonth() + 1,
                  )
                    .toString()
                    .padStart(
                      2,
                      '0',
                    )}.${date?.getFullYear()} (Collection Date/Time)`}               
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

export default AddTest3;
