import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const FiringEquipment = ({
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
  return (
    <>
      <View style={styles.wrapper}>
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
            {`Дт: ${rangeСalculation}`}
          </Text>
          <Text
            style={{
              color: '#750000',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {`δт: ${replaceAngle(angleFromMainStreamСalculation)}`}
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
            {`Ди: ${calculatedRangeСalculation}`}
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
            {`У.вз: ${choosingFuseInstallation}`}
          </Text>
          <Text
            style={{
              color: '#750000',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {`Пр: ${rangeFinalСalculation}`}
          </Text>
          <Text
            style={{
              color: '#750000',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {excessСalculation === 'NaN'
              ? 'Ур: 30-00'
              : `Ур: ${replaceAngle(excessСalculation)}`}
          </Text>
          <Text
            style={{
              color: '#750000',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {calculatedAngleFromMainStreamСalculation === '0.00'
              ? 'δи: ОН'
              : `δи: ${replaceAngle(calculatedAngleFromMainStreamСalculation)}`}
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
            {jumpCalculation}
          </Text>
          <Text
            style={{
              color: '#750000',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {replaceAngle(fanCalculation)}
          </Text>
          <Text
            style={{
              color: '#750000',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {intervalFanCalculation}
          </Text>
          <Text
            style={{
              color: '#750000',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {`Тпол: ${time}`}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
});

export default FiringEquipment;
