import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Input from '../Input';
import SelectDTM75 from './SelectDTM75';
import SelectRGM from './SelectRGM';
import SelectT7 from './SelectT7';
import SelectT90 from './SelectT90';

const inputs = {
  mainStream: {
    placeholder: 'ОН',
    maxLength: 2,
    text: 'ОН:',
  },
  frontFP: {
    placeholder: 'Фронт батареи',
    maxLength: 3,
    text: 'Фб:',
  },
};

export default React.memo(function BasicData({value, setValue, returnDataST}) {
  return (
    <View style={styles.wrapper}>
      <>
        {value.fuseName === null && (
          <SelectRGM value={value} setValue={setValue} />
        )}
        {value.fuseName === 0 && (
          <SelectRGM value={value} setValue={setValue} />
        )}
        {value.fuseName === 1 && (
          <SelectRGM value={value} setValue={setValue} />
        )}
        {value.fuseName === 2 && <SelectT7 value={value} setValue={setValue} />}
        {value.fuseName === 3 && (
          <SelectT90 value={value} setValue={setValue} />
        )}
        {value.fuseName === 4 && (
          <SelectDTM75 value={value} setValue={setValue} />
        )}
      </>
      {returnDataST.rangeMin !== 0 && (
        <View style={styles.wrapperRange}>
          <Text style={styles.textRange}>Дmin: {returnDataST.rangeMin}</Text>
          <Text style={styles.textRange}>Дmax: {returnDataST.rangeMax}</Text>
        </View>
      )}
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
    marginTop: 15,
    width: '49%',
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  select: {
    backgroundColor: '#576644',
    width: '100%',
    height: 45,
    paddingLeft: 10,
    fontSize: 18,
    marginTop: 7,
  },
  wrapperRange: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  textRange: {fontSize: 24, color: '#750000', width: '50%'},
});
