import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UID_KEY = "session"

function SplashScreen({ navigation }) {
    const navigateToPage = (name) => {
        navigation.reset({
            index: 0,
            routes: [{ name: name }],
        });
    }

    const checkNavState = async () => {
        try {
            const id = await AsyncStorage.getItem(UID_KEY);

            if (id !== null) {
                navigateToPage("Home")
            } else {
                navigateToPage("LandingPage")
            }
        } catch (e) {
            navigateToPage("LandingPage")
        }
    }

    checkNavState()
    return (
        <View style={styles.background}>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fff",
        flex: 1
    }
})

export default SplashScreen