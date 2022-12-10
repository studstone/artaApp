import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ModalBlock from '../components/Modal';
import BasicData from '../components/BasicData';
import ObservationPost from '../components/ObservationPost';
import FirePosition from '../components/FirePosition';
import DescriptionTarget from '../components/DescriptionTarget';
import TargetsList from '../components/TargetsList';
import CoordinatsVariant from '../components/CoordinatsVariant';
import FiringEquipmentRGM from '../components/FiringEquipmentRGM';

import shotingTables from '../DB/shotingTables';
import FireCorrection from '../components/FireCorrection/FireCorrection';

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
};

const initFPData = {
  coordinateFPX: '',
  coordinateFPY: '',
  heightFP: '',
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
};

const initBurstData = {
  rangeBurst: '',
  angleBurst: '',
  north: '',
  south: '',
  east: '',
  west: '',
  heightBurst: '',
};

const BatteryCommander = () => {
  const [basicData, setBasicData] = React.useState({...initBasicData});
  const [OPData, setOPData] = React.useState({...initOPData});
  const [FPData, setFPData] = React.useState({...initFPData});

  const [targets, setTargets] = React.useState([]);
  const [activeTarget, setActiveTarget] = React.useState(null);

  const [targetData, setTargetData] = React.useState({...initTargetData});
  const [burstData, setBurstData] = React.useState({...initBurstData});

  const [isLoading, setIsLoading] = React.useState(true);

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

  /** расчет х,у цели*/
  const coordinateTargetСalculation = React.useMemo(() => {
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
  /*расчет топо дальности*/
  const rangeСalculation = React.useMemo(() => {
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
  /*расчет исчисленной дальности*/
  const calculatedRangeСalculation = React.useMemo(() => {
    const calculatedRange = rangeСalculation + +targetData.amendmentRange;

    return calculatedRange;
  }, [targetData.amendmentRange, rangeСalculation]);
  // /*расчет данных ТС*/
  const returnDataST = React.useMemo(() => {
    try {
      let supportingRange = 0;
      let supportingAim = 0;
      let dXtis = 0;
      let dRange = 0;
      let installationFuse = '';
      let time = 0;
      let Vd = 0;

      if (calculatedRangeСalculation !== 0) {
        if (basicData.trajectory === 0) {
          supportingRange = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range >= rangeСalculation).range;
          supportingAim = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range >= rangeСalculation).aim;
          dXtis = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range >= rangeСalculation).dXtis;
          dRange = supportingRange - rangeСalculation;
          installationFuse = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range >= rangeСalculation).installationFuse;
          time = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range >= rangeСalculation).Tc;
          Vd = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range >= rangeСalculation).Vd;
        } else {
          supportingRange = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range <= rangeСalculation).range;
          supportingAim = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range <= rangeСalculation).aim;
          dXtis = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range <= rangeСalculation).dXtis;
          dRange = rangeСalculation - supportingRange;
          installationFuse = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range <= rangeСalculation).installationFuse;
          time = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range <= rangeСalculation).Tc;
          Vd = shotingTables
            .filter(el => el.fuse === basicData.fuseName)
            .filter(el => el.name === basicData.nameCharge)
            .filter(el => el.trajectory === basicData.trajectory)
            .find(el => el.range <= rangeСalculation).Vd;
        }
        return {
          supportingRange,
          supportingAim,
          dXtis,
          dRange,
          installationFuse,
          time,
          Vd,
        };
      } else {
        return {
          supportingRange,
          supportingAim,
          dXtis,
          dRange,
          installationFuse,
          time,
          Vd,
        };
      }
    } catch (err) {
      const supportingRange = 0;
      const supportingAim = 0;
      const dXtis = 0;
      const dRange = 0;
      const installationFuse = '';
      const time = 0;
      const Vd = 0;

      return {
        supportingRange,
        supportingAim,
        dXtis,
        dRange,
        installationFuse,
        time,
        Vd,
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
  }, [returnDataST.supportingAim, returnDataST.dXtis, returnDataST.dRange]);
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
      const excess = (
        ((height - FPData.heightFP) / (0.001 * topographicRange)) * 0.01 +
        30
      ).toFixed(2);

      return excess;
    } else {
      const excess = 0;
      return excess;
    }
  }, [
    rangeСalculation,
    FPData.heightFP,
    targetData.rangeTarget,
    targetData.verticalAngleTarget || rangeСalculation,
    FPData.heightFP,
    targetData.rangeTarget,
    targetData.heightTarget,
  ]);
  // /*расчет дир.угл б-ц*/
  const angleСalculation = React.useMemo(() => {
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
          coordinateTargetСalculation.targetY - FPData.coordinateFPY,
          coordinateTargetСalculation.targetX - FPData.coordinateFPX,
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
  /*расчет топографического доворота*/
  const angleFromMainStreamСalculation = React.useMemo(() => {
    let directionAlngle = 0;

    if (targetData.coordinateVariant) {
      if (
        targetData.coordinateTargetX !== '' &&
        targetData.coordinateTargetY !== ''
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
      if (targetData.angleTarget !== '' && targetData.rangeTarget !== '') {
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

    if (targetData.depthTarget === '') {
      jump = 0;
    } else {
      jump = Math.round(targetData.depthTarget / 3 / dXtis);
    }

    return jump;
  }, [returnDataST.dXtis, targetData.depthTarget]);
  // /*расчет интервала веера на орудие*/
  const intervalFanCalculation = React.useMemo(() => {
    let intervalFan = 0;

    if (rangeСalculation !== 0) {
      intervalFan = Math.round(
        (targetData.frontTarget - basicData.frontFP) / 4,
      );

      if (intervalFan < 0) {
        return `Iв.ор 0`;
      } else {
        return `Iв.ор ${intervalFan}`;
      }
    } else {
      return `Iв.ор 0`;
    }
  }, [targetData, basicData]);
  // /*расчет дальности командира*/
  const rangeCommanderCalculation = React.useMemo(() => {
    let topographicRange = 0;

    if (rangeСalculation !== 0) {
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
  // /*расчет угла командира*/
  const angleCommanderCalculation = React.useMemo(() => {
    let directionalAngle = 0;
    let angle = 0;

    if (rangeСalculation !== 0) {
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
            <BasicData value={basicData} setValue={changeBasicData} />
            {/* КНП */}
            <ObservationPost value={OPData} setValue={changeOPData} />
            {/* Огневая */}
            <FirePosition value={FPData} setValue={changeFPData} />
            <TargetsList
              data={targets}
              active={activeTarget}
              setActive={onChangeActiveTarget}
              clear={clearTargets}
            />
            <CoordinatsVariant value={targetData} setValue={changeTargetData} />
            {/* Цель */}
            <DescriptionTarget value={targetData} setValue={changeTargetData} />
            <TouchableOpacity
              // disabled={targetData.numberTarget.length === 0}
              onPress={addTargets}
              style={styles.buttonStop}>
              <Text
                style={{color: '#ffffff', fontSize: 22, fontWeight: 'bold'}}>
                Стой! Записать!
              </Text>
            </TouchableOpacity>
            {/* Установки */}
            <FiringEquipmentRGM
              rangeСalculation={rangeСalculation}
              replaceAngle={replaceAngle}
              angleFromMainStreamСalculation={angleFromMainStreamСalculation}
              amendmentRange={targetData.amendmentRange}
              amendmentAngle={targetData.amendmentAngle}
              calculatedRangeСalculation={calculatedRangeСalculation}
              choosingFuseInstallation={choosingFuseInstallation}
              rangeFinalСalculation={rangeFinalСalculation}
              excessСalculation={excessСalculation}
              calculatedAngleFromMainStreamСalculation={
                calculatedAngleFromMainStreamСalculation
              }
              jumpCalculation={jumpCalculation}
              fanCalculation={fanCalculation}
              intervalFanCalculation={intervalFanCalculation}
              time={returnDataST.time}
            />
            {/* Данные для расчета корректур */}
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                color: '#000a96',
                marginBottom: 15,
              }}>
              Данные для расчета корректур
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginBottom: 15,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`ПС: ${replaceAngle(amendmentDisplacementCalculation)}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Ку: ${removalCoefficientCalculation}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Шу: ${stepAngomerCalculation}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`ОП: ${findOutThePositionOfTheFirePosition}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Дк ${rangeCommanderCalculation}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Угк ${replaceAngle(angleCommanderCalculation)}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Вд: ${returnDataST.Vd}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`ΔХтыс: ${returnDataST.dXtis}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                }}>
                {`8Вд: ΔП=${vdInAim(8)}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                }}>
                {`4Вд: ΔП=${vdInAim(4)}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                }}>
                {`2Вд: ΔП=${vdInAim(2)}`}
              </Text>
            </View>
            {/* Рассчет коррекур */}
            <FireCorrection
              FPData={FPData}
              OPData={OPData}
              burstData={burstData}
              basicData={basicData}
              targetData={targetData}
              rangeСalculation={rangeСalculation}
              setValue={changeBurstData}
              replaceAngle={replaceAngle}
              returnDataST={returnDataST}
              angleFromMainStreamСalculation={angleFromMainStreamСalculation}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
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
  input: {
    maxWidth: '100%',
    minWidth: 0,
    fontSize: 18,
    flex: 1,
    borderWidth: 1,
    padding: 2,
    borderColor: 'transparent',
    color: '#2e2e2e',
  },
  button: {
    width: 40,
    height: 40,
  },
  image: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 18,
  },
  answerWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  buttonСalculation: {
    marginTop: 15,
    backgroundColor: '#613627',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
  },
  textСalculation: {
    fontSize: 20,
    color: '#3f0d1e',
  },
});

export default BatteryCommander;
