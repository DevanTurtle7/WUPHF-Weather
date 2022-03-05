import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

function SignUpPage({ navigation }) {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    const backButtonPressed = () => {
        navigation.goBack()
    }

    const nextButtonPressed = () => {

    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    textContentType='emailAddress'
                    placeholder='Email'
                    onChangeText={setEmail} />

                <Text>Phone</Text>
                <TextInput
                    style={styles.input}
                    textContentType='telephoneNumber'
                    placeholder='Phone'
                    onChangeText={setPhone} />

                <Text>Password</Text>
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
                        <Button
                            title="Back"
                            onPress={backButtonPressed} />
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="Next"
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
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    footer: {
        height: 70,
    },
    footerRow: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 50,
    },
    button: {
        width: 80
    }
});

export default SignUpPage