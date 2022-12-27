import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

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

export default React.memo(function SelectRGM({value, setValue}) {
  // console.log(value.fuseName === (0 && 1 && 3));
  return (
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
  );
});

const styles = StyleSheet.create({
  select: {
    backgroundColor: '#576644',
    width: '100%',
    height: 45,
    paddingLeft: 10,
    fontSize: 18,
    marginTop: 7,
  },
});
