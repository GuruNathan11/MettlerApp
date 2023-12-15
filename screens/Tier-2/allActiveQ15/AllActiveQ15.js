// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Modal,
//   ScrollView,
//   Alert,
//   TextInput,
//   PermissionsAndroid
// } from 'react-native';
// import React, {useEffect, useRef, useState, useCallback} from 'react';
// import {styles} from './styles';
// import {useDispatch, useSelector} from 'react-redux';
// import Toast from 'react-native-simple-toast';
// import {Button, CheckBox, Loader} from '../../../components';
// import {
//   PostQ15Entry,
//   getAllPatients,
//   getAllTodayStaffs,
//   getCompletedQ15,
//   getIncompletedQ15,
//   getQ15Activity,
//   getQ15Location,
//   getShiftTimes,
// } from '../../../redux/apiCalls';
// import MIcon from 'react-native-vector-icons/MaterialIcons';
// import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {Dropdown} from 'react-native-element-dropdown';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BleManager } from 'react-native-ble-plx';
// import axios from 'axios';

// export const manager = new BleManager();
// let scanning = false;

// const requestPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
//         title: "Request for Location Permission",
//         message: "Bluetooth Scanner requires access to Fine Location Permission",
//         buttonNeutral: "Ask Me Later",
//         buttonNegative: "Cancel",
//         buttonPositive: "OK"
//       }
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   } catch (error) {
//     console.error('Error requesting location permission:', error);
//     return false;
//   }
// };

// const AllActiveQ15 = ({navigation}) => {
//   const date = new Date();

//   const [pid, setPid] = useState(null);
//   const [pname, setPname] = useState(null);
//   const [username, setUsername] = useState(null);
//   const [staffName, setStaffName] = useState(null);
//   const [staffID, setStaffID] = useState(null);
//   const [ok, setOk] = useState(false);
//   const [slot, setSlot] = useState(null);
//   const [stamp1, setStamp1] = useState(null);
//   const [stamp2, setStamp2] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);
//   const [isFocus1, setIsFocus1] = useState(false);
//   const [value, setValue] = useState('');
//   const [value1, setValue1] = useState('');
//   const [complete, setComplete] = useState(false);
//   const [breathCheck, setBreathCHeck] = useState(true);
//   const [notesCheck, setNotesCheck] = useState(false);
//   const [text, setText] = useState('');
//   const [inputHeight, setInputHeight] = useState(100); // Initial height
//   const inputRef = useRef(null);
//   const [logData, setLogData] = useState([]);
//   const [logCount, setLogCount] = useState(0);
//   const [scannedData, setScannedData] = useState([]);
//   const [allowedDeviceIds, setAllowedDeviceIds] = useState([]);
//   const [btState, setBtState] = useState("Unknown"); // Bluetooth state


//   const rssiThreshold = -100; // Adjust this value based on your specific needs

//   useEffect(() => {
//     startScanning();
//     manager.onStateChange(async (state) => {
//       console.log(state);
//       setBtState(state);
//       const newLogData = [...logData, state];
//       setLogCount(newLogData.length);
//       setLogData(newLogData); 
//     }, true);

//     // Fetch allowed device IDs from your API when the component mounts
//     fetchAllowedDeviceIds();
//   }, []);

//   const startScanning = async() => {
//     setBtState("Starting...");
//         const permission = await requestPermission();

//         if (permission) {
//           manager.startDeviceScan(null, { allowDuplicates: false }, handleDeviceDiscovery);
//           scanning = true;
//         } else {
//           console.error("Location permission denied.");
//           setBtState("Location Permission Denied");
//         }
//   }
//   const fetchAllowedDeviceIds = async () => {
//     try {
//       const apiResponse = await axios.get('http://47.32.254.89:7000/api/getAll');
//       const devices = apiResponse.data.data;
//       const deviceIds = devices.map((device) => device.deviceId.toLowerCase()); // Convert to lowercase for case-insensitive comparison
//       setAllowedDeviceIds(deviceIds);
//     } catch (error) {
//       console.error('Error fetching allowed device IDs:', error);
//     }
//   };

//   const handleDeviceDiscovery = async (error, device) => {
//     if (error) {
//       console.error(`BLE error: ${error}`);
//       return;
//     }

//     const deviceInfo = `${device.name} (MAC: ${device.id})`;
//     const rssi = device.rssi; // Received Signal Strength Indicator (RSSI)

//     console.log(`Found device: ${deviceInfo}, RSSI: ${rssi}`);

//     if (rssi >= rssiThreshold && allowedDeviceIds.includes(device.id.toLowerCase())) {
//       // Fetch device name from the API
//       const deviceName = await fetchDeviceName(device.id);
//       const matchingItem = incompletedData.find(item => item.beaconDevice === device.id);

//     if (matchingItem) {
//       // Update the state with the scanned data
//       setScannedData(prevData => [
//         ...prevData,
//         {
//           deviceId: device.id,
//           deviceName: deviceName,
//           timestamp: new Date(),
//           rssi: rssi
//         }
//       ]);
//     }
//       sendScannedDataToServer(deviceName, device.id, rssi);
//     }
//   };
//   const fetchDeviceName = async (deviceId) => {
//     try {
//       const apiUrl = `http://47.32.254.89:7000/api/getDevice/${deviceId}`;
//       const response = await axios.get(apiUrl);
//       // console.log("respo",response)
//       return response.data.deviceName; // Assuming the API response has a 'deviceName' property
//     } catch (error) {
//       console.error(`Error fetching device name for device ${deviceId}:`, error);
//       return null;
//     }
//   };

//   // const startScanning = async () => {
//   //   setBtState("Starting...");
//   //   const permission = await requestPermission();

//   //   if (permission) {
//   //     manager.startDeviceScan(null, { allowDuplicates: false }, handleDeviceDiscovery);
//   //     scanning = true;
//   //   } else {
//   //     console.error("Location permission denied.");
//   //     setBtState("Location Permission Denied");
//   //   }
//   // };

//   // const stopScanning = () => {
//   //   if (scanning) {
//   //     manager.stopDeviceScan();
//   //     scanning = false;
//   //     setBtState("Stopped");
//   //   }
//   // };

//   const sendScannedDataToServer = async (deviceName, deviceId, rssi) => {
//     try {
//       const serverUrl = 'http://47.32.254.89:7000/api/beacon/data';

//       const data = {
//         deviceName,
//         deviceId,
//         rssi,
//         timestamp: new Date(),
//       };

//       const response = await axios.post(serverUrl, data);
//       console.log('Data sent to server:', response.data);
//     } catch (error) {
//       console.error('Error sending data to the server:', error);
//     }
//   };


//   const fetchScannedData = useCallback(async () => {
//     try {
//       const response = await axios.get('http://47.32.254.89:7000/api/beacon/getAll');
//       setScannedData(response.data.data);
//     } catch (error) {
//       console.error('Error fetching scanned data:', error);
//     }
//   }, []);

//   const handleTextChange = inputText => {
//     setText(inputText);
//     const newHeight = Math.max(100, inputText.split('\n').length * 20); // Adjust the multiplier for your desired line height
//     setInputHeight(newHeight);
//   };
//   const time = new Date();
//   const dispatch = useDispatch();
//   const {pending} = useSelector(state => state.user);
//   const errorMsg = useSelector(state => state.user.error);
//   const completedData = useSelector(state => state.user.q15Completed);
//   const incompletedData = useSelector(state => state.user.q15Incompleted);
//   const todayStaffsData = useSelector(state => state.user.todayStaffs);
//   const TodayRN = useSelector(state => state.user.todayRN);
//   const duration = useSelector(state => state.user.duration);
//   const [shift, setShift] = useState(null);
//   function calculateShift(hour, duration) {
//     const endHour = hour + duration;
//     if ((hour >= 6 && hour <= 13) || (endHour >= 6 && endHour <= 13)) {
//       setShift(0);
//     } else if ((hour >= 14 && hour <= 21) || (endHour >= 14 && endHour <= 21)) {
//       setShift(1);
//     } else {
//       setShift(2);
//     }
//   }
//   const [currentIndex, setCurrentIndex] = useState(null);
//   function calculateCurrentIndex() {
//     if (shift === 0) {
//       if (date.getHours() < 8) {
//         setCurrentIndex(0);
//       } else if (date.getHours() < 10) {
//         setCurrentIndex(1);
//       } else if (date.getHours() < 12) {
//         setCurrentIndex(2);
//       } else if (date.getHours() < 14) {
//         setCurrentIndex(3);
//       }
//     } else if (shift === 1) {
//       if (date.getHours() < 16) {
//         setCurrentIndex(0);
//       } else if (date.getHours() < 18) {
//         setCurrentIndex(1);
//       } else if (date.getHours() < 20) {
//         setCurrentIndex(2);
//       } else if (date.getHours() < 22) {
//         setCurrentIndex(3);
//       }
//     } else if (shift === 2) {
//       if (date.getHours() >= 22 || date.getHours() < 1) {
//         setCurrentIndex(0);
//       } else if (date.getHours() < 2) {
//         setCurrentIndex(1);
//       } else if (date.getHours() < 4) {
//         setCurrentIndex(2);
//       } else if (date.getHours() < 6) {
//         setCurrentIndex(3);
//       }
//     }
//   }
//   const {q15Location, q15Activity} = useSelector(state => state.user);
//   const LocationData = q15Location ? [q15Location] : [];
//   const ActivityData = q15Activity ? [q15Activity] : [];

//   const transformedLocationData = LocationData[0]
//     ? Object.entries(LocationData[0]).map(([key, value]) => ({
//         label: `${value}`,
//         value: `${key}`,
//       }))
//     : [];

//   const transformedActivityData = ActivityData[0]
//     ? Object.entries(ActivityData[0]).map(([key, value]) => ({
//         label: `${value}`,
//         value: `${key}`,
//       }))
//     : [];

//   const calculateSlot = async time => {
//     const username = await AsyncStorage.getItem('username');
//     const staffName = await AsyncStorage.getItem('name');
//     const staffID = await AsyncStorage.getItem('staffID');
//     setStaffID(staffID);
//     setUsername(username);
//     setStaffName(staffName);
//     const hours = time.getHours();
//     const minutes = time.getMinutes();
//     const quarter = Math.floor(minutes / 15) + 1; // 1, 2, 3, 4
//     const slotCode = ['A', 'B', 'C', 'D'][Math.floor(minutes / 15)];
//     const paddedHours = hours.toString().padStart(2, '0');
//     const slotName = `${slotCode}${paddedHours}`;
//     setSlot(slotName);

//     const stamp1Hours = hours.toString().padStart(2, '0');
//     const stamp1Minutes = (quarter - 1) * 15;
//     const stamp1FormattedMinutes = stamp1Minutes.toString().padStart(2, '0');
//     setStamp1(`${stamp1Hours}${stamp1FormattedMinutes}`);

//     let stamp2Hours = hours;
//     let stamp2Minutes = stamp1Minutes + 15;
//     if (stamp2Minutes >= 60) {
//       stamp2Minutes -= 60;
//       stamp2Hours = (stamp2Hours + 1) % 24; // handle the case when stamp2Hours becomes 24
//     }
//     const stamp2FormattedHours = stamp2Hours.toString().padStart(2, '0');
//     const stamp2FormattedMinutes = stamp2Minutes.toString().padStart(2, '0');
//     setStamp2(`${stamp2FormattedHours}${stamp2FormattedMinutes}`);
//   };

//   useEffect(() => {
//     getAllPatients(dispatch);
//     getQ15Activity(dispatch);
//     getQ15Location(dispatch);
//     getShiftTimes(dispatch);
//     calculateShift(date.getHours(), duration);
//     // console.log(todayStaffsData);
//   }, []);
//   useEffect(() => {
//     console.log('useEffect for getAllTodayStaffs is running');
//     if (shift !== null) {
//       getAllTodayStaffs(dispatch, q15Date, shift);
//       calculateCurrentIndex();
//       console.log('getAllTodayStaffs invoked with shift:', shift);
//     }
//   }, [shift]);
//   useEffect(() => {
//     {
//       errorMsg &&
//         Toast.show(errorMsg, Toast.LONG, {backgroundColor: '#0f3995'});
//     }
//   }, [errorMsg]);
//   useEffect(() => {
//     const now = new Date();
//     const minutes = now.getMinutes();
//     const millisecondsUntilNextQuarterHour = (15 - (minutes % 15)) * 60 * 1000; // Calculate milliseconds until the next quarter-hour mark
//     calculateSlot(now);
//     const interval = setInterval(() => {
//       calculateSlot(new Date());
//       getAllPatients(dispatch);
//       getQ15Activity(dispatch);
//       getQ15Location(dispatch);
//       getShiftTimes(dispatch);
//       calculateShift(date.getHours(), duration);
//       console.log(todayStaffsData);
//       // calculateShift(date.getHours(), duration);
//       if (shift !== null) {
//         getAllTodayStaffs(dispatch, q15Date, shift);
//         calculateCurrentIndex();
//         console.log('getAllTodayStaffs invoked with shift:', shift);
//       }
//     }, millisecondsUntilNextQuarterHour);
//     return () => {
//       clearInterval(interval);
//     };
//   }, []);
//   useEffect(() => {
//     if (slot && q15Date) {
//       getCompletedQ15(dispatch, slot, q15Date);
//       getIncompletedQ15(dispatch, slot, q15Date);
//     }
//   }, [slot, q15Date, complete]);
//   const handlePatientPress = async (id, name) => {
//     try {
//       if (isStaffIDPresent || isMyIDPresent) {
//         setOk(true);
//         calculateSlot(time);
//         setPid(id);
//         setPname(name);
//       } else {
//         Alert.alert(
//           'Mettler Health Care',
//           'You have not access to do this action',
//         );
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const qYear = date.getFullYear().toString();
//   const qMonth = (date.getMonth() + 1).toString().padStart(2, '0');
//   const qDate = date.getDate().toString().padStart(2, '0');
//   const q15Date = qYear + qMonth + qDate;
//   const stamp = `${stamp1}-${stamp2}`;
//   const shiftName =
//     shift === 0 ? 'Shift-A' : shift === 1 ? 'Shift-B' : 'Shift-C';
//   const handleSubmit = async () => {
//     try {
//       if (value && value1) {
//         await PostQ15Entry(
//           pid,
//           value,
//           value1,
//           q15Date,
//           stamp,
//           slot,
//           username,
//           breathCheck,
//           text,
//           shiftName,
//           TodayRN,
//           dispatch,
//         );
//         setValue('');
//         setValue1('');
//         setOk(false);
//         setText('');
//         setBreathCHeck(true);
//         setNotesCheck(false);

//         Alert.alert('Data Saved');
//         setComplete(!complete);
//       } else {
//         alert('Please select the options');
//         console.log(slot);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const hours1 = stamp1 && parseInt(stamp1?.substr(0, 2));
//   const minutes1 = stamp1 && parseInt(stamp1?.substr(2, 2));
//   const hours2 = stamp2 && parseInt(stamp2.substr(0, 2));
//   const minutes2 = stamp2 && parseInt(stamp2.substr(2, 2));
//   const formattedTime1 =
//     (hours1 % 12 === 0 ? 12 : hours1 % 12) +
//     ':' +
//     (minutes1 < 10 ? '0' : '') +
//     minutes1 +
//     ' ' +
//     (hours1 < 12 ? 'AM' : 'PM');
//   const formattedTime2 =
//     (hours2 % 12 === 0 ? 12 : hours2 % 12) +
//     ':' +
//     (minutes2 < 10 ? '0' : '') +
//     minutes2 +
//     ' ' +
//     (hours2 < 12 ? 'AM' : 'PM');
//   const formattedTimeRange = formattedTime1 + ' to ' + formattedTime2;
//   const isStaffIDPresent =
//     todayStaffsData &&
//     todayStaffsData[currentIndex] &&
//     (todayStaffsData[currentIndex].staff1 === staffID ||
//       todayStaffsData[currentIndex].staff2 === staffID);

//   const isMyIDPresent = staffID === TodayRN;
//   return (
//     <View style={styles.container}>
//       <Loader
//         visible={pending}
//         color="#0f3995"
//         textStyle={{color: '#0f3995'}}
//       />
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Q15 Safety Check Routine</Text>
//         <MIcon name="search" size={30} />
//       </View>
//       <View style={styles.detailsBanner}>
//         <View style={styles.detailsBannerInner}>
//           <Text style={styles.detailsBannerTxt}>
//             {date.toLocaleDateString('en-US', {weekday: 'long'})}
//           </Text>
//           <Text style={styles.detailsBannerTxt2}>
//             {stamp1 && stamp2 ? formattedTimeRange : 'Reading Time...'}
//           </Text>
//         </View>
//         <Text style={styles.detailsBannerTxt}>
//           Entered By: {staffName ? staffName : 'Reading Profile'}
//         </Text>
//         <Text style={styles.detailsBannerTxt}>
//           Register Nurse: {TodayRN}
//         </Text>
//         {scannedData.map((data, index, item) => (
//   <View key={index}>
//     {data.deviceId === item.beaconDevice && (
//       <View>
//         <Text>{`Timestamp: ${data.timestamp}`}</Text>
//         <Text>{`RSSI: ${data.rssi}`}</Text>
//       </View>
//     )}
//   </View>
// ))}
//         {/* <TouchableOpacity
//           style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, margin: 10 }}
//           onPress={startScanning}
//           // disabled={scanning} // Disable the "Start Scanning" button when scanning is in progress
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>Start Scanning</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, margin: 10 }}
//           onPress={stopScanning}
//           // disabled={!scanning} // Disable the "Stop Scanning" button when scanning is not in progress
//         >
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop Scanning</Text>
//         </TouchableOpacity> */}
//       </View>
//       <ScrollView
//         keyboardShouldPersistTaps="always"
//         showsVerticalScrollIndicator={false}>
//         <Text style={styles.pendingHeader}>Pending</Text>
//         {incompletedData.length <= 0 ? (
//           <View style={styles.noDataView}>
//             <Text style={{marginTop: '2%'}}>
//               Every Q15 Form is completed for {formattedTimeRange}
//             </Text>
//             <TouchableOpacity
//               onPress={() => {
//                 setComplete(!complete);
//               }}
//               activeOpacity={0.8}
//               style={styles.reloadBtn}>
//               <Text style={{color: '#fff'}}>ReLoad</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View style={styles.flatList}>
//             <FlatList
//               scrollEnabled={false}
//               data={incompletedData}
//               showsVerticalScrollIndicator={false}
//               renderItem={({item, index}) => (
//                 <TouchableOpacity
//                   activeOpacity={0.8}
//                   style={styles.pBtn}
//                   onPress={() =>
//                     handlePatientPress(
//                       item.id,
//                       item.basicDetails[0].name[0].given +
//                         ' ' +
//                         item.basicDetails[0].name[0].family,
//                     )
//                   }>
//                   <View style={styles.patientView}>
//                     <View style={styles.patientProfile}>
//                       <MCIcon name="account" size={30} color="#8d8d8d" />
//                     </View>
//                     <View style={styles.nameView}>
//                       <Text style={styles.patientName}>
//                         {item.basicDetails[0].name[0].given
//                           .charAt(0)
//                           .toUpperCase() +
//                           item.basicDetails[0].name[0].given.slice(1) +
//                           ' ' +
//                           item.basicDetails[0].name[0].family}
//                       </Text>
//                       {/* <Text style={styles.patientUname}>{item.username}</Text> */}

