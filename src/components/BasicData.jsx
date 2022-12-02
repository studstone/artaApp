import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from './Input'

const BasicData = ({ mainStream, setMainStream, frontFP, setFrontFP, trajectory, setTrajectory, nameCharge, setNameCharge }) => {
    const inputs = [
        {
            id: 0,
            state: mainStream,
            keyboardType: 'numeric',
            setState: setMainStream,
            placeholder: 'ОН',
            placeholderTextColor: 'black',
            maxLength: 2,
            text: 'ОН:'
        },
        {
            id: 1,
            state: frontFP,
            keyboardType: 'numeric',
            setState: setFrontFP,
            placeholder: 'Фронт батареи',
            placeholderTextColor: 'black',
            maxLength: 3,
            text: 'Фб:'
        },
        {
            id: 2,
            state: trajectory,
            keyboardType: 'default',
            setState: setTrajectory,
            placeholder: 'Траектория',
            placeholderTextColor: 'black',
            maxLength: 1,
            text: 'Траек-я:'
        },
        {
            id: 3,
            state: nameCharge,
            keyboardType: 'default',
            setState: setNameCharge,
            placeholder: 'Заряд',
            placeholderTextColor: 'black',
            maxLength: 1,
            text: 'Заряд:'
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

export default BasicData