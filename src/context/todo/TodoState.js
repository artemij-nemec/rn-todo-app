import React, { useContext, useReducer } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: []
    }
    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = title => dispatch({ type: ADD_TODO, title })
    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id)
        Alert.alert(
            'Remove element',
            `Are You sure you'r want to delete "${todo.title}"`,
            [
                {
                    text: 'Cancel',
                    style: 'neutral'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        changeScreen(null)
                        dispatch({ type: REMOVE_TODO, id })
                    },
                    style: 'negative'
                }
            ],
            { cancelable: true }
        )
    }
    const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

    return <TodoContext.Provider
        value={{
            todos: state.todos,
            addTodo,
            removeTodo,
            updateTodo
        }}
    >
        {children}
    </TodoContext.Provider>
}
