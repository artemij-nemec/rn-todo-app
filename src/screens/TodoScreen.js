import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { THEME } from '../theme'
import { AppCard } from '../ui/AppCard'

export const TodoScreen = ({ todo, goBack, removeTodo }) => {
    return <>
        <AppCard styles={styles.card}>
            <Text style={styles.title}>{todo.title}</Text>
            <Button
                title='Edit'
            />
        </AppCard>
        <View style={styles.buttonsContainer}>
            <View style={styles.button}>
                <Button
                    title='Back'
                    onPress={goBack}
                    color={THEME.GREY_COLOR}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title='Delete'
                    onPress={removeTodo.bind(null, todo.id)}
                    color={THEME.DANGER_COLOR}
                />
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: '40%'
    },
    card: {
        marginBottom: 15
    },
    title: {
        fontSize: 20,
        width: '82%'
    }
})
