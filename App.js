import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SplashScreen from './pages/SplashScreen';

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                />
                <Stack.Screen
                    name="LandingPage"
                    component={LandingPage}
                />
                <Stack.Screen
                    name="LoginPage"
                    component={LoginPage}
                />
                <Stack.Screen
                    name="HomePage"
                    component={HomePage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}