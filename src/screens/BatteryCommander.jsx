import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

import shotingTables from '../DB/shotingTables';
import Cancel from '../image/cancel.png';

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

const BatteryCommander = () => {
  const [basicData, setBasicData] = React.useState({...initBasicData});
  const [OPData, setOPData] = React.useState({...initOPData});
  const [FPData, setFPData] = React.useState({...initFPData});

  const [targets, setTargets] = React.useState([]);
  const [activeTarget, setActiveTarget] = React.useState(null);

  const [targetData, setTargetData] = React.useState({...initTargetData});

  const [rangeBurst, setRangeBurst] = React.useState('');
  const [angleBurst, setAngleBurst] = React.useState('');

  const [burstX, setBurstX] = React.useState('');
  const [burstY, setBurstY] = React.useState('');

  const [north, setNorth] = React.useState('');
  const [south, setSouth] = React.useState('');
  const [east, setEast] = React.useState('');
  const [west, setWest] = React.useState('');

  const [isVisible, setIsVisible] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

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

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   getData();
  // }, []);

  // React.useEffect(() => {
  //   storeData();
  // }, [basicData, OPData, FPData, targetData, targets, activeTarget]);

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('data');
  //     if (jsonValue !== null) {
  //       const data = JSON.parse(jsonValue);
  //       setBasicData(data.basicData);
  //       setOPData(data.OPData);
  //       setFPData(data.FPData);
  //       setTargetData(data.targetData);
  //       setTargets(data.targets);
  //       setActiveTarget(data.activeTarget);
  //     }
  //     setIsLoading(false);
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // const storeData = async () => {
  //   const obj = {
  //     basicData,
  //     OPData,
  //     FPData,
  //     targetData,
  //     targets,
  //     activeTarget,
  //   };
  //   try {
  //     const jsonValue = JSON.stringify(obj);
  //     await AsyncStorage.setItem('data', jsonValue);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  /** расчет х,у цели*/
  const coordinateTargetСalculation = React.useCallback(() => {
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
  }, [targetData.rangeTarget, targetData.angleTarget.length]);
  /*расчет топо дальности*/
  const rangeСalculation = () => {
    let topographicRange = 0;
    if (targetData.coordinateVariant) {
      topographicRange = Math.round(
        Math.sqrt(
          Math.pow(targetData.coordinateTargetX - FPData.coordinateFPX, 2) +
            Math.pow(targetData.coordinateTargetY - FPData.coordinateFPY, 2),
        ),
      );
      return topographicRange;
    } else {
      topographicRange = Math.round(
        Math.sqrt(
          Math.pow(
            coordinateTargetСalculation().targetX - FPData.coordinateFPX,
            2,
          ) +
            Math.pow(
              coordinateTargetСalculation().targetY - FPData.coordinateFPY,
              2,
            ),
        ),
      );
      return topographicRange;
    }
  };
  /*расчет исчисленной дальности*/
  const calculatedRangeСalculation = () => {
    const calculatedRange = rangeСalculation() + +targetData.amendmentRange;

    return calculatedRange;
  };
  /*расчет данных ТС*/
  const returnDataST = () => {
    try {
      let supportingRange = 0;
      let supportingAim = 0;
      let dXtis = 0;
      let dRange = 0;
      let installationFuse = '';
      let time = 0;
      let Vd = 0;

      if (basicData.trajectory === 0) {
        supportingRange = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= calculatedRangeСalculation()).range;
        supportingAim = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= calculatedRangeСalculation()).aim;
        dXtis = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= calculatedRangeСalculation()).dXtis;
        dRange = supportingRange - calculatedRangeСalculation();
        installationFuse = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(
            el => el.range >= calculatedRangeСalculation(),
          ).installationFuse;
        time = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= calculatedRangeСalculation()).Tc;
        Vd = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range >= calculatedRangeСalculation()).Vd;
      } else {
        supportingRange = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= calculatedRangeСalculation()).range;
        supportingAim = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= calculatedRangeСalculation()).aim;
        dXtis = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= calculatedRangeСalculation()).dXtis;
        dRange = calculatedRangeСalculation() - supportingRange;
        installationFuse = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(
            el => el.range <= calculatedRangeСalculation(),
          ).installationFuse;
        time = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= calculatedRangeСalculation()).Tc;
        Vd = shotingTables
          .filter(el => el.fuse === basicData.fuseName)
          .filter(el => el.name === basicData.nameCharge)
          .filter(el => el.trajectory === basicData.trajectory)
          .find(el => el.range <= calculatedRangeСalculation()).Vd;
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
  };
  /*расчет прицела*/
  const rangeFinalСalculation = () => {
    const supportingAim = returnDataST().supportingAim;
    const dXtis = returnDataST().dXtis;
    const dRange = returnDataST().dRange;
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
  };
  /*расчет уровня*/
  const excessСalculation = () => {
    if (rangeСalculation() !== 0) {
      const topographicRange = rangeСalculation();
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
  };
  /*расчет дир.угл б-ц*/
  const angleСalculation = () => {
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
          coordinateTargetСalculation().targetY - FPData.coordinateFPY,
          coordinateTargetСalculation().targetX - FPData.coordinateFPX,
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
  };
  /*расчет топографического доворота*/
  const angleFromMainStreamСalculation = () => {
    let directionAlngle = 0;

    if (angleСalculation() >= 52.5 && angleСalculation() <= 60) {
      directionAlngle = angleСalculation() - basicData.mainStream - 60;
    } else {
      directionAlngle = angleСalculation() - basicData.mainStream;
    }

    if (directionAlngle < -15) {
      directionAlngle = directionAlngle + 60;
    }

    return directionAlngle.toFixed(2);
  };
  /*расчет исчисленного доворота*/
  const calculatedAngleFromMainStreamСalculation = () => {
    const calculatedAngle =
      +angleFromMainStreamСalculation() + +targetData.amendmentAngle;

    return calculatedAngle.toFixed(2);
  };
  /*выбор установки взрывателя*/
  const choosingFuseInstallation = () => {
    let installationFuse = returnDataST().installationFuse;

    if (rangeFinalСalculation() === 0) {
      return (installationFuse = '');
    } else {
      return installationFuse;
    }
  };
  /*расчет веера*/
  const fanCalculation = () => {
    let fan = 0;

    if (targetData.frontTarget - basicData.frontFP !== 0) {
      fan = (
        ((targetData.frontTarget - basicData.frontFP) /
          4 /
          (0.001 * calculatedRangeСalculation())) *
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
  };
  /*расчет скачка*/
  const jumpCalculation = () => {
    const dXtis = returnDataST().dXtis;
    let jump = 0;

    if (targetData.depthTarget === '') {
      jump = 0;
    } else {
      jump = Math.round(targetData.depthTarget / 3 / dXtis);
    }

    return `Ск: ${jump}`;
  };
  /*расчет интервала веера на орудие*/
  const intervalFanCalculation = () => {
    const intervalFan = Math.round(
      (targetData.frontTarget - basicData.frontFP) / 4,
    );

    if (intervalFan < 0) {
      return `Iв.ор 0`;
    } else {
      return `Iв.ор ${intervalFan}`;
    }
  };
  /*расчет дальности командира*/
  const rangeCommanderCalculation = () => {
    let topographicRange = 0;

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
  };
  /*расчет угла командира*/
  const angleCommanderCalculation = () => {
    let directionalAngle = 0;
    let angle = 0;

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
  };
  /*расчет ПС*/
  const amendmentDisplacementCalculation = () => {
    const numberAngle = +angleСalculation();
    const numberAngleCommander = +angleCommanderCalculation();
    let amendmentDisplacement = 0;

    if (angleСalculation() - angleCommanderCalculation() < 0) {
      amendmentDisplacement = (numberAngle - numberAngleCommander) * -1;
    } else {
      amendmentDisplacement = numberAngle - numberAngleCommander;
    }

    if (amendmentDisplacement >= 30 && amendmentDisplacement <= 60) {
      return ((amendmentDisplacement - 60) * -1).toFixed(2);
    } else {
      return amendmentDisplacement.toFixed(2);
    }
  };
  /*расчет Ку*/
  const removalCoefficientCalculation = () => {
    let removalCoefficient = 0;

    if (rangeCommanderCalculation() === 0 || rangeСalculation() === 0) {
      removalCoefficient = 0;
    } else {
      removalCoefficient = rangeCommanderCalculation() / rangeСalculation();
    }

    return removalCoefficient.toFixed(2);
  };
  /*расчет Шу*/
  const stepAngomerCalculation = () => {
    let stepAngomer = 0;

    if (amendmentDisplacementCalculation() === 0 || rangeСalculation() === 0) {
      stepAngomer = 0;
    } else {
      stepAngomer = Math.round(
        (amendmentDisplacementCalculation() * 100) /
          (0.01 * rangeСalculation()),
      );
    }

    return stepAngomer;
  };
  /*определение положения огневой позиции*/
  const findOutThePositionOfTheFirePosition = () => {
    let str = '';

    if (+angleСalculation() >= 52.2 && +angleСalculation() <= 60) {
      if (+angleСalculation() > +angleCommanderCalculation() + 60) {
        str = 'слева';
      } else {
        str = 'справа';
      }
    } else {
      if (+angleСalculation() > +angleCommanderCalculation()) {
        str = 'слева';
      } else {
        str = 'справа';
      }
    }

    return str;
  };
  /*рассчет 8Вд, 4Вд, 2Вд*/
  const vdInAim = a => {
    const aim = Math.round((returnDataST().Vd * a) / returnDataST().dXtis);

    if (returnDataST().Vd != 0 || returnDataST().dXtis != 0) {
      return aim;
    } else {
      return 0;
    }
  };
  /*рассчет корректуры по Дк и УГк*/
  const proofreadingCalculationFirst = () => {
    let proofreadingInAim = 0;
    let proofreadingInAngle = 0;

    const coordinateX = +OPData.coordinateOPX;
    const coordinateY = +OPData.coordinateOPY;
    const angle = +angleBurst;

    const burstX = Math.round(
      coordinateX + rangeBurst * Math.cos(angle * 6 * (Math.PI / 180)),
    );
    const burstY = Math.round(
      coordinateY + rangeBurst * Math.sin(angle * 6 * (Math.PI / 180)),
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

    if (rangeBurst === '' || angleBurst === '') {
      proofreadingInAngle = 0;
      proofreadingInAim = 0;
    } else {
      if (trajectory.toLocaleLowerCase() === 'н') {
        proofreadingInAim = Math.round(
          (rangeСalculation() - topographicRangeBurst) / returnDataST().dXtis,
        );
      } else {
        proofreadingInAim = Math.round(
          ((rangeСalculation() - topographicRangeBurst) /
            returnDataST().dXtis) *
            -1,
        );
      }

      proofreadingInAngle = (
        angleFromMainStreamСalculation() - directionAlngle
      ).toFixed(2);
    }
    return {proofreadingInAngle, proofreadingInAim};
  };
  /*рассчет корректуры ПКсс*/
  const proofreadingCalculationSecond = () => {
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

    const burstX = +targetX + +north - +south;
    const burstY = +targetY + +east - +west;

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

    if (rangeСalculation() === 0 || returnDataST().dXtis === 0) {
      proofreadingInAngle = 0;
      proofreadingInAim = 0;
    } else {
      if (basicData.trajectory === 0) {
        proofreadingInAim = Math.round(
          (rangeСalculation() - topographicRangeBurst) / returnDataST().dXtis,
        );
      } else {
        proofreadingInAim = Math.round(
          ((rangeСalculation() - topographicRangeBurst) /
            returnDataST().dXtis) *
            -1,
        );
      }

      proofreadingInAngle = (
        angleFromMainStreamСalculation() - directionAlngle
      ).toFixed(2);
    }

    return {proofreadingInAngle, proofreadingInAim};
  };
  /*преобразовать точку в пробел */
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
            // angle={angleСalculation()}
            // rangeСalculation={rangeСalculation()}
            // heightFP={heightFP}
            trajectory={basicData.trajectory}
            nameChargePrimary={basicData.nameCharge}
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
            <View style={styles.answerWrapper}>
              <View
                style={{
                  width: '37%',
                }}>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {`Дт: ${rangeСalculation()}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {`δт: ${replaceAngle(angleFromMainStreamСalculation())}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {`ΔД: ${targetData.amendmentRange}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {`Δδ: ${replaceAngle(targetData.amendmentAngle)}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                  }}>
                  {`Ди: ${calculatedRangeСalculation()}`}
                </Text>
              </View>
              <View
                style={{
                  width: '30%',
                }}>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {`У.вз: ${choosingFuseInstallation()}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {`Пр: ${rangeFinalСalculation()}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {excessСalculation() === 'NaN'
                    ? 'Ур: 30-00'
                    : `Ур: ${replaceAngle(excessСalculation())}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {calculatedAngleFromMainStreamСalculation() === '0.00'
                    ? 'δи: ОН'
                    : `δи: ${replaceAngle(
                        calculatedAngleFromMainStreamСalculation(),
                      )}`}
                </Text>
              </View>
              <View
                style={{
                  width: '33%',
                }}>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {jumpCalculation()}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {replaceAngle(fanCalculation())}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {intervalFanCalculation()}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {`Тпол: ${returnDataST().time}`}
                </Text>
              </View>
            </View>
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
                {`ПС: ${replaceAngle(amendmentDisplacementCalculation())}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Ку: ${removalCoefficientCalculation()}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Шу: ${stepAngomerCalculation()}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`ОП: ${findOutThePositionOfTheFirePosition()}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Дк ${rangeCommanderCalculation()}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Угк ${replaceAngle(angleCommanderCalculation())}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`Вд: ${returnDataST().Vd}`}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#750000',
                  width: '25%',
                  marginBottom: 15,
                }}>
                {`ΔХтыс: ${returnDataST().dXtis}`}
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
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                color: '#000a96',
                marginBottom: 15,
              }}>
              Расчет корректур (Др,&nbsp; УГр)
            </Text>
            <View style={styles.wrapper}>
              <View style={styles.inputWrapper}>
                <>{rangeBurst && <Text style={styles.label}>Др:</Text>}</>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={setRangeBurst}
                  value={rangeBurst}
                  placeholder="Дальн. разрыва"
                  placeholderTextColor={'black'}
                  maxLength={5}
                />
                <>
                  {rangeBurst && (
                    <View style={styles.button}>
                      <TouchableOpacity onPress={() => setRangeBurst('')}>
                        <Image style={styles.image} source={Cancel} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              </View>
              <View style={styles.inputWrapper}>
                <>{angleBurst && <Text style={styles.label}>УГр:</Text>}</>
                <TextInput
                  style={styles.input}
                  keyboardType="numbers-and-punctuation"
                  onChangeText={setAngleBurst}
                  value={angleBurst}
                  placeholder="Угол разрыва"
                  placeholderTextColor={'black'}
                  maxLength={5}
                />
                <>
                  {angleBurst && (
                    <View style={styles.button}>
                      <TouchableOpacity onPress={() => setAngleBurst('')}>
                        <Image style={styles.image} source={Cancel} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              </View>
            </View>
            <View style={styles.answerWrapper}>
              <Text
                style={{
                  color: '#750000',
                  fontSize: 42,
                  width: '50%',
                }}>
                {`ΔПр: ${proofreadingCalculationFirst().proofreadingInAim}`}
              </Text>
              <Text
                style={{
                  color: '#750000',
                  fontSize: 42,
                  width: '50%',
                }}>
                {`Δδ: ${replaceAngle(
                  proofreadingCalculationFirst().proofreadingInAngle,
                )}`}
              </Text>
            </View>
            {/* Рассчет коррекур */}
            <Text
              style={{
                textAlign: 'center',
                fontSize: 30,
                color: '#000a96',
                marginBottom: 15,
                marginTop: 20,
              }}>
              Расчет корректур (ПКСС)
            </Text>
            <View style={styles.wrapper}>
              <View style={styles.inputWrapper}>
                <>{north && <Text style={styles.label}>С:</Text>}</>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={setNorth}
                  value={north}
                  placeholder="Север"
                  placeholderTextColor={'black'}
                  maxLength={4}
                />
                <>
                  {north && (
                    <View style={styles.button}>
                      <TouchableOpacity onPress={() => setNorth('')}>
                        <Image style={styles.image} source={Cancel} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              </View>
              <View style={styles.inputWrapper}>
                <>{south && <Text style={styles.label}>Ю:</Text>}</>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={setSouth}
                  value={south}
                  placeholder="ЮГ"
                  placeholderTextColor={'black'}
                  maxLength={4}
                />
                <>
                  {south && (
                    <View style={styles.button}>
                      <TouchableOpacity onPress={() => setSouth('')}>
                        <Image style={styles.image} source={Cancel} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              </View>
              <View style={styles.inputWrapper}>
                <>{west && <Text style={styles.label}>З:</Text>}</>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={setWest}
                  value={west}
                  placeholder="Запад"
                  placeholderTextColor={'black'}
                  maxLength={4}
                />
                <>
                  {west && (
                    <View style={styles.button}>
                      <TouchableOpacity onPress={() => setWest('')}>
                        <Image style={styles.image} source={Cancel} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              </View>
              <View style={styles.inputWrapper}>
                <>{east && <Text style={styles.label}>В:</Text>}</>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  onChangeText={setEast}
                  value={east}
                  placeholder="Восток"
                  placeholderTextColor={'black'}
                  maxLength={4}
                />
                <>
                  {east && (
                    <View style={styles.button}>
                      <TouchableOpacity onPress={() => setEast('')}>
                        <Image style={styles.image} source={Cancel} />
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              </View>
            </View>
            <View style={styles.answerWrapper}>
              <Text
                style={{
                  color: '#750000',
                  fontSize: 42,
                  width: '50%',
                }}>
                {`ΔП: ${proofreadingCalculationSecond().proofreadingInAim}`}
              </Text>
              <Text
                style={{
                  color: '#750000',
                  fontSize: 42,
                  width: '50%',
                }}>
                {`Δδ: ${replaceAngle(
                  proofreadingCalculationSecond().proofreadingInAngle,
                )}`}
              </Text>
            </View>
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
