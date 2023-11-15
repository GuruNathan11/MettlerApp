import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: hp(107),
    // flex:1
  },
  header: {
    marginTop: '10%',
    alignItems: 'center',
  },
  headerImage: {
    width: wp('70%'),
    height: '60%',
  },
  topContainer: {
    height: hp('50%'),
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  loginContainer: {
    position: 'absolute',
    height: hp('50%'),
    width: '90%',
    top: hp('20%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  helloText: {
    fontWeight: '700',
    color: 'rgb(65, 80, 118)',
    fontSize: hp(4),
    marginTop: hp('3%'),
  },
  subText: {
    fontSize: hp(2.5),
    marginVertical: hp(3),
    color: 'rgb(65, 80, 118)',
  },
  // inputView: {
  //   borderWidth: 0.6,
  //   padding: 2,
  //   //new code starts
  //   height: hp("6%"),
  //   //new code ends
  //   maxHeight: 80,
  //   marginTop: 15,
  //   borderRadius: 6,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  // },
  inputView: {
    borderWidth: 0.6,
    padding: 2,
    height: hp('6%'), // Use hp for responsive height
    maxHeight: 80,
    marginTop: hp('2%'), // Use hp for responsive margin
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  inputIcon: {
    marginHorizontal: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: '4%',
    top: hp(1),
  },

  input: {
    fontSize: hp(2.5),
    width: '90%',
  },
  subLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btnView: {
    backgroundColor: '#0f3995',
    paddingVertical: hp(2), // Use hp for responsive padding
    maxHeight: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    top: 20,
    borderRadius: 6,
    position: 'relative',
  },

  btnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: hp(2),
  },
  errorText: {
    color: 'red',
  },
});