//                       {scannedData.some((data) => data.deviceId === item.beaconDevice) && (
//             <View style={styles.scannedDataView}>
//               {scannedData
//                 .filter((data) => data.deviceId === item.beaconDevice)
//                 .map((matchingData, matchingIndex) => (
//                   <View key={matchingIndex}>
//                     <Text>{`Timestamp: ${matchingData.timestamp}`}</Text>
//                     <Text>{`RSSI: ${matchingData.rssi}`}</Text>
//                   </View>
//                 ))}
//             </View>
//           )}


//                       <Text style={styles.patientUname}>{item.beaconDevice}</Text>
//                     </View>
//                     <View style={styles.orgView}>
//                       <Text style={styles.orgName}>{item.assignedBed}</Text>
//                     </View>
//                     <View style={styles.arrowView}>
//                       <MIcon
//                         name="arrow-forward-ios"
//                         size={25}
//                         color="#8d8d8d"
//                       />
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         )}
//         <Text style={styles.completedHeader}>Completed</Text>
//         {completedData.length <= 0 ? (
//           <View style={styles.noCompletedDataView}>
//             <Text>
//               There is no Q15 Form is completed for {formattedTimeRange}
//             </Text>
//           </View>
//         ) : (
//           <View style={styles.flatList}>
//             <FlatList
//               scrollEnabled={false}
//               data={completedData}
//               showsVerticalScrollIndicator={false}
//               renderItem={({item, index}) => (
//                 <TouchableOpacity
//                   activeOpacity={0.8}
//                   style={styles.pBtn}
//                   onPress={()=>
//                     alert('the Registed sucessfully')
//                   }
//                   >
//                   <View style={styles.patientView}>
//                     <View style={styles.patientProfile}>
//                       <MCIcon name="account" size={30} color="#8d8d8d" />
//                     </View>
//                     <View style={styles.nameView}>
//                       <Text style={styles.patientName}>
//                         {item.basicDetails[0].name[0].given
//                           .charAt(0)
//                           .toUpperCase() +
//                           item.basicDetails[0].name[0].given.slice(1) +
//                           ' ' +
//                           item.basicDetails[0].name[0].family}
//                       </Text>
//                       {/* <Text style={styles.patientUname}>{item.username}</Text> */}

