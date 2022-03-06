import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

import Button from './Button'

const UID_KEY = "session"
const ENDPOINT = "http://56stewart.tplinkdns.com"

function LogoutButton(props) {

    const getSessionKey = async () => {
        try {
            const key = await AsyncStorage.getItem(UID_KEY);
            return key
        } catch (e) {
            console.log('error getting session key from storage:')
            console.log(e)
            return null
        }
    }

    const navigateToPage = (name) => {
        const navigation = props.navigation

        navigation.reset({
            index: 0,
            routes: [{ name: name }],
        });
    }

    const logout = async () => {
        const sessionKey = await getSessionKey()

        fetch(ENDPOINT + "/auth/logout", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-token': sessionKey
            },
        })
    }

    const onClick = async () => {
        await logout()
        await AsyncStorage.removeItem(UID_KEY)
        navigateToPage("LandingPage")
    }

    return (
        <View>
            <Button title="Logout" onPress={onClick} />
        </View>
    )
}

export default LogoutButton;