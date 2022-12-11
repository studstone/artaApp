import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default React.memo(function DataCalcAdjustmentsRGM({data}) {
  const replaceAngle = data.replaceAngle;
  const amendmentDisplacementCalculation =
    data.amendmentDisplacementCalculation;
  const removalCoefficientCalculation = data.removalCoefficientCalculation;
  const stepAngomerCalculation = data.stepAngomerCalculation;
  const findOutThePositionOfTheFirePosition =
    data.findOutThePositionOfTheFirePosition;
  const rangeCommanderCalculation = data.rangeCommanderCalculation;
  const angleCommanderCalculation = data.angleCommanderCalculation;
  const returnDataST = data.returnDataST;
  const vdInAim = data.vdInAim;

  const items = [
    {
      text: `ПС: ${replaceAngle(amendmentDisplacementCalculation)}`,
      styles: styles.textAnswer,
    },
    {
      text: `Ку: ${removalCoefficientCalculation}`,
      styles: styles.textAnswer,
    },
    {
      text: `Шу: ${stepAngomerCalculation}`,
      styles: styles.textAnswer,
    },
    {
      text: `ОП: ${findOutThePositionOfTheFirePosition}`,
      styles: styles.textAnswer,
    },
    {
      text: `Дк ${rangeCommanderCalculation}`,
      styles: styles.textAnswer,
    },
    {
      text: `Угк ${replaceAngle(angleCommanderCalculation)}`,
      styles: styles.textAnswer,
    },
    {
      text: `Вд: ${returnDataST.Vd}`,
      styles: styles.textAnswer,
    },
    {
      text: `ΔХтыс: ${returnDataST.dXtis}`,
      styles: styles.textAnswer,
    },
    {
      text: `8Вд: ΔП=${vdInAim(8)}`,
      styles: styles.textAbswerBottom,
    },
    {
      text: `4Вд: ΔП=${vdInAim(4)}`,
      styles: styles.textAbswerBottom,
    },
    {
      text: `2Вд: ΔП=${vdInAim(2)}`,
      styles: styles.textAbswerBottom,
    },
  ];

  return (
    <>
      <Text style={styles.textTitle}>Данные для расчета корректур</Text>
      <View style={styles.wrapperAnswer}>
        {items.map((item, key) => (
          <Text key={key} style={item.styles}>
            {item.text}
          </Text>
        ))}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  textTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: '#000a96',
    marginBottom: 15,
  },
  wrapperAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  textAnswer: {
    fontSize: 18,
    color: '#750000',
    width: '25%',
    marginBottom: 15,
  },
  textAbswerBottom: {
    fontSize: 18,
    color: '#750000',
  },
});
