import React from 'react';
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
import SelectDropdown from 'react-native-select-dropdown';

import ModalBlock from '../components/Modal';
import BasicData from '../components/BasicData';
import ObservationPost from '../components/ObservationPost';
import FirePosition from '../components/FirePosition';
import SwitchBlock from '../components/SwitchBlock';
import RectangularCoordinates from '../components/RectangularCoordinates';
import PolarCoordinates from '../components/PolarCoordinates';
import DescriptionTarget from '../components/DescriptionTarget';

import shotingTables from '../DB/shotingTables';
import Cancel from '../image/cancel.png';

// const stateBasicData = {
//   mainStream,
//   frontFP,
//   trajectory,
//   nameCharge,
// };

// const stateObservantPosition = {
//   coordinateOPX,
//   coordinateOPY,
//   heightOP,
// };

// const stateFirePosition = {
//   coordinateFPX,
//   coordinateFPY,
//   heightFP,
// };

const BatteryCommander = () => {
  const [targets, setTargets] = React.useState([]);
  const [targetsIndex, setTargetsIndex] = React.useState('');
  const [fuseName, setFuseName] = React.useState({});

  const [mainStream, setMainStream] = React.useState('');
  const [frontFP, setFrontFP] = React.useState('');
  const [trajectory, setTrajectory] = React.useState({});
  const [nameCharge, setNameCharge] = React.useState({});

  const [coordinateOPX, setCoordinateOPX] = React.useState('');
  const [coordinateOPY, setCoordinateOPY] = React.useState('');
  const [heightOP, setHeightOP] = React.useState('');

  const [coordinateFPX, setCoordinateFPX] = React.useState('');
  const [coordinateFPY, setCoordinateFPY] = React.useState('');
  const [heightFP, setHeightFP] = React.useState('');

  const [coordinateTargetX, setCoordinateTargetX] = React.useState('');
  const [coordinateTargetY, setCoordinateTargetY] = React.useState('');
  const [heightTarget, setHeightTarget] = React.useState('');
  const [rangeTarget, setRangeTarget] = React.useState('');
  const [angleTarget, setAngleTarget] = React.useState('');
  const [verticalAngleTarget, setVerticalAngleTarget] = React.useState('');
  const [numberTarget, setNumberTarget] = React.useState('');
  const [nameTarget, setNameTarget] = React.useState('');
  const [frontTarget, setFrontTarget] = React.useState('');
  const [depthTarget, setDepthTarget] = React.useState('');

  const [rangeBurst, setRangeBurst] = React.useState('');
  const [angleBurst, setAngleBurst] = React.useState('');

  const [burstX, setBurstX] = React.useState('');
  const [burstY, setBurstY] = React.useState('');

  const [north, setNorth] = React.useState('');
  const [south, setSouth] = React.useState('');
  const [east, setEast] = React.useState('');
  const [west, setWest] = React.useState('');

  const [amendmentRange, setAmendmentRange] = React.useState('');
  const [amendmentAngle, setAmendmentAngle] = React.useState('');

  const [isVisible, setIsVisible] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  const charges = [
    {charge: 'п', id: 0},
    {charge: 'у', id: 1},
    {charge: 1, id: 2},
    {charge: 2, id: 3},
    {charge: 3, id: 4},
    {charge: 4, id: 5},
  ];

  const trajectories = [
    {trajectory: 'н', id: 0},
    {trajectory: 'м', id: 1},
  ];

  const fuse = [
    {fuseName: 'РГМ-2М', id: 0},
    {fuseName: 'В-90', id: 1},
    {fuseName: 'Т-7', id: 2},
    {fuseName: 'Т-90', id: 3},
    {fuseName: 'ДТМ-75', id: 4},
  ];

  const obj = {
    targets,
    targetsIndex,
    fuseName,
    mainStream,
    frontFP,
    trajectory,
    nameCharge,
    coordinateOPX,
    coordinateOPY,
    heightOP,
    coordinateFPX,
    coordinateFPY,
    heightFP,
    coordinateTargetX,
    coordinateTargetY,
    heightTarget,
    rangeTarget,
    angleTarget,
    verticalAngleTarget,
    numberTarget,
    nameTarget,
    frontTarget,
    depthTarget,
    rangeBurst,
    angleBurst,
    north,
    south,
    east,
    west,
    amendmentRange,
    amendmentAngle,
    isVisible,
  };

  React.useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  React.useEffect(() => {
    storeData();
  }, [
    targets,
    targetsIndex,
    fuseName,
    mainStream,
    frontFP,
    trajectory,
    nameCharge,
    coordinateOPX,
    coordinateOPY,
    heightOP,
    coordinateFPX,
    coordinateFPY,
    heightFP,
    coordinateTargetX,
    coordinateTargetY,
    heightTarget,
    rangeTarget,
    angleTarget,
    verticalAngleTarget,
    numberTarget,
    nameTarget,
    frontTarget,
    depthTarget,
    rangeBurst,
    angleBurst,
    north,
    south,
    east,
    west,
    amendmentRange,
    amendmentAngle,
    isVisible,
  ]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('data');
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        setTargets(data.targets);
        setTargetsIndex(data.targetsIndex);
        setFuseName(data.fuseName);
        setMainStream(data.mainStream);
        setFrontFP(data.frontFP);
        setTrajectory(data.trajectory);
        setNameCharge(data.nameCharge);
        setCoordinateOPX(data.coordinateOPX);
        setCoordinateOPY(data.coordinateOPY);
        setHeightOP(data.heightOP);
        setCoordinateFPX(data.coordinateFPX);
        setCoordinateFPY(data.coordinateFPY);
        setHeightFP(data.heightFP);
        setCoordinateTargetX(data.coordinateTargetX);
        setCoordinateTargetY(data.coordinateTargetY);
        setHeightTarget(data.heightTarget);
        setRangeTarget(data.rangeTarget);
        setAngleTarget(data.angleTarget);
        setVerticalAngleTarget(data.verticalAngleTarget);
        setNumberTarget(data.numberTarget);
        setNameTarget(data.nameTarget);
        setFrontTarget(data.frontTarget);
        setDepthTarget(data.depthTarget);
        setRangeBurst(data.rangeBurst);
        setAngleBurst(data.angleBurst);
        setNorth(data.north);
        setSouth(data.south);
        setEast(data.east);
        setWest(data.west);
        setAmendmentRange(data.amendmentRange);
        setAmendmentAngle(data.amendmentAngle);
        setIsVisible(data.isVisible);
      }
      setIsLoading(false);
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(obj);
      await AsyncStorage.setItem('data', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  /** расчет х,у цели*/
  const coordinateTargetСalculation = () => {
    if (
      isVisible &&
      coordinateTargetX &&
      coordinateFPX &&
      coordinateTargetY.length > 4 &&
      coordinateFPY
    ) {
      const targetX = coordinateTargetX;
      const targetY = coordinateTargetY;
      return {targetX, targetY};
    } else if (
      !isVisible &&
      coordinateFPX &&
      coordinateFPY &&
      coordinateOPX &&
      coordinateOPY &&
      rangeTarget &&
      angleTarget.length > 3
    ) {
      const coordinateX = +coordinateOPX;
      const coordinateY = +coordinateOPY;
      const angle = +angleTarget;

      const targetX = String(
        Math.round(
          coordinateX + rangeTarget * Math.cos(angle * 6 * (Math.PI / 180)),
        ),
      );
      const targetY = String(
        Math.round(
          coordinateY + rangeTarget * Math.sin(angle * 6 * (Math.PI / 180)),
        ),
      );

      return {targetX, targetY};
    } else {
      const targetX = 0;
      const targetY = 0;
      return {targetX, targetY};
    }
  };
  /*расчет топо дальности*/
  const rangeСalculation = () => {
    if (
      isVisible &&
      coordinateTargetX &&
      coordinateFPX &&
      coordinateTargetY.length > 4 &&
      coordinateFPY
    ) {
      let topographicRange = 0;
      const coordinateX = +coordinateOPX;
      const coordinateY = +coordinateOPY;
      const angle = +angleTarget;

      if (isVisible) {
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(coordinateTargetX - coordinateFPX, 2) +
              Math.pow(coordinateTargetY - coordinateFPY, 2),
          ),
        );
      } else {
        const targetX = Math.round(
          coordinateX + rangeTarget * Math.cos(angle * 6 * (Math.PI / 180)),
        );
        const targetY = Math.round(
          coordinateY + rangeTarget * Math.sin(angle * 6 * (Math.PI / 180)),
        );
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(targetX - coordinateFPX, 2) +
              Math.pow(targetY - coordinateFPY, 2),
          ),
        );
      }
      return +topographicRange;
    } else if (
      !isVisible &&
      coordinateFPX &&
      coordinateFPY &&
      coordinateOPX &&
      coordinateOPY &&
      rangeTarget &&
      angleTarget.length > 3
    ) {
      let topographicRange = 0;
      const coordinateX = +coordinateOPX;
      const coordinateY = +coordinateOPY;
      const angle = +angleTarget;

      if (isVisible) {
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(coordinateTargetX - coordinateFPX, 2) +
              Math.pow(coordinateTargetY - coordinateFPY, 2),
          ),
        );
      } else {
        const targetX = Math.round(
          coordinateX + rangeTarget * Math.cos(angle * 6 * (Math.PI / 180)),
        );
        const targetY = Math.round(
          coordinateY + rangeTarget * Math.sin(angle * 6 * (Math.PI / 180)),
        );
        topographicRange = Math.round(
          Math.sqrt(
            Math.pow(targetX - coordinateFPX, 2) +
              Math.pow(targetY - coordinateFPY, 2),
          ),
        );
      }

      return +topographicRange;
    } else {
      const topographicRange = 0;
      return +topographicRange;
    }
  };
  /*расчет исчисленной дальности*/
  const calculatedRangeСalculation = () => {
    const calculatedRange = rangeСalculation() + +amendmentRange;

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

      if (trajectory.toLocaleLowerCase() === 'н') {
        supportingRange = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range >= calculatedRangeСalculation()).range;
        supportingAim = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range >= calculatedRangeСalculation()).aim;
        dXtis = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range >= calculatedRangeСalculation()).dXtis;
        dRange = supportingRange - calculatedRangeСalculation();
        installationFuse = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(
            el => el.range >= calculatedRangeСalculation(),
          ).installationFuse;
        time = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range >= calculatedRangeСalculation()).Tc;
        Vd = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range >= calculatedRangeСalculation()).Vd;
      } else {
        supportingRange = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range <= calculatedRangeСalculation()).range;
        supportingAim = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range <= calculatedRangeСalculation()).aim;
        dXtis = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range <= calculatedRangeСalculation()).dXtis;
        dRange = calculatedRangeСalculation() - supportingRange;
        installationFuse = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(
            el => el.range <= calculatedRangeСalculation(),
          ).installationFuse;
        time = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
          .find(el => el.range <= calculatedRangeСalculation()).Tc;
        Vd = shotingTables
          .filter(el => el.name === nameCharge.toLocaleLowerCase())
          .filter(el => el.trajectory === trajectory.toLocaleLowerCase())
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

      if (isVisible) {
        height = heightTarget;
      } else {
        height = +heightOP + (rangeTarget * verticalAngleTarget) / 955;
      }
      const excess = (
        ((height - heightFP) / (0.001 * topographicRange)) * 0.01 +
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
    const coordinateX = +coordinateOPX;
    const coordinateY = +coordinateOPY;
    const angleT = +angleTarget;

    let directionalAngle = 0;
    let angle = 0;

    if (isVisible) {
      directionalAngle =
        (Math.atan2(
          coordinateTargetY - coordinateFPY,
          coordinateTargetX - coordinateFPX,
        ) *
          180) /
        Math.PI /
        6;
    } else {
      const targetX = Math.round(
        coordinateX + rangeTarget * Math.cos(angleT * 6 * (Math.PI / 180)),
      );
      const targetY = Math.round(
        coordinateY + rangeTarget * Math.sin(angleT * 6 * (Math.PI / 180)),
      );
      directionalAngle =
        (Math.atan2(targetY - coordinateFPY, targetX - coordinateFPX) * 180) /
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
      directionAlngle = angleСalculation() - mainStream - 60;
    } else {
      directionAlngle = angleСalculation() - mainStream;
    }

    if (directionAlngle < -15) {
      directionAlngle = directionAlngle + 60;
    }

    return directionAlngle.toFixed(2);
  };
  /*расчет исчисленного доворота*/
  const calculatedAngleFromMainStreamСalculation = () => {
    const calculatedAngle = +angleFromMainStreamСalculation() + +amendmentAngle;

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

    if (frontTarget - frontFP !== 0) {
      fan = (
        ((frontTarget - frontFP) / 4 / (0.001 * calculatedRangeСalculation())) *
        0.01
      ).toFixed(2);
    } else {
      return 'Iв ';
    }

    if (frontTarget === '' || frontFP === '') {
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

    if (depthTarget === '') {
      jump = 0;
    } else {
      jump = Math.round(depthTarget / 3 / dXtis);
    }

    return `Ск: ${jump}`;
  };
  /*расчет интервала веера на орудие*/
  const intervalFanCalculation = () => {
    const intervalFan = Math.round((frontTarget - frontFP) / 4);

    if (intervalFan < 0) {
      return `Iв.ор 0`;
    } else {
      return `Iв.ор ${intervalFan}`;
    }
  };
  /*расчет дфльности командира*/
  const rangeCommanderCalculation = () => {
    let topographicRange = 0;

    if (isVisible) {
      topographicRange = Math.round(
        Math.sqrt(
          Math.pow(coordinateTargetX - coordinateOPX, 2) +
            Math.pow(coordinateTargetY - coordinateOPY, 2),
        ),
      );
    } else {
      topographicRange = rangeTarget;
    }

    return topographicRange;
  };
  /*расчет угла командира*/
  const angleCommanderCalculation = () => {
    let directionalAngle = 0;
    let angle = 0;

    if (isVisible) {
      directionalAngle =
        (Math.atan2(
          coordinateTargetY - coordinateOPY,
          coordinateTargetX - coordinateOPX,
        ) *
          180) /
        Math.PI /
        6;
    } else {
      directionalAngle = +angleTarget;
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

    const coordinateX = +coordinateOPX;
    const coordinateY = +coordinateOPY;
    const angle = +angleBurst;

    const burstX = Math.round(
      coordinateX + rangeBurst * Math.cos(angle * 6 * (Math.PI / 180)),
    );
    const burstY = Math.round(
      coordinateY + rangeBurst * Math.sin(angle * 6 * (Math.PI / 180)),
    );

    const topographicRangeBurst = Math.round(
      Math.sqrt(
        Math.pow(burstX - coordinateFPX, 2) +
          Math.pow(burstY - coordinateFPY, 2),
      ),
    );

    const directionalAngle =
      (Math.atan2(burstY - coordinateFPY, burstX - coordinateFPX) * 180) /
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
      directionAlngle = angleFPInBurst - mainStream - 60;
    } else {
      directionAlngle = angleFPInBurst - mainStream;
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
    const coordinateX = +coordinateOPX;
    const coordinateY = +coordinateOPY;
    const angle = +angleTarget;

    if (isVisible) {
      targetX = +coordinateTargetX;
      targetY = +coordinateTargetY;
    } else {
      targetX = Math.round(
        coordinateX + rangeTarget * Math.cos(angle * 6 * (Math.PI / 180)),
      );
      targetY = Math.round(
        coordinateY + rangeTarget * Math.sin(angle * 6 * (Math.PI / 180)),
      );
    }

    const burstX = +targetX + +north - +south;
    const burstY = +targetY + +east - +west;

    const topographicRangeBurst = Math.round(
      Math.sqrt(
        Math.pow(burstX - coordinateFPX, 2) +
          Math.pow(burstY - coordinateFPY, 2),
      ),
    );

    const directionalAngle =
      (Math.atan2(burstY - coordinateFPY, burstX - coordinateFPX) * 180) /
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
      directionAlngle = angleFPInBurst - mainStream - 60;
    } else {
      directionAlngle = angleFPInBurst - mainStream;
    }

    if (rangeСalculation() === 0 || returnDataST().dXtis === 0) {
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
  /*преобразовать точку в пробел */
  const replaceAngle = angle => {
    const reg = /\./;
    const str = angle.toString();
    const newStr = str.replace(reg, '-');

    return newStr;
  };

  const hendlerIsVisible = () => {
    setIsVisible(!isVisible);
  };

  const addTargets = () => {
    const target = {
      id: targets.length,
      coordinateTargetX,
      coordinateTargetY,
      heightTarget,
      rangeTarget,
      angleTarget,
      verticalAngleTarget,
      numberTarget,
      nameTarget,
      frontTarget,
      depthTarget,
    };
    setTargets([...targets, target]);
  };
  const clearTargetInput = () => {
    setCoordinateTargetX('');
    setCoordinateTargetY('');
    setHeightTarget('');
    setRangeTarget('');
    setAngleTarget('');
    setVerticalAngleTarget('');
    setNumberTarget('');
    setNameTarget('');
    setFrontTarget('');
    setDepthTarget('');
  };

  React.useEffect(() => {
    if (targets.length > 0) {
      setCoordinateTargetX(targets[targetsIndex].coordinateTargetX);
      setCoordinateTargetY(targets[targetsIndex].coordinateTargetY);
      setHeightTarget(targets[targetsIndex].heightTarget);
      setRangeTarget(targets[targetsIndex].rangeTarget);
      setAngleTarget(targets[targetsIndex].angleTarget);
      setVerticalAngleTarget(targets[targetsIndex].verticalAngleTarget);
      setNumberTarget(targets[targetsIndex].numberTarget);
      setNameTarget(targets[targetsIndex].nameTarget);
      setFrontTarget(targets[targetsIndex].frontTarget);
      setDepthTarget(targets[targetsIndex].depthTarget);
    }
  }, [targetsIndex]);

  return (
    <>
      {!isLoading && (
        <ScrollView>
          <ModalBlock
            angle={angleСalculation()}
            heightFP={heightFP}
            rangeСalculation={rangeСalculation()}
            trajectory={trajectory}
            nameChargePrimary={nameCharge}
          />
          <SelectDropdown
            buttonStyle={{
              backgroundColor: '#576644',
              width: '49%',
              height: 45,
              paddingLeft: 10,
              fontSize: 18,
              marginTop: 15,
            }}
            data={fuse.map(item => item.fuseName)}
            onSelect={(selectedItem, index) => {
              setFuseName({fuse: selectedItem, id: index});
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultButtonText={'Взрыватель'}
            defaultValueByIndex={fuseName.id}
          />
          <View style={styles.container}>
            {/* Вхлдные данные */}
            <BasicData
              mainStream={mainStream}
              setMainStream={setMainStream}
              frontFP={frontFP}
              setFrontFP={setFrontFP}
              trajectory={trajectory}
              setTrajectory={setTrajectory}
              nameCharge={nameCharge}
              setNameCharge={setNameCharge}
              charges={charges}
              trajectories={trajectories}
            />
            {/* КНП */}
            <ObservationPost
              coordinateOPX={coordinateOPX}
              setCoordinateOPX={setCoordinateOPX}
              coordinateOPY={coordinateOPY}
              setCoordinateOPY={setCoordinateOPY}
              heightOP={heightOP}
              setHeightOP={setHeightOP}
            />
            {/* Огневая*/}
            <FirePosition
              coordinateFPX={coordinateFPX}
              setCoordinateFPX={setCoordinateFPX}
              coordinateFPY={coordinateFPY}
              setCoordinateFPY={setCoordinateFPY}
              heightFP={heightFP}
              setHeightFP={setHeightFP}
            />
            <SwitchBlock
              isVisible={isVisible}
              hendlerIsVisible={hendlerIsVisible}
            />
            {/* Цель */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                flexWrap: 'wrap',
              }}>
              <SelectDropdown
                buttonStyle={{
                  backgroundColor: '#576644',
                  width: '49%',
                  height: 45,
                  paddingLeft: 10,
                  fontSize: 18,
                }}
                data={targets.map(
                  item => `Ц-${item.numberTarget} ${item.nameTarget}`,
                )}
                onSelect={(selectedItem, index) => {
                  setTargetsIndex(index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText={'Цели'}
                defaultValueByIndex={targetsIndex}
              />
              <TouchableOpacity
                onPress={() => {
                  setTargets([]);
                  setTargetsIndex('');
                  clearTargetInput();
                }}
                style={{
                  backgroundColor: '#7e8d3b',
                  width: '49%',
                  borderRadius: 5,
                  height: 45,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18}}>Очистить цели</Text>
              </TouchableOpacity>
            </View>
            {isVisible ? (
              <>
                <RectangularCoordinates
                  coordinateTargetX={coordinateTargetX}
                  setCoordinateTargetX={setCoordinateTargetX}
                  coordinateTargetY={coordinateTargetY}
                  setCoordinateTargetY={setCoordinateTargetY}
                  heightTarget={heightTarget}
                  setHeightTarget={setHeightTarget}
                />
              </>
            ) : (
              <>
                <PolarCoordinates
                  rangeTarget={rangeTarget}
                  setRangeTarget={setRangeTarget}
                  angleTarget={angleTarget}
                  setAngleTarget={setAngleTarget}
                  verticalAngleTarget={verticalAngleTarget}
                  setVerticalAngleTarget={setVerticalAngleTarget}
                />
              </>
            )}
            {/* Цель */}
            <DescriptionTarget
              numberTarget={numberTarget}
              setNumberTarget={setNumberTarget}
              nameTarget={nameTarget}
              setNameTarget={setNameTarget}
              frontTarget={frontTarget}
              setFrontTarget={setFrontTarget}
              depthTarget={depthTarget}
              setDepthTarget={setDepthTarget}
              amendmentRange={amendmentRange}
              setAmendmentRange={setAmendmentRange}
              amendmentAngle={amendmentAngle}
              setAmendmentAngle={setAmendmentAngle}
            />
            <TouchableOpacity
              disabled={numberTarget.length === 0}
              onPress={() => {
                addTargets();
                clearTargetInput();
              }}
              style={styles.buttonStop}>
              <Text
                style={{color: '#ffffff', fontSize: 22, fontWeight: 'bold'}}>
                Стой! Записать
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
                  {`ΔД: ${amendmentRange}`}
                </Text>
                <Text
                  style={{
                    color: '#750000',
                    fontSize: 18,
                    marginBottom: 5,
                  }}>
                  {`Δδ: ${replaceAngle(amendmentAngle)}`}
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
