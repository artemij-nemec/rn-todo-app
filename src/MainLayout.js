import React, { useContext } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { Navbar } from './components/Navbar'
import { ScreenContext } from './context/screen/screenContext'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { THEME } from './theme'

export const MainLayout = () => {
    const { todoId } = useContext(ScreenContext)

    return (
        <View style={styles.wrapper}>
            <Navbar />
            <View style={styles.container}>
                {todoId ? <TodoScreen /> : <MainScreen />}
            </View>
            <StatusBar style='auto' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20
    },
    wrapper: {
        flex: 1
    }
})
