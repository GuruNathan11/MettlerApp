import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '2%',
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#FAF9FC',
    padding: 10,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0f3995',
  },
  calendarHeader: {
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  halfInputs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#8d8d8d',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    maxHeight: 50,
  },
  input: {
    fontSize: 20,
  },
  textInputContainer: {
    flexDirection: 'row', // Adjust the flexDirection as needed
    alignItems: 'center', // Adjust the alignItems as needed
    borderWidth: 0.4,
    borderColor: '#8d8d8d',
    padding: 5,
    width: '30%', // Adjust the width as needed
  },
  textInput: {
    color: '#0f3995',
    width: '100%', // Adjust the width as needed
  },
  dropDownView: {
    alignItems: 'center',
    marginVertical: '5%',
    backgroundColor: '#FFF',
    maxHeight: 50,
  },
  dropDown: {
    borderWidth: 0.7,
    padding: 6,
    borderRadius: 5,
    borderColor: '#8d8d8d',
    backgroundColor: '#FFF',
    width: '91%',
    maxHeight: 50,
  },
  flatList: {
    alignItems: 'center',
    marginVertical: '2%',
    marginHorizontal: '2%',
    padding: 10,
    backgroundColor: '#eef1f6',
    borderRadius: 20,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
    // borderWidth: 0.2,
  },
  flatListContainer: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  partialRoomView: {
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    marginLeft: -220,
    marginTop: '1%',
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#8d8d8d',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
