import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FiringEquipmentRGM = props => {
  const rangeСalculation = props.rangeСalculation;
  const replaceAngle = props.replaceAngle;
  const angleFromMainStreamСalculation = +props.angleFromMainStreamСalculation;
  const amendmentRange = +props.targetData.amendmentRange;
  const amendmentAngle = +props.targetData.amendmentAngle;
  const calculatedRangeСalculation = props.calculatedRangeСalculation;
  const choosingFuseInstallation = props.choosingFuseInstallation;
  const rangeFinalСalculation = props.rangeFinalСalculation;
  const excessСalculation = +props.excessСalculation;
  const calculatedAngleFromMainStreamСalculation =
    +props.calculatedAngleFromMainStreamСalculation;
  const jumpCalculation = props.jumpCalculation;
  const fanCalculation = props.fanCalculation;
  const intervalFanCalculation = props.intervalFanCalculation;
  const time = props.returnDataST.time;
  const positionBorder = props.positionBorder();
  const targetsVariant = props.targetData.targetsVariant;

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
      text: fanCalculation,
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
  const changeItems = React.useMemo(() => {
    if (targetsVariant) {
      items.push({
        text: `Пол-е: ${positionBorder}`,
      });
    }
  }, [targetsVariant]);
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
