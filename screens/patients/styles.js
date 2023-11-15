import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    padding: 10,
    borderBottomColor: '#808080',
    marginLeft: '3%',
  },
  headerText: {
    fontSize: 25,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent:"center",
    // marginHorizontal: '5%',
    marginTop: '3%',
  },
  meterView: {
    width: '90%',
    height: '40%',
    backgroundColor: '#EEF2F8',
    margin: '4%',
    alignItems: 'center',
  },
  topText: {
    fontSize: 18,
    marginTop: '5%',
  },
  meter: {
    width: '50%',
  },
  needle: {
    position: 'absolute',
    top: 90,
    left: 150,
    width: '15%',
  },
});
