import {View, Text} from 'react-native';
import React from 'react';
import {styles2} from './styles2';
import {CalendarDate, HeartECG, ScheduleBtn} from '../../../components';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
const PatientDetails2 = () => {
  return (
    <View style={styles2.container}>
      <View style={styles2.header}>
        <Text style={styles2.headerText}>Upcoming Schedule</Text>
        <View style={styles2.addIcon}>
          {/* <Text style={styles2.addIconText}>+</Text> */}
          <MCIcon name="plus" size={30} color="#fff" />
        </View>
      </View>
      <View style={styles2.calenderView}>
        <CalendarDate day="Wed" date={16} />
        <CalendarDate day="Thu" date={17} />
        <CalendarDate day="Fri" date={18} />
        <CalendarDate day="Sat" date={19} />
      </View>
      <View style={styles2.scheduleBtns}>
        <ScheduleBtn icon="yoga" header="Yoga" data="07:30-08:30" />
        <ScheduleBtn
          icon="head-check-outline"
          header="Generic Checkup"
          data="08:00-08:15"
        />
        <ScheduleBtn icon="food" header="Breakfast" data="08:30-09:00" />
      </View>
      <View style={styles2.activeOrders}>
        <View style={styles2.ordersHeader}>
          <Text>Active Orders</Text>
          <TouchableOpacity>
            <Text>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles2.orderContainer}>
          <Text>Order - 1</Text>
          <Text>Order - 2</Text>
          <Text>Order - 3</Text>
        </View>
      </View>
    </View>
  );
};

export default PatientDetails2;
