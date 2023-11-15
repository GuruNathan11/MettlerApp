import {View, Text, Modal, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../primaryButton/Button';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {getQ15Location} from '../../redux/apiCalls';
const MyModal = ({
  OnCancelPress,
  OnSavePress,
  OnClosePress,
  slot,
  stamp1,
  stamp2,
  locationData,
  activityData,
}) => {
  const date = new Date();
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const username = useSelector(state => state.user.userInfo.username);
  
  return (
    // <Modal
    //   transparent={true}
    //   visible={showModal}
    //   onRequestClose={() => setShowModal(false)}>
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
          <TouchableOpacity activeOpacity={0.9} onPress={OnClosePress}>
            <MCIcon name="close-circle-outline" size={30} />
          </TouchableOpacity>
        </View>
        <Text style={{color: '#000'}}>Slot Name : {slot}</Text>
        <View style={styles.modalDate}>
          <Text style={styles.modalLabel}>Date </Text>
          <View style={styles.modalInputView}>
            <TextInput
              value={date.toLocaleDateString()}
              editable={false}
              style={{color: '#000'}}
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
                style={{color: '#000'}}
                value={stamp1}
                editable={false}
              />
            </View>
            <View style={[styles.modalInputView, {width: '45%'}]}>
              <TextInput
                value={stamp2}
                editable={false}
                style={{color: '#000'}}
              />
            </View>
          </View>
        </View>

        <Text style={styles.modalLabel}>Entered By</Text>
        <View style={styles.modalInputView}>
          <TextInput
            value={username}
            editable={false}
            style={{color: '#000'}}
          />
        </View>
        <Text style={styles.modalLabel}>Location</Text>
        <View
          style={[
            styles.modalInputView,
            {backgroundColor: '#fff', padding: 6},
          ]}>
          <Dropdown
            data={locationData}
            search
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Location' : 'Select...'}
            searchPlaceholder="Search..."
            //   value={value}
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
            data={activityData}
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
          <Button label="Cancel" cancel half onPress={OnCancelPress} />
          <Button label="Save" active half onPress={OnSavePress} />
        </View>
      </View>
    </TouchableOpacity>
    // </Modal>
  );
};

export default MyModal;
