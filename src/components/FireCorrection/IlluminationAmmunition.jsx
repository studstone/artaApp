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
  burningTime: {
    placeholder: 'Время горения',
    text: 'Т гор:',
    keyboardType: 'numeric',
    maxLength: 5,
  },
};

export default React.memo(function PolarDeviationsBurst({
  value,
  setValue,
  proofreadingInAim,
  proofreadingInAngle,
}) {
  const [isVisible, setIsVisible] = React.useState(true);

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
        <Text style={styles.textAnswer}>{`ΔПр: ${proofreadingInAim}`}</Text>
        <Text style={styles.textAnswer}>{`Δδ: ${proofreadingInAngle}`}</Text>
        <Text style={styles.textAnswer}>{`ΔУр: ${proofreadingInAngle}`}</Text>
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
