import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const TreatmentPlan = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          // backgroundColor: '#FAF6F9',
          width: '90%',
          height: 400,
          gap: 50,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 30,
          }}>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457aed',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457aed',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 3</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 30,
          }}>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457aed',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457aed',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457aed',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 3</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 30,
          }}>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457aed',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
          activeOpacity={0.7}
            style={{
              backgroundColor: '#457aed',
              width: 100,
              height: 100,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MCIcon name="format-line-style" size={30} color="#FFF" />
            <Text style={{color: '#FFF', fontSize: 20,fontWeight:"600"}}>Form 3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TreatmentPlan;
