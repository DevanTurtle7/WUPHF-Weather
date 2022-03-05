import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LandingPage from './components/LandingPage';

const UID_KEY = "uid"

const WAITING = 0
const LOGGED_IN = 1
const NOT_LOGGED_IN = 2

export default function App() {
    const [navState, setNavState] = useState(WAITING)

    const checkNavState = async () => {
        try {
            const id = await AsyncStorage.getItem(UID_KEY);
            setNavState(NOT_LOGGED_IN)
        } catch (e) {
            setNavState(NOT_LOGGED_IN)
        }
    }


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
    }

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
