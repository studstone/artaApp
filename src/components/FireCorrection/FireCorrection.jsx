import React from 'react';

import CardinalPointsBurst from './CardinalPointsBurst';
import IlluminationAmmunition from './IlluminationAmmunition';
import PolarDeviationsBurst from './PolarDeviationsBurst';
import PolarDeviationsBurstDTM75 from './PolarDeviationsBurstDTM75';

const FireCorrection = props => {
  const basicData = props.basicData;

  return (
    <>
      {basicData.fuseName === 0 && (
        <>
          <PolarDeviationsBurst {...props} />
          <CardinalPointsBurst {...props} />
        </>
      )}
      {(basicData.fuseName === 2 || basicData.fuseName === 3) && (
        <>
          <IlluminationAmmunition {...props} />
        </>
      )}
      {basicData.fuseName === 4 && (
        <>
          <PolarDeviationsBurstDTM75 {...props} />
        </>
      )}
    </>
  );
};

export default FireCorrection;
