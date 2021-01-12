import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

const loadApp = async () => {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default App = () => {
  const [isReady, setIsReady] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [todoId, setTodoId] = useState(null)

  if(!isReady) {
    return <AppLoading
      startAsync={loadApp}
      onError={err => console.log(err)}
      onFinish={() => setIsReady(true)}
    />
  }
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
