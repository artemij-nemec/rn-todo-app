import React from 'react'
import { StyleSheet, View } from 'react-native'

export const AppCard = props => {
    return <View style={{ ...styles.default, ...props.styles }}>
        {props.children}
    </View>
}

const styles = StyleSheet.create({
    default: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 8,
        backgroundColor: 'white'
    }
})
