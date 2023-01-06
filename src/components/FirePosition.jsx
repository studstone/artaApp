import React from 'react';
import {StyleSheet, View} from 'react-native';

import Input from './Input';
import SwitchBlock from './SwitchBlock';

const inputs = {
  coordinateFPX: {
    placeholder: 'X огневой',
    maxLength: 6,
    text: 'Xoп:',
  },
  coordinateFPY: {
    placeholder: 'Y огневой',
    maxLength: 6,
    text: 'Yoп:',
  },
  heightFP: {
    placeholder: 'H огневой',
    maxLength: 4,
    text: 'Hoп:',
  },
};

export default React.memo(function FirePosition({
  value,
  setValue,
  disabled,
  onPress,
}) {
  return (
    <>
      <SwitchBlock
        value={value.startLocationFP}
        setValue={value => setValue('startLocationFP', value)}
        textTrue=""
        textFalse="Определить"
        disabled={disabled}
        onPress={onPress}
      />
      <View style={styles.wrapper}>
        {Object.entries(inputs).map(([key, item]) => (
          <Input
            key={key}
            state={value[key]}
            keyboardType={'numeric'}
            setState={value => setValue(key, value)}
            placeholder={item.placeholder}
            placeholderTextColor={'black'}
            maxLength={item.maxLength}
            text={item.text}
            style={styles.inputWrapper}
          />
        ))}
      </View>
    </>
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
