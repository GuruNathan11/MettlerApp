import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 70,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 0.17,
    borderRadius: 10,
    borderColor: '#8d8d8d',
  },
  dateView: {
    height: '55%',
  },
  dateText: {
    fontSize: 23,
    color: '#000',
    fontWeight: 'bold',
  },
  dayView: {
    borderTopWidth: 1,
    width: '100%',
    borderColor: '#ccc',
    padding:5
  },
  dayText: {
    textAlign: 'center',
    fontWeight: '200',
    color: '#000',
  },
});
