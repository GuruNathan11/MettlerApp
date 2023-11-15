import {View, Text} from 'react-native';
import React, {FC} from 'react';
import File2 from './File2';

const File1: FC = () => {
  return (
    <View>
      <Text>File1</Text>
      <File2 age={50} name="Hey" />
    </View>
  );
};

export default File1;
