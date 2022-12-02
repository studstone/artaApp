import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from './Input'

const PolarCoordinates = ({
    rangeTarget, setRangeTarget, angleTarget, setAngleTarget, verticalAngleTarget,
    setVerticalAngleTarget
}) => {

    const inputs = [
        {
            id: 0,
            state: rangeTarget,
            keyboardType: 'numeric',
            setState: setRangeTarget,
            placeholder: 'Дальн. ком',
            placeholderTextColor: 'black',
            maxLength: 5,
            text: 'Дк:'
        },
        {
            id: 1,
            state: angleTarget,
            keyboardType: 'numbers-and-punctuation',
            setState: setAngleTarget,
            placeholder: 'Уг на цель',
            placeholderTextColor: 'black',
            maxLength: 5,
            text: 'Уг.к:'
        },
        {
            id: 2,
            state: verticalAngleTarget,
            keyboardType: 'numeric',
            setState: setVerticalAngleTarget,
            placeholder: 'Угол Мц',
            placeholderTextColor: 'black',
            maxLength: 5,
            text: 'Уг Мц:'
        },
    ]

    return (
        <View style={styles.wrapper}>
            {
                inputs.map(
                    (input) =>
                        <Input
                            key={input.id}
                            state={input.state}
                            keyboardType={input.keyboardType}
                            setState={input.setState}
                            placeholder={input.placeholder}
                            placeholderTextColor={input.placeholderTextColor}
                            maxLength={input.maxLength}
                            text={input.text}
                            style={styles.inputWrapper}
                        />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        borderStyle: 'solid'
    },
});

export default PolarCoordinates