import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FiringEquipmentRGM = ({
  rangeСalculation,
  replaceAngle,
  angleFromMainStreamСalculation,
  amendmentRange,
  amendmentAngle,
  calculatedRangeСalculation,
  choosingFuseInstallation,
  rangeFinalСalculation,
  excessСalculation,
  calculatedAngleFromMainStreamСalculation,
  jumpCalculation,
  fanCalculation,
  intervalFanCalculation,
  time,
}) => {
  const items = [
    {
      text: `Дт: ${rangeСalculation}`,
    },
    {
      text: `У.вз: ${choosingFuseInstallation}`,
    },
    {
      text: jumpCalculation === Infinity ? 'Ск: 0' : `Ск: ${jumpCalculation}`,
    },
    {
      text: `δт: ${replaceAngle(angleFromMainStreamСalculation)}`,
    },
    {
      text: `Пр: ${rangeFinalСalculation}`,
    },
    {
      text: replaceAngle(fanCalculation),
    },
    {
      text: `ΔД: ${amendmentRange}`,
    },
    {
      text:
        excessСalculation === 'NaN'
          ? 'Ур: 30-00'
          : `Ур: ${replaceAngle(excessСalculation)}`,
    },
    {
      text: intervalFanCalculation,
    },
    {
      text: `Δδ: ${replaceAngle(amendmentAngle)}`,
    },
    {
      text:
        calculatedAngleFromMainStreamСalculation === '0.00'
          ? 'δи: ОН'
          : `δи: ${replaceAngle(calculatedAngleFromMainStreamСalculation)}`,
    },
    {
      text: `Тпол: ${time}`,
    },
    {
      text: `Ди: ${calculatedRangeСalculation}`,
    },
  ];

  return (
    <>
      <View style={styles.wrapper}>
        {items.map((item, key) => (
          <Text key={key} style={styles.text}>
            {item.text}
          </Text>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#750000',
    fontSize: 18,
    marginBottom: 5,
    width: '33%',
  },
});

export default FiringEquipmentRGM;