//                     </View>
//                     <View style={styles.orgView}>
//                       <Text style={styles.orgName}>{item.assignedBed}</Text>
//                     </View>
//                     <View style={styles.arrowView}>
//                       <MIcon
//                         name="arrow-forward-ios"
//                         size={25}
//                         color="#8d8d8d"
//                       />
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               )}
//             />
//           </View>
//         )}
//       </ScrollView>

//       {ok && (
//         <Modal
//           transparent={true}
//           visible={ok}
//           onRequestClose={() => setOk(false)}>
//           <TouchableOpacity
//             style={{
//               flex: 1,
//               backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay color
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             activeOpacity={1}>
//             <View style={styles.modalContainer}>
//               <View style={styles.modalHeader}>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     gap: 10,
//                     justifyContent: 'center',
//                   }}>
//                   <MCIcon name="account-circle" size={30} color="#8d8d8d" />
//                   <Text
//                     style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
//                     {pname.charAt(0).toUpperCase() + pname.slice(1)}
//                   </Text>
//                 </View>
//                 <TouchableOpacity
//                   activeOpacity={0.9}
//                   onPress={() => {
//                     setOk(false);
//                     setBreathCHeck(false);
//                     setNotesCheck(false);
//                     setValue(null);
//                     setValue1(null);
//                   }}>
//                   <MCIcon
//                     name="close-circle-outline"
//                     size={30}
//                     color="#8d8d8d"
//                   />
//                 </TouchableOpacity>
//               </View>
//               <View
//                 style={[
//                   styles.modalInputView,
//                   {backgroundColor: '#fff', padding: 6},
//                 ]}>
//                 <Dropdown
//                   data={transformedLocationData}
//                   search
//                   labelField="label"
//                   valueField="value"
//                   placeholder={!isFocus ? 'Select Location' : 'Select...'}
//                   searchPlaceholder="Search..."
//                   value={value}
//                   onFocus={() => {
//                     setIsFocus(true);
//                   }}
//                   onBlur={() => setIsFocus(false)}
//                   onChange={item => {
//                     setValue(item.value);
//                     setIsFocus(false);
//                   }}
//                 />
//               </View>
//               <View
//                 style={[
//                   styles.modalInputView,
//                   {backgroundColor: '#fff', padding: 6},
//                 ]}>
//                 <Dropdown
//                   data={transformedActivityData}
//                   search
//                   labelField="label"
//                   valueField="value"
//                   placeholder={!isFocus1 ? 'Select Activity' : 'Select...'}
//                   searchPlaceholder="Search..."
//                   value={value1}
//                   onFocus={() => {
//                     setIsFocus1(true);
//                   }}
//                   onBlur={() => setIsFocus1(false)}
//                   onChange={item => {
//                     setValue1(item.value);
//                     setIsFocus1(false);
//                     console.log(stamp1);
//                   }}
//                 />
//               </View>
//               <CheckBox
//                 checked={breathCheck}
//                 label="Breathing while asleep"
//                 onPress={() => {
//                   setBreathCHeck(!breathCheck);
//                 }}
//               />
//               <CheckBox
//                 checked={notesCheck}
//                 label="Notes/Remarks"
//                 onPress={() => {
//                   setNotesCheck(!notesCheck);
//                 }}
//               />
//               {notesCheck && (
//                 <View>
//                   <TextInput
//                     ref={inputRef}
//                     placeholder="Type your Notes/Remarks here..."
//                     onChangeText={handleTextChange}
//                     value={text}
//                     multiline={true}
//                     numberOfLines={4} // Initial number of lines
//                     style={[styles.modalNotesInput, {height: inputHeight}]}
//                   />
//                 </View>
//               )}
//               <View style={styles.modalBtnView}>
//                 <Button
//                   label="Cancel"
//                   cancel
//                   half
//                   onPress={() => {
//                     setOk(false);
//                     setBreathCHeck(true);
//                     setNotesCheck(false);
//                     setValue(null);
//                     setValue1(null);
//                   }}
//                 />
//                 <Button label="Save" active half onPress={handleSubmit} />
//               </View>
//             </View>
//           </TouchableOpacity>
//         </Modal>
//       )}
//     </View>
//   );
// };

