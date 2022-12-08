import React from 'react';
import {StyleSheet, View} from 'react-native';

import Input from './Input';

const inputs = {
  numberTarget: {
    keyboardType: 'numeric',
    placeholder: '№ цели',
    maxLength: 4,
    text: '№ц:',
  },
  nameTarget: {
    keyboardType: 'default',
    placeholder: 'Характер цели',
    maxLength: 6,
    text: 'ХАРц:',
  },
  frontTarget: {
    keyboardType: 'numeric',
    placeholder: 'Фронт цели',
    maxLength: 4,
    text: 'Фц:',
  },
  depthTarget: {
    keyboardType: 'numeric',
    placeholder: 'Глубина цели',
    maxLength: 4,
    text: 'Гц:',
  },
  amendmentRange: {
    keyboardType: 'numbers-and-punctuation',
    placeholder: 'Попр. в дальн.',
    maxLength: 4,
    text: 'ΔД:',
  },
  amendmentAngle: {
    keyboardType: 'numbers-and-punctuation',
    placeholder: 'Попр. в напр.',
    maxLength: 5,
    text: 'Δδ:',
  },
};

export default React.memo(function DescriptionTarget({value, setValue}) {
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
