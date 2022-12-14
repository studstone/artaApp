import React from 'react';
import {StyleSheet, View} from 'react-native';

import Input from '../Input';

const inputs = {
  rangeTarget: {
    placeholder: 'Дальн. ком',
    keyboardType: 'numeric',
    maxLength: 5,
    text: 'Дк:',
  },
  angleTarget: {
    placeholder: 'Уг на цель',
    keyboardType: 'numeric',
    maxLength: 5,
    text: 'Уг.к:',
  },
  verticalAngleTarget: {
    placeholder: 'Угол Мц',
    keyboardType: 'numeric',
    maxLength: 4,
    text: 'Уг Мц:',
  },
};

export default React.memo(function PolarCoordinates({value, setValue}) {
  return (
    <View style={styles.wrapper}>
      {Object.entries(inputs).map(([key, item]) => (
        <Input
          key={key}
          state={value[key]}
          keyboardType={item.keyboardType}
          setState={value => setValue(key, value)}
          placeholder={item.placeholder}
          placeholderTextColor={'black'}
          maxLength={item.maxLength}
          text={item.text}
          style={styles.inputWrapper}
        />
      ))}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 2,
    paddingLeft: 2,
    marginTop: 12,
    width: '49%',
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
