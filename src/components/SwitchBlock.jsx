import React from 'react';
import {Switch, Text, View} from 'react-native';

const SwitchBlock = ({value, setValue}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 18}}>Полярные</Text>
      <Switch
        style={{marginLeft: 10, marginRight: 10}}
        trackColor={{false: '#5c00b8', true: '#81b0ff'}}
        thumbColor={value ? '#f54b4b' : '#b430b4'}
        onValueChange={setValue}
        value={value}
      />
      <Text style={{fontSize: 18}}>Прямоугольные</Text>
    </View>
  );
};

export default SwitchBlock;
