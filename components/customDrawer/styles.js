import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerLogo: {
    width: '70%',
  },
  closeBtn: {
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 18,
  },
  drawerItemList: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  drawerDown: {
    marginBottom: 40,
    marginLeft: 10,
    borderTopWidth: 1,
    borderTopColor: '#808080',
  },
  signOutBtn: {
    backgroundColor: '#ff0000',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    marginVertical: 10,
  },
  signOutBtnText: {
    color: '#fff',
  },
});
