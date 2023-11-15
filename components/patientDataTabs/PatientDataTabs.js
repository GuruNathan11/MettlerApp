import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
export default function PatientDataTabs({FirstRoute, SecondRoute, ThirdRoute}) {
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Patient Data'},
    {key: 'second', title: 'Orders'},
    {key: 'third', title: 'Resulting'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          style={{backgroundColor: '#f5f5f5'}}
          labelStyle={{
            fontSize: 14,
            color: '#000',
            fontWeight: '500',
          }}
          activeColor="#0f3995"
          indicatorStyle={{backgroundColor: '#0f3995', height: 3}}
        />
      )}
    />
  );
}
