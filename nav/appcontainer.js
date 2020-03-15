import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppStack } from './appstack'

export function AppContainer(params) {
    return(
        <NavigationContainer>
            <AppStack/>
        </NavigationContainer>
    )
}