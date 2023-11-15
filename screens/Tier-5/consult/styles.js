// import {StyleSheet} from 'react-native';

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FFF"
  },
  patientView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Added alignItems to center content vertically
    // marginVertical: 5, // Adjust margin as needed
    padding: 20, // Added padding to create space between items
    borderWidth: 0.8,
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
    fontWeight: '300',
  },
  patientName: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  orgView: {
    backgroundColor: '#FFF',
    borderColor: '#65A455',
    borderWidth: 0.5,
    height: '60%',
    justifyContent: 'center',
    padding: 5,
    maxWidth: '30%',
  },
  orgName: {
    color: '#65A455',
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
    flex: 1,
    backgroundColor:"#FFF"
  },
});

