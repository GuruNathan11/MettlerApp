import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    width: '80%',
    marginHorizontal: 10,
  },
  otpBox: {
    width: 45,
    height: 45,
    // width: '15%',
    // height: '160%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#A6ABC8',
    textAlign: 'center',
    fontSize: 22,
    // marginRight: 10,
    marginHorizontal: 5,
    textAlignVertical: 'center',
  },
  otpBoxFilled: {
    borderColor: '#0f3995',
    borderWidth: 3, // Change color when filled
    borderRadius: 10,
  },
});
