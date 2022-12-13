import React from 'react';

import CardinalPointsBurst from './CardinalPointsBurst';
import IlluminationAmmunition from './IlluminationAmmunition';
import PolarDeviationsBurst from './PolarDeviationsBurst';

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
      {basicData.fuseName === 2 && (
        <>
          <IlluminationAmmunition {...props} />
        </>
      )}
    </>
  );
};

export default FireCorrection;
