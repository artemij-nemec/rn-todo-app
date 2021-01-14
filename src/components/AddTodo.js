import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import { THEME } from '../theme'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')
  const pressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
    } else {
      Alert.alert('TODO can\'t be empty!' )
    }
  }

  return <View style={styles.block}>
    <TextInput
      style={styles.input}
      onChangeText={setValue}
      value={value}
      placeholder='Enter new TODO...'
      autoCorrect={false}
      autoCapitalize='none'
    />
    <MaterialIcons.Button
      onPress={pressHandler}
      name="post-add"
    >Add Todo</MaterialIcons.Button>
  </View>
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '70%',
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    borderStyle: 'solid'
  }
})
