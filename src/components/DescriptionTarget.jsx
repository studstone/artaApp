import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from './Input'

const DescriptionTarget = ({
    numberTarget, setNumberTarget, nameTarget, setNameTarget, frontTarget, setFrontTarget,
    depthTarget, setDepthTarget, amendmentRange, setAmendmentRange, amendmentAngle,
    setAmendmentAngle
}) => {
    const inputs = [
        {
            id: 0,
            state: numberTarget,
            keyboardType: 'numeric',
            setState: setNumberTarget,
            placeholder: '№ цели',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: '№ц:'
        },
        {
            id: 1,
            state: nameTarget,
            keyboardType: 'default',
            setState: setNameTarget,
            placeholder: 'Характер цели',
            placeholderTextColor: 'black',
            maxLength: 6,
            text: 'ХАРц:'
        },
        {
            id: 2,
            state: frontTarget,
            keyboardType: 'numeric',
            setState: setFrontTarget,
            placeholder: 'Фронт цели',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: 'Фц:'
        },
        {
            id: 3,
            state: depthTarget,
            keyboardType: 'numeric',
            setState: setDepthTarget,
            placeholder: 'Глубина цели',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: 'Гц:'
        },
        {
            id: 4,
            state: amendmentRange,
            keyboardType: 'numbers-and-punctuation',
            setState: setAmendmentRange,
            placeholder: 'Попр. в дальн.',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: 'ΔД:'
        },
        {
            id: 5,
            state: amendmentAngle,
            keyboardType: 'numbers-and-punctuation',
            setState: setAmendmentAngle,
            placeholder: 'Попр. в напр.',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: 'Δδ:'
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

export default DescriptionTarget