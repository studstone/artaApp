import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from './Input'

const MeteoData = ({
    pressure, setPressure, airTemperature, setAirTemperature, directorateAngleWind, setDirectorateAngleWind,
    windSpeed, setWindSpeed, deviationInitialSpeed, setDeviationInitialSpeed, chargeTemperature, setСhargeTemperature,
    heightWeatherPost, setHeightWeatherPost
}) => {
    const inputs = [
        {
            id: 0,
            state: pressure,
            keyboardType: 'numeric',
            setState: setPressure,
            placeholder: 'Давление',
            placeholderTextColor: 'black',
            maxLength: 3,
            text: 'H:'
        },
        {
            id: 1,
            state: airTemperature,
            keyboardType: 'numeric',
            setState: setAirTemperature,
            placeholder: 'Температура воздуха',
            placeholderTextColor: 'black',
            maxLength: 2,
            text: 'Тв:'
        },
        {
            id: 2,
            state: directorateAngleWind,
            keyboardType: 'numeric',
            setState: setDirectorateAngleWind,
            placeholder: 'Направление ветра',
            placeholderTextColor: 'black',
            maxLength: 2,
            text: 'УГ.в:'
        },
        {
            id: 3,
            state: windSpeed,
            keyboardType: 'numeric',
            setState: setWindSpeed,
            placeholder: 'Скорость ветра',
            placeholderTextColor: 'black',
            maxLength: 2,
            text: 'Vв:'
        },
        {
            id: 4,
            state: deviationInitialSpeed,
            keyboardType: 'numbers-and-punctuation',
            setState: setDeviationInitialSpeed,
            placeholder: 'Откл.нач.ск.пол.сн',
            placeholderTextColor: 'black',
            maxLength: 5,
            text: 'Vо:'
        },
        {
            id: 5,
            state: chargeTemperature,
            keyboardType: 'numbers-and-punctuation',
            setState: setСhargeTemperature,
            placeholder: 'Температура заряда',
            placeholderTextColor: 'black',
            maxLength: 5,
            text: 'Тз:'
        },
        {
            id: 6,
            state: heightWeatherPost,
            keyboardType: 'numeric',
            setState: setHeightWeatherPost,
            placeholder: 'Высота метеопоста',
            placeholderTextColor: 'black',
            maxLength: 4,
            text: 'hмп:'
        },
    ]

    return (
        <>
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
        </>
    )
}

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 12,
        width: '100%',
        height: 45,
        borderColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
    },
    input: {
        maxWidth: '100%',
        minWidth: 0,
        fontSize: 18,
        flex: 1,
        borderWidth: 1,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'transparent',
        color: '#000000'
    },
});


export default MeteoData