import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';

import Button from '../components/Button';
import TextButton from '../components/TextButton';

function SignUpPage({ navigation }) {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const backButtonPressed = () => {
        navigation.goBack()
    }

    const nextButtonPressed = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {return}

        const location = await Location.getCurrentPositionAsync({});
        const latitute = location.coords.latitude
        const longitude = location.coords.longitude

        console.log(latitute, longitude)
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