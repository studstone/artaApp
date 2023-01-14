import React from 'react';
import {StyleSheet, View} from 'react-native';

import Input from '../Input';

const targets = {
  rangeTarget: {
    placeholder: 'Дальн. ком',
    keyboardType: 'numeric',
    maxLength: 5,
    text: 'Дпр:',
  },
  angleTarget: {
    placeholder: 'Уг на цель',
    keyboardType: 'numeric',
    maxLength: 5,
    text: 'Уг.к.пр:',
  },
  verticalAngleTarget: {
    placeholder: 'Угол Мц',
    keyboardType: 'numeric',
    maxLength: 4,
    text: 'Уг Мц.пр:',
  },
};

const borders = {
  rangeTargetRight: {
    placeholder: 'Дальн правой',
    keyboardType: 'numeric',
    maxLength: 5,
    text: 'Дпр:',
  },
  angleTargetRight: {
    placeholder: 'Уг на правую',
    keyboardType: 'numeric',
    maxLength: 5,
    text: 'Уг.к.пр:',
  },
  rangeTargetLeft: {
    placeholder: 'Дальн левой',
    keyboardType: 'numeric',
    maxLength: 5,
    text: 'Длев:',
  },
  angleTargetLeft: {
    placeholder: 'Уг на левую',
    keyboardType: 'numeric',
    maxLength: 5,
    text: 'Уг.к.лев:',
  },
  verticalAngleTargetRight: {
    placeholder: 'Угол Мц пр',
    keyboardType: 'numeric',
    maxLength: 4,
    text: 'Уг Мц.пр:',
  },
  verticalAngleTargetLeft: {
    placeholder: 'Угол Мц лев',
    keyboardType: 'numeric',
    maxLength: 4,
    text: 'Уг Мц.лев:',
  },
};

export default React.memo(function PolarCoordinates({value, setValue}) {
  return (
    <View style={styles.wrapper}>
      {!value.targetsVariant
        ? Object.entries(targets).map(([key, item]) => (
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
          ))
        : Object.entries(borders).map(([key, item]) => (
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
