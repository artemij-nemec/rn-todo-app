import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { THEME } from '../theme'
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'

export const TodoScreen = ({ todo, goBack, removeTodo, saveTodo }) => {
    const [modal, setModal] = useState(false)
    const onSave = title => {
        saveTodo(todo.id, title)
        setModal(false)
    }

    return <>
        <EditModal
            visible={modal}
            value={todo.title}
            onCancel={() => {
                setModal(false)
            }}
            onSave={onSave}
        />
        <AppCard styles={styles.card}>
            <Text style={styles.title}>{todo.title}</Text>
            <Button
                title='Edit'
                onPress={setModal.bind(null, true)}
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
