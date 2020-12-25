import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

export default App = () => {
  const [todoList, setTodoList] = useState([
    // {id: '1', title: 'Todooooooooooooooooooooooooooooooooooooooooo'},
    // {id: '2', title: 'Todo 2 ddd long title real very very long'}
  ])
  const [todoId, setTodoId] = useState(null)
  const getTodo = id => todoList.find(todo => todo?.id === id)
  const addTodo = title => {
    setTodoList(prevTodoList => [
      ...prevTodoList,
      {
        id: Date.now().toString(),
        title
      }
    ])
  }
  const removeTodo = id => {
    const todo = getTodo(id)
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
            setTodoId(null)
            setTodoList(prevTodoList => prevTodoList.filter(todo => todo.id !== id))
          },
          style: 'negative'
        }
      ],
      { cancelable: true }
    )
  }
  const saveTodo = (id, title) => {
    setTodoList(prevTodoList => {
      return prevTodoList.map(todo => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
    })
  }

  return <View>
    <Navbar />
    <View style={styles.container}>
      {todoId
        ? <TodoScreen
          todo={getTodo(todoId)}
          goBack={() => {setTodoId(null)}}
          removeTodo={removeTodo}
          saveTodo={saveTodo}
        />
        : <MainScreen
          todoList={todoList}
          addTodo={addTodo}
          removeTodo={removeTodo}
          setTodoId={setTodoId}
        />
      }
    </View>
    <StatusBar style='auto' />
  </View>
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
})
