import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {CalendarDate, ShiftTabs} from '../../components';
import DatePicker from 'react-native-date-picker';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShiftComponent from './ShiftComponent';
import {getAllTodayShifts, getShiftTimes} from '../../redux/apiCalls';
import {useDispatch, useSelector} from 'react-redux';

const Q15StaffConfiguration = () => {
  const dispatch = useDispatch();
  // const [duration, setDuration] = useState(null);
  // const [startTime, setStartTime] = useState(null);
  const AllShiftStaffs = useSelector(state => state.user.allShiftStaffs);
  const startTime = useSelector(state => state.user.startTime);
  const duration = useSelector(state => state.user.duration);
  const [date, setDate] = useState(new Date());
  const qYear = date.getFullYear().toString();
  const qMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const qDate = date.getDate().toString().padStart(2, '0');
  const RDate = qYear + qMonth + qDate;
  const [open, setOpen] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(3);
  const hoursArray = Array.from({length: 24}, (_, index) => index); // Create an array from 0 to 23
  const hoursSubarrays = [];
  for (let i = 0; i < hoursArray.length; i += 6) {
    hoursSubarrays.push(hoursArray.slice(i, i + 6));
  }
  const generateNextFourDates = () => {
    const today = new Date();
    const nextFourDates = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = new Date(date);
      nextDate.setDate(today.getDate() + i);
      nextFourDates.push(nextDate);
    }
    return nextFourDates;
  };
  const nextFourDates = generateNextFourDates();

  useEffect(() => {
    getShiftTimes(dispatch);
    getAllTodayShifts(dispatch, RDate);
  }, [date]); const endTime =
    (parseInt(startTime?.slice(0, 2)) + parseInt(duration))
      .toString()
      .padStart(2, '0') + ':00';
  const endTime1 =
    (parseInt(endTime?.slice(0, 2)) + parseInt(duration))
      .toString()
      .padStart(2, '0') + ':00';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Q15 Patient-Staff Configuration</Text>
      </View>
      {/* CALENDAR DATES */}
      <View style={styles.calendarHeader}>
        {nextFourDates.map((date1, index) => (
          <TouchableOpacity
            key={index}
            style={{borderWidth: 0}}
            activeOpacity={0.6}
            onPress={() => {
              setDate(date1);
              setSelectedDateIndex(index);
            }}>
            <CalendarDate
              bgColor={
                date.getDate() === date1.getDate() ? '#255ED6' : '#eef1f6'
              } // Set background color conditionally
              textColor={date.getDate() === date1.getDate() ? '#fff' : '#000'} // Set background color conditionally
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
            date={<MCIcon name="calendar-search" size={35} />}
            bgColor={selectedDateIndex > 5 ? '#2e6aea' : '#2e6aea'}
            textColor={'#fff'}
            noLine
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
      {/* SHIFT TABS */}
      <ShiftTabs
        FirstRoute={() => {
          const shiftName = 'Shift-A';
          const shift = AllShiftStaffs.find(
            shift => shift.shiftName === shiftName,
          );

          return (
            <ShiftComponent
              startTime={startTime}
              endTime={endTime}
              date={RDate}
              shiftName={shiftName}
              RNData={shift?.rnIncharge}
              SWData={shift?.schedule}
            />
          );
        }}
        SecondRoute={() => {
          const shiftName = 'Shift-B';
          const shift = AllShiftStaffs.find(
            shift => shift.shiftName === shiftName,
          );

          return (
            <ShiftComponent
              startTime={endTime}
              endTime={endTime1}
              date={RDate}
              shiftName={shiftName}
              RNData={shift?.rnIncharge}
              SWData={shift?.schedule}
            />
          );
        }}
        ThirdRoute={() => {
          const shiftName = 'Shift-C';
          const shift = AllShiftStaffs.find(
            shift => shift.shiftName === shiftName,
          );

          return (
            <ShiftComponent
              startTime={endTime1}
              endTime={startTime}
              date={RDate}
              shiftName={shiftName}
              RNData={shift?.rnIncharge}
              SWData={shift?.schedule}
            />
          );
        }}
      />
    </View>
  );
};

export default Q15StaffConfiguration;
