import React from 'react';

import CardinalPointsBurst from './CardinalPointsBurst';
import IlluminationAmmunition from './IlluminationAmmunition';
import PolarDeviationsBurst from './PolarDeviationsBurst';

const FireCorrection = props => {
  const FPData = props.FPData;
  const OPData = props.OPData;
  const burstData = props.burstData;
  const basicData = props.basicData;
  const targetData = props.targetData;
  const rangeСalculation = props.rangeСalculation;
  const setValue = props.changeBurstData;
  const replaceAngle = props.replaceAngle;
  const returnDataST = props.returnDataST;
  const angleFromMainStreamСalculation = props.angleFromMainStreamСalculation;
  const removalCoefficientCalculation = props.removalCoefficientCalculation;
  const rangeCommanderCalculation = props.rangeCommanderCalculation;

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
