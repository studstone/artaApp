import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Cancel from '../image/cancel.png';

export default React.memo(function Input({
  state,
  keyboardType,
  setState,
  placeholder,
  placeholderTextColor,
  maxLength,
  text,
  style,
}) {
  return (
    <>
      <View style={style}>
        <>{state != '' && <Text style={styles.label}>{text}</Text>}</>
        <TextInput
          style={styles.input}
          keyboardType={`${keyboardType}`}
          onChangeText={setState}
          value={`${state}`}
          placeholder={`${placeholder}`}
          placeholderTextColor={`${placeholderTextColor}`}
          maxLength={maxLength}
        />
        <>
          {state != '' && (
            <View style={styles.button}>
              <TouchableOpacity onPress={() => setState('')}>
                <Image style={styles.image} source={Cancel} />
              </TouchableOpacity>
            </View>
          )}
        </>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  input: {
    maxWidth: '100%',
    minWidth: 0,
    fontSize: 18,
    flex: 1,
    borderWidth: 1,
    padding: 2,
    borderColor: 'transparent',
    color: '#2e2e2e',
  },
  button: {
    width: 40,
    height: 40,
  },
  image: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 18,
  },
});
