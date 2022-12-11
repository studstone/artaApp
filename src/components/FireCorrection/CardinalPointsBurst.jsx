import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Input from '../Input';

const inputs = {
  north: {
    placeholder: 'Север',
    text: 'С:',
  },
  south: {
    placeholder: 'ЮГ',
    text: 'Ю:',
  },
  west: {
    placeholder: 'Запад',
    text: 'З:',
  },
  east: {
    placeholder: 'Восток',
    text: 'В:',
  },
};

export default React.memo(function CardinalPointsBurst(props) {
  const value = props.burstData;
  const setValue = props.changeBurstData;
  const OPData = props.OPData;
  const targetData = props.targetData;
  const FPData = props.FPData;
  const basicData = props.basicData;
  const rangeСalculation = props.rangeСalculation;
  const replaceAngle = props.replaceAngle;
  const returnDataST = props.returnDataST;
  const angleFromMainStreamСalculation = props.angleFromMainStreamСalculation;

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
    const burstX = +targetX + +value.north - +value.south;
    const burstY = +targetY + +value.east - +value.west;
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
  }, [value]);
  return (
    <>
      <Text style={styles.textHeader}>Расчет корректур (ПКСС)</Text>
      <View style={styles.wrapper}>
        {Object.entries(inputs).map(([key, item]) => (
          <Input
            key={key}
            state={value[key]}
            keyboardType={'numeric'}
            setState={value => setValue(key, value)}
            placeholder={item.placeholder}
            placeholderTextColor={'black'}
            maxLength={3}
            text={item.text}
            style={styles.inputWrapper}
          />
        ))}
      </View>
      <View style={styles.answerWrapper}>
        <Text
          style={
            styles.textAnswer
          }>{`ΔП: ${proofreadingCalculationCardinal.proofreadingInAim}`}</Text>
        <Text style={styles.textAnswer}>{`Δδ: ${replaceAngle(
          proofreadingCalculationCardinal.proofreadingInAngle,
        )}`}</Text>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  answerWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  textHeader: {
    textAlign: 'center',
    fontSize: 30,
    color: '#000a96',
    marginBottom: 15,
  },
  textAnswer: {
    color: '#750000',
    fontSize: 40,
    width: '50%',
  },
});
