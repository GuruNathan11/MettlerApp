import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
export default function PSAssignTabs({FirstRoute, SecondRoute}) {
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Patient-Staff(s)'},
    {key: 'second', title: 'Staff-Patient(s)'},
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
          style={{backgroundColor: 'transparent', width: '60%'}}
          labelStyle={{
            fontSize: 10,
            color: '#000',
            fontWeight: '700',
          }}
          activeColor="#0f3995"
          indicatorStyle={{backgroundColor: '#0f3995', height: 5}}
        />
      )}
    />
  );
}
