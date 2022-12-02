import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from './Input'

const FirePosition = ({
    coordinateFPX, setCoordinateFPX, coordinateFPY, setCoordinateFPY, heightFP,
    setHeightFP
}) => {

    const inputs = [
        {
            id: 0,
            state: coordinateFPX,
            keyboardType: 'numeric',
            setState: setCoordinateFPX,
            placeholder: 'X огневой',
            placeholderTextColor: 'black',
            maxLength: 6,
            text: 'Xoп:'
        },
        {
            id: 1,
            state: coordinateFPY,
            keyboardType: 'numeric',
            setState: setCoordinateFPY,
            placeholder: 'Y огневой',
            placeholderTextColor: 'black',
            maxLength: 6,
            text: 'Yoп:'
        },
        {
            id: 2,
            state: heightFP,
            keyboardType: 'numeric',
            setState: setHeightFP,
            placeholder: 'H огневой',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: 'Hoп:'
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

export default FirePosition