import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Input from '../Input';
import SwitchBlock from '../SwitchBlock';

const inputs = {
  rangeBurst: {
    placeholder: 'Дальн. разрыва',
    text: 'Др:',
    keyboardType: 'numeric',
    maxLength: 4,
  },
  angleBurst: {
    placeholder: 'Угол разрыва',
    text: 'УГр:',
    keyboardType: 'numeric',
    maxLength: 5,
  },
  heightBurst: {
    placeholder: 'Уг.разр над ц',
    text: 'ΔМр:',
    keyboardType: 'numeric',
    maxLength: 5,
  },
};

const inputs1 = {
  rangeBurst: {
    placeholder: 'Дальн. разрыва',
    text: 'Др:',
    keyboardType: 'numeric',
    maxLength: 4,
  },
  angleBurst: {
    placeholder: 'Угол разрыва',
    text: 'УГр:',
    keyboardType: 'numeric',
    maxLength: 5,
  },
  burningTime: {
    placeholder: 'Время горения',
    text: 'Т гор:',
    keyboardType: 'numeric',
    maxLength: 5,
  },
};

export default React.memo(function IlluminationAmmunition(props) {
  const [isVisible, setIsVisible] = React.useState(true);

  const value = props.burstData;
  const setValue = props.changeBurstData;
  const OPData = props.OPData;
  const FPData = props.FPData;
  const basicData = props.basicData;
  const rangeCommander = props.rangeCommanderCalculation;
  const removalCoefficien = +props.removalCoefficientCalculation;
  const replaceAngle = props.replaceAngle;
  const returnDataST = props.returnDataST;
  const angleFromMainStreamСalculation = props.angleFromMainStreamСalculation;
  const rangeСalculation = props.rangeСalculation;

  /**расчет поправок*/
  const amendmentExcessCalculation = () => {
    const heightBurst = +value.heightBurst;
    const burningTime = +value.burningTime;

    let amendmentExcess = 0;

    const advantageousVerticalAngle = 50 / (0.001 * rangeCommander);

    if (isVisible) {
      amendmentExcess = (
        (advantageousVerticalAngle - heightBurst) *
        removalCoefficien *
        0.01
      ).toFixed(2);
    } else {
      amendmentExcess = (
        ((burningTime * 10 + 50) / (0.001 * rangeСalculation)) *
        0.01
      ).toFixed(2);
    }

    if (isVisible) {
      if (heightBurst === 0) {
        amendmentExcess = 0;
      } else {
        amendmentExcess = amendmentExcess;
      }
    } else {
      if (burningTime === 0) {
        amendmentExcess = 0;
      } else {
        amendmentExcess = amendmentExcess;
      }
    }

    return amendmentExcess;
  };
  const proofreadingCalculationPolar = React.useMemo(() => {
    let proofreadingInAim = 0;
    let proofreadingInAngle = 0;
    const coordinateX = +OPData.coordinateOPX;
    const coordinateY = +OPData.coordinateOPY;
    const angle = +value.angleBurst;

    const burstX = Math.round(
      coordinateX + value.rangeBurst * Math.cos(angle * 6 * (Math.PI / 180)),
    );
    const burstY = Math.round(
      coordinateY + value.rangeBurst * Math.sin(angle * 6 * (Math.PI / 180)),
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
    if (value.rangeBurst === '' || value.angleBurst === '') {
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
  }, [value]);

  return (
    <>
      <Text style={styles.textHeader}>Расчет корректур</Text>
      <SwitchBlock
        value={isVisible}
        setValue={setIsVisible}
        textTrue="На земле"
        textFalse="В воздухе"
      />
      <View style={styles.wrapper}>
        {isVisible ? (
          <>
            {Object.entries(inputs).map(([key, item]) => (
              <Input
                key={key}
                state={value[key]}
                keyboardType={'numeric'}
                setState={value => setValue(key, value)}
                placeholder={item.placeholder}
                placeholderTextColor={'black'}
                maxLength={item.maxLength}
                text={item.text}
                style={styles.inputWrapper}
              />
            ))}
          </>
        ) : (
          <>
            {Object.entries(inputs1).map(([key, item]) => (
              <Input
                key={key}
                state={value[key]}
                keyboardType={'numeric'}
                setState={value => setValue(key, value)}
                placeholder={item.placeholder}
                placeholderTextColor={'black'}
                maxLength={item.maxLength}
                text={item.text}
                style={styles.inputWrapper}
              />
            ))}
          </>
        )}
      </View>
      <View style={styles.answerWrapper}>
        <Text
          style={
            styles.textAnswer
          }>{`ΔПр: ${proofreadingCalculationPolar.proofreadingInAim}`}</Text>
        <Text style={styles.textAnswer}>{`Δδ: ${replaceAngle(
          proofreadingCalculationPolar.proofreadingInAngle,
        )}`}</Text>
        <Text style={styles.textAnswer}>{`ΔУр: ${replaceAngle(
          amendmentExcessCalculation(),
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
    fontSize: 25,
    width: '33%',
  },
});
