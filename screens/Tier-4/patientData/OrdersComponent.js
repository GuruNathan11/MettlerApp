import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
const OrdersComponent = ({navigation, patient}) => {
  const menuData = [
    {
      name: 'Procedure',
      //   color: '#E07F82',
      //   bg: '#FDF6F8',
      mIcon: require('../../../assets/images/procedure.png'),
      destination: 'Procedure',
    },
    {
      name: 'Imaging Procedure',
      //   color: '#3972ED',
      //   bg: '#E9F1FD',
      mIcon: require('../../../assets/images/iProcedure.png'),
      destination: 'ImagingProcedure',
    },
    {
      name: 'Lab Test',
      //   color: '#E9A960',
      //   bg: '#FCF6F0',
      mIcon: require('../../../assets/images/labTest.png'),
      destination: 'LabTest',
    },
    {
      name: 'Consult',
      //   color: '#6BB4A6',
      //   bg: '#EBF9EB',
      mIcon: require('../../../assets/images/consult.png'),
      destination: 'Consult',
    },
  ];
  return (
    <View style={{backgroundColor: '#fff', width: '90%', height: '90%'}}>
      <View style={styles.flatList}>
        <FlatList
          data={menuData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.pBtn}
              onPress={() => navigation.navigate(item.destination, {patient})}>
              <View style={styles.patientView}>
                {/* <View
                  style={{
                    backgroundColor: item.bg,
                    padding: 9,
                    borderRadius: 20,
                  }}>
                  <MCIcon name={item.mIcon} size={30} color={item.color} />
                </View> */}

                <Image source={item.mIcon} style={{width: 60, height: 60}} />
                <View style={styles.nameView}>
                  <Text style={styles.patientName}>{item.name}</Text>
                </View>
                <View style={styles.arrowView}>
                  {/* <Text style={styles.arrow}>＞</Text> */}
                  <MIcon name="arrow-forward-ios" size={25} color="#8d8d8d" />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default OrdersComponent;
