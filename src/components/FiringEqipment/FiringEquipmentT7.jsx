import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default React.memo(function FiringEquipmentT7(props) {
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
  const fanCalculation = props.fanCalculation;
  const intervalFanCalculation = props.intervalFanCalculation;
  const time = props.returnDataST.time;
  const tube = props.tubeCalculation;
  const positionBorder = props.positionBorder();
  const targetsVariant = props.targetData.targetsVariant;
  const borderRangeСalculation = props.borderRangeСalculation;

  const items = [
    {
      text: `Дт: ${rangeСalculation}`,
    },
    {
      text: `Трубка: ${choosingFuseInstallation}`,
    },
    {
      text: fanCalculation,
    },
    {
      text: `δт: ${replaceAngle(angleFromMainStreamСalculation)}`,
    },
    {
      text: `Пр: ${rangeFinalСalculation}`,
    },
    {
      text: intervalFanCalculation,
    },
    {
      text: `ΔД: ${amendmentRange}`,
    },
    {
      text: `N: ${tube}`,
    },
    {
      text: `Тпол: ${time}`,
    },
    {
      text: `Δδ: ${replaceAngle(amendmentAngle)}`,
    },
    {
      text:
        excessСalculation === 'NaN'
          ? 'Ур: 30-00'
          : `Ур: ${replaceAngle(excessСalculation)}`,
    },
    {
      text: '',
    },
    {
      text: `Ди: ${calculatedRangeСalculation}`,
    },
    {
      text:
        calculatedAngleFromMainStreamСalculation === '0.00'
          ? 'δи: ОН'
          : `δи: ${replaceAngle(calculatedAngleFromMainStreamСalculation)}`,
    },
    {
      text: '',
    },
  ];
  const changeItems = React.useMemo(() => {
    if (targetsVariant) {
      items.push({
        text: `Дт.руб: ${borderRangeСalculation}`,
      });
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
});

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
