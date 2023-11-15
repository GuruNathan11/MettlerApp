import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PagerView from 'react-native-pager-view';

const AllPatients = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View
        key="1"
        style={{backgroundColor: '#0f33d3', width: '60%', height: '30%',justifyContent:"center",alignItems:"center"}}>
        <Text>First page</Text>
      </View>
      <View
        key="2"
        style={{backgroundColor: '#0f3557', width: '60%', height: '30%'}}>
        <Text>Second page</Text>
      </View>
    </PagerView>
  );
};
const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
});

export default AllPatients;
