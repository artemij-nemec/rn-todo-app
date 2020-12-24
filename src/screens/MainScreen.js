import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({ todoList, addTodo, removeTodo, setTodoId }) => {
    return <>
        <AddTodo onSubmit={addTodo} />
        <FlatList
            data={todoList}
            renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={setTodoId} />}
            keyExtractor={item => item.id}
            style={styles.todoListContainer}
        />
    </>
}

const styles = StyleSheet.create({
    todoListContainer: {
      marginTop:  15
    }
  })
