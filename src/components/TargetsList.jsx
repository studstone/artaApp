import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import SelectDropdown from 'react-native-select-dropdown';

const TargetsList = ({data, active, setActive, clear}) => {
  return (
    <View style={styles.wrapper}>
      <SelectDropdown
        buttonStyle={styles.select}
        data={data}
        rowTextForSelection={item =>
          `Ц-${item.numberTarget} ${item.nameTarget}`
        }
        buttonTextAfterSelection={item =>
          `Ц-${item.numberTarget} ${item.nameTarget}`
        }
        onSelect={(_, index) => {
          setActive(index);
        }}
        defaultButtonText={'Цели'}
        defaultValueByIndex={active}
      />
      <TouchableOpacity
        onPress={clear}
        style={styles.button}
        disabled={data.length === 0}>
        <Text style={{fontSize: 18}}>Очистить цели</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  select: {
    backgroundColor: '#576644',
    width: '49%',
    height: 45,
    paddingLeft: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#7e8d3b',
    width: '49%',
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TargetsList;
