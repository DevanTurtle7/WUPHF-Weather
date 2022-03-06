import { StyleSheet, Text, View, TextInput } from 'react-native';
import PlatformToggle from '../components/PlatformToggle';
import AddNotificationButton from '../components/AddNotificationButton';
import LogoutButton from '../components/LogoutButton';

function HomePage({navigation}) {
    return (
        <View style={styles.body}>
            <View style={styles.content}>
                <View style={styles.notificationSection}>
            <LogoutButton navigation={navigation}/>
                    <Text style={styles.header}>Notifications</Text>
                    <AddNotificationButton/>
                </View>

                <View style={styles.platformSection}>
                    <Text style={styles.header}>Platforms</Text>
                    <PlatformToggle label="Call" />
                    <PlatformToggle label="Text" />
                    <PlatformToggle label="Email" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 50
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 5
    },
    infoText: {
        fontSize: 18
    },
    notificationSection: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    platformSection: {
        flex: 1,
        justifyContent: 'flex-start'
    }
});

export default HomePage