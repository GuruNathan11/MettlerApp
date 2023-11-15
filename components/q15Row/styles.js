import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const boxWidth = (windowWidth - 40) / 4.4; // Assuming you want 4 boxes in a row
const boxHeight = boxWidth * 0.7; // Adjust the aspect ratio as needed

export const styles = StyleSheet.create({
  stampBox: {
    alignItems: 'center',
    // marginRight: 20, // Adjust this value to control spacing between stamp and box
  },
  stampBoxContainer: {
    // marginHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
  },
  stampText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  boxView: {
    // flexDirection: 'row',
    marginTop: 10,
  },
  boxWithData: {
    backgroundColor: '#BCD3F5',
    borderWidth: 0,
  },
  hourColumn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  hourText: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  box: {
    width: boxWidth,
    height: boxHeight,
    backgroundColor: '#F8FAFB',
    borderColor: '#6581BC',
    borderWidth: 2,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  boxText: {
    color: '#000',
  },
});
