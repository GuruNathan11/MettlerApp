import {View, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';

const DashboardCard = ({title, data, onPress, outerBg, innerBg, txtColor,fullWidthed}) => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View
        style={[
          styles.outerBtn,
          {width: width / 2.5, backgroundColor: outerBg},
          fullWidthed&&{width:width/1.1}
        ]}>
        <View style={[styles.innerBtn, {backgroundColor: innerBg,width:width/4.5},fullWidthed&&{width:width/1.5}]}>
          <Text style={[styles.centerText, {color: txtColor}]}>{data}</Text>
        </View>
        <Text style={[styles.bottomText, {color: txtColor}]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DashboardCard;
