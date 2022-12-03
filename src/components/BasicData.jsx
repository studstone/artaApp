import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import Input from './Input';

const BasicData = ({
  mainStream,
  setMainStream,
  frontFP,
  setFrontFP,
  trajectories,
  charges,
  trajectory,
  setTrajectory,
  nameCharge,
  setNameCharge,
}) => {
  const inputs = [
    {
      id: 0,
      state: mainStream,
      keyboardType: 'numeric',
      setState: setMainStream,
      placeholder: 'ОН',
      placeholderTextColor: 'black',
      maxLength: 2,
      text: 'ОН:',
    },
    {
      id: 1,
      state: frontFP,
      keyboardType: 'numeric',
      setState: setFrontFP,
      placeholder: 'Фронт батареи',
      placeholderTextColor: 'black',
      maxLength: 3,
      text: 'Фб:',
    },
  ];

  return (
    <View style={styles.wrapper}>
      {inputs.map(input => (
        <Input
          key={input.id}
          state={input.state}
          keyboardType={input.keyboardType}
          setState={input.setState}
          placeholder={input.placeholder}
          placeholderTextColor={input.placeholderTextColor}
          maxLength={input.maxLength}
          text={input.text}
          style={styles.inputWrapper}
        />
      ))}
      <SelectDropdown
        buttonStyle={{
          backgroundColor: '#576644',
          width: '49%',
          height: 45,
          paddingLeft: 10,
          fontSize: 18,
          marginTop: 15,
        }}
        data={trajectories.map(item => item.trajectory)}
        onSelect={(selectedItem, index) => {
          setTrajectory({trajectory: selectedItem, id: index});
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        defaultButtonText={'Траектория'}
        defaultValueByIndex={trajectory.id}
      />
      <SelectDropdown
        buttonStyle={{
          backgroundColor: '#576644',
          width: '49%',
          height: 45,
          paddingLeft: 10,
          fontSize: 18,
          marginTop: 15,
        }}
        data={charges.map(item => item.charge)}
        onSelect={(selectedItem, index) => {
          setNameCharge({charge: selectedItem, id: index});
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        defaultButtonText={'Заряд'}
        defaultValueByIndex={nameCharge.id}
      />
    </View>
  );
};

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

export default BasicData;
