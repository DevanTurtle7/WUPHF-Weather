import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';
import TextButton from '../components/TextButton';

const UID_KEY = "session"
const ENDPOINT = "http://56stewart.tplinkdns.com"

function SignUpPage({ navigation }) {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const navigateToPage = (name) => {
        navigation.reset({
            index: 0,
            routes: [{ name: name }],
        });
    }

    const validData = () => {
        return email !== "" && password !== ""
    }

    const backButtonPressed = () => {
        navigation.goBack()
    }

    const nextButtonPressed = async () => {
        if (validData()) {
            await fetch(ENDPOINT + "/auth/signup", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    "email": email,
                    "phone": phone,
                    "password": password
                })
            })
                .then((response) => response.json())
                .then(async (data) => {
                    const sessionKey = data.session
                    console.log(sessionKey)

                    try {
                        await AsyncStorage.setItem(UID_KEY, sessionKey);
                        navigateToPage("PhonePage")
                    } catch (error) {
                        console.log("error writing to async storage")
                        console.log(error)
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    textContentType='emailAddress'
                    placeholder='Email'
                    onChangeText={setEmail} />

                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={styles.input}
                    textContentType='telephoneNumber'
                    placeholder='Phone'
                    maxLength={10}
                    keyboardType='number-pad'
                    onChangeText={setPhone} />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    textContentType='password'
                    placeholder='Password'
                    onChangeText={setPassword} />
            </View>

            <View style={styles.footer}>
                <View style={styles.footerRow}>
                    <View style={styles.button}>
                        <TextButton
                            title="Back"
                            onPress={backButtonPressed} />
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="Next"
                            color="#D50000"
                            onPress={nextButtonPressed} />
                    </View>
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
        marginHorizontal: 50
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
        fontSize: 16
    },
    footer: {
        height: 70,
    },
    footerRow: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
    },
    button: {
        width: 90
    },
    label: {
        fontSize: 16
    }
});

export default SignUpPage