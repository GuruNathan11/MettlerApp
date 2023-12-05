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
  labpro,
} from '../../../redux/apiCalls';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const AddTest = ({navigation, route}) => {
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
  const [values, setValues] = useState(Array(mappedData?.length).fill(null));
  const Procedure = useSelector(state => state.user.Procedure);
  const [multiSelectValues, setMultiSelectValues] = useState(
    Array(mappedData?.length).fill([]),
  );
  const [isFocusArray, setIsFocusArray] = useState(
    Array(mappedData?.length).fill(false),
  );
  useEffect(() => {
    getPatientVisit(dispatch, patient.id);
    getDropdowns(dispatch, 'Urgency');
    getDropdowns(dispatch,'Procedure');
  }, []);
  const UrgencyData = Urgency.map(item => ({
    label: item.value,
    value: item.id,
  }));
  const ProcedureData = Procedure.map(item => ({
        label: item.value,
        value: item.id,
      }));

  const mappedData = [
    {
      placeholder: 'Procedure',
      data: ProcedureData,
    },
    {
      placeholder: 'Urgency',
      data: UrgencyData,
    },
    {
      placeholder: 'Service to problem this procedure',
      data: [
        { label: 's', value: 's' },
        { label: 'w', value: 'w' },
        { label: 'v', value: 'v' },
      ],
    },
    {
        placeholder: 'Provisional Diagnosis',
        data:  [
            { label: 'm', value: 'm' },
            { label: 's', value: 's' },
            { label: 'k', value: 'k' },
          ],
        },
    {
      placeholder: 'Place of Consultation',
      data:  [
        { label: 'x', value: 'x' },
        { label: 'y', value: 'y' },
        { label: 'z', value: 'z' },
      ],
    },  
    {
      placeholder: 'Ordered by',
      data: [
        { label: 'h', value: 'h' },
        { label: 'd', value: 'd' },
        { label: 'c', value: 'c' },
      ],
    },
    {
      placeholder: 'Entered by',
      data: [
        { label: 'l', value: 'l' },
        { label: 'd', value: 'd' },
        { label: 'e', value: 'e' },
      ],
    },
  ];

  const handleSubmit = async () => {
    const rObj = {
      pid: patient?.id,
      procedure: values[0],
      urgency: values[1],
      serviceProblem: values[2],
       // appropriateDate,
      // observed: true,
      consultation: values[3],
      provisionalDiagnosis: values[4],
      orderedBy: values[5],
      enteredBy: values[6],
      comments: comments,
    };
    if (values.length > 4) {
     labpro(dispatch, rObj)
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
                    // console.log(values);
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

export default AddTest;
