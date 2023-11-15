import {StyleSheet} from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  outerBtn: {
    // width: 150,
    height: heightPercentageToDP(20),
    marginHorizontal: '3%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBtn: {
    // width: 65,
    height: heightPercentageToDP(10),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 24,
    fontWeight: '600',
  },
  bottomText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: '5%',
  },
});
