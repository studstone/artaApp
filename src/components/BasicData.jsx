import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import Input from './Input';

const fuse = [
  {fuseName: 'РГМ-2М', id: 0},
  {fuseName: 'В-90', id: 1},
  {fuseName: 'Т-7', id: 2},
  {fuseName: 'Т-90', id: 3},
  {fuseName: 'ДТМ-75', id: 4},
];

const charges = [
  {charge: 'п', id: 0},
  {charge: 'у', id: 1},
  {charge: 1, id: 2},
  {charge: 2, id: 3},
  {charge: 3, id: 4},
  {charge: 4, id: 5},
];

const trajectories = [
  {trajectory: 'н', id: 0},
  {trajectory: 'м', id: 1},
];

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

export default React.memo(function BasicData({value, setValue}) {
  return (
    <View style={styles.wrapper}>
      <View style={{width: '100%'}}>
        <SelectDropdown
          buttonStyle={styles.select}
          data={fuse.map(item => item.fuseName)}
          onSelect={selectedItem => {
            setValue('fuseName', selectedItem);
          }}
          defaultButtonText={'Взрыватель'}
          defaultValue={value.fuseName}
        />
      </View>
      <SelectDropdown
        buttonStyle={styles.select}
        data={trajectories.map(item => item.trajectory)}
        onSelect={selectedItem => {
          setValue('trajectory', selectedItem);
        }}
        defaultButtonText={'Траектория'}
        defaultValue={value.trajectory}
      />
      <SelectDropdown
        buttonStyle={styles.select}
        data={charges.map(item => item.charge)}
        onSelect={selectedItem => {
          setValue('nameCharge', selectedItem);
        }}
        defaultButtonText={'Заряд'}
        defaultValue={value.nameCharge}
      />
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
  select: {
    backgroundColor: '#576644',
    width: '49%',
    height: 45,
    paddingLeft: 10,
    fontSize: 18,
    marginTop: 15,
  },
});
