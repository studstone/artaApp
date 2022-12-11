import React from 'react';
import {Text} from 'react-native';
import DataCalcAdjustmentsRGM from './DataCalcAdjustmentsRGM';

const DataCalcAdjustments = props => {
  const fuseName = props.basicData.fuseName;

  return (
    <>
      {fuseName === 0 && <DataCalcAdjustmentsRGM data={props} />}
      {fuseName === 2 && <Text>dsfsdfsdf</Text>}
    </>
  );
};

export default DataCalcAdjustments;
