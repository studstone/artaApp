import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import Input from './Input';

const fuse = [
  {text: 'РГМ-2М', id: 0},
  {text: 'В-90', id: 1},
  {text: 'Т-7', id: 2},
  {text: 'Т-90', id: 3},
  {text: 'ДТМ-75', id: 4},
];

const charges = [
  {text: 'п', id: 0},
  {text: 'у', id: 1},
  {text: 1, id: 2},
  {text: 2, id: 3},
  {text: 3, id: 4},
  {text: 4, id: 5},
];

const trajectories = [
  {text: 'н', id: 0},
  {text: 'м', id: 1},
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

const selects = {
  fuseName: {
    data: fuse,
    defaultButtonText: 'Взрыватель',
  },
  trajectory: {
    data: trajectories,
    defaultButtonText: 'Траектория',
  },
  nameCharge: {
    data: charges,
    defaultButtonText: 'Заряд',
  },
};

export default React.memo(function BasicData({value, setValue, returnDataST}) {
  console.log(returnDataST);
  return (
    <View style={styles.wrapper}>
      <>
        {Object.entries(selects).map(([key, item], index) => (
          <View style={{width: index === 0 ? '100%' : '49%'}} key={key}>
            <SelectDropdown
              buttonStyle={styles.select}
              data={item.data}
              rowTextForSelection={item => item.text}
              buttonTextAfterSelection={item => item.text}
              onSelect={item => {
                setValue(key, item.id);
              }}
              defaultButtonText={item.defaultButtonText}
              defaultValueByIndex={value[key]}
            />
          </View>
        ))}
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
