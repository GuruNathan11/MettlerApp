import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginTop: hp(5),
  },
  inputView: {
    borderWidth: 0.6,
    padding: 2,
    width: '80%',
    marginTop: 15,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: hp(6),
  },
  input: {
    fontSize: 20,
    width: '100%',
  },
  link: {
    marginTop: '4%',
  },
  linkText: {
    fontSize: 16,
    color: '#0f3995',
  },
});
