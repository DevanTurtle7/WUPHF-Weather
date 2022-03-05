import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

function LandingPage({navigation}) {
    const loginPressed = () => {
        navigation.navigate("Login")
    }

    const signUpPressed = () => {

    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />

            <Text>WUPHF Weather</Text>

            <View style={styles.button}>
                <Button
                    onPress={loginPressed}
                    title="Login"
                />
            </View>
            <View style={styles.button}>
                <Button
                    onPress={signUpPressed}
                    title="Sign Up"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 10
    }
});

export default LandingPage