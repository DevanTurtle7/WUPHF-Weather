import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

function LandingPage() {
    return (
        <View style={styles.container}>
            <Text>WUPHF Weather</Text>
            <StatusBar style="auto" />
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

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
});

export default LandingPage