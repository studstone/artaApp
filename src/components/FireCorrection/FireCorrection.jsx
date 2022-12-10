import React from 'react';
import {Text} from 'react-native';

import CardinalPointsBurst from './CardinalPointsBurst';
import IlluminationAmmunition from './IlluminationAmmunition';
import PolarDeviationsBurst from './PolarDeviationsBurst';

const FireCorrection = ({
  FPData,
  OPData,
  burstData,
  basicData,
  targetData,
  setValue,
  replaceAngle,
  rangeСalculation,
  returnDataST,
  angleFromMainStreamСalculation,
}) => {
  // /*рассчет корректуры по Дк и УГк*/
  const proofreadingCalculationPolar = React.useMemo(() => {
    let proofreadingInAim = 0;
    let proofreadingInAngle = 0;

    const coordinateX = +OPData.coordinateOPX;
    const coordinateY = +OPData.coordinateOPY;
    const angle = +burstData.angleBurst;

    const burstX = Math.round(
      coordinateX +
        burstData.rangeBurst * Math.cos(angle * 6 * (Math.PI / 180)),
    );
    const burstY = Math.round(
      coordinateY +
        burstData.rangeBurst * Math.sin(angle * 6 * (Math.PI / 180)),
    );

    const topographicRangeBurst = Math.round(
      Math.sqrt(
        Math.pow(burstX - FPData.coordinateFPX, 2) +
          Math.pow(burstY - FPData.coordinateFPY, 2),
      ),
    );

    const directionalAngle =
      (Math.atan2(
        burstY - FPData.coordinateFPY,
        burstX - FPData.coordinateFPX,
      ) *
        180) /
      Math.PI /
      6;

    let angleFPInBurst = 0;
    let directionAlngle = 0;

    if (directionalAngle < 0) {
      angleFPInBurst = directionalAngle + 60;
    } else {
      angleFPInBurst = directionalAngle;
    }

    if (angleFPInBurst >= 52.5 && angleFPInBurst <= 60) {
      directionAlngle = angleFPInBurst - basicData.mainStream - 60;
    } else {
      directionAlngle = angleFPInBurst - basicData.mainStream;
    }

    if (burstData.rangeBurst === '' || burstData.angleBurst === '') {
      proofreadingInAngle = 0;
      proofreadingInAim = 0;
    } else {
      if (basicData.trajectory === 0) {
        proofreadingInAim = Math.round(
          (rangeСalculation - topographicRangeBurst) / returnDataST.dXtis,
        );
      } else {
        proofreadingInAim = Math.round(
          ((rangeСalculation - topographicRangeBurst) / returnDataST.dXtis) *
            -1,
        );
      }

      proofreadingInAngle = (
        angleFromMainStreamСalculation - directionAlngle
      ).toFixed(2);
    }
    return {proofreadingInAngle, proofreadingInAim};
  }, [burstData.angleBurst, burstData.rangeBurst]);
  // /*рассчет корректуры ПКсс*/
  const proofreadingCalculationCardinal = React.useMemo(() => {
    let proofreadingInAim = 0;
    let proofreadingInAngle = 0;
    let targetX = 0;
    let targetY = 0;
    const coordinateX = +OPData.coordinateOPX;
    const coordinateY = +OPData.coordinateOPY;
    const angle = +targetData.angleTarget;

    if (targetData.coordinateVariant) {
      targetX = +targetData.coordinateTargetX;
      targetY = +targetData.coordinateTargetY;
    } else {
      targetX = Math.round(
        coordinateX +
          targetData.rangeTarget * Math.cos(angle * 6 * (Math.PI / 180)),
      );
      targetY = Math.round(
        coordinateY +
          targetData.rangeTarget * Math.sin(angle * 6 * (Math.PI / 180)),
      );
    }
    const burstX = +targetX + +burstData.north - +burstData.south;
    const burstY = +targetY + +burstData.east - +burstData.west;

    const topographicRangeBurst = Math.round(
      Math.sqrt(
        Math.pow(burstX - FPData.coordinateFPX, 2) +
          Math.pow(burstY - FPData.coordinateFPY, 2),
      ),
    );

    const directionalAngle =
      (Math.atan2(
        burstY - FPData.coordinateFPY,
        burstX - FPData.coordinateFPX,
      ) *
        180) /
      Math.PI /
      6;

    let angleFPInBurst = 0;
    let directionAlngle = 0;

    if (directionalAngle < 0) {
      angleFPInBurst = directionalAngle + 60;
    } else {
      angleFPInBurst = directionalAngle;
    }

    if (angleFPInBurst >= 52.5 && angleFPInBurst <= 60) {
      directionAlngle = angleFPInBurst - basicData.mainStream - 60;
    } else {
      directionAlngle = angleFPInBurst - basicData.mainStream;
    }

    if (rangeСalculation === 0 || returnDataST.dXtis === 0) {
      proofreadingInAngle = 0;
      proofreadingInAim = 0;
    } else {
      if (basicData.trajectory === 0) {
        proofreadingInAim = Math.round(
          (rangeСalculation - topographicRangeBurst) / returnDataST.dXtis,
        );
      } else {
        proofreadingInAim = Math.round(
          ((rangeСalculation - topographicRangeBurst) / returnDataST.dXtis) *
            -1,
        );
      }
      proofreadingInAngle = (
        angleFromMainStreamСalculation - directionAlngle.toFixed(2)
      ).toFixed(2);
    }

    return {proofreadingInAngle, proofreadingInAim};
  }, [burstData.north, burstData.south, burstData.east, burstData.west]);

  const RGM = () => {
    if (basicData.fuseName === 0) {
      return (
        <>
          <PolarDeviationsBurst
            value={burstData}
            setValue={setValue}
            proofreadingInAim={proofreadingCalculationPolar.proofreadingInAim}
            proofreadingInAngle={replaceAngle(
              proofreadingCalculationPolar.proofreadingInAngle,
            )}
          />
          <CardinalPointsBurst
            value={burstData}
            setValue={setValue}
            proofreadingInAim={
              proofreadingCalculationCardinal.proofreadingInAim
            }
            proofreadingInAngle={replaceAngle(
              proofreadingCalculationCardinal.proofreadingInAngle,
            )}
          />
        </>
      );
    }
  };

  const T7 = () => {
    if (basicData.fuseName === 2) {
      return (
        <>
          <IlluminationAmmunition
            value={burstData}
            setValue={setValue}
            proofreadingInAim={proofreadingCalculationPolar.proofreadingInAim}
            proofreadingInAngle={replaceAngle(
              proofreadingCalculationPolar.proofreadingInAngle,
            )}
          />
        </>
      );
    }
  };

  return (
    <>
      <RGM />
      <T7 />
    </>
  );
};

export default FireCorrection;
