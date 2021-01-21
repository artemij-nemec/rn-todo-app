import { AntDesign, FontAwesome } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { EditModal } from '../components/EditModal'
import AppButton from '../components/ui/AppButton'
import { AppCard } from '../components/ui/AppCard'
import { AppTextBold } from '../components/ui/AppTextBold'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { THEME } from '../theme'

export const TodoScreen = () => {
    const { todos, updateTodo, removeTodo } = useContext(TodoContext)
    const { todoId, changeScreen } = useContext(ScreenContext)
    const todo = todos.find(t => t.id === todoId)
    const [modal, setModal] = useState(false)
    const onSave = async title => {
        await updateTodo(todo.id, title)
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
            <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
            <AppButton onPress={setModal.bind(null, true)}>
                <FontAwesome name='edit' size={20} />
            </AppButton>
        </AppCard>
        <View style={styles.buttonsContainer}>
            <View style={styles.button}>
                <AppButton
                    onPress={() => changeScreen(null)}
                    color={THEME.GREY_COLOR}
                >
                    <AntDesign name='back' size={24} color='#fff' />
                </AppButton>
            </View>
            <View style={styles.button}>
                <AppButton
                    onPress={removeTodo.bind(null, todo.id)}
                    color={THEME.DANGER_COLOR}
                >
                    <FontAwesome name='remove' size={24} />
                </AppButton>
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
        width: Dimensions.get('window').width / 3
    },
    card: {
        marginBottom: 15
    },
    title: {
        fontSize: 20,
        width: '82%'
    }
})
