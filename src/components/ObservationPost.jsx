import React from 'react';
import {StyleSheet, View} from 'react-native';

import Input from './Input';

const inputs = {
  coordinateOPX: {
    placeholder: 'X КНП',
    maxLength: 6,
    text: 'Xкнп:',
  },
  coordinateOPY: {
    placeholder: 'Y КНП',
    maxLength: 6,
    text: 'Yкнп:',
  },
  heightOP: {
    placeholder: 'H КНП',
    maxLength: 4,
    text: 'Hкнп:',
  },
};

export default React.memo(function ObservationPost({value, setValue}) {
  return (
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