// export default AllActiveQ15;



/*

Working code


*/



import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Alert,
  TextInput,
  PermissionsAndroid
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import { Button, CheckBox, Loader } from '../../../components';
import {
  PostQ15Entry,
  getAllPatients,
  getAllTodayStaffs,
  getCompletedQ15,
  getIncompletedQ15,
  getQ15Activity,
  getQ15Location,
  getShiftTimes,
} from '../../../redux/apiCalls';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BleManager } from 'react-native-ble-plx';
import axios from 'axios';

export const manager = new BleManager();
let scanning = false;

const formatTimestamp = (timestamp) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return new Date(timestamp).toLocaleString('en-US', options);
};

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: "Request for Location Permission",
      message: "Bluetooth Scanner requires access to Fine Location Permission",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

const AllActiveQ15 = ({ navigation }) => {
  const date = new Date();

  const [pid, setPid] = useState(null);
  const [pname, setPname] = useState(null);
  const [username, setUsername] = useState(null);

  
  const [staffName, setStaffName] = useState(null);
  const [staffID, setStaffID] = useState(null);
  const [ok, setOk] = useState(false);
  const [slot, setSlot] = useState(null);
  const [stamp1, setStamp1] = useState(null);
  const [stamp2, setStamp2] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [complete, setComplete] = useState(false);
  const [breathCheck, setBreathCHeck] = useState(true);
  const [notesCheck, setNotesCheck] = useState(false);
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(100); // Initial height
  const inputRef = useRef(null);
  const [logData, setLogData] = useState([]);
  const [logCount, setLogCount] = useState(0);
  const [scannedData, setScannedData] = useState([]);
  const [allowedDeviceIds, setAllowedDeviceIds] = useState([]);
  const [btState, setBtState] = useState("Unknown"); // Bluetooth state

  const detectedDevices = {};

  const rssiThreshold = -100; // Adjust this value based on your specific needs

  const [rssi, setRssi] = useState('');
const [timestamp, setTimestamp] = useState('');
const [deviceId, setDeviceId] = useState('');

  
  useEffect(() => {
    manager.onStateChange(async (state) => {
      console.log(state);
      setBtState(state);
      const newLogData = [...logData, state];
      setLogCount(newLogData.length);
      setLogData(newLogData);
    }, true);

    // Fetch allowed device IDs from your API when the component mounts
    fetchAllowedDeviceIds();
    // startScanning(); // Start scanning when the component mounts

    // return () => {
    //   stopScanning(); // Ensure scanning is stopped when the component unmounts
    // };
  }, []);

  const fetchAllowedDeviceIds = async () => {
    try {
      const apiResponse = await axios.get('http://47.32.254.89:7000/api/getAll');
      const devices = apiResponse.data.data;
      const deviceIds = devices.map((device) => device.deviceId.toLowerCase()); // Convert to lowercase for case-insensitive comparison
      setAllowedDeviceIds(deviceIds);
    } catch (error) {
      console.error('Error fetching allowed device IDs:', error);
    }
  };

  const handleDeviceDiscovery = async (error, device) => {
    if (error) {
      console.error(`BLE error: ${error}`);
      return;
    }

    const deviceInfo = `${device.name} (MAC: ${device.id})`;
    const rssi = device.rssi; // Received Signal Strength Indicator (RSSI)

    console.log(`Found device: ${deviceInfo}, RSSI: ${rssi}`);

    if (rssi >= rssiThreshold && allowedDeviceIds.includes(device.id.toLowerCase()) &&
      !detectedDevices[device.id]) {
      detectedDevices[device.id] = true;
      // Fetch device name from the API
      const deviceName = await fetchDeviceName(device.id);
      const matchingItem = incompletedData.find(item => item.beaconDevice === device.id);

      if (matchingItem) {
        // Update the state with the scanned data
        setScannedData(prevData => [
          ...prevData,
          {
            deviceId: device.id,
            deviceName: deviceName,
            timestamp: new Date(),
            rssi: rssi,
          }

        ]);
      }
      // console.log('Updated scannedData:', scannedData);
      sendScannedDataToServer(deviceName, device.id, rssi);
    }
  };
  const fetchDeviceName = async (deviceId) => {
    try {
      const apiUrl = `http://47.32.254.89:7000/api/getDevice/${deviceId}`;
      const response = await axios.get(apiUrl);
      // console.log("respo",response)
      return response.data.deviceName; // Assuming the API response has a 'deviceName' property
    } catch (error) {
      console.error(`Error fetching device name for device ${deviceId}:`, error);
      return null;
    }
  };

  const startScanning = async () => {
    setBtState("Starting...");
    const permission = await requestPermission();

    if (permission) {
      manager.startDeviceScan(null, { allowDuplicates: false }, handleDeviceDiscovery);
      scanning = true;
    } else {
      console.error("Location permission denied.");
      setBtState("Location Permission Denied");
    }
  };

  const stopScanning = () => {
    if (scanning) {
      manager.stopDeviceScan();
      scanning = false;
      setBtState("Stopped");
    }
  };

  const sendScannedDataToServer = async (deviceName, deviceId, rssi) => {
    try {
      const serverUrl = 'http://47.32.254.89:7000/api/beacon/data';

      const data = {
        deviceName,
        deviceId,
        rssi,
        timestamp: new Date(),
      };
     
      const response = await axios.post(serverUrl, data);
 
      console.log(response.data.deviceId)
      console.log('Data sent to server:', response.data);
    } catch (error) {
      console.error('Error sending data to the server:', error);
    }
  };

  const setScannedValues = (item) => {
    if (scannedData.some((data) => data.deviceId === item.beaconDevice)) {
      const matchingData = scannedData.find((data) => data.deviceId === item.beaconDevice);
  
      if (matchingData) {
        const { rssi, timestamp, deviceId } = matchingData;
  
        setRssi(rssi);
        console.log(rssi)
        setTimestamp(timestamp);
        setDeviceId(deviceId);
      }
    }
  };

  const fetchScannedData = useCallback(async () => {
    try {
      const response = await axios.get('http://47.32.254.89:7000/api/beacon/getAll');
      setScannedData(response.data.data);
    } catch (error) {
      console.error('Error fetching scanned data:', error);
    }
  }, []);

  const handleTextChange = inputText => {
    setText(inputText);
    const newHeight = Math.max(100, inputText.split('\n').length * 20); // Adjust the multiplier for your desired line height
    setInputHeight(newHeight);
  };
  const time = new Date();
  const dispatch = useDispatch();
  const { pending } = useSelector(state => state.user);
  const errorMsg = useSelector(state => state.user.error);
  const completedData = useSelector(state => state.user.q15Completed);
  const incompletedData = useSelector(state => state.user.q15Incompleted);
  const todayStaffsData = useSelector(state => state.user.todayStaffs);
  const TodayRN = useSelector(state => state.user.todayRN);
  const duration = useSelector(state => state.user.duration);
  const [shift, setShift] = useState(null);
  function calculateShift(hour, duration) {
    const endHour = hour + duration;
    if ((hour >= 6 && hour <= 13) || (endHour >= 6 && endHour <= 13)) {
      setShift(0);
    } else if ((hour >= 14 && hour <= 21) || (endHour >= 14 && endHour <= 21)) {
      setShift(1);
    } else {
      setShift(2);
    }
  }
  const [currentIndex, setCurrentIndex] = useState(null);
  function calculateCurrentIndex() {
    if (shift === 0) {
      if (date.getHours() < 8) {
        setCurrentIndex(0);
      } else if (date.getHours() < 10) {
        setCurrentIndex(1);
      } else if (date.getHours() < 12) {
        setCurrentIndex(2);
      } else if (date.getHours() < 14) {
        setCurrentIndex(3);
      }
    } else if (shift === 1) {
      if (date.getHours() < 16) {
        setCurrentIndex(0);
      } else if (date.getHours() < 18) {
        setCurrentIndex(1);
      } else if (date.getHours() < 20) {
        setCurrentIndex(2);
      } else if (date.getHours() < 22) {
        setCurrentIndex(3);
      }
    } else if (shift === 2) {
      if (date.getHours() >= 22 || date.getHours() < 1) {
        setCurrentIndex(0);
      } else if (date.getHours() < 2) {
        setCurrentIndex(1);
      } else if (date.getHours() < 4) {
        setCurrentIndex(2);
      } else if (date.getHours() < 6) {
        setCurrentIndex(3);
      }
    }
  }
  const { q15Location, q15Activity } = useSelector(state => state.user);
  const LocationData = q15Location ? [q15Location] : [];
  const ActivityData = q15Activity ? [q15Activity] : [];

  const transformedLocationData = LocationData[0]
    ? Object.entries(LocationData[0]).map(([key, value]) => ({
      label: `${value}`,
      value: `${key}`,
    }))
    : [];

  const transformedActivityData = ActivityData[0]
    ? Object.entries(ActivityData[0]).map(([key, value]) => ({
      label: `${value}`,
      value: `${key}`,
    }))
    : [];

  const calculateSlot = async time => {
    const username = await AsyncStorage.getItem('username');
    const staffName = await AsyncStorage.getItem('name');
    const staffID = await AsyncStorage.getItem('staffID');
    setStaffID(staffID);
    setUsername(username);
    setStaffName(staffName);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const quarter = Math.floor(minutes / 15) + 1; // 1, 2, 3, 4
    const slotCode = ['A', 'B', 'C', 'D'][Math.floor(minutes / 15)];
    const paddedHours = hours.toString().padStart(2, '0');
    const slotName = `${slotCode}${paddedHours}`;
    setSlot(slotName);

    const stamp1Hours = hours.toString().padStart(2, '0');
    const stamp1Minutes = (quarter - 1) * 15;
    const stamp1FormattedMinutes = stamp1Minutes.toString().padStart(2, '0');
    setStamp1(`${stamp1Hours}${stamp1FormattedMinutes}`);

    let stamp2Hours = hours;
    let stamp2Minutes = stamp1Minutes + 15;
    if (stamp2Minutes >= 60) {
      stamp2Minutes -= 60;
      stamp2Hours = (stamp2Hours + 1) % 24; // handle the case when stamp2Hours becomes 24
    }
    const stamp2FormattedHours = stamp2Hours.toString().padStart(2, '0');
    const stamp2FormattedMinutes = stamp2Minutes.toString().padStart(2, '0');
    setStamp2(`${stamp2FormattedHours}${stamp2FormattedMinutes}`);
  };

  useEffect(() => {
    getAllPatients(dispatch);
    getQ15Activity(dispatch);
    getQ15Location(dispatch);
    getShiftTimes(dispatch);
    calculateShift(date.getHours(), duration);
    // console.log(todayStaffsData);
  }, []);
  useEffect(() => {
    console.log('useEffect for getAllTodayStaffs is running');
    if (shift !== null) {
      getAllTodayStaffs(dispatch, q15Date, shift);
      calculateCurrentIndex();
      console.log('getAllTodayStaffs invoked with shift:', shift);
    }
  }, [shift]);
  useEffect(() => {
    {
      errorMsg &&
        Toast.show(errorMsg, Toast.LONG, { backgroundColor: '#0f3995' });
    }
  }, [errorMsg]);
  useEffect(() => {
    const now = new Date();
    const minutes = now.getMinutes();
    const millisecondsUntilNextQuarterHour = (15 - (minutes % 15)) * 60 * 1000; // Calculate milliseconds until the next quarter-hour mark
    calculateSlot(now);
    const interval = setInterval(() => {
      calculateSlot(new Date());
      getAllPatients(dispatch);
      getQ15Activity(dispatch);
      getQ15Location(dispatch);
      getShiftTimes(dispatch);
      calculateShift(date.getHours(), duration);
      console.log(todayStaffsData);
      // calculateShift(date.getHours(), duration);
      if (shift !== null) {
        getAllTodayStaffs(dispatch, q15Date, shift);
        calculateCurrentIndex();
        console.log('getAllTodayStaffs invoked with shift:', shift);
      }
    }, millisecondsUntilNextQuarterHour);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (slot && q15Date) {
      getCompletedQ15(dispatch, slot, q15Date);
      getIncompletedQ15(dispatch, slot, q15Date);
    }
  }, [slot, q15Date, complete]);
  const handlePatientPress = async (id, name) => {
    try {
      if (isStaffIDPresent || isMyIDPresent) {
        setOk(true);
        calculateSlot(time);
        setPid(id);
        setPname(name);
      } else {
        Alert.alert(
          'Mettler Health Care',
          'You have not access to do this action',
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const qYear = date.getFullYear().toString();
  const qMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const qDate = date.getDate().toString().padStart(2, '0');
  const q15Date = qYear + qMonth + qDate;
  const stamp = `${stamp1}-${stamp2}`;
  const shiftName =
    shift === 0 ? 'Shift-A' : shift === 1 ? 'Shift-B' : 'Shift-C';
  const handleSubmit = async () => {
    try {
      if (value && value1  ) {    
        console.log(rssi,timestamp,deviceId)   
        await PostQ15Entry(
          pid,
          value,
          value1,
          q15Date,
          stamp,
          slot,
          username,
          breathCheck,
          text,
          shiftName,
          TodayRN,
          dispatch,
          rssi, // Use the response data directly
          timestamp, // Use the response data directly
          deviceId
        );
        
        setValue('');
        setValue1('');
        setOk(false);
        setText('');
        setBreathCHeck(true);
        setNotesCheck(false);
        Alert.alert('Data Saved');
        setComplete(!complete);
      } else {
        alert('Please select the options');
        console.log(slot);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const hours1 = stamp1 && parseInt(stamp1?.substr(0, 2));
  const minutes1 = stamp1 && parseInt(stamp1?.substr(2, 2));
  const hours2 = stamp2 && parseInt(stamp2.substr(0, 2));
  const minutes2 = stamp2 && parseInt(stamp2.substr(2, 2));
  const formattedTime1 =
    (hours1 % 12 === 0 ? 12 : hours1 % 12) +
    ':' +
    (minutes1 < 10 ? '0' : '') +
    minutes1 +
    ' ' +
    (hours1 < 12 ? 'AM' : 'PM');
  const formattedTime2 =
    (hours2 % 12 === 0 ? 12 : hours2 % 12) +
    ':' +
    (minutes2 < 10 ? '0' : '') +
    minutes2 +
    ' ' +
    (hours2 < 12 ? 'AM' : 'PM');
  const formattedTimeRange = formattedTime1 + ' to ' + formattedTime2;
  const isStaffIDPresent =
    todayStaffsData &&
    todayStaffsData[currentIndex] &&
    (todayStaffsData[currentIndex].staff1 === staffID ||
      todayStaffsData[currentIndex].staff2 === staffID);

  const isMyIDPresent = staffID === TodayRN;
  return (
    <View style={styles.container}>
      <Loader
        visible={pending}
        color="#0f3995"
        textStyle={{ color: '#0f3995' }}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Q15 Safety Check Routine</Text>
        <MIcon name="search" size={30} />
      </View>
      <View style={styles.detailsBanner}>
        <View style={styles.detailsBannerInner}>
          <Text style={styles.detailsBannerTxt}>
            {date.toLocaleDateString('en-US', { weekday: 'long' })}
          </Text>
          <Text style={styles.detailsBannerTxt2}>
            {stamp1 && stamp2 ? formattedTimeRange : 'Reading Time...'}
          </Text>
        </View>
        <Text style={styles.detailsBannerTxt}>
          Entered By: {staffName ? staffName : 'Reading Profile'}
        </Text>
        <Text style={styles.detailsBannerTxt}>
          Register Nurse: Chris Jordan
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, margin: 10 }}
          onPress={startScanning}
        // disabled={scanning} // Disable the "Start Scanning" button when scanning is in progress
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Start Scanning</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, margin: 10 }}
          onPress={stopScanning}
        // disabled={!scanning} // Disable the "Stop Scanning" button when scanning is not in progress
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Stop Scanning</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.pendingHeader}>Pending</Text>
        {incompletedData.length <= 0 ? (
          <View style={styles.noDataView}>
            <Text style={{ marginTop: '2%' }}>
              Every Q15 Form is completed for {formattedTimeRange}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setComplete(!complete);
              }}
              activeOpacity={0.8}
              style={styles.reloadBtn}>
              <Text style={{ color: '#fff' }}>ReLoad</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.flatList}>
            <FlatList
              scrollEnabled={false}
              data={incompletedData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.pBtn}
                  onPress={() =>
                    handlePatientPress(
                      item.id,
                      item.basicDetails[0].name[0].given +
                      ' ' +
                      item.basicDetails[0].name[0].family,
                    )
                  }>
                  <View style={styles.patientView}>
                    <View style={styles.patientProfile}>
                      <MCIcon name="account" size={30} color="#8d8d8d" />
                    </View>
                    <View style={styles.nameView}>
                      <Text style={styles.patientName}>
                        {item.basicDetails[0].name[0].given
                          .charAt(0)
                          .toUpperCase() +
                          item.basicDetails[0].name[0].given.slice(1) +
                          ' ' +
                          item.basicDetails[0].name[0].family}
                      </Text>
                      {scannedData.some((data) => data.deviceId === item.beaconDevice) && (
                        <View style={styles.scannedDataView}>
                          {scannedData
                            .filter((data) => data.deviceId === item.beaconDevice)
                            .map((matchingData, matchingIndex) => (
                              <View key={matchingIndex} style={styles.rowContainer}>
                                <Text style={styles.rowText}>{` ${item.beaconDevice}`}</Text>
                                <Text style={styles.rowText}>{` ${formatTimestamp(matchingData.timestamp)}`}</Text>
                                <Text style={styles.rowText}>{`RSSI: ${matchingData.rssi}`}</Text>
                              </View>
                            ))}
                        </View>
                      )}

                    </View>
                    <View style={styles.orgView}>
                      <Text style={styles.orgName}>{item.assignedBed}</Text>
                    </View>
                    <View style={styles.arrowView}>
                      <MIcon
                        name="arrow-forward-ios"
                        size={25}
                        color="#8d8d8d"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
        <Text style={styles.completedHeader}>Completed</Text>
        {completedData.length <= 0 ? (
          <View style={styles.noCompletedDataView}>
            <Text>
              There is no Q15 Form is completed for {formattedTimeRange}
            </Text>
          </View>
        ) : (
          <View style={styles.flatList}>
            <FlatList
              scrollEnabled={false}
              data={completedData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.pBtn}
                  onPress={() =>
                    alert('the Registed sucessfully')
                  }
                >
                  <View style={styles.patientView}>
                    <View style={styles.patientProfile}>
                      <MCIcon name="account" size={30} color="#8d8d8d" />
                    </View>
                    <View style={styles.nameView}>
                      <Text style={styles.patientName}>
                        {item.basicDetails[0].name[0].given
                          .charAt(0)
                          .toUpperCase() +
                          item.basicDetails[0].name[0].given.slice(1) +
                          ' ' +
                          item.basicDetails[0].name[0].family}
                      </Text>
                      {/* <Text style={styles.patientUname}>{item.username}</Text> */}

                    </View>
                    <View style={styles.orgView}>
                      <Text style={styles.orgName}>{item.assignedBed}</Text>
                    </View>
                    <View style={styles.arrowView}>
                      <MIcon
                        name="arrow-forward-ios"
                        size={25}
                        color="#8d8d8d"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>

      {ok && (
        <Modal
          transparent={true}
          visible={ok}
          onRequestClose={() => setOk(false)}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay color
              justifyContent: 'center',
              alignItems: 'center',
            }}
            activeOpacity={1}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                  }}>
                  <MCIcon name="account-circle" size={30} color="#8d8d8d" />
                  <Text
                    style={{ fontSize: 20, fontWeight: 'bold', color: '#000' }}>
                    {pname.charAt(0).toUpperCase() + pname.slice(1)}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setOk(false);
                    setBreathCHeck(false);
                    setNotesCheck(false);
                    setValue(null);
                    setValue1(null);
                  }}>
                  <MCIcon
                    name="close-circle-outline"
                    size={30}
                    color="#8d8d8d"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.modalInputView,
                  { backgroundColor: '#fff', padding: 6 },
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
              <View
                style={[
                  styles.modalInputView,
                  { backgroundColor: '#fff', padding: 6 },
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
              <CheckBox
                checked={breathCheck}
                label="Breathing while asleep"
                onPress={() => {
                  setBreathCHeck(!breathCheck);
                }}
              />
              <CheckBox
                checked={notesCheck}
                label="Notes/Remarks"
                onPress={() => {
                  setNotesCheck(!notesCheck);
                }}
              />
              {notesCheck && (
                <View>
                  <TextInput
                    ref={inputRef}
                    placeholder="Type your Notes/Remarks here..."
                    onChangeText={handleTextChange}
                    value={text}
                    multiline={true}
                    numberOfLines={4} // Initial number of lines
                    style={[styles.modalNotesInput, { height: inputHeight }]}
                  />
                </View>
              )}
              <View style={styles.modalBtnView}>
                <Button
                  label="Cancel"
                  cancel
                  half
                  onPress={() => {
                    setOk(false);
                    setBreathCHeck(true);
                    setNotesCheck(false);
                    setValue(null);
                    setValue1(null);
                  }}
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

export default AllActiveQ15;