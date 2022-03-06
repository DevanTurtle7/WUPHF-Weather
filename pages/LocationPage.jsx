import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import * as Location from 'expo-location';

import Button from '../components/Button';
import TextButton from '../components/TextButton';

function LocationPage({ navigation }) {
    const navigateToPage = (name) => {
        navigation.reset({
            index: 0,
            routes: [{ name: name }],
        });
    }

    const onPress = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status === "granted") {
            const location = await Location.getCurrentPositionAsync({});
            const latitute = location.coords.latitude
            const longitude = location.coords.longitude

            console.log(latitute, longitude)
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