import React from 'react';
import {StyleSheet, View} from 'react-native';

import Input from '../Input';

const targets = {
  numberTarget: {
    keyboardType: 'numeric',
    placeholder: '№ цели',
    maxLength: 4,
    text: '№ц:',
  },
  nameTarget: {
    keyboardType: 'default',
    placeholder: 'Характер цели',
    maxLength: 6,
    text: 'ХАРц:',
  },
  frontTarget: {
    keyboardType: 'numeric',
    placeholder: 'Фронт цели',
    maxLength: 4,
    text: 'Фц:',
  },
  depthTarget: {
    keyboardType: 'numeric',
    placeholder: 'Глубина цели',
    maxLength: 4,
    text: 'Гц:',
  },
  amendmentRange: {
    keyboardType: 'numeric',
    placeholder: 'Попр. в дальн.',
    maxLength: 4,
    text: 'ΔД:',
  },
  amendmentAngle: {
    keyboardType: 'numeric',
    placeholder: 'Попр. в напр.',
    maxLength: 5,
    text: 'Δδ:',
  },
};

const borders = {
  nameBorders: {
    keyboardType: 'default',
    placeholder: 'Рубеж',
    maxLength: 10,
    text: 'Рубеж:',
  },
  frontTarget: {
    keyboardType: 'numeric',
    placeholder: 'Фронт рубежа',
    maxLength: 4,
    text: 'Фруб:',
  },
  bias: {
    keyboardType: 'numeric',
    placeholder: 'Отступить от пр.гр',
    maxLength: 4,
    text: 'Отст на:',
  },
  amendmentRange: {
    keyboardType: 'numeric',
    placeholder: 'Попр. в дальн.',
    maxLength: 4,
    text: 'ΔД:',
  },
  amendmentAngle: {
    keyboardType: 'numeric',
    placeholder: 'Попр. в напр.',
    maxLength: 5,
    text: 'Δδ:',
  },
};

export default React.memo(function DescriptionTarget({
  value,
  setValue,
  fuseName,
}) {
  const changeTargets = React.useMemo(() => {
    if (fuseName === 1 || fuseName === 4) {
      targets.amendmentTube = {
        keyboardType: 'numeric',
        placeholder: 'Попр. в трубку.',
        maxLength: 3,
        text: 'ΔN:',
      };
    } else {
      delete targets.amendmentTube;
    }
  }, [fuseName]);
  return (
    <View style={styles.wrapper}>
      {!value.targetsVariant
        ? Object.entries(targets).map(([key, item]) => (
            <Input
              key={key}
              state={value[key]}
              keyboardType={item.keyboardType}
              setState={value => setValue(key, value)}
              placeholder={item.placeholder}
              placeholderTextColor={'black'}
              maxLength={item.maxLength}
              text={item.text}
              style={styles.inputWrapper}
            />
          ))
        : Object.entries(borders).map(([key, item], index) => (
            <Input
              key={key}
              state={value[key]}
              keyboardType={item.keyboardType}
              setState={value => setValue(key, value)}
              placeholder={item.placeholder}
              placeholderTextColor={'black'}
              maxLength={item.maxLength}
              text={item.text}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 2,
                paddingLeft: 2,
                marginTop: 12,
                width: index === 0 ? '100%' : '49%',
                height: 45,
                borderColor: 'black',
                borderWidth: 1,
                borderStyle: 'solid',
              }}
            />
          ))}
    </View>
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
});
