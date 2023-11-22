import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, TextInput, Pressable, Text } from 'react-native';
import { styles } from './styles';
import { Dropdown } from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Button, CheckBox, PatientHeader } from '../../../components';
import {
   getPatientVisit,
   labConsult,
   getDropdowns,
} from '../../../redux/apiCalls';
import { ScrollView } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

const AddConsult = ({ navigation, route }) => {
  const { patient } = route.params;
  const dispatch = useDispatch();
  const lastVisitId = useSelector((state) => state.user.lastVisitId);
  const username = useSelector((state) => state.user.userInfo.username);
  const [observed, setObserved] = useState(true);
  const [historical, setHistorical] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [enteredDate, setEnteredDate] = useState(null);
  const [reactDate, setReactDate] = useState(null);
  const [comments, setComments] = useState(null);
  const allergyNames = useSelector((state) => state.user.allergyNames);
  const [values, setValues] = useState(
    Array(mappedData?.length).fill(null)
  );
  const [isFocusArray, setIsFocusArray] = useState(
    Array(mappedData?.length).fill(false)
  );

  useEffect(() => {
    getPatientVisit(dispatch, patient.id); 
  }, []);

  const allergyData = allergyNames.map((item) => ({
    label: item.value,
    value: item.id,
  }));

  const mappedData = [
    {
      placeholder: 'Service/Speciality',
      data: [
        { label: 'Normal', value: 'Normal' },
        { label: 'Mild', value: 'Mild' },
        { label: 'Severe', value: 'Severe' },
      ],
    },
    {
      placeholder: 'Urgency',
      data: [
        { label: 'Project Management Levels', value: 'Project Management Levels' },
        { label: 'Critical/Urgent', value: 'Critical/Urgent' },
        { label: 'High Priority', value: 'High Priority' },
        { label: 'Medium Priority', value: 'Medium Priority' },
        { label: 'Low Priority', value: 'Low Priority' },
        { label: 'Routine/Non-Urgent', value: 'Routine/Non-Urgent' },
      ],
    },
    {
      placeholder: 'Attention',
      data: [
        { label: 'Normal', value: 'Normal' },
        { label: 'Mild', value: 'Mild' },
        { label: 'Severe', value: 'Severe' },
      ],
    },
    {
      placeholder: 'Earliest appropriate date',
      data: [
        { label: 'Normal', value: 'Normal' },
        { label: 'Mild', value: 'Mild' },
        { label: 'Severe', value: 'Severe' },
      ],
    },
    
    {
      placeholder: 'Place of Consultation',
      data:  [
        { label: 'Normal', value: 'Normal' },
        { label: 'Mild', value: 'Mild' },
        { label: 'Severe', value: 'Severe' },
      ],
    },
    {
        placeholder: 'Provisional Diagnosis',
        data:  [
          { label: 'Normal', value: 'Normal' },
          { label: 'Mild', value: 'Mild' },
          { label: 'Severe', value: 'Severe' },
        ],
      },  
      {
        placeholder: 'Ordered by',
        data: [
          { label: 'Normal', value: 'Normal' },
          { label: 'Mild', value: 'Mild' },
          { label: 'Severe', value: 'Severe' },
        ],
      },
      {
        placeholder: 'Entered by',
        data: [
          { label: 'Normal', value: 'Normal' },
          { label: 'Mild', value: 'Mild' },
          { label: 'Severe', value: 'Severe' },
        ],
      },
  ];

  const handleSubmit = async () => {
    const rObj = {
      pid: patient?.id,
      speciality: values[0],
      urgency: values[1],
      serviceProblem:values[2],
      appropriateDate:values[8],
      // observed:true ,
      placeOfConsultation: values[3],
      provisionalDiagnosis:values[4],
      orderedBy: values[5],
      enteredBy: values[6],
      comments: comments,
    };
    if (values.length > 4) {
      labConsult(dispatch, rObj)
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
      patientName={patient?.username}
    />
  
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        width: wp(100),
        alignItems: 'center',
      }}
    >
      {mappedData.slice(0, 4).map((data, index) => (
        <View key={index} style={styles.inputView}>
          <Dropdown
            style={[
              styles.input,
              { padding: 3 },
              isFocusArray[index] && { borderColor: '#0f3995' },
            ]}
            placeholderStyle={{
              marginLeft: wp(2),
              fontSize: hp(2.5),
              color: '#8d8d8d',
            }}
            selectedTextStyle={{ marginLeft: '3%' }}
            iconStyle={{ marginRight: '-10%' }}
            data={data.data}
            maxHeight={300}
            search
            labelField="label"
            valueField="value"
            placeholder={data.placeholder}
            searchPlaceholder="Search..."
            value={values[index]}
            onFocus={() => {
              setIsFocusArray((prevState) =>
                prevState.map((isFocused, i) =>
                  i === index ? true : isFocused
                )
              );
            }}
            onBlur={() => {
              setIsFocusArray(prevState =>
                prevState.map((isFocused, i) =>
                  i === index ? false : isFocused,
                ),
              );
            }}
            onChange={selectedItem => { 
              const newValues = [...values];
              newValues[index] = selectedItem.value;
              setValues(newValues);
              console.log(values);
            }}
          />
        </View>
      ))}
   <View style={{ alignItems: 'center', width: '100%' }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#000', fontSize:19 }}>
          Patient will be seen as an
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
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
  
      {mappedData.slice(4, 6).map((data, index) => (
        <View key={index} style={styles.inputView}>
          <Dropdown
            style={[
              styles.input,
              { padding: 3 },
              isFocusArray[index + 4] && { borderColor: '#0f3995' },
            ]}
            placeholderStyle={{
              marginLeft: wp(2),
              fontSize: hp(2.5),
              color: '#8d8d8d',
            }}
            selectedTextStyle={{ marginLeft: '3%' }}
            iconStyle={{ marginRight: '-10%' }}
            data={data.data}
            maxHeight={300}
            search
            labelField="label"
            valueField="value"
            placeholder={data.placeholder}
            searchPlaceholder="Search..."
            value={values[index + 4]}
            onFocus={() => {
              setIsFocusArray((prevState) =>
                prevState.map((isFocused, i) =>
                  i === index + 4 ? true : isFocused
                )
              );
            }}
            onBlur={() => {
              setIsFocusArray((prevState) =>
                prevState.map((isFocused, i) =>
                  i === index + 4 ? false : isFocused
                )
              );
            }}
            onChange={(selectedItem) => {
              const newValues = [...values];
              newValues[index + 4] = selectedItem.value;
              setValues(newValues);
            }}
          />
        </View>
      ))}
  
      {mappedData.slice(6, 8).map((data, index) => (
        <View key={index} style={styles.inputView}>
          <Dropdown
            style={[
              styles.input,
              { padding: 3 },
              isFocusArray[index + 6] && { borderColor: '#0f3995' },
            ]}
            placeholderStyle={{
              marginLeft: wp(2),
              fontSize: hp(2.5),
              color: '#8d8d8d',
            }}
            selectedTextStyle={{ marginLeft: '3%' }}
            iconStyle={{ marginRight: '-10%' }}
            data={data.data}
            maxHeight={300}
            search
            labelField="label"
            valueField="value"
            placeholder={data.placeholder}
            searchPlaceholder="Search..."
            value={values[index + 6]}
            onFocus={() => {
              setIsFocusArray((prevState) =>
                prevState.map((isFocused, i) =>
                  i === index + 6 ? true : isFocused
                )
              );
            }}
            onBlur={() => {
              setIsFocusArray((prevState) =>
                prevState.map((isFocused, i) =>
                  i === index + 6 ? false : isFocused
                )
              );
            }}
            onChange={(selectedItem) => {
              const newValues = [...values];
              newValues[index + 6] = selectedItem.value;
              setValues(newValues);
            }}
          />
        </View>
      ))}
      
      <View style={[styles.inputView]}>
        <TextInput
          style={styles.input}
          placeholder="Add Comment"
          value={comments}
          onChangeText={(text) => {
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
      }}
    >
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

export default AddConsult;