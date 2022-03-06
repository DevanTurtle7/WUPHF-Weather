import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import Button from '../components/Button';

const ENDPOINT = "http://56stewart.tplinkdns.com"
const UID_KEY = "session"
const POLL_RATE = 5000

function EmailPage({ navigation }) {
    const [verified, setVerified] = useState(false)
    const [sessionKey, setSessionKey] = useState(null)

    const verifyEmail = async () => {
        fetch(ENDPOINT + "/auth/email/verified", {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-token': sessionKey
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.email_verified === true) {
                    setVerified(true)
                }
            })
    }

    const getSessionKey = async () => {
        const key = await AsyncStorage.getItem(UID_KEY);
        setSessionKey(key)
    }

    useEffect(() => {
        let interval

        if (sessionKey === null) {
            getSessionKey()
        }

        if (!verified) {
            interval = setInterval(() => {
                verifyEmail()
            }, POLL_RATE)
        }

        return () => clearInterval(interval)
    })

    const navigateToPage = (name) => {
        navigation.reset({
            index: 0,
            routes: [{ name: name }],
        });
    }

    const onPress = () => {
        navigateToPage("LocationPage")
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.label}>Check Your Email For Verification</Text>
                <View style={styles.button}>
                    <Button title="Next" onPress={onPress} disabledColor="#474747" disabled={!verified}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50,
    },
    label: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 30
    },
    button: {
        width: 90,
    }
});

export default EmailPage