import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: '2%',
  },
  box: {
    borderWidth: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(5.5),
    height: hp(3),
    backgroundColor: '#F9FAFC',
    borderRadius: 3,
  },
  txt: {
    fontSize: hp(2),
  },
});
