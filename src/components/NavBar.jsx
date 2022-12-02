import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const NavBar = () => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>Огневая Задача</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#3C5723'
    },
    text: {
        fontSize: 24
    }
});

export default NavBar