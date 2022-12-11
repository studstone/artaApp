import React from 'react';
import {StyleSheet, View} from 'react-native';

import Input from '../Input';

const inputs = {
  coordinateTargetX: {
    placeholder: 'X цели',
    maxLength: 6,
    text: 'Xц:',
  },
  coordinateTargetY: {
    placeholder: 'Y цели',
    maxLength: 6,
    text: 'Yц:',
  },
  heightTarget: {
    placeholder: 'H цели',
    maxLength: 4,
    text: 'Hц:',
  },
};

export default React.memo(function RectangularCoordinates({value, setValue}) {
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
