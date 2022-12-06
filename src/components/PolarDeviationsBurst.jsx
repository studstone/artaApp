import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Input from './Input';

const inputs = {
  rangeBurst: {
    placeholder: 'Дальн. разрыва',
    text: 'Др:',
    keyboardType: 'numeric',
  },
  angleBurst: {
    placeholder: 'Угол разрыва',
    text: 'УГр:',
    keyboardType: 'numbers-and-punctuation',
  },
};

export default React.memo(function PolarDeviationsBurst({
  value,
  setValue,
  proofreadingInAim,
  proofreadingInAngle,
}) {
  return (
    <>
      <Text style={styles.textHeader}>Расчет корректур (Др,&nbsp; УГр)</Text>
      <View style={styles.wrapper}>
        {Object.entries(inputs).map(([key, item]) => (
          <Input
            key={key}
            state={value[key]}
            keyboardType={'numeric'}
            setState={value => setValue(key, value)}
            placeholder={item.placeholder}
            placeholderTextColor={'black'}
            maxLength={4}
            text={item.text}
            style={styles.inputWrapper}
          />
        ))}
      </View>
      <View style={styles.answerWrapper}>
        <Text style={styles.textAnswer}>{`ΔПр: ${proofreadingInAim}`}</Text>
        <Text style={styles.textAnswer}>{`Δδ: ${proofreadingInAngle}`}</Text>
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

// export default PolarDeviationsBurst;
