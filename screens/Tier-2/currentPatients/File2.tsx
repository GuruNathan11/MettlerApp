import {View, Text} from 'react-native';
import React from 'react';
type File2Props = {
  name: string;
  age: number;
};

const File2 = (props: File2Props) => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};

export default File2;
