import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import emptyList from '../../assets/empty-list.jpg'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import AppButton from '../components/ui/AppButton'
import { AppLoader } from '../components/ui/AppLoader'
import { AppText } from '../components/ui/AppText'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { THEME } from '../theme'

export const MainScreen = () => {
    const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext)
    const { changeScreen } = useContext(ScreenContext)
    const getWidth = () => {
        return Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    }
    const [deviceWidth, setDeviceWidth] = useState(getWidth())

    //fetch todos on page loading
    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])
    useEffect(() => {
        loadTodos()
    }, [])
    //subscription to screen rotation to change field width
    useEffect(() => {
        const updateWidth = () => {
            setDeviceWidth(getWidth())
        }
        Dimensions.addEventListener('change', updateWidth)

        return () => Dimensions.removeEventListener('change', updateWidth)
    })

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadTodos}>Try again</AppButton>
            </View>
        )
    }

    return <>
        <AddTodo onSubmit={addTodo} />
        {todos.length
            ? <View style={{ width: deviceWidth }}>
                <FlatList
                    data={todos}
                    renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
                    keyExtractor={item => item.id}
                    style={styles.todoListContainer}
                />
            </View>
            : <View style={styles.imageWrapper}>
                <Image style={styles.image} source={emptyList} />
            </View>
        }
    </>
}

const styles = StyleSheet.create({
    todoListContainer: {
        marginTop: 15
    },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
})
