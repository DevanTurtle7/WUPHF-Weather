import { StyleSheet, Text, View, TextInput } from 'react-native';

function LoginPage() {
    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text>Email</Text>
                <TextInput
                    style={styles.input}
                    textContentType='emailAddress'
                    placeholder='Email'/>

                <Text>Phone</Text>
                <TextInput
                    style={styles.input}
                    textContentType='telephoneNumber'
                    placeholder='Phone'/>

                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    textContentType='password'
                    placeholder='Password'/>
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
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 50
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
    },
});

export default LoginPage