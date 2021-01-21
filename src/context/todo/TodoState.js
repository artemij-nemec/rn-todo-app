import React, { useContext, useReducer } from 'react'
import { Alert } from 'react-native'
import { Http } from '../../http'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null
    }
    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async title => {
        try {
            const data = await Http.post(
                'https://rn-todo-app-b783d-default-rtdb.firebaseio.com/todos.json',
                { title }
            )
            dispatch({ type: ADD_TODO, id: data.name, title })
        } catch (e) {
            showError('Unknown error')
        }
    }

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
                    onPress: async () => {
                        changeScreen(null)
                        await Http.delete(`https://rn-todo-app-b783d-default-rtdb.firebaseio.com/todos/${id}.json`)
                        dispatch({ type: REMOVE_TODO, id })
                    },
                    style: 'negative'
                }
            ],
            { cancelable: true }
        )
    }

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const data = await Http.get('https://rn-todo-app-b783d-default-rtdb.firebaseio.com/todos.json')
            const todos = Object.keys(data).map(key => ({ id: key, ...data[key] }))
            dispatch({ type: FETCH_TODOS, todos })
        } catch (e) {
            showError('Unknown error')
            console.log(e)
        } finally {
            hideLoader()
        }
    }

    const updateTodo = async (id, title) => {
        try {
            await Http.patch(
                `https://rn-todo-app-b783d-default-rtdb.firebaseio.com/todos/${id}.json`,
                { title }
            )
            dispatch({ type: UPDATE_TODO, id, title })
        } catch (e) {
            showError('Unknown error')
            console.log(e)
        }
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = error => dispatch({ type: SHOW_ERROR, error })

    const clearError = () => dispatch({ type: CLEAR_ERROR })

    return <TodoContext.Provider
        value={{
            todos: state.todos,
            loading: state.loading,
            error: state. error,
            addTodo,
            removeTodo,
            updateTodo,
            fetchTodos
        }}
    >
        {children}
    </TodoContext.Provider>
}
