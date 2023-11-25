import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  patientView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     // Added alignItems to center content vertically
    // marginVertical: 5, // Adjust margin as needed
    padding: 20, // Added padding to create space between items
    borderWidth: 0.5,
    borderColor: '#d9d9d9',
  },

  nameView: {
    flex: 1, // Allow the nameView to take remaining horizontal space
    marginLeft: 10, // Adjust margin as needed
  },
  pBtn: {
    maxHeight: 100,
  },
  patientUname: {
    fontSize: 15,
    fontWeight: '200',
  },
  patientName: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 10,
  },
  orgView: {
    backgroundColor: '#DEF9EE',
    height: '60%',
    justifyContent: 'center',
    padding: 3,
    // marginTop: 10,
    maxWidth: '30%',
  },
  orgName: {
    color: '#4AAB92',
    fontSize: 12,
    marginHorizontal: 10,
  },
  arrowView: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  arrow: {
    fontSize: 30,
    fontWeight: '400',
  },
  flatList: {
    // marginBottom: '10%',
    flex: 1,
    justifyContent:"center"
    // paddingVertical: 10,
  },
});
