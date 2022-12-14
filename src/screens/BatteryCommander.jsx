import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

import ModalBlock from '../components/Modal';
import BasicData from '../components/BasicData/BasicData';
import ObservationPost from '../components/ObservationPost';
import FirePosition from '../components/FirePosition';
import TargetsList from '../components/TargetsList';
import CoordinatsVariant from '../components/Targets/CoordinatsVariant';
import DescriptionTarget from '../components/DescriptionTarget/DescriptionTarget';
import FireCorrection from '../components/FireCorrection/FireCorrection';

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
  coordinateTargetX: '',
  coordinateTargetY: '',
  heightTarget: '',
  rangeTarget: '',
  angleTarget: '',
  verticalAngleTarget: '',
  numberTarget: '',
  nameTarget: '',
  frontTarget: '',
  depthTarget: '',
  amendmentRange: '',
  amendmentAngle: '',
  amendmentTube: '',
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

  /** ???????????? ??,?? ????????*/
  const coordinateTarget??alculation = React.useMemo(() => {
    const targetX = Math.round(
      +OPData.coordinateOPX +
        targetData.rangeTarget *
          Math.cos(targetData.angleTarget * 6 * (Math.PI / 180)),
    );

    const targetY = Math.round(
      +OPData.coordinateOPY +
        targetData.rangeTarget *
          Math.sin(targetData.angleTarget * 6 * (Math.PI / 180)),
    );
    return {targetX, targetY};
  }, [OPData, targetData.rangeTarget, targetData.angleTarget]);
  /*???????????? ???????? ??????????????????*/
  const range??alculation = React.useMemo(() => {
    let topographicRange = 0;

    if (targetData.coordinateVariant) {
      if (
        targetData.coordinateTargetX !== '' &&
        targetData.coordinateTargetY !== ''
      ) {
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(targetData.coordinateTargetX - FPData.coordinateFPX, 2) +
              Math.pow(targetData.coordinateTargetY - FPData.coordinateFPY, 2),
          ),
        );

        return topographicRange;
      } else {
        return topographicRange;
      }
    } else {
      if (targetData.rangeTarget !== '' && targetData.angleTarget !== '') {
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(
              coordinateTarget??alculation.targetX - FPData.coordinateFPX,
              2,
            ) +
              Math.pow(
                coordinateTarget??alculation.targetY - FPData.coordinateFPY,
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
  /*???????????? ?????????????????????? ??????????????????*/
  const calculatedRange??alculation = React.useMemo(() => {
    const calculatedRange = range??alculation + +targetData.amendmentRange;

    return calculatedRange;
  }, [targetData.amendmentRange, range??alculation]);
  // /*???????????? ???????????? ????*/
  const returnDataST = React.useMemo(() => {
    try {
      const filterHangTrajectory = shotingTables
        .filter(el => el.fuse === basicData.fuseName)
        .filter(el => el.name === basicData.nameCharge)
        .filter(el => el.trajectory === basicData.trajectory)
        .find(el => el.range >= calculatedRange??alculation);

      const filterMortaryTrajectory = shotingTables
        .filter(el => el.fuse === basicData.fuseName)
        .filter(el => el.name === basicData.nameCharge)
        .filter(el => el.trajectory === basicData.trajectory)
        .find(el => el.range <= calculatedRange??alculation);

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

      if (calculatedRange??alculation !== 0) {
        if (basicData.trajectory === 0) {
          supportingRange = filterHangTrajectory.range;
          supportingAim = filterHangTrajectory.aim;
          dXtis = filterHangTrajectory.dXtis;
          dNtis = filterHangTrajectory.dNtis;
          dRange = supportingRange - calculatedRange??alculation;
          installationFuse = filterHangTrajectory.installationFuse;
          time = filterHangTrajectory.Tc;
          Vd = filterHangTrajectory.Vd;
          tube = filterHangTrajectory.tube;
          hn = filterHangTrajectory.hn;
        } else {
          supportingRange = filterMortaryTrajectory.range;
          supportingAim = filterMortaryTrajectory.aim;
          dXtis = filterMortaryTrajectory.dXtis;
          dRange = calculatedRange??alculation - supportingRange;
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
  }, [basicData, calculatedRange??alculation]);
  // /*???????????? ??????????????*/
  const rangeFinal??alculation = React.useMemo(() => {
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
  /** ???????????? ???????????? */
  const tubeCalculation = React.useMemo(() => {
    const supportingAim = returnDataST.supportingAim;
    const supportingTube = returnDataST.tube;
    const dNtis = returnDataST.dNtis;
    const aim = rangeFinal??alculation;

    const dAim = aim - supportingAim;
    const tube = Math.round(
      dAim * dNtis + supportingTube + +targetData.amendmentTube,
    );
    return tube;
  }, [returnDataST, basicData, targetData]);
  // /*???????????? ????????????*/
  const excess??alculation = React.useMemo(() => {
    if (range??alculation !== 0) {
      const topographicRange = range??alculation;
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
  // /*???????????? ??????.?????? ??-??*/
  const angle??alculation = React.useMemo(() => {
    let directionalAngle = 0;
    let angle = 0;

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
          coordinateTarget??alculation.targetY - FPData.coordinateFPY,
          coordinateTarget??alculation.targetX - FPData.coordinateFPX,
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
  }, [targetData, FPData]);
  /*???????????? ???????????????????????????????? ????????????????*/
  const angleFromMainStream??alculation = React.useMemo(() => {
    let directionAlngle = 0;

    if (targetData.coordinateVariant) {
      if (
        targetData.coordinateTargetX !== '' &&
        targetData.coordinateTargetY !== ''
      ) {
        if (angle??alculation >= 52.5 && angle??alculation <= 60) {
          directionAlngle = angle??alculation - basicData.mainStream - 60;
        } else {
          directionAlngle = angle??alculation - basicData.mainStream;
        }

        if (directionAlngle < -15) {
          directionAlngle = directionAlngle + 60;
        }
        return directionAlngle.toFixed(2);
      } else {
        return directionAlngle.toFixed(2);
      }
    } else {
      if (targetData.angleTarget !== '' && targetData.rangeTarget !== '') {
        if (angle??alculation >= 52.5 && angle??alculation <= 60) {
          directionAlngle = angle??alculation - basicData.mainStream - 60;
        } else {
          directionAlngle = angle??alculation - basicData.mainStream;
        }

        if (directionAlngle < -15) {
          directionAlngle = directionAlngle + 60;
        }
        return directionAlngle.toFixed(2);
      } else {
        return directionAlngle.toFixed(2);
      }
    }
  }, [basicData.mainStream, angle??alculation]);
  // /*???????????? ???????????????????????? ????????????????*/
  const calculatedAngleFromMainStream??alculation = React.useMemo(() => {
    const calculatedAngle =
      +angleFromMainStream??alculation + +targetData.amendmentAngle;

    return calculatedAngle.toFixed(2);
  }, [angleFromMainStream??alculation, targetData.amendmentAngle]);
  // /*?????????? ?????????????????? ????????????????????*/
  const choosingFuseInstallation = React.useMemo(() => {
    let installationFuse = returnDataST.installationFuse;

    if (rangeFinal??alculation === 0) {
      return (installationFuse = '');
    } else {
      return installationFuse;
    }
  }, [returnDataST.installationFuse, rangeFinal??alculation]);
  // /*???????????? ??????????*/
  const fanCalculation = React.useMemo(() => {
    let fan = 0;

    if (range??alculation !== 0) {
      if (targetData.frontTarget - basicData.frontFP !== 0) {
        fan = (
          ((targetData.frontTarget - basicData.frontFP) /
            4 /
            (0.001 * range??alculation)) *
          0.01
        ).toFixed(2);
      } else {
        return 'I?? ';
      }

      if (targetData.frontTarget === '' || basicData.frontFP === '') {
        return 'I?? ';
      } else if (fan < 0) {
        return `I?? ???????? ?? ${fan * -1}`;
      } else if (fan != 0) {
        return `I?? ???????? ?? ${fan}`;
      } else {
        return 'I?? ';
      }
    } else {
      return 'I?? ';
    }
  }, [targetData.frontTarget, basicData.frontFP, range??alculation]);
  // /*???????????? ????????????*/
  const jumpCalculation = React.useMemo(() => {
    const dXtis = returnDataST.dXtis;
    let jump = 0;

    if (targetData.depthTarget === '') {
      jump = 0;
    } else {
      jump = Math.round(targetData.depthTarget / 3 / dXtis);
    }

    return jump;
  }, [returnDataST.dXtis, targetData.depthTarget]);
  // /*???????????? ?????????????????? ?????????? ???? ????????????*/
  const intervalFanCalculation = React.useMemo(() => {
    let intervalFan = 0;

    if (range??alculation !== 0) {
      intervalFan = Math.round(targetData.frontTarget / 4);

      if (intervalFan < 0) {
        return `I??.???? 0`;
      } else {
        return `I??.???? ${intervalFan}`;
      }
    } else {
      return `I??.???? 0`;
    }
  }, [targetData]);
  // /*???????????? ?????????????????? ??????????????????*/
  const rangeCommanderCalculation = React.useMemo(() => {
    let topographicRange = 0;

    if (range??alculation !== 0) {
      if (targetData.coordinateVariant) {
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(targetData.coordinateTargetX - OPData.coordinateOPX, 2) +
              Math.pow(targetData.coordinateTargetY - OPData.coordinateOPY, 2),
          ),
        );
      } else {
        topographicRange = targetData.rangeTarget;
      }

      return topographicRange;
    } else {
      return topographicRange;
    }
  }, [targetData, OPData]);
  // /*???????????? ???????? ??????????????????*/
  const angleCommanderCalculation = React.useMemo(() => {
    let directionalAngle = 0;
    let angle = 0;

    if (range??alculation !== 0) {
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
  // /*???????????? ????*/
  const amendmentDisplacementCalculation = React.useMemo(() => {
    const numberAngle = +angle??alculation;
    const numberAngleCommander = +angleCommanderCalculation;
    let amendmentDisplacement = 0;
    if (range??alculation !== 0) {
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
  }, [angle??alculation, angleCommanderCalculation]);
  // /*???????????? ????*/
  const removalCoefficientCalculation = React.useMemo(() => {
    let removalCoefficient = 0;

    if (rangeCommanderCalculation === 0 || range??alculation === 0) {
      removalCoefficient = 0;
    } else {
      removalCoefficient = rangeCommanderCalculation / range??alculation;
    }
    return removalCoefficient.toFixed(2);
  }, [rangeCommanderCalculation, range??alculation]);
  // /*???????????? ????*/
  const stepAngomerCalculation = React.useMemo(() => {
    let stepAngomer = 0;

    if (amendmentDisplacementCalculation === 0 || range??alculation === 0) {
      stepAngomer = 0;
    } else {
      stepAngomer = Math.round(
        (amendmentDisplacementCalculation * 100) / (0.01 * range??alculation),
      );
    }

    return stepAngomer;
  }, [amendmentDisplacementCalculation, range??alculation]);
  // /*?????????????????????? ?????????????????? ?????????????? ??????????????*/
  const findOutThePositionOfTheFirePosition = React.useMemo(() => {
    let str = '';

    if (+angle??alculation >= 52.2 && +angle??alculation <= 60) {
      if (+angle??alculation > +angleCommanderCalculation + 60) {
        str = '??????????';
      } else {
        str = '????????????';
      }
    } else {
      if (+angle??alculation > +angleCommanderCalculation) {
        str = '??????????';
      } else {
        str = '????????????';
      }
    }

    return str;
  }, [angle??alculation, angle??alculation]);
  // /*?????????????? 8????, 4????, 2????*/
  const vdInAim = a => {
    const aim = Math.round((returnDataST.Vd * a) / returnDataST.dXtis);

    if (returnDataST.Vd != 0 || returnDataST.dXtis != 0) {
      return aim;
    } else {
      return 0;
    }
  };
  // /*?????????????????????????? ?????????? ?? ???????????? */
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

  const addTargets = () => {
    setTargets(prev => [...prev, targetData]);
    setTargetData(prev => ({
      ...initTargetData,
      coordinateVariant: prev.coordinateVariant,
    }));
  };

  const clearTargets = () => {
    setTargets([]);
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
    range??alculation,
    replaceAngle,
    angleFromMainStream??alculation,
    targetData,
    returnDataST,
    calculatedRange??alculation,
    choosingFuseInstallation,
    rangeFinal??alculation,
    tubeCalculation,
    excess??alculation,
    calculatedAngleFromMainStream??alculation,
    jumpCalculation,
    fanCalculation,
    intervalFanCalculation,
    basicData,
  };
  const objFunctionFC = {
    FPData,
    OPData,
    burstData,
    targetData,
    basicData,
    range??alculation,
    changeBurstData,
    replaceAngle,
    returnDataST,
    angleFromMainStream??alculation,
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
            angle={angle??alculation}
            range??alculation={range??alculation}
            heightFP={FPData.heightFP}
            basicData={basicData}
            changeTargetData={changeTargetData}
            targetData={targetData}
            replaceAngle={replaceAngle}
          />
          <View>
            {/* ????o???????? ???????????? */}
            <BasicData
              value={basicData}
              setValue={changeBasicData}
              returnDataST={returnDataST}
            />
            {/* ?????? */}
            <ObservationPost
              value={OPData}
              setValue={changeOPData}
              disabled={FPData.startLocationFP}
              onPress={onChangeGeoCoordinats}
            />
            {/* ?????????????? */}
            <FirePosition
              value={FPData}
              setValue={changeFPData}
              disabled={OPData.startLocationOP}
              onPress={onChangeGeoCoordinats}
            />
            <TargetsList
              data={targets}
              active={activeTarget}
              setActive={onChangeActiveTarget}
              clear={clearTargets}
            />
            <CoordinatsVariant value={targetData} setValue={changeTargetData} />
            {/* ???????? */}
            <DescriptionTarget
              value={targetData}
              setValue={changeTargetData}
              fuseName={basicData.fuseName}
            />
            <TouchableOpacity
              disabled={targetData.numberTarget.length === 0}
              onPress={addTargets}
              style={styles.buttonStop}>
              <Text style={styles.textStop}>????????! ????????????????!</Text>
            </TouchableOpacity>
            {/* ?????????????????? */}
            <FiringEquipment {...objFunctionFE} />
            {/* ???????????? ?????? ?????????????? ?????????????????? */}
            <DataCalcAdjustments {...objFunctionDCA} />
            {/* ?????????????? ???????????????? */}
            <FireCorrection {...objFunctionFC} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

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

export default BatteryCommander;
