import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import {styles} from './styles';
import {
  PostQ15Entry,
  getAllTodayStaffs,
  getQ15Activity,
  getQ15Config,
  getQ15Location,
} from '../../../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  CalendarDate,
  PatientHeader,
  Q15Row,
  Tabs,
} from '../../../components';
import {Dropdown} from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Q15 = ({navigation, route}) => {
  const {patient} = route.params;

  const [date, setDate] = useState(new Date());
  const [username, setUsername] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stamp1, setStamp1] = useState('');
  const [slot, setSlot] = useState(null);
  const [shift, setShift] = useState(null);
  const [hours, setHours] = useState('00');
  const [boxNo, setBoxNo] = useState('');
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const {q15Load, q15Location, q15Activity} = useSelector(state => state.user);
  const LocationData = q15Location ? [q15Location] : [];
  const ActivityData = q15Activity ? [q15Activity] : [];

  const transformedLocationData = useMemo(() => {
    return LocationData[0]
      ? Object.entries(LocationData[0]).map(([key, value]) => ({
          label: `${value}`,
          value: `${key}`,
        }))
      : [];
  }, [LocationData]);

  const transformedActivityData = useMemo(() => {
    return ActivityData[0]
      ? Object.entries(ActivityData[0]).map(([key, value]) => ({
          label: `${value}`,
          value: `${key}`,
        }))
      : [];
  }, [ActivityData]);

  const q15ActAndLocNotFound =
    transformedLocationData.length === 0 ||
    transformedActivityData.length === 0;

  const dispatch = useDispatch();
  const determineShift = hours => {
    if (hours >= 6 && hours < 14) {
      setShift('Shift-A');
    } else if (hours >= 14 && hours < 22) {
      setShift('Shift-B');
    } else {
      setShift('Shift-C');
    }
  };
  useEffect(() => {
    getQ15Location(dispatch);
    getQ15Activity(dispatch);
  }, []);
  useEffect(() => {
    determineShift(hours);
  }, [hours]);

  const q15Time = hours + `${boxNo}`;
  const qYear = date.getFullYear().toString();
  const qMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const qDate = date.getDate().toString().padStart(2, '0');
  const q15Date = qYear + qMonth + qDate;
  const stamp = `${q15Time}-${q15Time.slice(0, 2)}${parseInt(boxNo) + 15}`;
  const pid = patient.id;

  useEffect(() => {
    getQ15Config(dispatch, patient.id, q15Date);
  }, [q15Load, q15Date]);
  const handleSubmit = async () => {
    const slot = stamp1;
    const TodayRN = '';
    if (value && value1) {
      await PostQ15Entry(
        pid,
        value,
        value1,
        q15Date,
        stamp,
        slot,
        username,
        true,
        null,
        shift,
        TodayRN,
        dispatch,
      );
      setValue('');
      setValue1('');
      setShowModal(false);
      alert('Data Saved');
    } else {
      alert('Please select the options');
    }
  };

  const [open, setOpen] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(3);
  const hoursArray = useMemo(
    () => Array.from({length: 24}, (_, index) => index),
    [],
  );
  const hoursSubarrays = useMemo(() => {
    const subarrays = [];
    for (let i = 0; i < hoursArray.length; i += 6) {
      subarrays.push(hoursArray.slice(i, i + 6));
    }
    return subarrays;
  }, [hoursArray]);

  const generateNextFourDates = () => {
    const today = new Date();
    const nextFourDates = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = new Date(date);
      nextDate.setDate(today.getDate() - i);
      nextFourDates.push(nextDate);
    }
    return nextFourDates;
  };
  const calculateSlot = async time => {
    const username = await AsyncStorage.getItem('username');
    setUsername(username);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const hourChar = String.fromCharCode(65 + hours); // A, B, C, ...
    const quarter = Math.floor(minutes / 15) + 1; // 1, 2, 3, 4

    const slotName = `${hourChar}${quarter.toString().padStart(2, '0')}`;
    setSlot(slotName);
  };

  useEffect(() => {
    calculateSlot(date);
  }, []);

  const nextFourDates = generateNextFourDates();
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Pressable
          style={{flexDirection: 'row'}}
          onPress={() => {
            navigation.removeListener();
            navigation.goBack();
          }}>
          <MIcon name="arrow-back" size={30} color="#fff" />
          <View
            style={{backgroundColor: '#8218', padding: 5, borderRadius: 15}}>
            <MCIcon name="account" size={30} color="#fff" />
          </View>
        </Pressable>
        <View>
          <Text style={styles.pName}>{patient.username}</Text>
          <Text style={{color: '#fff'}}>24 Yrs </Text>
        </View>
      </View> */}
      <PatientHeader
        onBack={() => {
          navigation.goBack();
        }}
        patientAge="24 Yrs"
        patientName={patient.username}
      />
      <View style={styles.calendarHeader}>
        {nextFourDates.reverse().map((date1, index) => (
          <TouchableOpacity
            key={index}
            style={{borderWidth: 0}}
            activeOpacity={0.6}
            onPress={() => {
              setDate(date1);
              setSelectedDateIndex(index);
            }}>
            <CalendarDate
              bgColor={date.getDate() === date1.getDate() ? '#0f3995' : '#fff'} // Set background color conditionally
              // bgColor={selectedDateIndex === index ? '#0f3995' : undefined} // Set background color conditionally
              textColor={date.getDate() === date1.getDate() ? '#fff' : '#000'} // Set background color conditionally
              // textColor={selectedDateIndex === index ? '#fff' : undefined} // Set background color conditionally
              date={date1.getDate()}
              day={date1
                .toLocaleString('default', {weekday: 'short'})
                .slice(0, 3)}
            />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}>
          <CalendarDate
            day={
              <>
                <MCIcon name="calendar-search" size={15} />
                <Text>
                  {date.toLocaleString('default', {month: 'short'}).slice(0, 3)}
                </Text>
              </>
            }
            date={date.getDate()}
            bgColor={selectedDateIndex > 5 ? '#2e6aea' : '#2e6aea'}
            textColor={'#fff'}
          />
        </TouchableOpacity>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="date"
          modal
          open={open}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setSelectedDateIndex(100);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      {/* <View style={styles.stampTextContainer}>
        <Text style={styles.stampText}>0-15</Text>
        <Text style={styles.stampText}>15-30</Text>
        <Text style={styles.stampText}>30-45</Text>
        <Text style={styles.stampText}>45-60</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {hoursArray.map(hour => (
          <Q15Row
            key={hour}
            hour={hour.toString().padStart(2, '0')}
            date={date}
            onPressBox={async (stamp, id) => {
              await AsyncStorage.setItem('stamp', stamp);
              setStamp1(stamp);
              setBoxNo(id);
              setHours(hour.toString().padStart(2, '0'));
              setShowModal(true);
              console.log(stamp1);
            }}
          />
        ))}
      </ScrollView> */}
      <Tabs
        FirstRoute={() => {
          return (
            <View>
              {hoursSubarrays[0].map(hour => (
                <Q15Row
                  key={hour}
                  hour={hour.toString().padStart(2, '0')}
                  date={date}
                  onPressBox={async (stamp, id) => {
                    await AsyncStorage.setItem('stamp', stamp);
                    setStamp1(stamp);
                    setBoxNo(id);
                    setHours(hour.toString().padStart(2, '0'));
                    setShowModal(true);
                    console.log(stamp1);
                  }}
                />
              ))}
            </View>
          );
        }}
        SecondRoute={() => {
          return (
            <View>
              {hoursSubarrays[1].map(hour => (
                <Q15Row
                  key={hour}
                  hour={hour.toString().padStart(2, '0')}
                  date={date}
                  onPressBox={async (stamp, id) => {
                    await AsyncStorage.setItem('stamp', stamp);
                    setStamp1(stamp);
                    setBoxNo(id);
                    setHours(hour.toString().padStart(2, '0'));
                    setShowModal(true);
                    console.log(stamp1);
                  }}
                />
              ))}
            </View>
          );
        }}
        ThirdRoute={() => {
          return (
            <View>
              {hoursSubarrays[2].map(hour => (
                <Q15Row
                  key={hour}
                  hour={hour.toString().padStart(2, '0')}
                  date={date}
                  onPressBox={async (stamp, id) => {
                    await AsyncStorage.setItem('stamp', stamp);
                    setStamp1(stamp);
                    setBoxNo(id);
                    setHours(hour.toString().padStart(2, '0'));
                    setShowModal(true);
                    console.log(stamp1);
                  }}
                />
              ))}
            </View>
          );
        }}
        FourthRoute={() => {
          return (
            <View>
              {hoursSubarrays[3].map(hour => (
                <Q15Row
                  key={hour}
                  hour={hour.toString().padStart(2, '0')}
                  date={date}
                  onPressBox={async (stamp, id) => {
                    await AsyncStorage.setItem('stamp', stamp);
                    setStamp1(stamp);
                    setBoxNo(id);
                    setHours(hour.toString().padStart(2, '0'));
                    setShowModal(true);
                    console.log(stamp1);
                  }}
                />
              ))}
            </View>
          );
        }}
      />
      {showModal && (
        <Modal
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay color
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={1}>
            {/* Your modal content */}
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>Enter Date and Time</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setShowModal(false)}>
                  <MCIcon name="close-circle-outline" size={30} />
                </TouchableOpacity>
              </View>
              <Text style={{color: '#000', marginLeft: widthPercentageToDP(3)}}>
                Slot Name : {stamp1}
              </Text>
              <View style={styles.modalDate}>
                <Text style={styles.modalLabel}>Date </Text>
                <View style={styles.modalInputView}>
                  <TextInput
                    value={date.toLocaleDateString()}
                    editable={false}
                    style={{color: '#000', marginLeft: widthPercentageToDP(3)}}
                  />
                </View>
              </View>
              <View style={{marginVertical: 5}}>
                <Text style={styles.modalLabel}>Time Period</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={[styles.modalInputView, {width: '45%'}]}>
                    <TextInput
                      style={{
                        color: '#000',
                        marginLeft: widthPercentageToDP(3),
                      }}
                      value={q15Time}
                      editable={false}
                    />
                  </View>
                  <View style={[styles.modalInputView, {width: '45%'}]}>
                    <TextInput
                      value={
                        boxNo < 44
                          ? `${q15Time.slice(0, 2)}${(parseInt(boxNo) + 15)
                              .toString()
                              .padStart(2, '0')}`
                          : `${(
                              parseInt(q15Time.slice(0, 2).padStart(2, '0')) + 1
                            )
                              .toString()
                              .padStart(2, '0')}00`
                      }
                      // value={`${q15Time.slice(0, 2)}${parseInt(boxNo) + 15}`}
                      editable={false}
                      style={{
                        color: '#000',
                        marginLeft: widthPercentageToDP(3),
                      }}
                    />
                  </View>
                </View>
              </View>

              <Text style={styles.modalLabel}>Entered By</Text>
              <View style={styles.modalInputView}>
                <TextInput
                  value={username}
                  editable={false}
                  style={{color: '#000', marginLeft: widthPercentageToDP(3)}}
                />
              </View>
              <Text style={styles.modalLabel}>Location</Text>
              <View
                style={[
                  styles.modalInputView,
                  {backgroundColor: '#fff', padding: 6},
                ]}>
                <Dropdown
                  data={transformedLocationData}
                  search
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Location' : 'Select...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => {
                    setIsFocus(true);
                  }}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              <Text style={styles.modalLabel}>Condition</Text>
              <View
                style={[
                  styles.modalInputView,
                  {backgroundColor: '#fff', padding: 6},
                ]}>
                <Dropdown
                  data={transformedActivityData}
                  search
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus1 ? 'Select Activity' : 'Select...'}
                  searchPlaceholder="Search..."
                  value={value1}
                  onFocus={() => {
                    setIsFocus1(true);
                  }}
                  onBlur={() => setIsFocus1(false)}
                  onChange={item => {
                    setValue1(item.value);
                    setIsFocus1(false);
                    console.log(stamp1);
                  }}
                />
              </View>

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'flex-end',
                }}>
                <Button
                  label="Cancel"
                  cancel
                  half
                  onPress={() => setShowModal(false)}
                />
                <Button label="Save" active half onPress={handleSubmit} />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default Q15;
