import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    borderWidth: 0.6,
    padding: 2,
    height: hp('5.8%'), // Use hp for responsive height
    maxHeight: 80,
    marginTop: hp('2%'), // Use hp for responsive margin
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: wp(90),
  },
  input: {
    fontSize: hp(2.5),
    width: '90%',
  },
  boxContainer: {
    backgroundColor: '#DEE4EA',
    width: wp(90),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 20
  },
});
