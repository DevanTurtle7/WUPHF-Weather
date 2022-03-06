import { StyleSheet, Text, View } from 'react-native';

import Button from '../components/Button';
import TextButton from '../components/TextButton';

function LandingPage({ navigation }) {
    const loginPressed = () => {
        navigation.navigate("LoginPage")
    }

    const signUpPressed = () => {
        navigation.navigate("SignUpPage")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>WUPHF Weather</Text>

            <View style={styles.button}>
                <Button
                    onPress={loginPressed}
                    color="#D50000"
                    title="Login" />
            </View>

            <View style={styles.button}>
                <Button
                    onPress={signUpPressed}
                    color="#D50000"
                    title="Sign Up" />
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
        margin: 5,
        width: 110
    },
    text: {
        fontSize: 36,
        fontWeight: "700",
        marginBottom: 100
    }
});

export default LandingPage