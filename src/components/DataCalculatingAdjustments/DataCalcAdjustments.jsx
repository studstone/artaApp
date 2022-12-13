import React from 'react';

import DataCalcAdjustmentsRGM from './DataCalcAdjustmentsRGM';

const DataCalcAdjustments = props => {
  const fuseName = props.basicData.fuseName;

  return (
    <>
      <DataCalcAdjustmentsRGM data={props} />
    </>
  );
};

export default DataCalcAdjustments;
