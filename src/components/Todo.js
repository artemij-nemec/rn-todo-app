import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { THEME } from '../theme'

export const Todo = ({ todo, onRemove, onOpen }) => {
  return <TouchableOpacity
    onPress={() => onOpen(todo.id)}
    onLongPress={onRemove.bind(null, todo.id)}
  >
    <View style={styles.todo}>
      <Text style={styles.text}>{todo.title}</Text>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderColor: THEME.GREY_COLOR,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15
  }
})
