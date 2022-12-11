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

export default React.memo(function IlluminationAmmunition({
  value,
  setValue,
  proofreadingInAngle,
  removalCoefficientCalculation,
  rangeCommanderCalculation,
  rangeСalculation,
  returnDataST,
  replaceAngle,
}) {
  const [isVisible, setIsVisible] = React.useState(true);

  /**расчет поправок*/
  const proofreadingCalculationIllumination = () => {
    const heightBurst = +value.heightBurst;
    const rangeBurst = +value.rangeBurst;
    const removalCoefficien = +removalCoefficientCalculation;
    const rangeCommander = rangeCommanderCalculation;
    const burningTime = +value.burningTime;
    const dXtis = returnDataST.dXtis;

    let amendmentExcess = 0;
    let amendmentRange = 400 / dXtis;

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

    if (rangeBurst > rangeCommander) {
      amendmentRange = amendmentRange;
    } else {
      amendmentRange = -amendmentRange;
    }

    if (rangeBurst === 0) {
      amendmentRange = 0;
    } else {
      amendmentRange = amendmentRange;
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

    return {amendmentExcess, amendmentRange};
  };

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
        <Text style={styles.textAnswer}>{`ΔПр: ${
          proofreadingCalculationIllumination().amendmentRange
        }`}</Text>
        <Text style={styles.textAnswer}>{`Δδ: ${replaceAngle(
          proofreadingInAngle,
        )}`}</Text>
        <Text style={styles.textAnswer}>{`ΔУр: ${replaceAngle(
          proofreadingCalculationIllumination().amendmentExcess,
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
