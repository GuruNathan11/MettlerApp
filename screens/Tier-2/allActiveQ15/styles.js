import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.7,
    padding: 10,
    borderBottomColor: '#808080',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    marginLeft: '15%',
    fontWeight: '900',
    color: '#0f3995',
  },
  detailsBanner: {
    backgroundColor: '#F8FAFB',
    padding: 10,
  },
  detailsBannerInner: {
    flexDirection: 'row',
  },
  detailsBannerTxt: {
    color: '#000',
    padding: 5,
  },
  detailsBannerTxt2: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderWidth: 0.3,
    borderColor: '#D8DFE2',
    color: '#000',
    paddingHorizontal: 10,
  },
  pendingHeader: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 25,
    color: '#C27500',
    backgroundColor: '#F8E57D',
    padding: 10,
    fontWeight: '700',
  },
  completedHeader: {
    textAlign: 'center',
    fontSize: 17,
    lineHeight: 25,
    color: '#589E39',
    backgroundColor: '#D3F3AD',
    padding: 10,
    fontWeight: '700',
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCompletedDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginVertical: '10%',
  },
  reloadBtn: {
    backgroundColor: '#0f3995',
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
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
  patientProfile: {
    backgroundColor: '#E5ECF6',
    padding: 9,
    borderRadius: 20,
  },
  nameView: {
    flex: 1, // Allow the nameView to take remaining horizontal space
    marginLeft: 10, // Adjust margin as needed
  },
  pBtn: {
    maxHeight: 100,
    backgroundColor: '#FFF',
  },
  patientUname: {
    fontSize: 15,
    fontWeight: '200',
  },
  patientName: {
    fontSize: 19,
    fontWeight: '600',
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
    // paddingBottom: 10,
  },
  modalContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '90%',
    left: '5%',
    padding: '7%',
    borderRadius: 15,
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
  modalNotesInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#8d8d8d',
    padding: 10,
    margin: 10,
  },
  modalInputView: {
    borderWidth: 0.6,
    // padding: 2,
    marginVertical: '2%',
    borderRadius: 3,
    backgroundColor: '#DBE5F2',
    borderColor: '#8d8d8d',
  },
  modalBtnView: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },


  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3, // Adjust the margin as needed
  },
  rowText: {
    paddingRight:55,
    justifyContent: 'space-between',
  },
});
