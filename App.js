import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';

const UID_KEY = "uid"

const WAITING = 0
const LOGGED_IN = 1
const NOT_LOGGED_IN = 2

const Stack = createNativeStackNavigator()

export default function App() {
    const [navState, setNavState] = useState(WAITING)

    const checkNavState = async () => {
        try {
            const id = await AsyncStorage.getItem(UID_KEY);

            setNavState(id === null ? NOT_LOGGED_IN : LOGGED_IN)
        } catch (e) {
            setNavState(NOT_LOGGED_IN)
        }
    }

    /*
    if (navState === LOGGED_IN) {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <TextInput placeholder="test" onChangeText={() => { }} value={0} style={styles.input} />
                <StatusBar style="auto" />
            </View>
        );
    } else if (navState === WAITING) {
        checkNavState()

        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <StatusBar style="auto" />
            </View>
        )
    } else {
        return (
            <LandingPage />
        );
    }*/
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="LandingPage"
                    component={LandingPage}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
});
