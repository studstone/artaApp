import React from 'react';
import {ScrollView, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

import ModalBlock from '../components/Modal';
import BasicData from '../components/BasicData/BasicData';
import ObservationPost from '../components/ObservationPost';
import FirePosition from '../components/FirePosition';
import FireCorrection from '../components/FireCorrection/FireCorrection';
import Target from '../components/Targets/Target';

import shotingTables from '../DB/shotingTables';
import DataCalcAdjustments from '../components/DataCalculatingAdjustments/DataCalcAdjustments';
import FiringEquipment from '../components/FiringEqipment/FiringEquipment';

import WGS84inSK42 from '../lib/WGS84inSK42';

const initBasicData = {
  fuseName: null,
  mainStream: '',
  frontFP: '',
  trajectory: null,
  nameCharge: null,
};

const initOPData = {
  coordinateOPX: '',
  coordinateOPY: '',
  heightOP: '',
  startLocationOP: false,
};
const initFPData = {
  coordinateFPX: '',
  coordinateFPY: '',
  heightFP: '',
  startLocationFP: false,
};

const initTargetData = {
  coordinateVariant: true,
  targetsVariant: false,
  coordinateTargetX: '',
  coordinateTargetY: '',
  heightTarget: '',
  rangeTarget: '',
  angleTarget: '',
  verticalAngleTarget: '',
  numberTarget: '',
  nameTarget: '',
  nameBorders: '',
  frontTarget: '',
  depthTarget: '',
  bias: '',
  amendmentRange: '',
  amendmentAngle: '',
  amendmentTube: '',
  coordinateTargetLeftX: '',
  coordinateTargetLeftY: '',
  heightTargetLeft: '',
  coordinateTargetRightX: '',
  coordinateTargetRightY: '',
  heightTargetRight: '',
  rangeTargetLeft: '',
  angleTargetLeft: '',
  verticalAngleTargetLeft: '',
  rangeTargetRight: '',
  angleTargetRight: '',
  verticalAngleTargetRight: '',
};

const initBurstData = {
  rangeBurst: '',
  angleBurst: '',
  north: '',
  south: '',
  east: '',
  west: '',
  heightBurst: '',
  burningTime: '',
};

const initGeoCoordinats = {
  latitude: null,
  longitude: null,
  accuracy: null,
};

const BatteryCommander = () => {
  const [geoCoordinatsData, setGeoCoordinatsData] = React.useState({
    ...initGeoCoordinats,
  });
  const [basicData, setBasicData] = React.useState({...initBasicData});
  const [OPData, setOPData] = React.useState({...initOPData});
  const [FPData, setFPData] = React.useState({...initFPData});

  const [targets, setTargets] = React.useState([]);
  const [activeTarget, setActiveTarget] = React.useState(null);

  const [borders, setBorders] = React.useState([]);
  const [activeBorders, setActiveBorders] = React.useState(null);

  const [targetData, setTargetData] = React.useState({...initTargetData});
  const [burstData, setBurstData] = React.useState({...initBurstData});

  const [isLoading, setIsLoading] = React.useState(true);
  const [isGeolacation, setIsGeolacation] = React.useState(false);

  const changeBasicData = React.useCallback(
    (key, value) => {
      setBasicData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [basicData],
  );

  const changeOPData = React.useCallback(
    (key, value) => {
      setOPData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [OPData],
  );

  const changeFPData = React.useCallback(
    (key, value) => {
      setFPData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [FPData],
  );

  const changeTargetData = React.useCallback(
    (key, value) => {
      setTargetData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [targetData],
  );

  const changeBurstData = React.useCallback(
    (key, value) => {
      setBurstData(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    [burstData],
  );

  React.useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  React.useEffect(() => {
    storeData();
  }, [basicData, OPData, FPData, targetData, targets, activeTarget, burstData]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        setBasicData(data.basicData);
        setOPData(data.OPData);
        setFPData(data.FPData);
        setTargetData(data.targetData);
        setTargets(data.targets);
        setActiveTarget(data.activeTarget);
        setBurstData(data.burstData);
      }
      setIsLoading(false);
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async () => {
    const obj = {
      basicData,
      OPData,
      FPData,
      targetData,
      targets,
      activeTarget,
      burstData,
    };
    try {
      const jsonValue = JSON.stringify(obj);
      await AsyncStorage.setItem('data', jsonValue);
    } catch (e) {
      // saving error
    }
  };
  /** расчет X,Y нзо */
  const borderCalculation = React.useMemo(() => {
    let targetRightX = 0;
    let targetRightY = 0;
    let targetLeftX = 0;
    let targetLeftY = 0;
    if (targetData.coordinateVariant) {
      targetRightX = targetData.coordinateTargetRightX;

      targetRightY = targetData.coordinateTargetRightY;

      targetLeftX = targetData.coordinateTargetLeftX;

      targetLeftY = targetData.coordinateTargetLeftY;
    } else {
      targetRightX = Math.round(
        +OPData.coordinateOPX +
          targetData.rangeTargetRight *
            Math.cos(targetData.angleTargetRight * 6 * (Math.PI / 180)),
      );

      targetRightY = Math.round(
        +OPData.coordinateOPY +
          targetData.rangeTargetRight *
            Math.sin(targetData.angleTargetRight * 6 * (Math.PI / 180)),
      );

      targetLeftX = Math.round(
        +OPData.coordinateOPX +
          targetData.rangeTargetLeft *
            Math.cos(targetData.angleTargetLeft * 6 * (Math.PI / 180)),
      );

      targetLeftY = Math.round(
        +OPData.coordinateOPY +
          targetData.rangeTargetLeft *
            Math.sin(targetData.angleTargetLeft * 6 * (Math.PI / 180)),
      );
    }

    return {targetRightX, targetRightY, targetLeftX, targetLeftY};
  }, [targetData, OPData]);
  // /*расчет дир.угл пр-лев*/
  const angleBorderСalculation = React.useMemo(() => {
    let directionalAngle = 0;
    let angle = 0;

    if (targetData.coordinateVariant) {
      directionalAngle =
        (Math.atan2(
          targetData.coordinateTargetLeftY - targetData.coordinateTargetRightY,
          targetData.coordinateTargetLeftX - targetData.coordinateTargetRightX,
        ) *
          180) /
        Math.PI /
        6;
    } else {
      directionalAngle =
        (Math.atan2(
          borderCalculation.targetLeftY - borderCalculation.targetRightY,
          borderCalculation.targetLeftX - borderCalculation.targetRightX,
        ) *
          180) /
        Math.PI /
        6;
    }

    if (directionalAngle < 0) {
      angle = directionalAngle + 60;
    } else {
      angle = directionalAngle;
    }
    return angle.toFixed(2);
  }, [targetData, borderCalculation]);
  /** расчет х,у цели*/
  const coordinateTargetСalculation = React.useMemo(() => {
    let targetX = 0;
    let targetY = 0;
    if (targetData.targetsVariant) {
      targetX = Math.round(
        +borderCalculation.targetRightX +
          targetData.bias *
            Math.cos(angleBorderСalculation * 6 * (Math.PI / 180)),
      );
      targetY = Math.round(
        +borderCalculation.targetRightY +
          targetData.bias *
            Math.sin(angleBorderСalculation * 6 * (Math.PI / 180)),
      );
    } else {
      targetX = Math.round(
        +OPData.coordinateOPX +
          targetData.rangeTarget *
            Math.cos(targetData.angleTarget * 6 * (Math.PI / 180)),
      );

      targetY = Math.round(
        +OPData.coordinateOPY +
          targetData.rangeTarget *
            Math.sin(targetData.angleTarget * 6 * (Math.PI / 180)),
      );
    }
    return {targetX, targetY};
  }, [OPData, targetData, angleBorderСalculation]);
  /*расчет топо дальности*/
  const rangeСalculation = React.useMemo(() => {
    let topographicRange = 0;

    if (targetData.coordinateVariant) {
      if (
        (targetData.coordinateTargetX !== '' &&
          targetData.coordinateTargetY !== '') ||
        (targetData.coordinateTargetLeftX !== '' &&
          targetData.coordinateTargetLeftY !== '' &&
          targetData.coordinateTargetRightX !== '' &&
          targetData.coordinateTargetRightY !== '')
      ) {
        if (targetData.targetsVariant) {
          topographicRange = Math.round(
            Math.sqrt(
              Math.pow(
                coordinateTargetСalculation.targetX - FPData.coordinateFPX,
                2,
              ) +
                Math.pow(
                  coordinateTargetСalculation.targetY - FPData.coordinateFPY,
                  2,
                ),
            ),
          );
        } else {
          topographicRange = Math.round(
            Math.sqrt(
              Math.pow(targetData.coordinateTargetX - FPData.coordinateFPX, 2) +
                Math.pow(
                  targetData.coordinateTargetY - FPData.coordinateFPY,
                  2,
                ),
            ),
          );
        }
        return topographicRange;
      } else {
        return topographicRange;
      }
    } else {
      if (
        (targetData.rangeTarget !== '' && targetData.angleTarget !== '') ||
        (targetData.rangeTargetLeft !== '' &&
          targetData.angleTargetLeft !== '' &&
          targetData.rangeTargetRight !== '' &&
          targetData.angleTargetRight !== '')
      ) {
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(
              coordinateTargetСalculation.targetX - FPData.coordinateFPX,
              2,
            ) +
              Math.pow(
                coordinateTargetСalculation.targetY - FPData.coordinateFPY,
                2,
              ),
          ),
        );
        return topographicRange;
      } else {
        return topographicRange;
      }
    }
  }, [targetData, FPData]);
  /**расчет длинны рубежа */
  const borderRangeСalculation = React.useMemo(() => {
    let topographicRange = 0;

    if (targetData.targetsVariant) {
      topographicRange = Math.round(
        Math.sqrt(
          Math.pow(
            borderCalculation.targetLeftX - borderCalculation.targetRightX,
            2,
          ) +
            Math.pow(
              borderCalculation.targetLeftY - borderCalculation.targetRightY,
              2,
            ),
        ),
      );
    } else {
      topographicRange = 0;
    }

    return topographicRange;
  }, [targetData]);
  /*расчет исчисленной дальности*/
  const calculatedRangeСalculation = React.useMemo(() => {
    const calculatedRange = rangeСalculation + +targetData.amendmentRange;

    return calculatedRange;
  }, [targetData.amendmentRange, rangeСalculation]);
  // /*расчет данных ТС*/
  const returnDataST = React.useMemo(() => {
    try {
      const filterHangTrajectory = shotingTables
        .filter(el => el.fuse === basicData.fuseName)
        .filter(el => el.name === basicData.nameCharge)
        .filter(el => el.trajectory === basicData.trajectory)
        .find(el => el.range >= calculatedRangeСalculation);

      const filterMortaryTrajectory = shotingTables
        .filter(el => el.fuse === basicData.fuseName)
        .filter(el => el.name === basicData.nameCharge)
        .filter(el => el.trajectory === basicData.trajectory)
        .find(el => el.range <= calculatedRangeСalculation);

      const arr = shotingTables
        .filter(el => el.fuse === basicData.fuseName)
        .filter(el => el.name === basicData.nameCharge)
        .filter(el => el.trajectory === basicData.trajectory);

      let supportingRange = 0;
      let supportingAim = 0;
      let dXtis = 0;
      let dNtis = 0;
      let dRange = 0;
      let installationFuse = '';
      let time = 0;
      let Vd = 0;
      let tube = 0;
      let hn = 0;
      let rangeMin = 0;
      let rangeMax = 0;

      if (basicData.trajectory === 0) {
        rangeMin = arr[0].range;
        rangeMax = arr[arr.length - 1].range;
      } else {
        rangeMax = arr[0].range;
        rangeMin = arr[arr.length - 1].range;
      }

      if (calculatedRangeСalculation !== 0) {
        if (basicData.trajectory === 0) {
          supportingRange = filterHangTrajectory.range;
          supportingAim = filterHangTrajectory.aim;
          dXtis = filterHangTrajectory.dXtis;
          dNtis = filterHangTrajectory.dNtis;
          dRange = supportingRange - calculatedRangeСalculation;
          installationFuse = filterHangTrajectory.installationFuse;
          time = filterHangTrajectory.Tc;
          Vd = filterHangTrajectory.Vd;
          tube = filterHangTrajectory.tube;
          hn = filterHangTrajectory.hn;
        } else {
          supportingRange = filterMortaryTrajectory.range;
          supportingAim = filterMortaryTrajectory.aim;
          dXtis = filterMortaryTrajectory.dXtis;
          dRange = calculatedRangeСalculation - supportingRange;
          installationFuse = filterMortaryTrajectory.installationFuse;
          time = filterMortaryTrajectory.Tc;
          Vd = filterMortaryTrajectory.Vd;
        }
        return {
          supportingRange,
          supportingAim,
          dXtis,
          dNtis,
          dRange,
          installationFuse,
          time,
          Vd,
          tube,
          hn,
          rangeMin,
          rangeMax,
        };
      } else {
        return {
          supportingRange,
          supportingAim,
          dXtis,
          dNtis,
          dRange,
          installationFuse,
          time,
          Vd,
          tube,
          hn,
          rangeMin,
          rangeMax,
        };
      }
    } catch (err) {
      const supportingRange = 0;
      const supportingAim = 0;
      const dXtis = 0;
      const dNtis = 0;
      const dRange = 0;
      const installationFuse = '';
      const time = 0;
      const Vd = 0;
      const tube = 0;
      const hn = 0;
      const rangeMin = 0;
      const rangeMax = 0;
      return {
        supportingRange,
        supportingAim,
        dXtis,
        dNtis,
        dRange,
        installationFuse,
        time,
        Vd,
        tube,
        hn,
        rangeMin,
        rangeMax,
      };
    }
  }, [basicData, calculatedRangeСalculation]);
  // /*расчет прицела*/
  const rangeFinalСalculation = React.useMemo(() => {
    const supportingAim = returnDataST.supportingAim;
    const dXtis = returnDataST.dXtis;
    const dRange = returnDataST.dRange;
    let dAim = 0;

    if (dXtis === 0 && dRange === 0) {
      dAim = 0;
    } else {
      dAim = Math.round(dRange / dXtis);
    }

    let aim = supportingAim - dAim;
    if (aim < 0) {
      return (aim = 0);
    } else {
      return aim;
    }
  }, [returnDataST, basicData]);
  /** расчет трубки */
  const tubeCalculation = React.useMemo(() => {
    const supportingAim = returnDataST.supportingAim;
    const supportingTube = returnDataST.tube;
    const dNtis = returnDataST.dNtis;
    const aim = rangeFinalСalculation;

    const dAim = aim - supportingAim;
    const tube = Math.round(
      dAim * dNtis + supportingTube + +targetData.amendmentTube,
    );
    return tube;
  }, [returnDataST, basicData, targetData]);
  // /*расчет уровня*/
  const excessСalculation = React.useMemo(() => {
    if (rangeСalculation !== 0) {
      const topographicRange = rangeСalculation;
      let height = 0;

      if (targetData.coordinateVariant) {
        height = targetData.heightTarget;
      } else {
        height =
          +OPData.heightOP +
          (targetData.rangeTarget * targetData.verticalAngleTarget) / 955;
      }
      let excess =
        ((height - FPData.heightFP) / (0.001 * topographicRange)) * 0.01 + 30;

      if (basicData.fuseName === 4) {
        excess += 0.15;
      }

      return excess.toFixed(2);
    } else {
      const excess = 0;
      return excess;
    }
  }, [FPData, targetData, basicData]);
  // /*расчет дир.угл б-ц*/
  const angleСalculation = React.useMemo(() => {
    let directionalAngle = 0;
    let angle = 0;

    if (targetData.targetsVariant) {
      directionalAngle =
        (Math.atan2(
          coordinateTargetСalculation.targetY - FPData.coordinateFPY,
          coordinateTargetСalculation.targetX - FPData.coordinateFPX,
        ) *
          180) /
        Math.PI /
        6;
    } else {
      if (targetData.coordinateVariant) {
        directionalAngle =
          (Math.atan2(
            targetData.coordinateTargetY - FPData.coordinateFPY,
            targetData.coordinateTargetX - FPData.coordinateFPX,
          ) *
            180) /
          Math.PI /
          6;
      } else {
        directionalAngle =
          (Math.atan2(
            coordinateTargetСalculation.targetY - FPData.coordinateFPY,
            coordinateTargetСalculation.targetX - FPData.coordinateFPX,
          ) *
            180) /
          Math.PI /
          6;
      }
    }

    if (directionalAngle < 0) {
      angle = directionalAngle + 60;
    } else {
      angle = directionalAngle;
    }
    return angle.toFixed(2);
  }, [targetData, FPData, coordinateTargetСalculation]);
  /*расчет топографического доворота*/
  const angleFromMainStreamСalculation = React.useMemo(() => {
    let directionAlngle = 0;

    if (targetData.coordinateVariant) {
      if (
        (targetData.coordinateTargetX !== '' &&
          targetData.coordinateTargetY !== '') ||
        (targetData.coordinateTargetLeftX !== '' &&
          targetData.coordinateTargetLeftY !== '' &&
          targetData.coordinateTargetRightX !== '' &&
          targetData.coordinateTargetRightY !== '')
      ) {
        if (angleСalculation >= 52.5 && angleСalculation <= 60) {
          directionAlngle = angleСalculation - basicData.mainStream - 60;
        } else {
          directionAlngle = angleСalculation - basicData.mainStream;
        }

        if (directionAlngle < -15) {
          directionAlngle = directionAlngle + 60;
        }
        return directionAlngle.toFixed(2);
      } else {
        return directionAlngle.toFixed(2);
      }
    } else {
      if (
        (targetData.rangeTarget !== '' && targetData.angleTarget !== '') ||
        (targetData.rangeTargetLeft !== '' &&
          targetData.angleTargetLeft !== '' &&
          targetData.rangeTargetRight !== '' &&
          targetData.angleTargetRight !== '')
      ) {
        if (angleСalculation >= 52.5 && angleСalculation <= 60) {
          directionAlngle = angleСalculation - basicData.mainStream - 60;
        } else {
          directionAlngle = angleСalculation - basicData.mainStream;
        }

        if (directionAlngle < -15) {
          directionAlngle = directionAlngle + 60;
        }
        return directionAlngle.toFixed(2);
      } else {
        return directionAlngle.toFixed(2);
      }
    }
  }, [basicData.mainStream, angleСalculation]);
  // /*расчет исчисленного доворота*/
  const calculatedAngleFromMainStreamСalculation = React.useMemo(() => {
    const calculatedAngle =
      +angleFromMainStreamСalculation + +targetData.amendmentAngle;

    return calculatedAngle.toFixed(2);
  }, [angleFromMainStreamСalculation, targetData.amendmentAngle]);
  // /*выбор установки взрывателя*/
  const choosingFuseInstallation = React.useMemo(() => {
    let installationFuse = returnDataST.installationFuse;

    if (rangeFinalСalculation === 0) {
      return (installationFuse = '');
    } else {
      return installationFuse;
    }
  }, [returnDataST.installationFuse, rangeFinalСalculation]);
  // /*расчет веера*/
  const fanCalculation = React.useMemo(() => {
    let fan = 0;

    if (rangeСalculation !== 0) {
      if (targetData.frontTarget - basicData.frontFP !== 0) {
        fan = (
          ((targetData.frontTarget - basicData.frontFP) /
            4 /
            (0.001 * rangeСalculation)) *
          0.01
        ).toFixed(2);
      } else {
        return 'Iв ';
      }

      if (targetData.frontTarget === '' || basicData.frontFP === '') {
        return 'Iв ';
      } else if (fan < 0) {
        return `Iв соед в ${fan * -1}`;
      } else if (fan != 0) {
        return `Iв разд в ${fan}`;
      } else {
        return 'Iв ';
      }
    } else {
      return 'Iв ';
    }
  }, [targetData.frontTarget, basicData.frontFP, rangeСalculation]);
  // /*расчет скачка*/
  const jumpCalculation = React.useMemo(() => {
    const dXtis = returnDataST.dXtis;
    let jump = 0;

    if (targetData.targetsVariant) {
      jump = Math.round(targetData.frontTarget / 4 / dXtis);
    } else {
      if (targetData.depthTarget === '') {
        jump = 0;
      } else {
        jump = Math.round(targetData.depthTarget / 3 / dXtis);
      }
    }

    return jump;
  }, [returnDataST.dXtis, targetData.depthTarget, targetData.frontTarget]);
  // /*расчет интервала веера на орудие*/
  const intervalFanCalculation = React.useMemo(() => {
    let intervalFan = 0;

    if (rangeСalculation !== 0) {
      intervalFan = Math.round(targetData.frontTarget / 4);

      if (intervalFan < 0) {
        return `Iв.ор 0`;
      } else {
        return `Iв.ор ${intervalFan}`;
      }
    } else {
      return `Iв.ор 0`;
    }
  }, [targetData]);
  // /*расчет дальности командира*/
  const rangeCommanderCalculation = React.useMemo(() => {
    let topographicRange = 0;

    if (rangeСalculation !== 0) {
      if (targetData.targetsVariant) {
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(
              coordinateTargetСalculation.targetX - OPData.coordinateOPX,
              2,
            ) +
              Math.pow(
                coordinateTargetСalculation.targetY - OPData.coordinateOPY,
                2,
              ),
          ),
        );
      } else {
        if (targetData.coordinateVariant) {
          topographicRange = Math.round(
            Math.sqrt(
              Math.pow(targetData.coordinateTargetX - OPData.coordinateOPX, 2) +
                Math.pow(
                  targetData.coordinateTargetY - OPData.coordinateOPY,
                  2,
                ),
            ),
          );
        } else {
          topographicRange = targetData.rangeTarget;
        }
      }

      return topographicRange;
    } else {
      return topographicRange;
    }
  }, [targetData, OPData]);
  // /*расчет угла командира*/
  const angleCommanderCalculation = React.useMemo(() => {
    let directionalAngle = 0;
    let angle = 0;

    if (rangeСalculation !== 0) {
      if (targetData.targetsVariant) {
        directionalAngle =
          (Math.atan2(
            coordinateTargetСalculation.targetY - OPData.coordinateOPY,
            coordinateTargetСalculation.targetX - OPData.coordinateOPX,
          ) *
            180) /
          Math.PI /
          6;
      } else {
        if (targetData.coordinateVariant) {
          directionalAngle =
            (Math.atan2(
              targetData.coordinateTargetY - OPData.coordinateOPY,
              targetData.coordinateTargetX - OPData.coordinateOPX,
            ) *
              180) /
            Math.PI /
            6;
        } else {
          directionalAngle = +targetData.angleTarget;
        }
      }

      if (directionalAngle < 0) {
        angle = directionalAngle + 60;
      } else {
        angle = directionalAngle;
      }

      return angle.toFixed(2);
    } else {
      return angle;
    }
  }, [targetData, OPData]);
  // /*расчет ПС*/
  const amendmentDisplacementCalculation = React.useMemo(() => {
    const numberAngle = +angleСalculation;
    const numberAngleCommander = +angleCommanderCalculation;
    let amendmentDisplacement = 0;
    if (rangeСalculation !== 0) {
      if (numberAngle - numberAngleCommander < 0) {
        amendmentDisplacement = (numberAngle - numberAngleCommander) * -1;
      } else {
        amendmentDisplacement = numberAngle - numberAngleCommander;
      }

      if (amendmentDisplacement >= 30 && amendmentDisplacement <= 60) {
        return ((amendmentDisplacement - 60) * -1).toFixed(2);
      } else {
        return amendmentDisplacement.toFixed(2);
      }
    } else {
      return amendmentDisplacement;
    }
  }, [angleСalculation, angleCommanderCalculation]);
  // /*расчет Ку*/
  const removalCoefficientCalculation = React.useMemo(() => {
    let removalCoefficient = 0;

    if (rangeCommanderCalculation === 0 || rangeСalculation === 0) {
      removalCoefficient = 0;
    } else {
      removalCoefficient = rangeCommanderCalculation / rangeСalculation;
    }
    return removalCoefficient.toFixed(2);
  }, [rangeCommanderCalculation, rangeСalculation]);
  // /*расчет Шу*/
  const stepAngomerCalculation = React.useMemo(() => {
    let stepAngomer = 0;

    if (amendmentDisplacementCalculation === 0 || rangeСalculation === 0) {
      stepAngomer = 0;
    } else {
      stepAngomer = Math.round(
        (amendmentDisplacementCalculation * 100) / (0.01 * rangeСalculation),
      );
    }

    return stepAngomer;
  }, [amendmentDisplacementCalculation, rangeСalculation]);
  // /*определение положения огневой позиции*/
  const findOutThePositionOfTheFirePosition = React.useMemo(() => {
    let str = '';

    if (+angleСalculation >= 52.2 && +angleСalculation <= 60) {
      if (+angleСalculation > +angleCommanderCalculation + 60) {
        str = 'слева';
      } else {
        str = 'справа';
      }
    } else {
      if (+angleСalculation > +angleCommanderCalculation) {
        str = 'слева';
      } else {
        str = 'справа';
      }
    }

    return str;
  }, [angleСalculation, angleСalculation]);
  // /*рассчет 8Вд, 4Вд, 2Вд*/
  const vdInAim = a => {
    const aim = Math.round((returnDataST.Vd * a) / returnDataST.dXtis);

    if (returnDataST.Vd != 0 || returnDataST.dXtis != 0) {
      return aim;
    } else {
      return 0;
    }
  };
  /**определить положение рубежа */
  const positionBorder = () => {
    const angleFPinRX = 60 - angleBorderСalculation;
    const angle = +angleСalculation + angleFPinRX;

    let positionBorder = '';

    if (angle >= 7.5 && angle <= 15) {
      positionBorder = 'Фр-й';
    } else {
      positionBorder = 'Фл-й';
    }

    return positionBorder;
  };
  // /*преобразовать точку в пробел */
  const replaceAngle = angle => {
    const reg = /\./;
    const str = angle.toString();
    const newStr = str.replace(reg, '-');

    return newStr;
  };

  const onChangeActiveTarget = value => {
    setActiveTarget(value);
    setTargetData(targets[value]);
  };

  const onChangeActiveBorders = value => {
    setActiveBorders(value);
    setTargetData(borders[value]);
  };

  const addTargets = () => {
    setTargets(prev => [...prev, targetData]);
    setTargetData(prev => ({
      ...initTargetData,
      coordinateVariant: prev.coordinateVariant,
      targetsVariant: prev.targetsVariant,
    }));
  };

  const addBorders = () => {
    setBorders(prev => [...prev, targetData]);
    setTargetData(prev => ({
      ...initTargetData,
      coordinateVariant: prev.coordinateVariant,
      targetsVariant: prev.targetsVariant,
    }));
  };

  const clearTargets = () => {
    setTargets([]);
    setBorders([]);
    setTargetData({...initTargetData});
  };
  const objFunctionDCA = {
    amendmentDisplacementCalculation,
    removalCoefficientCalculation,
    stepAngomerCalculation,
    findOutThePositionOfTheFirePosition,
    rangeCommanderCalculation,
    angleCommanderCalculation,
    returnDataST,
    vdInAim,
    replaceAngle,
    basicData,
  };
  const objFunctionFE = {
    rangeСalculation,
    replaceAngle,
    angleFromMainStreamСalculation,
    targetData,
    returnDataST,
    calculatedRangeСalculation,
    choosingFuseInstallation,
    rangeFinalСalculation,
    tubeCalculation,
    excessСalculation,
    calculatedAngleFromMainStreamСalculation,
    jumpCalculation,
    fanCalculation,
    intervalFanCalculation,
    basicData,
    positionBorder,
    borderRangeСalculation,
  };
  const objFunctionFC = {
    FPData,
    OPData,
    burstData,
    targetData,
    basicData,
    rangeСalculation,
    changeBurstData,
    replaceAngle,
    returnDataST,
    angleFromMainStreamСalculation,
    removalCoefficientCalculation,
    rangeCommanderCalculation,
  };

  const onChangeGeoCoordinats = () => {
    setGeoCoordinatsData({...initGeoCoordinats});

    Geolocation.getCurrentPosition(
      ({coords}) => {
        setGeoCoordinatsData({
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
        });
        setIsGeolacation(true);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 600000,
        maximumAge: 100,
        distanceFilter: 100,
      },
    );
  };

  React.useEffect(() => {
    if (OPData.startLocationOP) {
      changeOPData('coordinateOPX', WGS84inSK42(geoCoordinatsData).X);
      changeOPData('coordinateOPY', WGS84inSK42(geoCoordinatsData).Y);
      changeOPData('heightOP', WGS84inSK42(geoCoordinatsData).H_WGS84);
      changeOPData('startLocationOP', false);
    } else if (FPData.startLocationFP) {
      changeFPData('coordinateFPX', WGS84inSK42(geoCoordinatsData).X);
      changeFPData('coordinateFPY', WGS84inSK42(geoCoordinatsData).Y);
      changeFPData('heightFP', WGS84inSK42(geoCoordinatsData).H_WGS84);
      changeFPData('startLocationFP', false);
    }
    setIsGeolacation(false);
  }, [isGeolacation]);

  return (
    <>
      {!isLoading && (
        <ScrollView>
          <ModalBlock
            angle={angleСalculation}
            rangeСalculation={rangeСalculation}
            heightFP={FPData.heightFP}
            basicData={basicData}
            changeTargetData={changeTargetData}
            targetData={targetData}
            replaceAngle={replaceAngle}
          />
          <View>
            {/* Вхoдные данные */}
            <BasicData
              value={basicData}
              setValue={changeBasicData}
              returnDataST={returnDataST}
            />
            {/* КНП */}
            <ObservationPost
              value={OPData}
              setValue={changeOPData}
              disabled={FPData.startLocationFP}
              onPress={onChangeGeoCoordinats}
            />
            {/* Огневая */}
            <FirePosition
              value={FPData}
              setValue={changeFPData}
              disabled={OPData.startLocationOP}
              onPress={onChangeGeoCoordinats}
            />
            {/**Цель */}
            <Target
              targets={targets}
              borders={borders}
              activeTarget={activeTarget}
              activeBorders={activeBorders}
              onChangeActiveTarget={onChangeActiveTarget}
              onChangeActiveBorders={onChangeActiveBorders}
              clearTargets={clearTargets}
              targetData={targetData}
              changeTargetData={changeTargetData}
              basicData={basicData}
              addTargets={addTargets}
              addBorders={addBorders}
            />
            {/* Установки */}
            <FiringEquipment {...objFunctionFE} />
            {/* Данные для расчета корректур */}
            <DataCalcAdjustments {...objFunctionDCA} />
            {/* Рассчет коррекур */}
            <FireCorrection {...objFunctionFC} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default BatteryCommander;
