import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from './Input'

const ObservationPost = ({
    coordinateOPX, setCoordinateOPX, coordinateOPY, setCoordinateOPY, heightOP, setHeightOP
}) => {
    const inputs = [
        {
            id: 0,
            state: coordinateOPX,
            keyboardType: 'numeric',
            setState: setCoordinateOPX,
            placeholder: 'X КНП',
            placeholderTextColor: 'black',
            maxLength: 6,
            text: 'Xкнп:'
        },
        {
            id: 1,
            state: coordinateOPY,
            keyboardType: 'numeric',
            setState: setCoordinateOPY,
            placeholder: 'Y КНП',
            placeholderTextColor: 'black',
            maxLength: 6,
            text: 'Yкнп:'
        },
        {
            id: 2,
            state: heightOP,
            keyboardType: 'numeric',
            setState: setHeightOP,
            placeholder: 'H КНП',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: 'Hкнп:'
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

export default ObservationPost