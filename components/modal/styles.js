import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '90%',
    left: '5%',
    padding: '5%',
    borderWidth: 1,
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeaderText: {
    fontWeight: 'bold',
    color: '#000',
  },
  modalDate: {
    marginVertical: 5,
  },
  modalLabel: {
    fontWeight: '300',
    color: '#000',
  },
  modalInputView: {
    borderWidth: 0.6,
    // padding: 2,
    marginBottom: 5,
    borderRadius: 3,
    backgroundColor: '#DBE5F2',
  },
});
