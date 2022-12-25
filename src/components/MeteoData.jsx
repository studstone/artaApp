import React from 'react';
import {StyleSheet, View} from 'react-native';

import Input from './Input';

const inputs = {
  pressure: {
    placeholder: 'Давление',
    keyboardType: 'numeric',
    text: 'H:',
    maxLength: 3,
  },
  airTemperature: {
    placeholder: 'Температура воздуха',
    keyboardType: 'numeric',
    text: 'Тв:',
    maxLength: 3,
  },
  directorateAngleWind: {
    placeholder: 'Направление ветра',
    keyboardType: 'numeric',
    text: 'УГ.в:',
    maxLength: 2,
  },
  windSpeed: {
    placeholder: 'Скорость ветра',
    keyboardType: 'numeric',
    text: 'Vв:',
    maxLength: 2,
  },
  deviationInitialSpeed: {
    placeholder: 'Откл.нач.ск.пол.сн',
    keyboardType: 'numeric',
    text: 'Vо:',
    maxLength: 5,
  },
  chargeTemperature: {
    placeholder: 'Температура заряда',
    keyboardType: 'numeric',
    text: 'Тз:',
    maxLength: 5,
  },
  heightWeatherPost: {
    placeholder: 'Высота метеопоста',
    keyboardType: 'numeric',
    text: 'hмп:',
    maxLength: 4,
  },
};

export default React.memo(function MeteoData({value, setValue}) {
  return (
    <>
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
    </>
  );
});

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 12,
    width: '100%',
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
  },
  input: {
    maxWidth: '100%',
    minWidth: 0,
    fontSize: 18,
    flex: 1,
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: 'transparent',
    color: '#000000',
  },
});
