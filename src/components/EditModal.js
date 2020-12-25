import React, { useState } from 'react'
import { Alert, Button, Modal, StyleSheet, TextInput, View } from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
    const [title, setTitle] = useState(value)
    const onSaveHandler = () => {
        if (title.trim().length) {
            onSave(title)
        } else {
            Alert.alert(`Todo can't be empty`)
        }
    }

    return <Modal
        visible={visible}
        animationType='fade'
        transparent={false}
    >
        <View style={styles.wrapper}>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                placeholder='Enter Todo'
                maxLength={256}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.button}>
                    <Button
                        title='Cancel'
                        onPress={onCancel}
                        color={THEME.DANGER_COLOR}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Save'
                        onPress={onSaveHandler}
                    />
                </View>
            </View>
        </View>
    </Modal >
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    buttonsContainer: {
        width: '100%',
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '30%'
    }
})
