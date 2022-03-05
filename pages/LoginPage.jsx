import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

function LoginPage() {
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    textContentType='emailAddress'
                    placeholder='Email' />

                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    textContentType='password'
                    placeholder='Password' />
            </View>

            <View style={styles.footer}>
                <View style={styles.footerRow}>
                    <View style={styles.button}>
                        <Button title="Back" />
                    </View>

                    <View style={styles.button}>
                        <Button title="Login" />
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

export default LoginPage