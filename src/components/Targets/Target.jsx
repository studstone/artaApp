import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import DescriptionTarget from '../DescriptionTarget/DescriptionTarget';
import TargetsList from './TargetsList';
import CoordinatsVariant from './CoordinatsVariant';
import SwitchBlock from '../SwitchBlock';
import BordersList from './BordersList';

export default React.memo(function Target({
  targets,
  borders,
  activeTarget,
  activeBorders,
  onChangeActiveTarget,
  onChangeActiveBorders,
  clearTargets,
  targetData,
  changeTargetData,
  basicData,
  addTargets,
  addBorders,
}) {
  return (
    <>
      <SwitchBlock
        value={targetData.targetsVariant}
        setValue={value => changeTargetData('targetsVariant', value)}
        textTrue="Отдельные"
        textFalse="Рубежи"
      />
      {targetData.targetsVariant ? (
        <BordersList
          value={targetData}
          data={borders}
          active={activeBorders}
          setActive={onChangeActiveBorders}
          clear={clearTargets}
          defaultButtonText={'Рубеж'}
        />
      ) : (
        <TargetsList
          value={targetData}
          data={targets}
          active={activeTarget}
          setActive={onChangeActiveTarget}
          clear={clearTargets}
          defaultButtonText={'Цели'}
        />
      )}
      <CoordinatsVariant value={targetData} setValue={changeTargetData} />

      <DescriptionTarget
        value={targetData}
        setValue={changeTargetData}
        fuseName={basicData.fuseName}
      />
      {!targetData.targetsVariant ? (
        <TouchableOpacity
          disabled={targetData.numberTarget.length === 0}
          onPress={addTargets}
          style={styles.buttonStop}>
          <Text style={styles.textStop}>Стой! Записать!</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={targetData.nameBorders.length === 0}
          onPress={addBorders}
          style={styles.buttonStop}>
          <Text style={styles.textStop}>Стой! Записать!</Text>
        </TouchableOpacity>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  buttonStop: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 2,
    paddingLeft: 2,
    marginTop: 12,
    width: '100%',
    height: 45,
    backgroundColor: '#680202',
    borderRadius: 5,
  },
  textStop: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
