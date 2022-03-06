import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import Button from '../components/Button';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const ENDPOINT = "http://56stewart.tplinkdns.com"
const UID_KEY = "session"

function PhonePage({ navigation }) {
    const [validCode, setValidCode] = useState(false)
    const [code, setCode] = useState("")

    useEffect(() => {
        let valid = code.length === 6

        if (valid !== validCode) {
            setValidCode(valid)
        }
    }, [code])

    const getSessionKey = async () => {
        const key = await AsyncStorage.getItem(UID_KEY);
        return key
    }

    const navigateToPage = (name) => {
        navigation.reset({
            index: 0,
            routes: [{ name: name }],
        });
    }

    const onPress = async () => {
        const sessionKey = await getSessionKey()

        await fetch(ENDPOINT + "/auth/sms/verify/" + code, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-token': sessionKey
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.phone_verified) {
                    navigateToPage("LocationPage")
                } else {
                    setCode("")
                    setValidCode(false)
                }
            })
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.label}>Enter The SMS Verification Code</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='000000'
                        keyboardType='number-pad'
                        maxLength={6}
                        value={code}
                        onChangeText={setCode}
                        style={styles.input} />
                    <Button title="Next" onPress={onPress} disabledColor="#474747" disabled={!validCode} />
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
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        width: 110,
        textAlign: 'center',
        borderWidth: 1,
        fontSize: 24,
        paddingHorizontal: 10,
        marginBottom: 30,
    }
});

export default PhonePage