import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { ScreenState } from './src/context/screen/ScreenState'
import { TodoState } from './src/context/todo/TodoState'
import { MainLayout } from './src/MainLayout'

const loadApp = async () => {
    await Font.loadAsync({
        'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
    })
}

export default App = () => {
    const [isReady, setIsReady] = useState(false)

    if (!isReady) {
        return <AppLoading
            startAsync={loadApp}
            onError={err => console.log(err)}
            onFinish={() => setIsReady(true)}
        />
    }

    return <ScreenState>
        <TodoState>
            <MainLayout />
        </TodoState>
    </ScreenState>
}
