import {View, Text, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import {styles} from './styles';
import MCicon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
const VitalBtn = ({label, icon, color, onPress, img}) => {
  const {width} = useWindowDimensions();
  return (
    <TouchableOpacity
      style={[styles.container, {width: width / 2.5}]}
      activeOpacity={0.8}
      onPress={onPress}>
      {img ? (
        <Image
          source={img}
          resizeMode="contain"
          style={{height: '26%', marginBottom: '8%'}}
        />
      ) : (
        <MCicon name={icon} size={30} color={color} />
      )}

      <Text style={styles.txtStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default VitalBtn;
