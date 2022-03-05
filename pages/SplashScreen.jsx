import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UID_KEY = "uid"

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
        <View>
        </View>
    )
}

export default SplashScreen