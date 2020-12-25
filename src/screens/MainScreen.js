import React from 'react'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import emptyList from '../../assets/empty-list.jpg'

export const MainScreen = ({ todoList, addTodo, removeTodo, setTodoId }) => {
    return <>
        <AddTodo onSubmit={addTodo} />
        {todoList.length
            ? <FlatList
                data={todoList}
                renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={setTodoId} />}
                keyExtractor={item => item.id}
                style={styles.todoListContainer}
            />
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
    }
})
