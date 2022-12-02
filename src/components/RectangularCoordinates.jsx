import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from './Input'

const RectangularCoordinates = ({
    coordinateTargetX, setCoordinateTargetX, coordinateTargetY, setCoordinateTargetY,
    heightTarget, setHeightTarget

}) => {
    const inputs = [
        {
            id: 0,
            state: coordinateTargetX,
            keyboardType: 'numeric',
            setState: setCoordinateTargetX,
            placeholder: 'X цели',
            placeholderTextColor: 'black',
            maxLength: 6,
            text: 'Хц:'
        },
        {
            id: 1,
            state: coordinateTargetY,
            keyboardType: 'numeric',
            setState: setCoordinateTargetY,
            placeholder: 'Y цели',
            placeholderTextColor: 'black',
            maxLength: 6,
            text: 'Yц:'
        },
        {
            id: 2,
            state: heightTarget,
            keyboardType: 'numeric',
            setState: setHeightTarget,
            placeholder: 'H цели',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: 'Hц:'
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

export default RectangularCoordinates