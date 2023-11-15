import React, {useMemo} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';

const Q15Row = ({onPressBox, hour, date}) => {
  const q15Config = useSelector(state => state.user.q15Config);
  const formattedDate = useMemo(() => {
    const Year = date.getFullYear().toString();
    const Month = (date.getMonth() + 1).toString().padStart(2, '0');
    const Date = date.getDate().toString().padStart(2, '0');
    return Year + Month + Date;
  }, [date]);

  const memoizedQ15Config = useMemo(() => q15Config || [], [q15Config]);

  return useMemo(
    () => (
      <View style={styles.boxView}>
        <FlatList
          data={[
            {
              id: '00',
              stamp: '0-15',
              code: 'A',
              mins: '00',
            },
            {
              id: '15',
              stamp: '15-30',
              code: 'B',
              mins: '15',
            },
            {
              id: '30',
              stamp: '30-45',
              code: 'C',
              mins: '30',
            },
            {
              id: '45',
              stamp: '45-60',
              code: 'D',
              mins: '45',
            },
          ]}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.stampBoxContainer}
          renderItem={({item}) => (
            <View style={styles.stampBox}>
              <TouchableOpacity
                style={[
                  styles.box,
                  memoizedQ15Config?.length > 0 &&
                  memoizedQ15Config.some(
                    configItem =>
                      configItem.q15Slot === item.code + hour &&
                      configItem.q15Date === formattedDate &&
                      configItem.location &&
                      configItem.activity,
                  )
                    ? styles.boxWithData
                    : null,
                ]}
                activeOpacity={0.8}
                disabled={memoizedQ15Config.some(
                  configItem =>
                    configItem.q15Slot === item.code + hour &&
                    configItem.q15Date === formattedDate &&
                    configItem.location &&
                    configItem.activity,
                )}
                onPress={
                  // memoizedQ15Config.some(
                  //   configItem =>
                  //     configItem.q15Slot === item.code + hour &&
                  //     configItem.q15Date === formattedDate &&
                  //     configItem.location &&
                  //     configItem.activity,
                  // )
                  //   ? () =>
                  //       Alert.alert(
                  //         'MettlerHealthCare',
                  //         `The ${item.code + hour} Slot is already registered`,
                  //       )
                  //   :
                  async () => await onPressBox(item.code + hour, item.id)
                }>
                {memoizedQ15Config.map(configItem => (
                  <View key={configItem.id}>
                    {configItem.q15Slot === item.code + hour &&
                      configItem.q15Date === formattedDate && (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            Alert.alert(
                              'Mettler Health Care Q15 Form',
                              `Date : ${configItem.q15Date}\nLocation : ${configItem.location}\nActivity : ${configItem.activity}\nEntered By : ${configItem.enteredBy}\nSlot Name : ${configItem.q15Slot}\nBreathing :${configItem.breathing}\nRemarks :${configItem.remarks}`,
                            );
                          }}>
                          <Text style={{color: '#5E7494', fontSize: 20}}>
                            {configItem.location}-{configItem.activity}
                          </Text>
                        </TouchableOpacity>
                      )}
                  </View>
                ))}
                <View>
                  <Text style={{color: '#415F9E'}}>
                    {hour}:{item.mins}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    ),
    [memoizedQ15Config, onPressBox, hour, formattedDate],
  );
};

export default Q15Row;
