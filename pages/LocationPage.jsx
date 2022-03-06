import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

import Button from '../components/Button';

const ENDPOINT = "http://56stewart.tplinkdns.com"
const UID_KEY = "session"

function LocationPage({ navigation }) {
    const navigateToPage = (name) => {
        navigation.reset({
            index: 0,
            routes: [{ name: name }],
        });
    }

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

    const onPress = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            const location = await Location.getCurrentPositionAsync({});
            const latitute = location.coords.latitude
            const longitude = location.coords.longitude
            const sessionKey = await getSessionKey()

            await fetch(ENDPOINT + "/geo/set/location", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'x-token': sessionKey
                }, body: JSON.stringify({
                    latitude: latitute,
                    longitude: longitude
                })
            })

            navigateToPage("HomePage")
        }
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.label}>Enable Location Services</Text>
                <View style={styles.button}>
                    <Button title="Allow" onPress={onPress}/>
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
        alignItems: 'center',
        marginHorizontal: 50,
    },
    label: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 30
    },
    button: {
        width: 90,
    }
});

export default LocationPage