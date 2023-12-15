import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, FlatList, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { PatientHeader, CheckBox, Button } from '../../../components';
import DatePicker from 'react-native-date-picker';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getDropdowns, postAdmit } from '../../../redux/apiCalls';
import { Dropdown } from 'react-native-element-dropdown';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Available = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [reactDate, setReactDate] = useState(null);
  const [date1, setDate1] = useState(new Date());
  const [open1, setOpen1] = useState(false);
  const [observed, setObserved] = useState(true);
  const [historical, setHistorical] = useState(false);
  const [comments, setComments] = useState(null);
  const [values, setValues] = useState(Array(mappedData?.length).fill(null));
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const cameraRef = useRef(null);
  const [macAddress, setMacAddress] = useState(null);
  const [isFocusArray, setIsFocusArray] = useState(Array(mappedData?.length).fill(false));

  useEffect(() => {
  }, []);


  const mappedData = [
  ];

  const handleBeaconDevices = () => {
    setIsCameraOpen(true);
  };

  const handleBarCodeScanned = ({ data }) => {
    setMacAddress(data);
    setIsCameraOpen(false);
  };

  const handleSubmit = async () => {
    const rObj = {
      trackingDevice: false,
    };
    if (values.length > 4) {
      postAdmit(dispatch, rObj)
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
        onBack={() => {
          navigation.goBack();
        }}
        patientName="AvailableDevices"
        patientAge="Beacons"
      />
      <View style={{ alignItems: 'center', width: '100%' }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#000', fontSize: 19 }}>
          Assign a tracking Device to patient?
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <CheckBox
          circled
          label="Yes"
          checked={observed}
          onPress={() => {
            setObserved(true);
            setHistorical(false);
          }}
        />
        <CheckBox
          circled
          label="No"
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
          }}>
          <FlatList
            scrollEnabled={false}
            data={mappedData}
            renderItem={({ item, index }) => (
              <View style={styles.inputView}>
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
                  data={item.data}
                  maxHeight={300}
                  search
                  labelField="label"
                  valueField="value"
                  placeholder={item.placeholder}
                  searchPlaceholder="Search..."
                  value={values[index]}
                  onFocus={() => {
                    setIsFocusArray(prevState =>
                      prevState.map((isFocused, i) => (i === index ? true : isFocused)),
                    );
                  }}
                  onBlur={() => {
                    setIsFocusArray(prevState =>
                      prevState.map((isFocused, i) => (i === index ? false : isFocused)),
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
            )}
          />
          {/* <View style={[styles.inputView]}>
            <Pressable
              onPress={() => setOpen1(true)}
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 20 }}>
                Admission Date & Time
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
          </View> */}
          <View style={styles.boxContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={[styles.input, { backgroundColor: '#F0F0F0' }]}
                placeholder="Mac Address"
                value={macAddress}
                editable={false}
              />
            </View>
            <Pressable
              style={{
                backgroundColor: '#D7DEE5',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={handleBeaconDevices}
            >
              {isCameraOpen ? (
                <View style={styles.cameraContainer}>
                  <QRCodeScanner
                    onRead={handleBarCodeScanned}
                    reactivate={true}
                    reactivateTimeout={3000}
                    showMarker={true}
                    markerStyle={styles.cameraMarker}
                    containerStyle={styles.cameraPreview}
                  />
                </View>
              ) : (
                <>
                  <MCIcon name="qrcode-scan" size={20} color="#000" />
                  <Text style={{ color: '#000', fontSize: 16, marginLeft: 5 }}>Beacon Devices</Text>
                </>
              )}
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <Text>Hello</Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
        //   marginHorizontal: '3%',
        marginRight: '2%',
          marginBottom: '8%',
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate('Dashboard')} style={{backgroundColor: '#8d8d8d', padding: 15, paddingHorizontal: 15, borderRadius: 10}}>
            <Text style={{color: "#FFF", fontWeight: '600'}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={{backgroundColor: '#0f3995', padding: 10, paddingHorizontal: 15, borderRadius: 10}}>
            <Text style={{color: "#FFF", fontWeight: '600'}}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Available;
