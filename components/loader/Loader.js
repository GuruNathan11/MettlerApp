import React, {useRef, useEffect} from 'react';
import {Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';

const Loader = props => {
  return (
    <Spinner
      {...props}
      customIndicator={
        <FastImage
          source={require('../../assets/loading.gif')}
          style={{width: 50, height: 50}}
        />
      }
    />
  );
};

export default Loader;
