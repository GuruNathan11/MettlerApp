import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput} from 'react-native';
import {styles} from './styles';

const OtpBox = ({length = 6, onOtpChange}) => {
  const [otp, setOtp] = useState(Array.from({length}, () => ''));
  const otpBoxes = useRef([]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    if (value !== '') {
      if (index < length - 1) {
        otpBoxes.current[index + 1].focus();
      }
    }
    setOtp(newOtp);
    onOtpChange(newOtp.join(''));
  };

  const handleBackspace = (index, value) => {
    if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      if (index > 0) {
        otpBoxes.current[index - 1].focus();
      }
      setOtp(newOtp);
      onOtpChange(newOtp.join(''));
    }
  };
  useEffect(() => {
    otpBoxes.current[0].focus();
  }, []);

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          // secureTextEntry
          style={[styles.otpBox, value !== '' && styles.otpBoxFilled]}
          value={value}
          onChangeText={text => handleOtpChange(index, text)}
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(index, value);
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
          ref={ref => (otpBoxes.current[index] = ref)}
        />
      ))}
    </View>
  );
};

export default OtpBox;
