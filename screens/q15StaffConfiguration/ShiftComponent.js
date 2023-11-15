import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {styles} from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllRegisterNurse,
  getAllSocialWorkers,
  postQ15PSConfig,
} from '../../redux/apiCalls';
import {Button, CheckBox} from '../../components';

const ShiftComponent = ({
  startTime,
  endTime,
  date,
  shiftName,
  RNData,
  SWData,
}) => {
  const [RNIncharge, setRNIncharge] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [checkStates, setCheckStates] = useState(
    Array(StaffData?.length).fill(false),
  );
  const [isFocusStates, setIsFocusStates] = useState(
    Array(StaffData?.length).fill(false),
  );
  const [selectedDropdownValues, setSelectedDropdownValues] = useState(
    Array(StaffData?.length).fill(null),
  );

  const RegisteredNurseData = useSelector(state => state.user.registeredNurse);
  const SocialWorkersData = useSelector(state => state.user.socialWorkers);

  const hoursInDay = 24; // Total hours in a day
  const startHour = useMemo(
    () => parseInt(startTime?.slice(0, 2)),
    [startTime],
  );

  // Calculate endTime values with wrapping using useMemo
  const endTime1 = useMemo(
    () => ((startHour + 2) % hoursInDay).toString().padStart(2, '0') + ':00',
    [startHour, hoursInDay],
  );

  const endTime2 = useMemo(
    () =>
      ((parseInt(endTime1.slice(0, 2)) + 2) % hoursInDay)
        .toString()
        .padStart(2, '0') + ':00',
    [endTime1, hoursInDay],
  );

  const endTime3 = useMemo(
    () =>
      ((parseInt(endTime2.slice(0, 2)) + 2) % hoursInDay)
        .toString()
        .padStart(2, '0') + ':00',
    [endTime2, hoursInDay],
  );

  const endTime4 = useMemo(
    () =>
      ((parseInt(endTime3.slice(0, 2)) + 2) % hoursInDay)
        .toString()
        .padStart(2, '0') + ':00',
    [endTime3, hoursInDay],
  );

  const StaffData = [
    {id: 0, value: `${startTime}-${endTime1}`},
    {id: 1, value: `${endTime1}-${endTime2}`},
    {id: 2, value: `${endTime2}-${endTime3}`},
    {id: 3, value: `${endTime3}-${endTime4}`},
  ];

  const handleCheckChange = index => {
    const newCheckStates = [...checkStates];
    newCheckStates[index] = !newCheckStates[index];
    setCheckStates(newCheckStates);
  };

  const handleFocusChange = index => {
    const newFocusStates = [...isFocusStates];
    newFocusStates[index] = !newFocusStates[index];
    setIsFocusStates(newFocusStates);
  };

  const formattedNurseData = [];
  let formattedSocialWOrkersData = [];

  RegisteredNurseData?.forEach(item => {
    const label = `${item.name[0].given} ${item.name[0].use} ${item.name[0].family}`;
    const value = item.id;
    formattedNurseData.push({label, value});
  });

  SocialWorkersData?.forEach(item => {
    const label = `${item.name[0].given} ${item.name[0].use} ${item.name[0].family}`;
    const value = item.id;
    formattedSocialWOrkersData.push({label, value});
  });

  const dispatch = useDispatch();

  useEffect(() => {
    getAllRegisterNurse(dispatch);
    getAllSocialWorkers(dispatch);
    RNData && setRNIncharge(RNData);
    // console.log(RNData);
  }, [RNData, SWData]);

  useEffect(() => {
    if (SWData) {
      const newSelectedValues = SWData.map(item => item.staff1);
      setSelectedDropdownValues(newSelectedValues);
      const next = SWData.map(item => item.staff2);
      setSelectedDropdownValues(prevValues => [...prevValues, ...next]);
    }
  }, [SWData]);

  // useEffect(() => {
  //   console.log(selectedDropdownValues[0]);
  // }, [selectedDropdownValues]);

  const renderDropdown = (item, index) => {
    // Filter the options to exclude the selected value from previous dropdowns
    const filteredOptions = formattedSocialWOrkersData.filter(option => {
      return (
        !selectedDropdownValues.slice(0, index).includes(option.value) ||
        option.value === selectedDropdownValues[index]
      );
    });

    // Determine if this dropdown should be disabled
    const isDisabled = index > 0 && !selectedDropdownValues[index - 1];

    return (
      <Dropdown
        style={[styles.dropDown, {marginTop: '5%', width: '60%'}]}
        data={filteredOptions}
        labelField="label"
        valueField="value"
        placeholder={!isFocusStates[index] ? 'Social Worker' : 'Select...'}
        searchPlaceholder="Search..."
        value={selectedDropdownValues[index]}
        // disable={isDisabled} // Disable dropdown if the previous one is not selected
        onFocus={() => {
          handleFocusChange(index);
        }}
        onBlur={() => handleFocusChange(index)}
        onChange={item => {
          const newSelectedValues = [...selectedDropdownValues];
          newSelectedValues[index] = item.value;
          setSelectedDropdownValues(newSelectedValues);
          handleFocusChange(index);
        }}
      />
    );
  };
  const handleSubmit = async () => {
    try {
      if (RNIncharge && selectedDropdownValues.length >= 3) {
        postQ15PSConfig(dispatch, {
          date,
          shift: [
            {
              shiftName,
              rnIncharge: RNIncharge,
              startTime,
              endTime,
              schedule: [
                {
                  time: StaffData[0].value,
                  staff1: selectedDropdownValues[0],
                  staff2: selectedDropdownValues[4],
                },
                {
                  time: StaffData[1].value,
                  staff1: selectedDropdownValues[1],
                  staff2: selectedDropdownValues[5],
                },
                {
                  time: StaffData[2].value,
                  staff1: selectedDropdownValues[2],
                  staff2: selectedDropdownValues[6],
                },
                {
                  time: StaffData[3].value,
                  staff1: selectedDropdownValues[3],
                  staff2: selectedDropdownValues[7],
                },
              ],
            },
          ],
        });
      } else {
        Alert.alert(
          'Mettler Health Care',
          'Please Select remaining social workers',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.halfInputs}>
        <View style={[styles.inputView, {width: '42%'}]}>
          <TextInput
            style={[styles.input, {color: '#0f3995', marginHorizontal: 10}]}
            value={startTime}
            editable={false}
          />
          <MCIcon
            name="clock-edit-outline"
            size={20}
            color="#8d8d8d"
            style={{marginHorizontal: 10}}
          />
        </View>
        <View style={[styles.inputView, {width: '42%'}]}>
          <TextInput
            style={[styles.input, {color: '#0f3995', marginHorizontal: 10}]}
            value={endTime}
            editable={false}
          />
          <MCIcon
            name="clock-edit-outline"
            size={20}
            color="#8d8d8d"
            style={{marginHorizontal: 10}}
          />
        </View>
      </View>
      <View style={styles.dropDownView}>
        <Dropdown
          style={styles.dropDown}
          data={formattedNurseData}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'RN Incharge' : 'Select...'}
          searchPlaceholder="Search..."
          value={RNIncharge}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setRNIncharge(item.value);
            setIsFocus(false);
          }}
        />
      </View>
      <FlatList
        data={StaffData}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <View style={styles.flatList}>
            <View style={styles.flatListContainer}>
              {/* <View
                  style={{
                    borderWidth: 0.5,
                    padding: 10,
                    height: 30,
                    marginTop: '6%',
                    borderColor: '#8d8d8d',
                    justifyContent: 'center',
                  }}> */}
              <View style={{marginTop: '5%'}}>
                <TextInput
                  value={item.value}
                  editable={false}
                  style={{
                    color: '#0f3995',
                    backgroundColor: '#FFF',
                    borderWidth: 0.4,
                    borderRadius: 5,
                    padding: 5, // Adjust this value to control horizontal padding
                    paddingVertical: 13, // Adjust this value to control vertical padding
                    width: '60%', // Adjust the width as needed
                    maxHeight: 50,
                    textAlign: 'center',
                  }}
                />
              </View>
              {/* </View> */}
              {renderDropdown(item, index)}
            </View>
            <View style={styles.partialRoomView}>
              <CheckBox
                checked={checkStates[index]}
                label="Partial Rooms?"
                onPress={() => {
                  handleCheckChange(index);
                }}
              />
            </View>
            {checkStates[index] && (
              <View
                style={{
                  width: '140%',
                  alignItems: 'center',
                  marginTop: '-5%',
                  marginRight: '12%',
                }}>
                {/* <View
                    style={[
                      styles.inputView,
                      {width: '42%', marginHorizontal: '3%', marginTop: '5%'},
                    ]}>
                    <TextInput placeholder="1st RN" style={styles.input} />
                  </View>
                  <View
                    style={[
                      styles.inputView,
                      {width: '42%', marginHorizontal: '3%', marginTop: '5%'},
                    ]}>
                    <TextInput placeholder="2nd RN" style={styles.input} />
                  </View> */}
                {renderDropdown(item, index + 4)}
              </View>
            )}
          </View>
        )}
      />
      <View style={{alignItems: 'center'}}>
        <Button label="Submit" active onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default ShiftComponent;
