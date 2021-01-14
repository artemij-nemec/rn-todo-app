import React from 'react'
import { Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { THEME } from '../../theme'
import { AppTextBold } from './AppTextBold'

const AppButton = ({ children, onPress, color = THEME.MAIN_COLOR }) => {
    const TouchableWrapper = Platform.OS === 'android'
        ? TouchableNativeFeedback
        : TouchableOpacity
    return <TouchableWrapper
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={{ ...styles.button, backgroundColor: color }}>
            <AppTextBold style={styles.text}>{children}</AppTextBold>
        </View>
    </TouchableWrapper>
}
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff'
    }
})

export default AppButton