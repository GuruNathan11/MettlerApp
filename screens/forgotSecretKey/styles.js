import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    borderWidth: 0.6,
    padding: 10,
    width: '80%',
    height:hp(6),
    marginTop: 15,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  input: {
    fontSize: 20,
    width: '100%',
  },
});
