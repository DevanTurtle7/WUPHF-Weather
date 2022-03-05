import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen({ navigation }) {
    const checkNavState = async () => {
        try {
            const id = await AsyncStorage.getItem(UID_KEY);

            if (id !== null) {
                navigation.navigate("Home")
            } else {
                navigation.navigate("LandingPage")
            }
        } catch (e) {
            navigation.navigate("LandingPage")
        }
    }

    checkNavState()
    return (
        <View>
        </View>
    )
}

export default SplashScreen