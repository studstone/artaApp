import React from 'react';
import {Switch, Text, View} from 'react-native';

import PropTypes from 'prop-types';

const SwitchBlock = ({
  value,
  setValue,
  textTrue,
  textFalse,
  disabled = false,
  onPress,
}) => {
  const onClick = val => {
    onPress?.();
    setValue(val);
  };

  return (
    <View
      style={{
        alignItems: 'center',
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 18}}>{textTrue}</Text>
      <Switch
        style={{marginLeft: 10, marginRight: 10}}
        trackColor={{false: '#5c00b8', true: '#81b0ff'}}
        thumbColor={value ? '#f54b4b' : '#b430b4'}
        onValueChange={onClick}
        value={value}
        disabled={disabled}
      />
      <Text style={{fontSize: 18}}>{textFalse}</Text>
    </View>
  );
};

SwitchBlock.propTypes = {
  value: PropTypes.bool.isRequired,
};

export default SwitchBlock;
